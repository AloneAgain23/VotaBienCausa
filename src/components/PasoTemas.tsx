// src/components/PasoTemas.tsx
'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import ProgressHeader from './ProgressHeader';
import { PesosTemas } from '@/types';

type Tema = 'Inseguridad' | 'Economía' | 'Corrupción';

const TEMA_ICONS: Record<Tema, string> = {
  Inseguridad: '🔒',
  Economía: '💰',
  Corrupción: '⚖️',
};

const TEMA_DESC: Record<Tema, string> = {
  Inseguridad: 'Seguridad ciudadana, crimen organizado, policía',
  Economía: 'Empleo, inflación, gasto público, inversión',
  Corrupción: 'Transparencia, justicia, instituciones',
};

const TEMA_COLOR: Record<Tema, string> = {
  Inseguridad: '#C0390B',
  Economía: '#0B6E35',
  Corrupción: '#1A4AB8',
};

export default function PasoTemas() {
  const { irAPaso, setPesosTemas } = useApp();
  const [orden, setOrden] = useState<Tema[]>(['Inseguridad', 'Economía', 'Corrupción']);
  const [igualPeso, setIgualPeso] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const mover = (idx: number, dir: -1 | 1) => {
    const nuevo = [...orden];
    const target = idx + dir;
    if (target < 0 || target >= nuevo.length) return;
    [nuevo[idx], nuevo[target]] = [nuevo[target], nuevo[idx]];
    setOrden(nuevo);
  };

  const handleDragStart = (idx: number) => setDragging(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOver(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragging === null || dragging === idx) return;
    const nuevo = [...orden];
    const item = nuevo.splice(dragging, 1)[0];
    nuevo.splice(idx, 0, item);
    setOrden(nuevo);
    setDragging(null);
    setDragOver(null);
  };

  const continuar = () => {
    let pesos: PesosTemas;
    if (igualPeso) {
      pesos = { Inseguridad: 1, Economía: 1, Corrupción: 1 };
    } else {
      const total = orden.length;
      pesos = {
        Inseguridad: total - orden.indexOf('Inseguridad'),
        Economía: total - orden.indexOf('Economía'),
        Corrupción: total - orden.indexOf('Corrupción'),
      };
    }
    setPesosTemas(pesos);
    irAPaso(2);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blanco)', paddingBottom: 80 }}>
      <ProgressHeader
        paso={1}
        totalPasos={4}
        titulo="¿Qué te importa más?"
        subtitulo="Ordena los temas de mayor a menor importancia para ti."
        onAtras={() => window.history.back()}
      />

      <div className="container" style={{ paddingTop: 32 }}>

        {/* Toggle igual peso */}
        <div style={{ marginBottom: 32 }}>
          <button
            className={`card ${igualPeso ? 'card--active' : ''}`}
            onClick={() => setIgualPeso(v => !v)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              border: igualPeso ? '2px solid var(--negro)' : '1.5px solid var(--gris-claro)',
              background: igualPeso ? 'var(--gris-fondo)' : 'var(--blanco)',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              padding: '20px 24px',
            }}
          >
            <div style={{
              width: 22, height: 22,
              borderRadius: 4,
              border: `2px solid ${igualPeso ? 'var(--negro)' : 'var(--gris-claro)'}`,
              background: igualPeso ? 'var(--negro)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.2s ease',
            }}>
              {igualPeso && <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>✓</span>}
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 2 }}>
                Todos los temas me importan por igual
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--gris-medio)' }}>
                Se asignará el mismo peso a los tres temas
              </p>
            </div>
          </button>
        </div>

        {/* Separador */}
        {!igualPeso && (
          <div className="separador" style={{ marginBottom: 24 }}>
            o arrastra para ordenar
          </div>
        )}

        {/* Lista ordenable */}
        {!igualPeso && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orden.map((tema, idx) => (
              <div
                key={tema}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={() => { setDragging(null); setDragOver(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 20px',
                  border: dragOver === idx
                    ? '2px dashed var(--negro)'
                    : '1.5px solid var(--gris-claro)',
                  borderRadius: 'var(--radius-lg)',
                  background: dragging === idx ? 'var(--gris-fondo)' : 'var(--blanco)',
                  cursor: 'grab',
                  transition: 'all 0.15s ease',
                  opacity: dragging === idx ? 0.5 : 1,
                  animation: 'fadeUp 0.3s ease',
                  animationDelay: `${idx * 0.05}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Número de posición */}
                <div style={{
                  width: 32, height: 32,
                  background: idx === 0 ? 'var(--negro)' : idx === 1 ? 'var(--gris-claro)' : 'var(--gris-fondo)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem',
                  color: idx === 0 ? 'var(--blanco)' : 'var(--negro)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  {idx + 1}
                </div>

                <span style={{ fontSize: '1.4rem' }}>{TEMA_ICONS[tema]}</span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 600,
                    color: TEMA_COLOR[tema],
                    marginBottom: 2,
                    fontSize: '0.95rem',
                  }}>
                    {tema}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gris-medio)' }}>
                    {TEMA_DESC[tema]}
                  </p>
                </div>

                {/* Botones subir/bajar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={() => mover(idx, -1)}
                    disabled={idx === 0}
                    style={{
                      width: 28, height: 28,
                      border: '1px solid var(--gris-claro)',
                      borderRadius: 4,
                      background: 'var(--blanco)',
                      cursor: idx === 0 ? 'not-allowed' : 'pointer',
                      opacity: idx === 0 ? 0.3 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', transition: 'all 0.15s',
                    }}
                    aria-label={`Subir ${tema}`}
                  >↑</button>
                  <button
                    onClick={() => mover(idx, 1)}
                    disabled={idx === orden.length - 1}
                    style={{
                      width: 28, height: 28,
                      border: '1px solid var(--gris-claro)',
                      borderRadius: 4,
                      background: 'var(--blanco)',
                      cursor: idx === orden.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: idx === orden.length - 1 ? 0.3 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', transition: 'all 0.15s',
                    }}
                    aria-label={`Bajar ${tema}`}
                  >↓</button>
                </div>

                {/* Indicador drag */}
                <span style={{ color: 'var(--gris-claro)', fontSize: '1rem', cursor: 'grab' }}>
                  ⠿
                </span>
              </div>
            ))}

            {/* Leyenda de pesos */}
            <p style={{
              textAlign: 'center',
              fontSize: '0.78rem',
              color: 'var(--gris-medio)',
              marginTop: 8,
            }}>
              El tema en posición 1 tendrá <strong>3×</strong> más peso que el de posición 3
            </p>
          </div>
        )}

        {/* Botón continuar */}
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <button className="btn btn--primary" onClick={continuar}>
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}
