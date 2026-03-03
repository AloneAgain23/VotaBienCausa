// src/types/index.ts

export type MacroTema = 'Inseguridad' | 'Economía' | 'Corrupción';
export type PerfilCandidato = 'Outsider' | 'Político con experiencia' | 'Tecnócrata' | 'Empresario' | 'Activista social';

export interface Candidato {
  id: number;
  nombre: string;
  partido: string;
  foto_url: string;
  perfil: PerfilCandidato;
  P1: number; P2: number; P3: number; P4: number; P5: number;
  P6: number; P7: number; P8: number; P9: number; P10: number;
  P11: number; P12: number; P13: number; P14: number; P15: number;
}

export interface Pregunta {
  id: string; // "P1" .. "P15"
  macro_tema: MacroTema;
  texto: string;
}

export interface PesosTemas {
  Inseguridad: number;
  Economía: number;
  Corrupción: number;
}

export interface InputsCalculo {
  pesos_temas: PesosTemas;
  perfil_buscado: PerfilCandidato | null;
  vetados: number[];
  respuestas: number[]; // 15 elementos, 0 = saltó
}

export interface ResultadoCandidato {
  candidato: Omit<Candidato, 'P1'|'P2'|'P3'|'P4'|'P5'|'P6'|'P7'|'P8'|'P9'|'P10'|'P11'|'P12'|'P13'|'P14'|'P15'>;
  afinidad: number;
}

export interface RespuestaAPI {
  top3: ResultadoCandidato[];
  confianza: number;
  nivelConfianza: 'Alta' | 'Media' | 'Baja';
}

// Estado global del flujo de la app
export interface EstadoApp {
  paso: number; // 0=intro, 1=temas, 2=perfil, 3=antivoto, 4=cuestionario, 5=resultados
  pesos_temas: PesosTemas | null;
  perfil_buscado: PerfilCandidato | null;
  vetados: number[];
  respuestas: number[];
  resultados: RespuestaAPI | null;
}
