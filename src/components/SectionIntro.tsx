// src/components/SectionIntro.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LlamaMascot from './LlamaMascot';
import {
  SITE, HERO, INICIATIVA, MISION, METODOLOGIA, QR_COLABORA,
  EQUIPO_NUCLEO, COLABORADORES,
} from '@/lib/content';

// ── Hook viewport ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Bloque con animación al entrar ──────────────────────────────────
function StoryBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Tarjeta de persona ──────────────────────────────────────────────
// Para agregar fotos: edita foto_url en src/lib/content.ts
// Acepta URLs de GitHub, LinkedIn, Google Drive público, o /public/team/nombre.jpg
// Para LinkedIn: el link se muestra como botón debajo del nombre
function PersonCard({ nombre, rol, bio, foto_url, linkedin }: {
  nombre: string;
  rol: string;
  bio: string;
  foto_url: string;
  linkedin?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const initials = nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const mostrarFoto = foto_url && !imgError;

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 12, padding: '24px 20px',
        border: '1.5px solid var(--gris-claro)',
        borderRadius: 16, background: 'var(--blanco)',
        textAlign: 'center', transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--negro)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gris-claro)';
      }}
    >
      {/* Avatar — usa foto si existe, sino iniciales */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid var(--gris-claro)',
        background: 'var(--gris-fondo)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {mostrarFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto_url}
            alt={nombre}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem', color: 'var(--gris-medio)',
          }}>
            {initials}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ width: '100%' }}>
        <p style={{
          fontWeight: 600, fontSize: '0.92rem',
          marginBottom: 2, color: 'var(--negro)',
        }}>
          {nombre}
        </p>
        <p style={{
          fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--rojo)', marginBottom: 8,
        }}>
          {rol}
        </p>
        <p style={{
          fontSize: '0.8rem', color: 'var(--gris-medio)', lineHeight: 1.55,
          marginBottom: linkedin ? 12 : 0,
        }}>
          {bio}
        </p>

        {/* LinkedIn — solo aparece si hay URL en content.ts */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.75rem', fontWeight: 600,
              color: '#0A66C2',
              textDecoration: 'none',
              padding: '4px 10px',
              border: '1px solid #0A66C2',
              borderRadius: 4,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#0A66C2';
              (e.currentTarget as HTMLAnchorElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#0A66C2';
            }}
          >
            {/* Ícono LinkedIn SVG */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ── QR Placeholder ──────────────────────────────────────────────────
function QRPlaceholder() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="8" fill="#F7F7F7" />
      <rect x="10" y="10" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="18" y="18" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="70" y="10" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="78" y="18" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="10" y="70" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="18" y="78" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="58" y="58" width="8" height="8" rx="1" fill="#D0021B" />
      <rect x="70" y="70" width="6" height="6" rx="1" fill="#3A3A3A" />
      <rect x="80" y="60" width="6" height="6" rx="1" fill="#3A3A3A" />
      <rect x="70" y="80" width="6" height="6" rx="1" fill="#3A3A3A" />
      <rect x="90" y="72" width="6" height="6" rx="1" fill="#3A3A3A" />
      <rect x="60" y="80" width="4" height="4" rx="1" fill="#3A3A3A" />
      <rect x="86" y="86" width="8" height="8" rx="1" fill="#3A3A3A" />
      <text x="60" y="115" textAnchor="middle" fontSize="8" fill="#999" fontFamily="sans-serif">QR placeholder</text>
    </svg>
  );
}

// ── COMPONENTE PRINCIPAL ────────────────────────────────────────────
interface Props { onEmpezarTest: () => void; }

export default function SectionIntro({ onEmpezarTest }: Props) {
  const [llamaPose, setLlamaPose] = useState<'normal' | 'señala' | 'celebra'>('normal');
  const [float, setFloat] = useState(0);

  useEffect(() => {
    let t = 0;
    const id = setInterval(() => { t += 0.04; setFloat(Math.sin(t) * 8); }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="intro" style={{ background: 'var(--blanco)', paddingTop: 56 }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center',
        padding: '80px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("/fondo.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
      }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 40, alignItems: 'center' }}>
            <div style={{ animation: 'fadeUp 0.7s ease both' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--rojo-fondo)', border: '1px solid rgba(208,2,27,0.15)',
                borderRadius: 20, padding: '5px 14px', marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, background: 'var(--rojo)', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rojo)' }}>
                  Elecciones Perú 2026
                </span>
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                lineHeight: 1.1, letterSpacing: '-0.03em',
                marginBottom: 24, color: 'var(--negro)', whiteSpace: 'pre-line',
              }}>
                {HERO.titulo}
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--gris-oscuro)', lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
                {HERO.subtitulo}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <button
                  className="btn btn--primary"
                  onClick={onEmpezarTest}
                  onMouseEnter={() => setLlamaPose('señala')}
                  onMouseLeave={() => setLlamaPose('normal')}
                  style={{ fontSize: '1.05rem', padding: '15px 36px' }}
                >
                  {HERO.ctaTexto} →
                </button>
                <span style={{ fontSize: '0.82rem', color: 'var(--gris-medio)' }}>
                  {HERO.ctaSubtexto}
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                transform: `translateY(${float}px)`, transition: 'transform 0.05s linear',
                animation: 'fadeIn 0.8s ease 0.3s both',
              }}
              aria-hidden="true"
            >
              <LlamaMascot pose={llamaPose} size={180} />
              <p style={{ fontSize: '0.72rem', color: 'var(--gris-medio)', marginTop: 8, textAlign: 'center', fontStyle: 'italic' }}>
                {SITE.nombre}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STORY BLOCKS ──────────────────────────────────────────── */}
      <div style={{ background: 'var(--gris-fondo)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 72 }}>
          <StoryBlock>
              <div id="iniciativa" style={{ borderLeft: '3px solid var(--rojo)', paddingLeft: 28 }}>              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 10 }}>01</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 16 }}>{INICIATIVA.titulo}</h2>
              <p style={{ fontSize: '1rem', color: 'var(--gris-oscuro)', lineHeight: 1.8, maxWidth: 560 }}>{INICIATIVA.cuerpo}</p>
            </div>
          </StoryBlock>
          <StoryBlock delay={0.05}>
            <div style={{ borderLeft: '3px solid var(--negro)', paddingLeft: 28 }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 10 }}>02</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 16 }}>{MISION.titulo}</h2>
              <p style={{ fontSize: '1rem', color: 'var(--gris-oscuro)', lineHeight: 1.8, maxWidth: 560 }}>{MISION.cuerpo}</p>
            </div>
          </StoryBlock>
          <StoryBlock delay={0.05}>
              <div id="metodologia" style={{ borderLeft: '3px solid var(--gris-claro)', paddingLeft: 28 }}>              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 10 }}>03</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 12 }}>{METODOLOGIA.titulo}</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--gris-oscuro)', marginBottom: 20 }}>{METODOLOGIA.intro}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {METODOLOGIA.puntos.map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{
                      flexShrink: 0, width: 22, height: 22, background: 'var(--negro)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 700, color: 'white', marginTop: 2,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--gris-oscuro)', lineHeight: 1.65 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StoryBlock>
        </div>
      </div>

      {/* ── EQUIPO ─────────────────────────────────────────────────── */}
      <div id="equipo" style={{ padding: '80px 24px', background: 'var(--blanco)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <StoryBlock>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 10 }}>04</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>El equipo</h2>
            </div>
          </StoryBlock>

          <StoryBlock delay={0.1}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 20 }}>
              Liderazgo y desarrollo
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
              {EQUIPO_NUCLEO.map((p, i) => (
                <PersonCard key={i} {...p} />
              ))}
            </div>
          </StoryBlock>

          {COLABORADORES.length > 0 && (
            <StoryBlock delay={0.15}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 20 }}>
                Colaboradores
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {COLABORADORES.map((p, i) => (
                  <PersonCard key={i} {...p} />
                ))}
              </div>
            </StoryBlock>
          )}
        </div>
      </div>

      {/* ── QR COLABORACIÓN ────────────────────────────────────────── */}
      {QR_COLABORA.mostrar && (
        <div style={{
          background: 'var(--gris-fondo)',
          borderTop: '1px solid var(--gris-claro)', borderBottom: '1px solid var(--gris-claro)',
          padding: '56px 24px',
        }}>
          <StoryBlock>
            <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ background: 'var(--blanco)', border: '1.5px solid var(--gris-claro)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {QR_COLABORA.qr_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={QR_COLABORA.qr_url} width={120} height={120} alt="QR donación" style={{ borderRadius: 4 }} />
                  : <QRPlaceholder />
                }
                <span style={{ fontSize: '0.72rem', color: 'var(--gris-medio)', fontWeight: 500 }}>{QR_COLABORA.metodo}</span>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 8 }}>
                  ♥ {QR_COLABORA.titulo}
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--gris-oscuro)', lineHeight: 1.7 }}>{QR_COLABORA.descripcion}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--gris-medio)', marginTop: 10 }}>{QR_COLABORA.instruccion} →</p>
              </div>
            </div>
          </StoryBlock>
        </div>
      )}

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <div style={{ padding: '80px 24px', background: 'var(--negro)', textAlign: 'center' }}>
        <StoryBlock>
          <LlamaMascot pose="señala" size={100} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', color: 'white', marginBottom: 16 }}>
            ¿Listo para descubrir<br />tus coincidencias?
          </h2>
          <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: 32 }}>{SITE.disclaimer}</p>
          <button className="btn btn--rojo" onClick={onEmpezarTest} style={{ fontSize: '1.05rem', padding: '15px 40px' }}>
            Comenzar el test →
          </button>
        </StoryBlock>
      </div>

    </section>
  );
}
