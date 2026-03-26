// src/components/PasoPerfil.tsx
'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import ProgressHeader from './ProgressHeader';
import { PerfilCandidato } from '@/types';

const PERFILES: { valor: PerfilCandidato; emoji: string; desc: string }[] = [
  {
    valor: 'Outsider',
    emoji: '🌟',
    desc: 'Sin carrera política previa, propone ruptura con el sistema tradicional',
  },
  {
    valor: 'Político con experiencia',
    emoji: '🏛️',
    desc: 'Con trayectoria en cargos públicos, conoce el Estado por dentro',
  },
  {
    valor: 'Tecnócrata',
    emoji: '📊',
    desc: 'Perfil técnico-académico, propone gestión basada en datos y evidencia',
  },
  {
    valor: 'Empresario',
    emoji: '💼',
    desc: 'Proveniente del sector privado, enfoque en gestión y emprendimiento',
  },
  {
    valor: 'Activista social',
    emoji: '✊',
    desc: 'Con historia en movimientos sociales, derechos humanos o comunidades',
  },
];

export default function PasoPerfil() {
  const { irAPaso, setPerfilBuscado } = useApp();
  const [seleccionado, setSeleccionado] = useState<PerfilCandidato | null>(null);

  const continuar = (perfil: PerfilCandidato | null) => {
    setPerfilBuscado(perfil);
    irAPaso(3);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      <ProgressHeader
        paso={2}
        totalPasos={4}
        titulo="¿Qué perfil buscas?"
        subtitulo="Selecciona el tipo de candidato que preferirías. Puedes saltarte este paso."
        onAtras={() => irAPaso(1)}
      />

      <div className="container" style={{ paddingTop: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PERFILES.map(({ valor, emoji, desc }, i) => (
            <button
              key={valor}
              onClick={() => setSeleccionado(prev => prev === valor ? null : valor)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '18px 20px',
                border: seleccionado === valor
                  ? '2px solid var(--negro)'
                  : '1.5px solid var(--gris-claro)',
                borderRadius: 'var(--radius-lg)',
                background: seleccionado === valor ? 'var(--gris-fondo)' : 'var(--blanco)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
              }}
            >
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, marginBottom: 3, color: 'var(--negro)' }}>
                  {valor}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--gris-medio)' }}>
                  {desc}
                </p>
              </div>
              {seleccionado === valor && (
                <div style={{
                  width: 22, height: 22,
                  background: 'var(--negro)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <button
            className="btn btn--primary"
            onClick={() => continuar(seleccionado)}
            disabled={false}
          >
            {seleccionado ? `Continuar con "${seleccionado}"` : 'Continuar sin preferencia →'}
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => continuar(null)}
          >
            Saltar este paso
          </button>
        </div>
      </div>
    </div>
  );
}
