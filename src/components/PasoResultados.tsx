// src/components/PasoResultados.tsx
'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { ResultadoCandidato } from '@/types';
import PreguntaFinal from './PreguntaFinal';

function AfinidadCircle({ afinidad }: { afinidad: number }) {
  const radio = 42;
  const circumference = 2 * Math.PI * radio;
  const offset = circumference - (afinidad / 100) * circumference;
  const color = afinidad >= 70 ? '#0B6E35' : afinidad >= 40 ? 'var(--negro)' : 'var(--gris-medio)';

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="50" cy="50" r={radio} fill="none" stroke="var(--gris-claro)" strokeWidth="6" />
      <circle
        cx="50" cy="50" r={radio} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
        style={{
          transform: 'rotate(90deg)', transformOrigin: '50px 50px',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.2rem', fill: 'var(--negro)',
        }}>
        {afinidad}%
      </text>
    </svg>
  );
}

function TarjetaCandidato({ resultado, posicion, delay }: {
  resultado: ResultadoCandidato; posicion: number; delay: number;
}) {
  const [imgError, setImgError] = useState(false);
  const { candidato, afinidad } = resultado;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '24px 20px',
      border: posicion === 1 ? '2px solid var(--negro)' : '1.5px solid var(--gris-claro)',
      borderRadius: 'var(--radius-lg)',
      background: posicion === 1 ? 'var(--gris-fondo)' : 'var(--blanco)',
      position: 'relative',
      animation: `fadeUp 0.5s ease ${delay}s both`,
      boxShadow: posicion === 1 ? 'var(--shadow-md)' : 'none',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        overflow: 'hidden', border: '2px solid var(--gris-claro)', flexShrink: 0,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgError
            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(candidato.nombre)}&background=e8e8e8&color=555&size=64`
            : candidato.foto_url}
          alt={candidato.nombre} width={64} height={64}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: '1.05rem',
          color: 'var(--negro)', marginBottom: 3, lineHeight: 1.2,
        }}>
          {candidato.nombre}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--gris-medio)', marginBottom: 4 }}>
          {candidato.partido}
        </p>
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.06em', background: 'var(--gris-claro)',
          padding: '2px 8px', borderRadius: 2, color: 'var(--gris-oscuro)',
        }}>
          {candidato.perfil}
        </span>
      </div>

      <div style={{ flexShrink: 0 }}>
        <AfinidadCircle afinidad={afinidad} />
      </div>
    </div>
  );
}

export default function PasoResultados() {
  const { estado, reiniciar } = useApp();
  const { resultados } = estado;

  if (!resultados) return null;

  const { top3, confianza, nivelConfianza } = resultados;
  const colorConfianza = nivelConfianza === 'Alta' ? '#0B6E35' : nivelConfianza === 'Media' ? '#7A5400' : 'var(--gris-medio)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      {/* Header simple */}
      <header style={{ padding: '24px 0', borderBottom: '1px solid var(--gris-claro)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, background: 'var(--rojo)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              VAA Perú 2026
            </span>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 48 }}>
        {/* Título */}
        <div style={{ marginBottom: 40, animation: 'fadeUp 0.4s ease' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 12,
          }}>
            Tus resultados
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: 12,
          }}>
            Tu compatibilidad<br />
            <em style={{ fontStyle: 'italic', color: 'var(--rojo)' }}>política</em>
          </h1>
          <p style={{ color: 'var(--gris-medio)', fontSize: '0.9rem', maxWidth: 460 }}>
            Basada en tus respuestas, estos son los candidatos con mayor coincidencia en tus posiciones.
          </p>
        </div>

        {/* Indicador de confianza */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', border: '1px solid var(--gris-claro)',
          borderRadius: 6, marginBottom: 32, background: 'var(--gris-fondo)',
          animation: 'fadeIn 0.5s ease 0.2s both',
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gris-medio)' }}>
            Confianza del cálculo:
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: colorConfianza }}>
            {nivelConfianza} ({confianza}%)
          </span>
        </div>

        {/* Top 3 */}
        {top3.length === 0 ? (
          <div style={{
            padding: 32, textAlign: 'center',
            background: 'var(--rojo-fondo)', borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(208,2,27,0.15)',
          }}>
            <p style={{ color: 'var(--rojo)', fontWeight: 500 }}>
              No hay candidatos para mostrar. Intenta reducir el número de vetados.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {top3.map((resultado, i) => (
              <TarjetaCandidato
                key={resultado.candidato.id}
                resultado={resultado}
                posicion={i + 1}
                delay={i * 0.12}
              />
            ))}
          </div>
        )}

        {/* Disclaimer legal */}
        <div style={{
          marginTop: 40, padding: '20px 24px',
          background: 'var(--gris-fondo)', borderRadius: 'var(--radius-lg)',
          borderLeft: '3px solid var(--rojo)',
          animation: 'fadeIn 0.5s ease 0.5s both',
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--gris-oscuro)', lineHeight: 1.6 }}>
            ⚖️ <strong>Aviso importante:</strong> Esto no es una recomendación de voto,
            es solo compatibilidad declarada basada en tus respuestas.
            El voto es una decisión personal que involucra muchos más factores.
            Infórmate de múltiples fuentes antes de decidir.
          </p>
        </div>

        {/* Nota confianza baja */}
        {nivelConfianza === 'Baja' && (
          <div style={{
            marginTop: 16, padding: '16px 20px',
            background: '#FFFBEC', borderRadius: 'var(--radius-lg)',
            border: '1px solid #F0D060',
          }}>
            <p style={{ fontSize: '0.82rem', color: '#7A5400', lineHeight: 1.6 }}>
              💡 <strong>Confianza baja:</strong> Respondiste pocas preguntas.
              Para mayor precisión, responde más preguntas.
            </p>
          </div>
        )}

        {/* ── PREGUNTA FINAL: ¿Estás de acuerdo? + Compartir ── */}
        <div style={{ marginTop: 40 }}>
          <PreguntaFinal onReiniciar={reiniciar} />
        </div>
      </div>
    </div>
  );
}
