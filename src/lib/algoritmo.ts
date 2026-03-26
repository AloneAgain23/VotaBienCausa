// src/lib/algoritmo.ts
/**
 * ALGORITMO DE AFINIDAD VAA PERÚ 2026
 * =====================================
 * Implementación exacta del algoritmo especificado.
 * Complejidad: O(n * 16) donde n = número de candidatos.
 * Sin IA en tiempo real — cálculo matemático puro.
 */

import { Candidato, InputsCalculo, ResultadoCandidato, RespuestaAPI } from '@/types';
import { CANDIDATOS } from './candidatos';
import { PREGUNTAS } from './preguntas';

/**
 * Calcula la afinidad entre el usuario y UN candidato.
 * @returns afinidad entre 0 y 100, y preguntas válidas usadas.
 */
function calcularAfinidadCandidato(
  candidato: Candidato,
  inputs: InputsCalculo
): { afinidad: number; preguntasValidas: number } {

  // REGLA CERO: Filtro antivoto
  if (inputs.vetados.includes(candidato.id)) {
    return { afinidad: 0, preguntasValidas: 0 };
  }

  let distanciaTotal = 0;
  let distanciaMaximaAcumulada = 0;
  let preguntasValidas = 0;

  // ITERACIÓN sobre las 16 preguntas políticas
  for (let i = 0; i < 16; i++) {
    const pregunta = PREGUNTAS[i];
    const peso = inputs.pesos_temas[pregunta.macro_tema];
    const respuestaUsuario = inputs.respuestas[i] ?? 0;
    const posturaKey = `P${i + 1}` as keyof Candidato;
    const posturaCandidato = candidato[posturaKey] as number;

    // Caso A: usuario saltó la pregunta → ignorar
    if (respuestaUsuario === 0) continue;

    // Caso B: ambos respondieron → calcular distancia ponderada
    if (posturaCandidato !== 0) {
      distanciaTotal += Math.abs(respuestaUsuario - posturaCandidato) * peso;
      distanciaMaximaAcumulada += 4 * peso;
      preguntasValidas += 1;
    }
    // Caso C: usuario respondió pero candidato es indeterminado → penalización
    else {
      distanciaTotal += 3 * peso;
      distanciaMaximaAcumulada += 4 * peso;
      preguntasValidas += 1;
    }
  }

  // EVALUACIÓN DE PERFIL (equivale a una pregunta extra)
  if (inputs.perfil_buscado !== null) {
    preguntasValidas += 1;
    distanciaMaximaAcumulada += 4;
    if (candidato.perfil !== inputs.perfil_buscado) {
      distanciaTotal += 4; // Penalidad máxima por no coincidir
    }
    // Si coincide: distanciaTotal += 0 (no se suma nada)
  }

  // CÁLCULO FINAL
  if (distanciaMaximaAcumulada === 0) {
    return { afinidad: 0, preguntasValidas };
  }

  const afinidadRaw = (1 - distanciaTotal / distanciaMaximaAcumulada) * 100;
  // Clamp entre 0 y 100 y redondear
  const afinidad = Math.round(Math.max(0, Math.min(100, afinidadRaw)));

  return { afinidad, preguntasValidas };
}

/**
 * Función principal: calcula afinidades para todos los candidatos,
 * ordena y devuelve el Top 3 con nivel de confianza.
 */
export function calcularAfinidades(inputs: InputsCalculo): RespuestaAPI {
  // Calcular afinidad para cada candidato
  const resultados = CANDIDATOS.map((candidato) => {
    const { afinidad, preguntasValidas } = calcularAfinidadCandidato(candidato, inputs);
    return {
      candidato: {
        id: candidato.id,
        nombre: candidato.nombre,
        partido: candidato.partido,
        foto_url: candidato.foto_url,
        perfil: candidato.perfil,
        url_oficial: candidato.url_oficial,

      },
      afinidad,
      preguntasValidas,
    };
  });

  // Ordenar por mayor afinidad
  resultados.sort((a, b) => b.afinidad - a.afinidad);

  // Tomar Top 3
  const top3: ResultadoCandidato[] = resultados.slice(0, 3).map(r => ({
    candidato: r.candidato,
    afinidad: r.afinidad,
  }));

  // MARGEN DE CONFIANZA
  // Tomamos el mayor número de preguntas válidas entre el top 3 (o del primero)
  const maxPreguntasValidas = resultados[0]?.preguntasValidas ?? 0;
  const totalPosibles = 16 + (inputs.perfil_buscado !== null ? 1 : 0);
  const confianza = totalPosibles > 0 ? maxPreguntasValidas / 16 : 0;

  let nivelConfianza: 'Alta' | 'Media' | 'Baja';
  if (confianza >= 0.7) nivelConfianza = 'Alta';
  else if (confianza >= 0.4) nivelConfianza = 'Media';
  else nivelConfianza = 'Baja';

  return { top3, confianza: Math.round(confianza * 100), nivelConfianza };
}
