// src/components/PreguntaFinal.tsx
// Pregunta final post-resultados: ¿Estás de acuerdo? + Compartir
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LlamaMascot from './LlamaMascot';
import { SITE } from '@/lib/content';

interface Props {
  onReiniciar: () => void;
}

type Respuesta = 'si' | 'no' | 'parcial' | null;

export default function PreguntaFinal({ onReiniciar }: Props) {
  const [respuesta, setRespuesta] = useState<Respuesta>(null);
  const [copiado, setCopiado] = useState(false);
  const [compartido, setCompartido] = useState(false);
  const router = useRouter();

  // URL de la landing (sin /test) para compartir
  const urlCompartir = typeof window !== 'undefined'
    ? window.location.origin
    : `https://${SITE.dominio}`;

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(urlCompartir);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = urlCompartir;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  };

  const compartirNativo = async () => {
    const texto = `Hice el test de compatibilidad política en ${SITE.nombre}. ¿Con quién coincides tú?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: SITE.nombre, text: texto, url: urlCompartir });
        setCompartido(true);
      } catch { /* cancelado */ }
    } else {
      copiarEnlace();
    }
  };

  // Volver al inicio (landing) y resetear el estado del test
  const volverAlInicio = () => {
    onReiniciar();
    router.push('/');
  };

  const OPCIONES: { valor: Respuesta; emoji: string; label: string; desc: string }[] = [
    { valor: 'si',      emoji: '✓', label: 'Sí, coincide',  desc: 'Los resultados me representan bien' },
    { valor: 'parcial', emoji: '~', label: 'Más o menos',   desc: 'Hay algunos puntos que no esperaba' },
    { valor: 'no',      emoji: '✕', label: 'No mucho',      desc: 'Los resultados no me convencen' },
  ];

  return (
    <div style={{
      margin: '0 -24px',
      padding: '56px 24px 48px',
      borderTop: '1px solid var(--gris-claro)',
      background: 'var(--gris-fondo)',
      animation: 'fadeUp 0.5s ease both',
    }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>

        {/* Llama reactiva */}
        <LlamaMascot
          pose={respuesta === 'si' ? 'celebra' : respuesta === 'no' ? 'normal' : 'señala'}
          size={88}
          style={{ margin: '0 auto 20px' }}
        />

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
          marginBottom: 8, color: 'var(--negro)',
        }}>
          ¿Estás de acuerdo con los resultados?
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--gris-medio)', marginBottom: 32 }}>
          Tu opinión nos ayuda a mejorar la herramienta.
        </p>

        {/* Opciones */}
        {!respuesta ? (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {OPCIONES.map(({ valor, emoji, label, desc }) => (
              <button
                key={valor}
                onClick={() => setRespuesta(valor)}
                style={{
                  flex: '1 1 130px', maxWidth: 160,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '18px 12px',
                  border: '1.5px solid var(--gris-claro)',
                  borderRadius: 12, background: 'var(--blanco)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--negro)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--gris-claro)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--gris-fondo)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 700, color: 'var(--negro)',
                }}>
                  {emoji}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--negro)' }}>{label}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--gris-medio)', textAlign: 'center', lineHeight: 1.4 }}>{desc}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Post-respuesta: compartir */
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--blanco)', border: '1.5px solid var(--gris-claro)',
              borderRadius: 10, padding: '12px 20px', marginBottom: 32,
            }}>
              <span style={{ fontSize: '1rem' }}>
                {respuesta === 'si' ? '🎉' : respuesta === 'parcial' ? '🤔' : '📝'}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--gris-oscuro)' }}>
                {respuesta === 'si'      && '¡Genial! Gracias por tu feedback.'}
                {respuesta === 'parcial' && 'Entendido. Seguimos mejorando la herramienta.'}
                {respuesta === 'no'      && 'Gracias por ser honesto. Tu opinión nos ayuda a mejorar.'}
              </span>
              <button
                onClick={() => setRespuesta(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gris-medio)', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}
              >
                cambiar
              </button>
            </div>

            {/* Compartir */}
            <div style={{
              background: 'var(--blanco)',
              border: '1.5px solid var(--gris-claro)',
              borderRadius: 14, padding: '28px 24px',
              marginBottom: 24,
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem', marginBottom: 8, color: 'var(--negro)',
              }}>
                Comparte con tus amigos
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--gris-medio)', marginBottom: 24 }}>
                Que ellos también descubran su compatibilidad política
              </p>

              {/* URL copiable */}
              <div style={{
                display: 'flex', gap: 8, alignItems: 'center',
                background: 'var(--gris-fondo)',
                border: '1px solid var(--gris-claro)',
                borderRadius: 8, padding: '10px 14px',
                marginBottom: 16,
              }}>
                <span style={{
                  flex: 1, fontSize: '0.82rem', color: 'var(--gris-medio)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {urlCompartir}
                </span>
                <button
                  onClick={copiarEnlace}
                  className="btn btn--outline"
                  style={{ padding: '6px 14px', fontSize: '0.78rem', flexShrink: 0 }}
                >
                  {copiado ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={compartirNativo} className="btn btn--primary" style={{ gap: 8, fontSize: '0.88rem' }}>
                  ↗ Compartir enlace
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`¿Con quién coincides en las elecciones 2026? Haz el test en ${urlCompartir}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ fontSize: '0.88rem', textDecoration: 'none' }}
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`¿Con quién coincides en las Elecciones Perú 2026? Descúbrelo en ${urlCompartir} #VotaBien #Peru2026`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ fontSize: '0.88rem', textDecoration: 'none' }}
                >
                  X / Twitter
                </a>
              </div>

              {compartido && (
                <p style={{ fontSize: '0.8rem', color: 'var(--rojo)', marginTop: 12, animation: 'fadeIn 0.3s ease' }}>
                  ¡Gracias por compartir! 🙌
                </p>
              )}
            </div>

            {/* QR Yape */}
<div style={{
  background: 'var(--blanco)',
  border: '1.5px solid var(--gris-claro)',
  borderRadius: 14, padding: '28px 24px',
  marginBottom: 24, textAlign: 'center',
}}>
  <p style={{
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem', marginBottom: 8, color: 'var(--negro)',
  }}>
    ¿Quieres colaborar?
  </p>
  <p style={{ fontSize: '0.82rem', color: 'var(--gris-medio)', marginBottom: 20 }}>
    Este proyecto es independiente y sin fines de lucro. Si te parece útil, puedes apoyar su mantenimiento a nombre de Angelo Palomino.
  </p>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src="https://i.imgur.com/VSYg159.jpeg"
    alt="QR Yape"
    style={{ width: 160, height: 160, borderRadius: 12, margin: '0 auto', display: 'block' }}
  />
  <p style={{ fontSize: '0.78rem', color: 'var(--gris-medio)', marginTop: 12 }}>
    📱 Escanea para colaborar vía Yape
  </p>
</div>

{/* Volver al inicio */}
<button className="btn btn--ghost" onClick={volverAlInicio} style={{ fontSize: '0.88rem' }}>
  ← Volver al inicio
</button>
          </div>
        )}
      </div>
    </div>
  );
}
