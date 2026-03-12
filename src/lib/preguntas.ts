// src/lib/preguntas.ts
import { Pregunta } from '@/types';

/**
 * 16 preguntas del cuestionario VAA Perú 2026.
 * 4 por cada macro-tema: Inseguridad, Economía, Corrupción y Social.
 */
export const PREGUNTAS: Pregunta[] = [
  // --- INSEGURIDAD (P1-P4) ---
  {
    id: "P1",
    macro_tema: "Inseguridad",
    texto: "Estoy a favor de ampliar la pena de muerte a más delitos graves."
  },
  {
    id: "P2",
    macro_tema: "Inseguridad",
    texto: "Las Fuerzas Armadas deberían apoyar de manera regular a la policía en tareas de seguridad interna."
  },
  {
    id: "P3",
    macro_tema: "Inseguridad",
    texto: "El país debería aplicar controles migratorios más estrictos."
  },
  {
    id: "P4",
    macro_tema: "Inseguridad",
    texto: "¿Usted votaría por un partido que apoya leyes que debilitan la lucha contra el crimen organizado, según algunos sectores de la prensa?"
  },
  // --- ECONOMÍA (P5-P8) ---
  {
    id: "P5",
    macro_tema: "Economía",
    texto: "El Estado debería mantener a Petroperú como empresa pública, incluso si necesita apoyo financiero del gobierno."
  },
  {
    id: "P6",
    macro_tema: "Economía",
    texto: "Se deberían aumentar los impuestos a las grandes empresas, incluso si eso desincentiva parte de la inversión privada."
  },
  {
    id: "P7",
    macro_tema: "Economía",
    texto: "Si hay conflicto, el Perú debería priorizar la inversión minera y el crecimiento económico antes que mayores restricciones ambientales."
  },
  {
    id: "P8",
    macro_tema: "Economía",
    texto: "Para reducir la informalidad, el país debería simplificar regulaciones y reducir costos para las pequeñas empresas, incluso si eso implica hacer más flexibles algunas normas laborales."
  },
  // --- CORRUPCIÓN (P9-P12) ---
  {
    id: "P9",
    macro_tema: "Corrupción",
    texto: "Usted votaría por un candidato que se rodea de operadores o aliados con historial de corrupción, aunque él ‘no tenga denuncias’."
  },
  {
    id: "P10",
    macro_tema: "Corrupción",
    texto: "El REINFO debería ampliarse para facilitar la formalización minera, incluso si existen riesgos de uso indebido."
  },
  {
    id: "P11",
    macro_tema: "Corrupción",
    texto: "¿Usted votaría por un candidato que ataca a órganos de justicia cuando lo investigan?"
  },
  {
    id: "P12",
    macro_tema: "Corrupción",
    texto: "¿Usted votaría por un partido que su bancada frenó investigaciones contra sus propios miembros acusados de corrupción (blindaje)?"
  },
   // --- Social (P9-P12) ---
   {
    id: "P13",
    macro_tema: "Social",
    texto: "El aborto debería ser legal en todos los casos durante las primeras semanas de embarazo."
  },
  {
    id: "P14",
    macro_tema: "Social",
    texto: "El Estado debería mantener a la SUNEDU como una entidad autónoma e independiente del control de las universidades."
  },
  {
    id: "P15",
    macro_tema: "Social",
    texto: "El Perú debería convocar una Asamblea Constituyente para reemplazar la Constitución de 1993."
  },
  {
    id: "P16",
    macro_tema: "Social",
    texto: "En situaciones de protestas sociales, se debería priorizar restablecer el orden público incluso si se restringen algunos derechos civiles y el uso de la fuerza."
  },
];
