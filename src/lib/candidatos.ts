// src/lib/candidatos.ts
import { Candidato } from '@/types';

/**
 * Base de datos de candidatos presidenciales Perú 2026.
 * Posturas: 1=Totalmente en contra, 2=En contra, 3=Neutro, 4=A favor, 5=Totalmente a favor, 0=Indeterminado
 * P1-P5: Inseguridad | P6-P10: Economía | P11-P15: Corrupción
 *
 * NOTA: Estos datos son ilustrativos y deben ser actualizados con posturas verificadas.
 */
export const CANDIDATOS: Candidato[] = [
  {
    id: 1,
    nombre: "PABLO ALFONSO LOPEZ CHAU NAVA",
    partido: "AHORA NACION - AN",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/ddfa74eb-cae3-401c-a34c-35543ae83c57.jpg",
    perfil: "Tecnócrata",
    P1: 0, P2: 0, P3: 0, P4: 5, P5: 5,
    P6: 2, P7: 0, P8: 2, P9: 2, P10: 4,
    P11: 5, P12: 4, P13: 3, P14: 3, P15: 3
  },
  {
    id: 2,
    nombre: "RONALD DARWIN ATENCIO SOTOMAYOR",
    partido: "ALIANZA ELECTORAL VENCEREMOS",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/bac0288d-3b21-45ac-8849-39f9177fb020.jpg",
    perfil: "Outsider",
    P1: 1, P2: 2, P3: 4, P4: 5, P5: 4,
    P6: 4, P7: 4, P8: 4, P9: 1, P10: 2,
    P11: 1, P12: 3, P13: 4, P14: 2, P15: 4
  },
  {
    id: 3,
    nombre: "CESAR ACUÑA PERALTA",
    partido: "ALIANZA PARA EL PROGRESO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/d6fe3cac-7061-474b-8551-0aa686a54bad.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 4, P3: 4, P4: 4, P5: 5,
    P6: 1, P7: 4, P8: 2, P9: 4, P10: 4,
    P11: 5, P12: 4, P13: 5, P14: 4, P15: 5
  },
  {
    id: 4,
    nombre: "JOSE DANIEL WILLIAMS ZAPATA",
    partido: "AVANZA PAIS - PARTIDO DE INTEGRACION SOCIAL",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/b60c471f-a6bb-4b42-a4b2-02ea38acbb0d.jpg",
    perfil: "Político con experiencia",
    P1: 5, P2: 2, P3: 0, P4: 4, P5: 5,
    P6: 1, P7: 0, P8: 2, P9: 4, P10: 4,
    P11: 4, P12: 4, P13: 3, P14: 5, P15: 4
  },
  {
    id: 5,
    nombre: "ALVARO GONZALO PAZ DE LA BARRA FREIGEIRO",
    partido: "FE EN EL PERU",
    foto_url: "https://votoinformado.jne.gob.pe/assets/images/candidatos/ALVARO%20PAZ%20DE%20LA%20BARRA.jpg",
    perfil: "Político con experiencia",
    P1: 1, P2: 5, P3: 0, P4: 0, P5: 0,
    P6: 0, P7: 0, P8: 0, P9: 3, P10: 3,
    P11: 0, P12: 4, P13: 0, P14: 0, P15: 0
  },
  {
    id: 6,
    nombre: "KEIKO SOFIA FUJIMORI HIGUCHI",
    partido: "FUERZA POPULAR",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/251cd1c0-acc7-4338-bd8a-439ccb9238d0.jpeg",
    perfil: "Político con experiencia",
    P1: 2, P2: 4, P3: 4, P4: 4, P5: 4,
    P6: 3, P7: 0, P8: 1, P9: 3, P10: 4,
    P11: 5, P12: 4, P13: 5, P14: 5, P15: 5
  },
  {
    id: 7,
    nombre: "FIORELLA GIANNINA MOLINELLI ARISTONDO",
    partido: "FUERZA Y LIBERTAD",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/1de656b5-7593-4c60-ab7a-83d618a3d80d.jpg",
    perfil: "Tecnócrata",
    P1: 2, P2: 2, P3: 5, P4: 5, P5: 5,
    P6: 2, P7: 2, P8: 2, P9: 2, P10: 3,
    P11: 1, P12: 4, P13: 5, P14: 1, P15: 0
  },
  {
    id: 8,
    nombre: "ROBERTO HELBERT SANCHEZ PALOMINO",
    partido: "JUNTOS POR EL PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/bb7c7465-9c6e-44eb-ac7d-e6cc7f872a1a.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 0, P3: 0, P4: 5, P5: 4,
    P6: 4, P7: 4, P8: 5, P9: 1, P10: 1,
    P11: 1, P12: 4, P13: 5, P14: 4, P15: 4
  },
  {
    id: 9,
    nombre: "RAFAEL JORGE BELAUNDE LLOSA",
    partido: "LIBERTAD POPULAR",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/3302e45b-55c8-4979-a60b-2b11097abf1d.jpg",
    perfil: "Tecnócrata",
    P1: 1, P2: 1, P3: 0, P4: 5, P5: 5,
    P6: 1, P7: 0, P8: 1, P9: 3, P10: 5,
    P11: 4, P12: 0, P13: 1, P14: 0, P15: 0
  },
  {
    id: 10,
    nombre: "PITTER ENRIQUE VALDERRAMA PEÑA",
    partido: "PARTIDO APRISTA PERUANO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/d72c4b29-e173-42b8-b40d-bdb6d01a526a.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 4, P3: 4, P4: 5, P5: 5,
    P6: 3, P7: 4, P8: 4, P9: 3, P10: 3,
    P11: 0, P12: 4, P13: 2, P14: 4, P15: 0
  },
   {
    id: 11,
    nombre: "RICARDO PABLO BELMONT CASSINELLI",
    partido: "PARTIDO CIVICO OBRAS",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/78647f15-d5d1-4ed6-8ac6-d599e83eeea3.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 0, P3: 0, P4: 4, P5: 0,
    P6: 0, P7: 0, P8: 0, P9: 2, P10: 2,
    P11: 0, P12: 0, P13: 0, P14: 0, P15: 0
  },
  {
    id: 12,
    nombre: "NAPOLEON BECERRA GARCIA",
    partido: "PARTIDO DE LOS TRABAJADORES Y EMPRENDEDORES PTE - PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/bab206cb-b2d5-41ec-bde8-ef8cf3e0a2df.jpg",
    perfil: "Empresario",
    P1: 0, P2: 4, P3: 0, P4: 0, P5: 0,
    P6: 0, P7: 0, P8: 0, P9: 2, P10: 0,
    P11: 0, P12: 0, P13: 0, P14: 0, P15: 0
  },
  {
    id: 13,
    nombre: "JORGE NIETO MONTESINOS",
    partido: "PARTIDO DEL BUEN GOBIERNO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/9ae56ed5-3d0f-49ff-8bb9-0390bad71816.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 0, P3: 0, P4: 5, P5: 4,
    P6: 0, P7: 4, P8: 4, P9: 2, P10: 3,
    P11: 0, P12: 4, P13: 2, P14: 0, P15: 0
  },
  {
    id: 14,
    nombre: "CHARLIE CARRASCO SALAZAR",
    partido: "PARTIDO DEMOCRATA UNIDO PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/12fa17db-f28f-4330-9123-88549539b538.jpg",
    perfil: "Tecnócrata",
    P1: 4, P2: 4, P3: 5, P4: 4, P5: 4,
    P6: 0, P7: 0, P8: 2, P9: 3, P10: 5,
    P11: 2, P12: 0, P13: 0, P14: 3, P15: 0
  },
  {
    id: 15,
    nombre: "ALEX GONZALES CASTILLO",
    partido: "PARTIDO DEMOCRATA VERDE",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/c0ae56bf-21c1-4810-890a-b25c8465bdd9.jpg",
    perfil: "Político con experiencia",
    P1: 4, P2: 4, P3: 4, P4: 5, P5: 4,
    P6: 0, P7: 0, P8: 2, P9: 3, P10: 3,
    P11: 4, P12: 0, P13: 0, P14: 0, P15: 0
  },
  {
    id: 16,
    nombre: "ARMANDO JOAQUIN MASSE FERNANDEZ",
    partido: "PARTIDO DEMOCRATICO FEDERAL",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/cb1adeb7-7d2f-430c-ae87-519137d8edfa.jpg",
    perfil: "Tecnócrata",
    P1: 0, P2: 4, P3: 0, P4: 4, P5: 4,
    P6: 0, P7: 0, P8: 4, P9: 2, P10: 4,
    P11: 0, P12: 4, P13: 0, P14: 2, P15: 0
  },
  {
    id: 17,
    nombre: "GEORGE PATRICK FORSYTH SOMMER",
    partido: "PARTIDO DEMOCRATICO SOMOS PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/b1d60238-c797-4cba-936e-f13de6a34cc7.jpg",
    perfil: "Político con experiencia",
    P1: 2, P2: 3, P3: 5, P4: 5, P5: 4,
    P6: 0, P7: 0, P8: 2, P9: 2, P10: 4,
    P11: 4, P12: 4, P13: 5, P14: 0, P15: 4
  },
  {
    id: 18,
    nombre: "LUIS FERNANDO OLIVERA VEGA",
    partido: "PARTIDO FRENTE DE LA ESPERANZA 2021",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/3e2312e1-af79-4954-abfa-a36669c1a9e9.jpg",
    perfil: "Político con experiencia",
    P1: 2, P2: 4, P3: 4, P4: 5, P5: 5,
    P6: 0, P7: 0, P8: 2, P9: 2, P10: 4,
    P11: 0, P12: 0, P13: 0, P14: 0, P15: 0
  },
  {
    id: 19,
    nombre: "MESIAS ANTONIO GUEVARA AMASIFUEN",
    partido: "PARTIDO MORADO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/1b861ca7-3a5e-48b4-9024-08a92371e33b.jpg",
    perfil: "Político con experiencia",
    P1: 0, P2: 4, P3: 0, P4: 5, P5: 4,
    P6: 0, P7: 0, P8: 4, P9: 2, P10: 3,
    P11: 1, P12: 3, P13: 1, P14: 2, P15: 2
  },
  {
    id: 20,
    nombre: "CARLOS GONSALO ALVAREZ LOAYZA",
    partido: "PARTIDO PAIS PARA TODOS",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/2bd18177-d665-413d-9694-747d729d3e39.jpg",
    perfil: "Outsider",
    P1: 5, P2: 0, P3: 4, P4: 5, P5: 5,
    P6: 3, P7: 0, P8: 3, P9: 4, P10: 2,
    P11: 0, P12: 4, P13: 0, P14: 4, P15: 3
  },
  {
    id: 21,
    nombre: "HERBERT CALLER GUTIERREZ",
    partido: "PARTIDO PATRIOTICO DEL PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/6ad6c5ff-0411-4ddd-9cf7-b0623f373fcf.jpg",
    perfil: "Outsider",
    P1: 5, P2: 5, P3: 3, P4: 0, P5: 5,
    P6: 2, P7: 0, P8: 0, P9: 2, P10: 4,
    P11: 0, P12: 3, P13: 1, P14: 3, P15: 3
  },
  {
    id: 22,
    nombre: "YONHY LESCANO ANCIETA",
    partido: "PARTIDO POLITICO COOPERACION POPULAR",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/b9db2b5c-02ff-4265-ae51-db9b1001ad70.jpg",
    perfil: "Político con experiencia",
    P1: 5, P2: 4, P3: 4, P4: 0, P5: 5,
    P6: 4, P7: 4, P8: 4, P9: 1, P10: 2,
    P11: 0, P12: 4, P13: 3, P14: 3, P15: 3
  },
  {
    id: 23,
    nombre: "WOLFGANG MARIO GROZO COSTA",
    partido: "PARTIDO POLITICO INTEGRIDAD DEMOCRATICA",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/064360d1-ce49-4abe-939c-f4de8b0130a2.jpg",
    perfil: "Tecnócrata",
    P1: 1, P2: 1, P3: 5, P4: 4, P5: 4,
    P6: 1, P7: 0, P8: 4, P9: 2, P10: 4,
    P11: 3, P12: 3, P13: 1, P14: 3, P15: 3
  },
  {
    id: 24,
    nombre: "VLADIMIR ROY CERRON ROJAS",
    partido: "PARTIDO POLITICO NACIONAL PERU LIBRE",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/82ee0ff2-2336-4aba-9590-e576f7564315.jpg",
    perfil: "Político con experiencia",
    P1: 5, P2: 0, P3: 0, P4: 0, P5: 5,
    P6: 4, P7: 4, P8: 4, P9: 1, P10: 1,
    P11: 5, P12: 5, P13: 4, P14: 4, P15: 4
  },
  {
    id: 25,
    nombre: "FRANCISCO ERNESTO DIEZ-CANSECO TÁVARA",
    partido: "PARTIDO POLITICO PERU ACCION",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/2d1bf7f2-6e88-4ea9-8ed2-975c1ae5fb92.jpg",
    perfil: "Político con experiencia",
    P1: 5, P2: 3, P3: 4, P4: 4, P5: 4,
    P6: 1, P7: 2, P8: 1, P9: 3, P10: 4,
    P11: 0, P12: 3, P13: 1, P14: 3, P15: 3
  },
  {
    id: 26,
    nombre: "MARIO ENRIQUE VIZCARRA CORNEJO",
    partido: "PARTIDO POLITICO PERU PRIMERO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/ee7a080e-bc81-4c81-9e5e-9fd95ff459ab.jpg",
    perfil: "Empresario",
    P1: 0, P2: 4, P3: 0, P4: 5, P5: 5,
    P6: 2, P7: 0, P8: 0, P9: 3, P10: 4,
    P11: 0, P12: 4, P13: 0, P14: 0, P15: 0
  },
  {
    id: 27,
    nombre: "WALTER GILMER CHIRINOS PURIZAGA",
    partido: "PARTIDO POLITICO PRIN",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/a2d0f631-fe47-4c41-92ba-7ed9f4095520.jpg",
    perfil: "Tecnócrata",
    P1: 4, P2: 5, P3: 4, P4: 5, P5: 5,
    P6: 4, P7: 0, P8: 3, P9: 3, P10: 3,
    P11: 0, P12: 4, P13: 2, P14: 2, P15: 0
  },
  {
    id: 28,
    nombre: "ALFONSO CARLOS ESPA Y GARCES-ALVEAR",
    partido: "PARTIDO SICREO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/85935f77-6c46-4eab-8c7e-2494ffbcece0.jpg",
    perfil: "Outsider",
    P1: 1, P2: 4, P3: 5, P4: 5, P5: 4,
    P6: 1, P7: 0, P8: 1, P9: 3, P10: 5,
    P11: 0, P12: 4, P13: 2, P14: 3, P15: 0
  },
  {
    id: 29,
    nombre: "CARLOS ERNESTO JAICO CARRANZA",
    partido: "PERU MODERNO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/7d91e14f-4417-4d61-89ba-3e686dafaa95.jpg",
    perfil: "Tecnócrata",
    P1: 2, P2: 0, P3: 4, P4: 4, P5: 5,
    P6: 5, P7: 0, P8: 2, P9: 2, P10: 4,
    P11: 0, P12: 4, P13: 0, P14: 2, P15: 0
  },
  {
    id: 30,
    nombre: "JOSE LEON LUNA GALVEZ",
    partido: "PODEMOS PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/a669a883-bf8a-417c-9296-c14b943c3943.jpg",
    perfil: "Político con experiencia",
    P1: 4, P2: 4, P3: 4, P4: 5, P5: 4,
    P6: 5, P7: 0, P8: 3, P9: 2, P10: 3,
    P11: 5, P12: 4, P13: 5, P14: 4, P15: 4
  },
   {
    id: 31,
    nombre: "MARIA SOLEDAD PEREZ TELLO DE RODRIGUEZ",
    partido: "PRIMERO LA GENTE - COMUNIDAD, ECOLOGIA, LIBERTAD Y PROGRESO",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/073703ca-c427-44f0-94b1-a782223a5e10.jpg",
    perfil: "Político con experiencia",
    P1: 1, P2: 1, P3: 4, P4: 5, P5: 5,
    P6: 0, P7: 0, P8: 0, P9: 3, P10: 4,
    P11: 0, P12: 1, P13: 1, P14: 1, P15: 0
  },
   {
    id: 32,
    nombre: "PAUL DAVIS JAIMES BLANCO",
    partido: "PROGRESEMOS",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/929e1a63-335d-4f3a-ba26-f3c7ff136213.jpg",
    perfil: "Outsider",
    P1: 5, P2: 2, P3: 4, P4: 5, P5: 4,
    P6: 0, P7: 0, P8: 1, P9: 1, P10: 4,
    P11: 0, P12: 4, P13: 1, P14: 0, P15: 0
  },
   {
    id: 33,
    nombre: "RAFAEL BERNARDO LOPEZ ALIAGA CAZORLA",
    partido: "RENOVACION POPULAR",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/b2e00ae2-1e50-4ad3-a103-71fc7e4e8255.jpg",
    perfil: "Empresario",
    P1: 5, P2: 4, P3: 4, P4: 4, P5: 5,
    P6: 1, P7: 0, P8: 1, P9: 3, P10: 4,
    P11: 4, P12: 5, P13: 5, P14: 4, P15: 4
  },
  {
    id: 34,
    nombre: "ANTONIO ORTIZ VILLANO",
    partido: "SALVEMOS AL PERU",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/8e6b9124-2883-4143-8768-105f2ce780eb.jpg",
    perfil: "Outsider",
    P1: 4, P2: 0, P3: 4, P4: 5, P5: 4,
    P6: 0, P7: 4, P8: 0, P9: 2, P10: 5,
    P11: 0, P12: 0, P13: 4, P14: 0, P15: 0
  },
  {
    id: 35,
    nombre: "ROSARIO DEL PILAR FERNANDEZ BAZAN",
    partido: "UN CAMINO DIFERENTE",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/ac0b0a59-ead5-4ef1-8ef8-8967e322d6ca.jpg",
    perfil: "Outsider",
    P1: 0, P2: 5, P3: 0, P4: 5, P5: 4,
    P6: 0, P7: 0, P8: 0, P9: 2, P10: 4,
    P11: 0, P12: 4, P13: 1, P14: 0, P15: 0
  },
  {
    id: 36,
    nombre: "ROBERTO ENRIQUE CHIABRA LEON",
    partido: "UNIDAD NACIONAL",
    foto_url: "https://mpesije.jne.gob.pe/apidocs/5c703ce9-ba1e-4490-90bf-61006740166f.jpg",
    perfil: "Político con experiencia",
    P1: 2, P2: 4, P3: 4, P4: 5, P5: 4,
    P6: 4, P7: 3, P8: 0, P9: 2, P10: 4,
    P11: 1, P12: 4, P13: 1, P14: 0, P15: 0
  }
];
