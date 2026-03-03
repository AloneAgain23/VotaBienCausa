// src/lib/preguntas.ts
import { Pregunta } from '@/types';

/**
 * 15 preguntas del cuestionario VAA Perú 2026.
 * 5 por cada macro-tema: Inseguridad, Economía, Corrupción.
 */
export const PREGUNTAS: Pregunta[] = [
  // --- INSEGURIDAD (P1-P5) ---
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
    texto: "La conducta de los policías debería ser investigada y sancionada por un organismo civil independiente."
  },
  {
    id: "P5",
    macro_tema: "Inseguridad",
    texto: "La policía debería poder acceder a datos de comunicación de sospechosos de crimen organizado sin autorización judicial previa."
  },
  // --- ECONOMÍA (P6-P10) ---
  {
    id: "P6",
    macro_tema: "Economía",
    texto: "El Estado debería mantener a Petroperú como empresa pública, incluso si necesita apoyo financiero del gobierno."
  },
  {
    id: "P7",
    macro_tema: "Economía",
    texto: "El salario mínimo debería aumentar, aunque eso pueda reducir el empleo formal."
  },
  {
    id: "P8",
    macro_tema: "Economía",
    texto: "Se deberían aumentar los impuestos a empresas grandes y altos ingresos, incluso si eso desincentiva parte de la inversión privada."
  },
  {
    id: "P9",
    macro_tema: "Economía",
    texto: "Si hay conflicto, el Perú debería priorizar la inversión minera y el crecimiento económico antes que mayores restricciones ambientales."
  },
  {
    id: "P10",
    macro_tema: "Economía",
    texto: "Para reducir la informalidad, el país debería simplificar regulaciones y reducir costos para las pequeñas empresas, incluso si eso implica hacer más flexibles algunas normas laborales."
  },
  // --- CORRUPCIÓN (P11-P15) ---
  {
    id: "P11",
    macro_tema: "Corrupción",
    texto: "¿Usted votaría por un partido que apoya leyes que debilitan la lucha contra el crimen organizado, según algunos sectores de la prensa?"
  },
  {
    id: "P12",
    macro_tema: "Corrupción",
    texto: "Candidato que se rodea de operadores o aliados con historial de corrupción, aunque él ‘no tenga denuncias’."
  },
  {
    id: "P13",
    macro_tema: "Corrupción",
    texto: "El REINFO debería ampliarse para facilitar la formalización minera, incluso si existen riesgos de uso indebido."
  },
  {
    id: "P14",
    macro_tema: "Corrupción",
    texto: "¿Usted votaría por un candidato que ataca a órganos de justicia cuando lo investigan?"
  },
  {
    id: "P15",
    macro_tema: "Corrupción",
    texto: "¿Usted votaría por un partido que su bancada frenó investigaciones contra sus propios miembros acusados de corrupción (blindaje)?"
  }
];
