// src/app/page.tsx — Landing principal (/)
// El test vive en /test como página separada
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SectionIntro from '@/components/SectionIntro';

function SiteFooter() {
  return (
    <footer style={{
      borderTop: '1px solid var(--gris-claro)',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      background: 'var(--gris-fondo)',
    }}>
      <p style={{ fontSize: '0.78rem', color: 'var(--gris-medio)' }}>
        <strong style={{ color: 'var(--negro)' }}>VotaBien.pe</strong>
        {' '}— Sin fines de lucro · Sin recomendaciones de voto · Sin datos personales
      </p>
      <p style={{ fontSize: '0.72rem', color: 'var(--gris-medio)' }}>
        Perú 2026
      </p>
    </footer>
  );
}

export default function Home() {
  const router = useRouter();
  const irAlTest = () => router.push('/test');

  return (
    <>
      <SiteHeader onEmpezarTest={irAlTest} />
      <main>
        <SectionIntro onEmpezarTest={irAlTest} />
      </main>
      <SiteFooter />
    </>
  );
}
