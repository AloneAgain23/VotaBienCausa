// src/components/SiteHeader.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { SITE } from '@/lib/content';
import Link from 'next/link';

interface Props {
  onEmpezarTest: () => void;
}

export default function SiteHeader({ onEmpezarTest }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0 32px',
      height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--gris-claro)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 8, height: 8, background: 'var(--rojo)',
          borderRadius: '50%', display: 'inline-block',
          boxShadow: '0 0 0 2px rgba(208,2,27,0.18)',
        }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem', color: 'var(--negro)',
          letterSpacing: '-0.02em',
        }}>
          {SITE.nombre}
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <a href="#iniciativa" style={{
          fontSize: '0.85rem', color: 'var(--gris-medio)',
          textDecoration: 'none', fontWeight: 500,
          transition: 'color 0.2s',
        }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--negro)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--gris-medio)')}
        >
          Iniciativa
        </a>
        <a href="#metodologia" style={{
          fontSize: '0.85rem', color: 'var(--gris-medio)',
          textDecoration: 'none', fontWeight: 500,
          transition: 'color 0.2s',
        }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--negro)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--gris-medio)')}
        >
          Metodología
        </a>
        <a href="#equipo" style={{
          fontSize: '0.85rem', color: 'var(--gris-medio)',
          textDecoration: 'none', fontWeight: 500,
          transition: 'color 0.2s',
        }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--negro)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--gris-medio)')}
        >
          Equipo
        </a>

        <button
          onClick={onEmpezarTest}
          className="btn btn--rojo"
          style={{ padding: '9px 22px', fontSize: '0.88rem' }}
        >
          Empezar test →
        </button>
      </nav>
    </header>
  );
}
