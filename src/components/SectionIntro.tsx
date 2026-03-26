// src/components/SectionIntro.tsx
'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import LlamaMascot from './LlamaMascot';
import {
  SITE, HERO, INICIATIVA, MISION, METODOLOGIA, QR_COLABORA,
  EQUIPO_NUCLEO, COLABORADORES,
} from '@/lib/content';

// ── Hook viewport ───────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ── Reveal Block ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: 'translateY(48px)',
    left: 'translateX(-48px)',
    right: 'translateX(48px)',
    none: 'none',
  };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Número animado ──────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {val}{suffix}
    </span>
  );
}

// ── Tarjeta persona ─────────────────────────────────────────────────
function PersonCard({ nombre, rol, bio, foto_url, linkedin }: {
  nombre: string; rol: string; bio: string; foto_url: string; linkedin?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const initials = nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const mostrarFoto = foto_url && !imgError;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 14, padding: '28px 20px',
        border: hovered ? '1.5px solid var(--negro)' : '1.5px solid var(--gris-claro)',
        borderRadius: 20, background: hovered ? 'var(--gris-fondo)' : 'var(--blanco)',
        textAlign: 'center',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{
        width: 80, height: 80, borderRadius: '50%', overflow: 'hidden',
        border: hovered ? '2px solid var(--negro)' : '2px solid var(--gris-claro)',
        background: 'var(--gris-fondo)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'border-color 0.3s ease',
      }}>
        {mostrarFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto_url} alt={nombre} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gris-medio)' }}>
            {initials}
          </span>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 3, color: 'var(--negro)' }}>{nombre}</p>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 10 }}>{rol}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--gris-medio)', lineHeight: 1.6, marginBottom: linkedin ? 14 : 0 }}>{bio}</p>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.75rem', fontWeight: 600, color: '#0A66C2',
              textDecoration: 'none', padding: '5px 12px',
              border: '1px solid #0A66C2', borderRadius: 6,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0A66C2'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#0A66C2'; }}
          >
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
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="8" fill="#F7F7F7" />
      <rect x="10" y="10" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="18" y="18" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="70" y="10" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="78" y="18" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="10" y="70" width="40" height="40" rx="4" stroke="#3A3A3A" strokeWidth="3" fill="none" />
      <rect x="18" y="78" width="24" height="24" rx="2" fill="#3A3A3A" />
      <rect x="58" y="58" width="8" height="8" rx="1" fill="#D0021B" />
    </svg>
  );
}

// ── COMPONENTE PRINCIPAL ────────────────────────────────────────────
interface Props { onEmpezarTest: () => void; }

export default function SectionIntro({ onEmpezarTest }: Props) {
  const [llamaPose, setLlamaPose] = useState<'normal' | 'señala' | 'celebra'>('normal');
  const [float, setFloat] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let t = 0;
    const id = setInterval(() => { t += 0.04; setFloat(Math.sin(t) * 8); }, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxY = scrollY * 0.3;

  return (
    <section id="intro" style={{ background: 'var(--blanco)', paddingTop: 56 }}>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div style={{
        minHeight: '95vh', display: 'flex', alignItems: 'center',
        padding: '80px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Fondo con parallax */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("/fondo.webp")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25,
          transform: `translateY(${parallaxY}px)`,
          willChange: 'transform',
        }} />

        {/* Patrón de puntos sutil */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, #d0021b 1px, transparent 1px)',
          backgroundSize: '40px 40px', opacity: 0.04,
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 40, alignItems: 'center' }}>
            <div>
              {/* Badge */}
              <div style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--rojo-fondo)', border: '1px solid rgba(208,2,27,0.2)',
                  borderRadius: 20, padding: '5px 14px', marginBottom: 28,
                }}>
                  <span style={{ width: 6, height: 6, background: 'var(--rojo)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rojo)' }}>
                    Elecciones Peru 2026
                  </span>
                </div>
              </div>

              {/* Titulo con stagger */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)',
                lineHeight: 1.08, letterSpacing: '-0.03em',
                marginBottom: 24, color: 'var(--negro)', whiteSpace: 'pre-line',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(32px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
              }}>
                {HERO.titulo}
              </h1>

              <p style={{
                fontSize: '1.05rem', color: 'var(--gris-oscuro)', lineHeight: 1.75,
                maxWidth: 520, marginBottom: 40,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(24px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
              }}>
                {HERO.subtitulo}
              </p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s',
              }}>
                <button
                  className="btn btn--primary"
                  onClick={onEmpezarTest}
                  onMouseEnter={() => setLlamaPose('señala')}
                  onMouseLeave={() => setLlamaPose('normal')}
                  style={{
                    fontSize: '1.05rem', padding: '15px 36px',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {HERO.ctaTexto} →
                </button>
                <span style={{ fontSize: '0.82rem', color: 'var(--gris-medio)' }}>
                  {HERO.ctaSubtexto}
                </span>
              </div>
            </div>

            {/* Mascota flotante */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transform: `translateY(${float}px)`,
              transition: 'transform 0.05s linear',
              opacity: heroVisible ? 1 : 0,
              animation: heroVisible ? 'fadeIn 0.8s ease 0.3s both' : 'none',
            }} aria-hidden="true">
              <LlamaMascot pose={llamaPose} size={180} />
              <p style={{ fontSize: '0.72rem', color: 'var(--gris-medio)', marginTop: 8, textAlign: 'center', fontStyle: 'italic' }}>
                {SITE.nombre}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          opacity: heroVisible ? (scrollY > 50 ? 0 : 0.5) : 0,
          transition: 'opacity 0.4s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gris-medio)' }}>scroll</span>
          <div style={{
            width: 1, height: 40, background: 'linear-gradient(to bottom, var(--gris-medio), transparent)',
            animation: 'scrollLine 1.5s ease infinite',
          }} />
        </div>
      </div>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <div style={{
        background: 'var(--negro)', padding: '32px 24px',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {[
              { num: 36, suffix: '', label: 'Candidatos' },
              { num: 16, suffix: '', label: 'Preguntas' },
              { num: 100, suffix: '%', label: 'Anonimo' },
            ].map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '16px 24px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'white', lineHeight: 1,
                  marginBottom: 4,
                }}>
                  <AnimatedNumber target={stat.num} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STORY BLOCKS ─────────────────────────────────────────── */}
      <div style={{ background: 'var(--gris-fondo)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 96 }}>

          {/* 01 Iniciativa */}
          <Reveal direction="left">
            <div id="iniciativa" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                lineHeight: 1, color: 'var(--gris-claro)',
                letterSpacing: '-0.04em', userSelect: 'none',
                marginTop: -8,
              }}>01</div>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 12 }}>
                  La iniciativa
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 20, lineHeight: 1.15 }}>
                  {INICIATIVA.titulo}
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--gris-oscuro)', lineHeight: 1.85, maxWidth: 560 }}>
                  {INICIATIVA.cuerpo}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--gris-claro), transparent)' }} />

          {/* 02 Mision */}
          <Reveal delay={0.05} direction="right">
            <div id="mision" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                lineHeight: 1, color: 'var(--gris-claro)',
                letterSpacing: '-0.04em', userSelect: 'none',
                marginTop: -8,
              }}>02</div>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 12 }}>
                  Por que existimos
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 20, lineHeight: 1.15 }}>
                  {MISION.titulo}
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--gris-oscuro)', lineHeight: 1.85, maxWidth: 560 }}>
                  {MISION.cuerpo}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--gris-claro), transparent)' }} />

          {/* 03 Metodologia */}
          <Reveal delay={0.05} direction="left">
            <div id="metodologia" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                lineHeight: 1, color: 'var(--gris-claro)',
                letterSpacing: '-0.04em', userSelect: 'none',
                marginTop: -8,
              }}>03</div>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 12 }}>
                  Como funciona
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 16, lineHeight: 1.15 }}>
                  {METODOLOGIA.titulo}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--gris-oscuro)', marginBottom: 28, lineHeight: 1.7 }}>
                  {METODOLOGIA.intro}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {METODOLOGIA.puntos.map((p, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '48px 1fr',
                      gap: 16, alignItems: 'start',
                      padding: '16px 0',
                      borderBottom: i < METODOLOGIA.puntos.length - 1 ? '1px solid var(--gris-claro)' : 'none',
                    }}>
                      <div style={{
                        width: 32, height: 32, background: 'var(--negro)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 700, color: 'white', flexShrink: 0,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: '0.92rem', color: 'var(--gris-oscuro)', lineHeight: 1.7, paddingTop: 6 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── EQUIPO ──────────────────────────────────────────────── */}
      <div id="equipo" style={{ padding: '100px 24px', background: 'var(--blanco)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: 64 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 12 }}>04</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1 }}>
                El equipo
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 24 }}>
              Liderazgo y desarrollo
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
              {EQUIPO_NUCLEO.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <PersonCard {...p} />
                </Reveal>
              ))}
            </div>
          </Reveal>

          {COLABORADORES.length > 0 && (
            <Reveal delay={0.15}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gris-medio)', marginBottom: 24 }}>
                Colaboradores
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {COLABORADORES.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <PersonCard {...p} />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* ── QR COLABORACION ─────────────────────────────────────── */}
      {QR_COLABORA.mostrar && (
        <div style={{
          background: 'var(--gris-fondo)',
          borderTop: '1px solid var(--gris-claro)',
          padding: '72px 24px',
        }}>
          <Reveal>
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 36,
                alignItems: 'center',
                background: 'var(--blanco)',
                border: '1.5px solid var(--gris-claro)',
                borderRadius: 20, padding: '32px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {QR_COLABORA.qr_url
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={QR_COLABORA.qr_url} width={120} height={120} alt="QR donacion" style={{ borderRadius: 8 }} />
                    : <QRPlaceholder />
                  }
                  <span style={{ fontSize: '0.68rem', color: 'var(--gris-medio)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {QR_COLABORA.metodo}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rojo)', marginBottom: 10 }}>
                    {QR_COLABORA.titulo}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--gris-oscuro)', lineHeight: 1.75, marginBottom: 12 }}>
                    {QR_COLABORA.descripcion}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gris-medio)' }}>
                    {QR_COLABORA.instruccion}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── CTA FINAL ───────────────────────────────────────────── */}
      <div style={{ padding: '100px 24px', background: 'var(--negro)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Fondo decorativo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(208,2,27,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <LlamaMascot pose="señala" size={100} style={{ margin: '0 auto 28px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: 'white', marginBottom: 16, lineHeight: 1.1,
            }}>
              Listo para descubrir<br />tus coincidencias?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', marginBottom: 40, maxWidth: 420, margin: '0 auto 40px' }}>
              {SITE.disclaimer}
            </p>
            <button
              className="btn btn--rojo"
              onClick={onEmpezarTest}
              onMouseEnter={() => setLlamaPose('celebra')}
              onMouseLeave={() => setLlamaPose('normal')}
              style={{ fontSize: '1.05rem', padding: '16px 44px' }}
            >
              Comenzar el test →
            </button>
          </div>
        </Reveal>
      </div>

      {/* Estilos de animaciones globales */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes scrollLine {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}