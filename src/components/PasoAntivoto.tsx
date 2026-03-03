// src/components/PasoAntivoto.tsx
'use client';
import React from 'react';
import { useApp } from '@/lib/AppContext';
import ProgressHeader from './ProgressHeader';
import { CANDIDATOS } from '@/lib/candidatos';

export default function PasoAntivoto() {
  const { irAPaso, estado, toggleVetado } = useApp();

  const continuar = () => irAPaso(4);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      <ProgressHeader
        paso={3}
        totalPasos={4}
        titulo="¿Por quién NO votarías?"
        subtitulo="Marca a los candidatos que excluyes por completo. Su compatibilidad será 0%. Puedes saltarte este paso."
        onAtras={() => irAPaso(2)}
      />

      <div className="container--wide" style={{ paddingTop: 32 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}>
          {CANDIDATOS.map((c, i) => {
            const esVetado = estado.vetados.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleVetado(c.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  padding: '20px 12px 16px',
                  border: esVetado
                    ? '2px solid var(--rojo)'
                    : '1.5px solid var(--gris-claro)',
                  borderRadius: 'var(--radius-lg)',
                  background: esVetado ? 'var(--rojo-fondo)' : 'var(--blanco)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: 'center',
                  animation: `scaleIn 0.3s ease ${i * 0.04}s both`,
                }}
              >
                {/* Foto */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--gris-claro)',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.foto_url}
                    alt={c.nombre}
                    width={72}
                    height={72}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      filter: esVetado ? 'grayscale(100%) opacity(0.5)' : 'none',
                      transition: 'filter 0.2s ease',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.nombre)}&background=e8e8e8&color=555&size=72`;
                    }}
                  />
                  {esVetado && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(208,2,27,0.15)',
                      borderRadius: '50%',
                    }} />
                  )}
                </div>

                {/* Nombre */}
                <div>
                  <p style={{
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: esVetado ? 'var(--rojo)' : 'var(--negro)',
                    lineHeight: 1.3,
                    marginBottom: 3,
                    transition: 'color 0.2s',
                  }}>
                    {c.nombre}
                  </p>
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--gris-medio)',
                    lineHeight: 1.3,
                  }}>
                    {c.partido}
                  </p>
                </div>

                {/* Indicador vetado */}
                {esVetado && (
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 20, height: 20,
                    background: 'var(--rojo)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'white',
                    animation: 'scaleIn 0.2s ease',
                  }}>
                    ✕
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Resumen vetados */}
        {estado.vetados.length > 0 && (
          <div style={{
            marginTop: 24,
            padding: '14px 20px',
            background: 'var(--rojo-fondo)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(208,2,27,0.15)',
            animation: 'fadeIn 0.3s ease',
          }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--rojo)' }}>
              <strong>{estado.vetados.length}</strong> candidato{estado.vetados.length > 1 ? 's' : ''} excluido{estado.vetados.length > 1 ? 's' : ''}.
              Su compatibilidad será 0%.
            </p>
          </div>
        )}

        {/* Botones */}
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <button className="btn btn--primary" onClick={continuar}>
            Continuar → {estado.vetados.length > 0 ? `(${estado.vetados.length} excluido${estado.vetados.length > 1 ? 's' : ''})` : ''}
          </button>
          <button className="btn btn--ghost" onClick={() => irAPaso(4)}>
            Saltar este paso
          </button>
        </div>
      </div>
    </div>
  );
}
