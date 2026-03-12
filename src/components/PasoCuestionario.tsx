// src/components/PasoCuestionario.tsx
'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { PREGUNTAS } from '@/lib/preguntas';
import { RespuestaAPI } from '@/types';

const OPCIONES = [
  { valor: 1, label: 'Totalmente\nen contra', emoji: '🤬' },
  { valor: 2, label: 'En contra',            emoji: '😠' },
  { valor: 3, label: 'Neutro',               emoji: '😐' },
  { valor: 4, label: 'A favor',              emoji: '😊' },
  { valor: 5, label: 'Totalmente\na favor',  emoji: '🤩' },
];

const TEMA_BADGE_STYLE: Record<string, React.CSSProperties> = {
  Inseguridad: { background: '#FFF0ED', color: '#C0390B' },
  Economía:    { background: '#EDF7F0', color: '#0B6E35' },
  Corrupción:  { background: '#EDF3FF', color: '#1A4AB8' },
  Social:      { background: '#EDF3FF', color: '#6a6cca' },
};

export default function PasoCuestionario() {
  const { estado, irAPaso, setRespuesta, setResultados } = useApp();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pregunta = PREGUNTAS[preguntaActual];
  const totalPreguntas = PREGUNTAS.length;
  const porcentaje = (preguntaActual / totalPreguntas) * 100;
  const respuestaActual = estado.respuestas[preguntaActual];

  const irASiguiente = async (saltar = false) => {
    if (saltar) setRespuesta(preguntaActual, 0);

    const siguiente = preguntaActual + 1;

    if (siguiente >= totalPreguntas) {
      // Fin del cuestionario — llamar a la API
      await calcular();
    } else {
      setPreguntaActual(siguiente);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const seleccionarRespuesta = (valor: number) => {
    setRespuesta(preguntaActual, valor);
  };

  const calcular = async () => {
    setCargando(true);
    setError(null);
    try {
      const body = {
        pesos_temas: estado.pesos_temas ?? { Inseguridad: 1, Economía: 1, Corrupción: 1, Social:1, },
        perfil_buscado: estado.perfil_buscado,
        vetados: estado.vetados,
        respuestas: estado.respuestas,
      };

      const res = await fetch('/api/calcular-afinidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Error al calcular.');
      }

      const resultado: RespuestaAPI = await res.json();
      setResultados(resultado);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido.');
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 24, padding: 32,
      }}>
        <div style={{
          width: 48, height: 48,
          border: '3px solid var(--gris-claro)',
          borderTopColor: 'var(--negro)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'var(--gris-oscuro)', fontWeight: 500 }}>
          Calculando tu compatibilidad...
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      {/* Barra de progreso fija */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: 3, width: `${porcentaje}%`,
        background: 'var(--rojo)',
        transition: 'width 0.4s ease',
        zIndex: 100,
      }} />

      {/* Header */}
      <header style={{
        padding: '20px 0',
        borderBottom: '1px solid var(--gris-claro)',
        position: 'sticky', top: 0, background: 'var(--blanco)', zIndex: 50,
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn--ghost" style={{ padding: '4px 0', fontSize: '0.88rem' }}
              onClick={() => preguntaActual === 0 ? irAPaso(3) : setPreguntaActual(p => p - 1)}
            >
              ← Atrás
            </button>
            <span style={{
              fontSize: '0.82rem', color: 'var(--gris-medio)', fontWeight: 500,
            }}>
              {preguntaActual + 1} / {totalPreguntas}
            </span>
          </div>
        </div>
      </header>

      {/* Pregunta */}
      <div className="container">
        <div
          key={preguntaActual}
          style={{ paddingTop: 48, paddingBottom: 48, animation: 'fadeUp 0.35s ease' }}
        >
          {/* Badge de tema */}
          <div style={{ marginBottom: 24 }}>
            <span style={{
              ...(TEMA_BADGE_STYLE[pregunta.macro_tema] ?? {}),
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '4px 10px',
              borderRadius: 2,
              display: 'inline-block',
            }}>
              {pregunta.macro_tema}
            </span>
          </div>

          {/* Texto de la pregunta */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4.5vw, 2.1rem)',
            lineHeight: 1.2,
            marginBottom: 48,
            color: 'var(--negro)',
          }}>
            {pregunta.texto}
          </h2>

          {/* Escala de respuesta */}
          <div className="escala" style={{ gap: 8 }}>
            {OPCIONES.map(({ valor, label, emoji }) => (
              <button
                key={valor}
                className={`escala__item ${respuestaActual === valor ? 'escala__item--activo' : ''}`}
                onClick={() => {
                  seleccionarRespuesta(valor);
                  // Auto-avanzar tras 400ms
                  setTimeout(() => {
                    const sig = preguntaActual + 1;
                    if (sig >= totalPreguntas) calcular();
                    else { setPreguntaActual(sig); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                  }, 350);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
              >
                <div className="escala__circulo">{emoji}</div>
                <span className="escala__label" style={{ whiteSpace: 'pre-line' }}>{label}</span>
              </button>
            ))}
          </div>

          {/* Botones de navegación */}
          <div style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            {respuestaActual !== 0 && (
              <button
                className="btn btn--primary"
                onClick={() => irASiguiente(false)}
              >
                {preguntaActual < totalPreguntas - 1 ? 'Siguiente →' : 'Ver resultados →'}
              </button>
            )}
            <button
              className="btn btn--ghost"
              onClick={() => irASiguiente(true)}
            >
              Saltar / No me importa
            </button>
          </div>

          {error && (
            <div style={{
              marginTop: 24,
              padding: 16,
              background: 'var(--rojo-fondo)',
              border: '1px solid rgba(208,2,27,0.2)',
              borderRadius: 8,
              color: 'var(--rojo)',
              fontSize: '0.88rem',
              textAlign: 'center',
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      {/* Indicador de preguntas */}
      <div className="container" style={{ paddingBottom: 24 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PREGUNTAS.map((p, i) => (
            <div
              key={i}
              title={`Pregunta ${i + 1}: ${p.macro_tema}`}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < preguntaActual
                  ? (estado.respuestas[i] === 0 ? 'var(--gris-claro)' : 'var(--negro)')
                  : i === preguntaActual
                  ? 'var(--rojo)'
                  : 'var(--gris-claro)',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--gris-medio)',
          marginTop: 8,
        }}>
          ● Respondida &nbsp;○ Pendiente &nbsp;🔴 Actual
        </p>
      </div>
    </div>
  );
}
