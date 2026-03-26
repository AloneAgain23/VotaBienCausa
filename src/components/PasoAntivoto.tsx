// src/components/PasoAntivoto.tsx
// Carrusel tipo stories de IG — deslizable con touch y mouse
'use client';
import React, { useRef, useState, useCallback } from 'react';
import { useApp } from '@/lib/AppContext';
import ProgressHeader from './ProgressHeader';
import { CANDIDATOS } from '@/lib/candidatos';

// ── Orden de candidatos ─────────────────────────────────────────────
// El orden en que aparecen en el carrusel es el mismo orden del array
// en candidatos.ts. Para reordenar por antivoto, mueve los candidatos
// directamente en candidatos.ts.
const CANDIDATOS_ORDENADOS = [...CANDIDATOS];

export default function PasoAntivoto() {
  const { irAPaso, estado, toggleVetado } = useApp();
  const [indice, setIndice] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // ── Drag / swipe ────────────────────────────────────────────────
  const dragStart = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    trackRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setIndice(i => Math.min(i + 1, CANDIDATOS_ORDENADOS.length - 1));
      } else {
        setIndice(i => Math.max(i - 1, 0));
      }
    }
    dragStart.current = null;
  }, []);

  const ir = (dir: -1 | 1) => {
    setIndice(i => Math.max(0, Math.min(CANDIDATOS_ORDENADOS.length - 1, i + dir)));
  };

  const total = CANDIDATOS_ORDENADOS.length;
  const candidato = CANDIDATOS_ORDENADOS[indice];
  const esVetado = estado.vetados.includes(candidato.id);

  const visibles = [-2, -1, 0, 1, 2].map(offset => {
    const idx = indice + offset;
    if (idx < 0 || idx >= total) return null;
    return { candidato: CANDIDATOS_ORDENADOS[idx], offset };
  }).filter(Boolean) as { candidato: typeof CANDIDATOS[0]; offset: number }[];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      <ProgressHeader
        paso={3}
        totalPasos={4}
        titulo="¿Por quién NUNCA votarías?"
        subtitulo="Desliza para ver candidatos. Toca el botón para excluirlos — su compatibilidad será 0%."
        onAtras={() => irAPaso(2)}
      />

      <div className="container" style={{ paddingTop: 32 }}>

        {/* Contador y excluidos */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--gris-medio)' }}>
            {indice + 1} de {total}
          </span>
          {estado.vetados.length > 0 && (
            <span style={{
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--rojo)',
              background: 'var(--rojo-fondo)',
              padding: '4px 12px', borderRadius: 20,
              border: '1px solid rgba(208,2,27,0.15)',
            }}>
              {estado.vetados.length} excluido{estado.vetados.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Barra de progreso */}
        <div style={{
          height: 3, background: 'var(--gris-claro)',
          borderRadius: 2, marginBottom: 40, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((indice + 1) / total) * 100}%`,
            background: 'var(--negro)',
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Carrusel */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{
            position: 'relative',
            height: 340,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            touchAction: 'pan-y',
            cursor: 'grab',
          }}
        >
          {visibles.map(({ candidato: c, offset }) => {
            const esActual = offset === 0;
            const esVetadoC = estado.vetados.includes(c.id);
            const imgError = imgErrors[c.id];
            const scale = esActual ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.65;
            const translateX = offset * 200;
            const opacity = esActual ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.25;
            const zIndex = 10 - Math.abs(offset);

            return (
              <div
                key={c.id}
                onClick={() => { if (!esActual) setIndice(indice + offset); }}
                style={{
                  position: 'absolute',
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: esActual ? 'default' : 'pointer',
                }}
              >
                <div style={{
                  width: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                  padding: '28px 20px 24px',
                  border: esVetadoC ? '2px solid var(--rojo)' : esActual ? '2px solid var(--negro)' : '1.5px solid var(--gris-claro)',
                  borderRadius: 20,
                  background: esVetadoC ? 'var(--rojo-fondo)' : 'var(--blanco)',
                  textAlign: 'center',
                  boxShadow: esActual ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}>
                  {esVetadoC && (
                    <div style={{
                      position: 'absolute', top: -10, left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--rojo)', color: 'white',
                      fontSize: '0.68rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: 10,
                      letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    }}>
                      EXCLUIDO
                    </div>
                  )}
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%', overflow: 'hidden',
                    border: esVetadoC ? '3px solid var(--rojo)' : '2px solid var(--gris-claro)',
                    flexShrink: 0,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgError ? `https://ui-avatars.com/api/?name=${encodeURIComponent(c.nombre)}&background=e8e8e8&color=555&size=96` : c.foto_url}
                      alt={c.nombre}
                      width={96} height={96}
                      onError={() => setImgErrors(prev => ({ ...prev, [c.id]: true }))}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: esVetadoC ? 'grayscale(80%) opacity(0.6)' : 'none',
                        transition: 'filter 0.2s ease',
                      }}
                    />
                  </div>
                  <div>
                    <p style={{
                      fontWeight: 700, fontSize: '0.82rem',
                      color: esVetadoC ? 'var(--rojo)' : 'var(--negro)',
                      lineHeight: 1.3, marginBottom: 4,
                    }}>
                      {c.nombre.split(' ').slice(0, 3).join(' ')}
                    </p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--gris-medio)', lineHeight: 1.3 }}>
                      {c.partido.length > 30 ? c.partido.slice(0, 30) + '…' : c.partido}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón excluir + navegación */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <button
            onClick={() => toggleVetado(candidato.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 28px',
              border: esVetado ? '2px solid var(--rojo)' : '2px solid var(--gris-claro)',
              borderRadius: 40,
              background: esVetado ? 'var(--rojo)' : 'var(--blanco)',
              color: esVetado ? 'white' : 'var(--gris-oscuro)',
              cursor: 'pointer',
              fontSize: '0.9rem', fontWeight: 600,
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
            }}
          >
            {esVetado ? '✓ Excluido — toca para quitar' : '✕ Excluir este candidato'}
          </button>

          {/* Flechas y dots */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
            <button
              onClick={() => ir(-1)}
              disabled={indice === 0}
              style={{
                width: 40, height: 40,
                border: '1.5px solid var(--gris-claro)', borderRadius: '50%',
                background: 'var(--blanco)',
                cursor: indice === 0 ? 'not-allowed' : 'pointer',
                opacity: indice === 0 ? 0.3 : 1,
                fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', fontFamily: 'var(--font-body)',
              }}
            >←</button>

            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {CANDIDATOS_ORDENADOS.map((c, i) => {
                const distancia = Math.abs(i - indice);
                if (distancia > 3) return null;
                const esActualD = i === indice;
                const esVetadoD = estado.vetados.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => setIndice(i)}
                    style={{
                      width: esActualD ? 20 : 6, height: 6, borderRadius: 3,
                      background: esVetadoD ? 'var(--rojo)' : esActualD ? 'var(--negro)' : 'var(--gris-claro)',
                      transition: 'all 0.3s ease', cursor: 'pointer',
                    }}
                  />
                );
              })}
            </div>

            <button
              onClick={() => ir(1)}
              disabled={indice === total - 1}
              style={{
                width: 40, height: 40,
                border: '1.5px solid var(--gris-claro)', borderRadius: '50%',
                background: 'var(--blanco)',
                cursor: indice === total - 1 ? 'not-allowed' : 'pointer',
                opacity: indice === total - 1 ? 0.3 : 1,
                fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', fontFamily: 'var(--font-body)',
              }}
            >→</button>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--gris-medio)', marginTop: 4 }}>
            Desliza o usa las flechas · Los puntos rojos son excluidos
          </p>
        </div>

        {/* Lista de excluidos */}
        {estado.vetados.length > 0 && (
          <div style={{
            marginTop: 32, padding: '16px 20px',
            background: 'var(--rojo-fondo)', borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(208,2,27,0.15)', animation: 'fadeIn 0.3s ease',
          }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--rojo)', fontWeight: 600, marginBottom: 8 }}>
              {estado.vetados.length} excluido{estado.vetados.length > 1 ? 's' : ''}:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {estado.vetados.map(id => {
                const c = CANDIDATOS_ORDENADOS.find(x => x.id === id);
                if (!c) return null;
                return (
                  <button
                    key={id}
                    onClick={() => toggleVetado(id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px',
                      background: 'var(--rojo)', color: 'white',
                      border: 'none', borderRadius: 20,
                      fontSize: '0.72rem', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'var(--font-body)',
                    }}
                  >
                    {c.nombre.split(' ')[0]} ✕
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--rojo)', marginTop: 8, opacity: 0.7 }}>
              Toca un nombre para quitarlo de excluidos
            </p>
          </div>
        )}

        {/* Botones finales */}
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <button className="btn btn--primary" onClick={() => irAPaso(4)}>
            Continuar →{estado.vetados.length > 0 ? ` (${estado.vetados.length} excluido${estado.vetados.length > 1 ? 's' : ''})` : ''}
          </button>
          <button className="btn btn--ghost" onClick={() => irAPaso(4)}>
            Saltar este paso
          </button>
        </div>
      </div>
    </div>
  );
}
