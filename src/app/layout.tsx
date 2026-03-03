// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: `${SITE.nombre} — ${SITE.tagline}`,
  description: SITE.descripcionMeta,
  keywords: ['elecciones Peru 2026', 'candidatos presidenciales', 'compatibilidad política', 'voto informado', 'VotaBien'],
  openGraph: {
    title: `${SITE.nombre} — ${SITE.tagline}`,
    description: SITE.descripcionMeta,
    locale: 'es_PE',
    type: 'website',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
