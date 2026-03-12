// src/components/ProgressHeader.tsx
'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  paso: number;
  totalPasos: number;
  titulo: string;
  subtitulo?: string;
  onAtras?: () => void;
}

const PASOS_LABELS = ['', 'Temas', 'Perfil', 'Antivoto', 'Preguntas'];

export default function ProgressHeader({ paso, totalPasos, titulo, subtitulo, onAtras }: Props) {
  const porcentaje = (paso / totalPasos) * 100;

  return (
    <>
      {/* Barra de progreso fija */}
      <div
        className="progress-bar"
        style={{ width: `${porcentaje}%` }}
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Header sticky */}
      <header style={{
        padding: '18px 0',
        borderBottom: '1px solid var(--gris-claro)',
        background: 'var(--blanco)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            {/* Izquierda: botón atrás o logo */}
            {onAtras ? (
              <button
                className="btn btn--ghost"
                onClick={onAtras}
                style={{ padding: '4px 0', fontSize: '0.88rem' }}
              >
                ← Atrás
              </button>
            ) : (
              <Link href="/" style={{
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <span style={{
                  width: 7, height: 7, background: 'var(--rojo)',
                  borderRadius: '50%', display: 'inline-block',
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem', color: 'var(--negro)',
                  letterSpacing: '-0.01em',
                }}>
                  VotaBienCausa.com
                </span>
              </Link>
            )}

            {/* Derecha: indicadores de progreso */}
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {Array.from({ length: totalPasos }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: i + 1 <= paso ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i + 1 <= paso ? 'var(--negro)' : 'var(--gris-claro)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            {PASOS_LABELS.slice(1, totalPasos + 1).map((label, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span style={{ color: 'var(--gris-claro)', fontSize: '0.7rem' }}>›</span>
                )}
                <span style={{
                  fontSize: '0.73rem',
                  color: i + 1 === paso ? 'var(--negro)' : 'var(--gris-medio)',
                  fontWeight: i + 1 === paso ? 600 : 400,
                }}>
                  {label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Título de sección */}
      <div className="container" style={{ paddingTop: 36, paddingBottom: 8, animation: 'fadeUp 0.4s ease' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
          marginBottom: subtitulo ? 10 : 0,
          color: 'var(--negro)',
        }}>
          {titulo}
        </h2>
        {subtitulo && (
          <p style={{ color: 'var(--gris-medio)', fontSize: '1rem', marginBottom: 8 }}>
            {subtitulo}
          </p>
        )}
      </div>
    </>
  );
}
