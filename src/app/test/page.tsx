// src/app/test/page.tsx — Página del test en ruta /test
'use client';
import React from 'react';
import Link from 'next/link';
import { AppProvider, useApp } from '@/lib/AppContext';
import PasoTemas from '@/components/PasoTemas';
import PasoPerfil from '@/components/PasoPerfil';
import PasoAntivoto from '@/components/PasoAntivoto';
import PasoCuestionario from '@/components/PasoCuestionario';
import PasoResultados from '@/components/PasoResultados';

function TestContent() {
  const { estado, irAPaso } = useApp();

  // paso 0 = pantalla de bienvenida al test
  if (estado.paso === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--blanco)',
      }}>
        {/* Header mínimo */}
        <header style={{
          padding: '20px 32px',
          borderBottom: '1px solid var(--gris-claro)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 7, height: 7, background: 'var(--rojo)',
              borderRadius: '50%', display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem', color: 'var(--negro)',
              letterSpacing: '-0.02em',
            }}>
              VotaBienCausa.com
            </span>
          </Link>
          <Link href="/" style={{
            fontSize: '0.85rem', color: 'var(--gris-medio)',
            textDecoration: 'none', fontWeight: 500,
          }}>
            ← Volver al inicio
          </Link>
        </header>

        {/* Bienvenida */}
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '60px 24px',
        }}>
          <div style={{
            maxWidth: 520,
            textAlign: 'center',
            animation: 'fadeUp 0.5s ease',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--rojo-fondo)',
              border: '1px solid rgba(208,2,27,0.15)',
              borderRadius: 20, padding: '5px 14px', marginBottom: 28,
            }}>
              <span style={{
                width: 6, height: 6, background: 'var(--rojo)',
                borderRadius: '50%', display: 'inline-block',
              }} />
              <span style={{
                fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--rojo)',
              }}>
                Test de compatibilidad
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 3.2rem)',
              lineHeight: 1.1, marginBottom: 20, color: 'var(--negro)',
            }}>
              Descubre tu<br />
              <em style={{ color: 'var(--rojo)', fontStyle: 'italic' }}>
                compatibilidad
              </em>
            </h1>

            <p style={{
              color: 'var(--gris-oscuro)', fontSize: '1rem',
              lineHeight: 1.75, marginBottom: 12,
            }}>
              Responde 16 preguntas sobre los temas que más le importan a los peruanos.
              El cálculo es matemático, transparente y sin sesgos.
            </p>

            <p style={{
              color: 'var(--gris-medio)', fontSize: '0.85rem',
              marginBottom: 44,
            }}>
              ⏱ 3 minutos &nbsp;·&nbsp; 🔒 Anónimo &nbsp;·&nbsp; 📊 Sin IA en tiempo real
            </p>

            <button
              className="btn btn--primary"
              onClick={() => irAPaso(1)}
              style={{ fontSize: '1.05rem', padding: '16px 44px' }}
            >
              Comenzar →
            </button>

            <p style={{
              marginTop: 20, fontSize: '0.78rem',
              color: 'var(--gris-medio)', lineHeight: 1.6,
            }}>
              Esto no es una recomendación de voto, es solo compatibilidad declarada.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Pasos 1–5
  return (
    <>
      {estado.paso === 1 && <PasoTemas />}
      {estado.paso === 2 && <PasoPerfil />}
      {estado.paso === 3 && <PasoAntivoto />}
      {estado.paso === 4 && <PasoCuestionario />}
      {estado.paso === 5 && <PasoResultados />}
    </>
  );
}

export default function TestPage() {
  return (
    <AppProvider>
      <TestContent />
    </AppProvider>
  );
}
