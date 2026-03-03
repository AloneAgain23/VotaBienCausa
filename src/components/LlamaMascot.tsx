// src/components/LlamaMascot.tsx
// ============================================================
// LLAMA MASCOTA — SVG vectorial placeholder
// Para reemplazar por imagen real: cambiar el <svg> por <img src="..." />
// o usar Next/Image: <Image src="/llama.png" width={200} height={240} alt="Llama VotaBien" />
// ============================================================
'use client';
import React from 'react';

interface Props {
  pose?: 'normal' | 'señala' | 'celebra';
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LlamaMascot({ pose = 'normal', size = 160, style }: Props) {
  // Ajuste de pata delantera según pose
  const brazoPath =
    pose === 'señala'
      ? 'M 82 110 Q 110 90 130 72'   // apunta hacia arriba-derecha
      : pose === 'celebra'
      ? 'M 82 110 Q 70 80 60 60'    // levantado festejando
      : 'M 82 110 Q 90 120 95 135'; // relajado

  const ojosAlegres = pose === 'celebra';

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
      aria-label="Llama mascota VotaBien"
    >
      {/* Sombra suave */}
      <ellipse cx="80" cy="196" rx="36" ry="6" fill="#e0e0e0" opacity="0.5" />

      {/* Cuerpo */}
      <rect x="44" y="100" width="72" height="80" rx="24" fill="#F5E6C8" />

      {/* Cuello */}
      <rect x="64" y="62" width="32" height="50" rx="14" fill="#F5E6C8" />

      {/* Cabeza */}
      <ellipse cx="80" cy="52" rx="28" ry="26" fill="#F5E6C8" />

      {/* Orejas */}
      <ellipse cx="58" cy="30" rx="8" ry="14" fill="#F5E6C8" transform="rotate(-12 58 30)" />
      <ellipse cx="102" cy="30" rx="8" ry="14" fill="#F5E6C8" transform="rotate(12 102 30)" />
      <ellipse cx="58" cy="30" rx="4" ry="8" fill="#E8C4A0" transform="rotate(-12 58 30)" />
      <ellipse cx="102" cy="30" rx="4" ry="8" fill="#E8C4A0" transform="rotate(12 102 30)" />

      {/* Ojos */}
      {ojosAlegres ? (
        <>
          {/* Ojos de arco (felices) */}
          <path d="M 68 48 Q 72 43 76 48" stroke="#3A2A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 84 48 Q 88 43 92 48" stroke="#3A2A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="72" cy="50" rx="5" ry="5.5" fill="#3A2A1A" />
          <ellipse cx="88" cy="50" rx="5" ry="5.5" fill="#3A2A1A" />
          <ellipse cx="73.5" cy="48.5" rx="1.8" ry="1.8" fill="white" />
          <ellipse cx="89.5" cy="48.5" rx="1.8" ry="1.8" fill="white" />
        </>
      )}

      {/* Nariz */}
      <ellipse cx="80" cy="62" rx="5" ry="3.5" fill="#E8C4A0" />
      <ellipse cx="78" cy="62" rx="1.5" ry="1.2" fill="#C49A6A" />
      <ellipse cx="82" cy="62" rx="1.5" ry="1.2" fill="#C49A6A" />

      {/* Boca sonriente */}
      <path d="M 74 67 Q 80 72 86 67" stroke="#C49A6A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Patas traseras */}
      <rect x="50" y="160" width="20" height="32" rx="8" fill="#EDD8A8" />
      <rect x="90" y="160" width="20" height="32" rx="8" fill="#EDD8A8" />
      {/* Pezuñas */}
      <rect x="50" y="183" width="20" height="10" rx="5" fill="#C49A6A" />
      <rect x="90" y="183" width="20" height="10" rx="5" fill="#C49A6A" />

      {/* Pata delantera animada según pose */}
      <path d={brazoPath} stroke="#EDD8A8" strokeWidth="14" strokeLinecap="round" />
      <path d={brazoPath} stroke="#F5E6C8" strokeWidth="10" strokeLinecap="round" />

      {/* Pata delantera izquierda */}
      <path d="M 58 110 Q 46 120 44 138" stroke="#EDD8A8" strokeWidth="14" strokeLinecap="round" />
      <path d="M 58 110 Q 46 120 44 138" stroke="#F5E6C8" strokeWidth="10" strokeLinecap="round" />

      {/* Pezuñas delanteras */}
      {pose !== 'señala' && (
        <>
          <ellipse cx="44" cy="140" rx="8" ry="5" fill="#C49A6A" />
          <ellipse cx="95" cy="137" rx="8" ry="5" fill="#C49A6A" />
        </>
      )}
      {pose === 'señala' && (
        <ellipse cx="131" cy="73" rx="6" ry="4" fill="#C49A6A" transform="rotate(-40 131 73)" />
      )}

      {/* Detalle lana en cuello */}
      <path d="M 66 95 Q 72 88 80 91 Q 88 88 94 95" stroke="#EDD8A8" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Pequeño detalle rojo (bufanda/pañuelo) */}
      <path d="M 66 80 Q 80 86 94 80 L 92 88 Q 80 94 68 88 Z" fill="#D0021B" opacity="0.85" />

      {/* Punto brillante en ojo si pose normal */}
      {pose === 'señala' && (
        <circle cx="110" cy="68" r="4" fill="#D0021B" opacity="0.9">
          <animate attributeName="r" values="4;5.5;4" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
