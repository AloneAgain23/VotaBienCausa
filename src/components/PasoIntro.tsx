// src/components/PasoIntro.tsx
'use client';
import React from 'react';
import { useApp } from '@/lib/AppContext';

export default function PasoIntro() {
  const { irAPaso } = useApp();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        padding: '24px 0',
        borderBottom: '1px solid var(--gris-claro)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: 8, height: 8,
              background: 'var(--rojo)',
              borderRadius: '50%',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--negro)',
            }}>
              Vota Bien Causa
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '80px 0 60px',
      }}>
        <div className="container">
          <div style={{ maxWidth: 560, animation: 'fadeUp 0.6s ease forwards' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--rojo)',
              marginBottom: 24,
            }}>
              Elecciones Generales 2026
            </p>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
              lineHeight: 1.1,
              marginBottom: 28,
              color: 'var(--negro)',
            }}>
              ¿Con quién<br />
              <em style={{ color: 'var(--rojo)', fontStyle: 'italic' }}>coincides?</em>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--gris-oscuro)',
              lineHeight: 1.7,
              marginBottom: 16,
              maxWidth: 480,
            }}>
              Responde 15 preguntas sobre los temas que más te importan.
              Calcularemos tu compatibilidad con los candidatos presidenciales
              de manera objetiva y transparente.
            </p>

            <p style={{
              fontSize: '0.88rem',
              color: 'var(--gris-medio)',
              marginBottom: 48,
            }}>
              Tiempo estimado: <strong style={{ color: 'var(--negro)' }}>5 minutos</strong>
            </p>

            <button
              className="btn btn--primary"
              onClick={() => irAPaso(1)}
              style={{ fontSize: '1.05rem', padding: '16px 40px' }}
            >
              Comenzar →
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer style={{
        borderTop: '1px solid var(--gris-claro)',
        padding: '24px 0',
        background: 'var(--gris-fondo)',
      }}>
        <div className="container">
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--gris-medio)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}>
            🔒 Esta herramienta <strong>no recomienda por quién votar</strong>.
            Solo muestra compatibilidad matemática basada en tus respuestas.
            No se recopilan datos personales.
          </p>
        </div>
      </footer>
    </main>
  );
}
