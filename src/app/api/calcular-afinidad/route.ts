// src/app/api/calcular-afinidad/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { calcularAfinidades } from '@/lib/algoritmo';
import { InputsCalculo } from '@/types';

export const runtime = 'nodejs';

function validarInputs(body: unknown): InputsCalculo | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;

  const pt = b.pesos_temas as Record<string, unknown>;
  if (!pt || typeof pt !== 'object') return null;
  const pesos_temas = {
    Inseguridad: Number(pt.Inseguridad) || 1,
    Economía: Number(pt.Economía) || 1,
    Corrupción: Number(pt.Corrupción) || 1,
    Social: Number(pt.Social) || 1,
  };

  const perfilesValidos = ['Outsider', 'Político con experiencia', 'Tecnócrata', 'Empresario', 'Activista social', null];
  const perfil_buscado = perfilesValidos.includes(b.perfil_buscado as string)
    ? (b.perfil_buscado as InputsCalculo['perfil_buscado'])
    : null;

  const vetados = Array.isArray(b.vetados)
    ? b.vetados.filter((v): v is number => typeof v === 'number')
    : [];

  if (!Array.isArray(b.respuestas) || b.respuestas.length !== 16) return null;
  const respuestas = b.respuestas.map((r) => {
    const n = Number(r);
    if (Number.isInteger(n) && n >= 0 && n <= 5) return n;
    return 0;
  });

  return { pesos_temas, perfil_buscado, vetados, respuestas };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputs = validarInputs(body);

    if (!inputs) {
      return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
    }

    // Cálculo matemático puro — sin IA, sin BD obligatoria
    const resultado = calcularAfinidades(inputs);

    // Guardar estadísticas anónimas SOLO si DATABASE_URL está configurada
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import('@/lib/prisma');
        await prisma.sesionAnonima.create({
          data: {
            pesoInseguridad: inputs.pesos_temas.Inseguridad,
            pesoEconomia: inputs.pesos_temas.Economía,
            pesoCorrupcion: inputs.pesos_temas.Corrupción,
            perfilBuscado: inputs.perfil_buscado ?? null,
            numVetados: inputs.vetados.length,
            preguntasSaltadas: inputs.respuestas.filter(r => r === 0).length,
            top1CandidatoId: resultado.top3[0]?.candidato.id ?? null,
            top1Afinidad: resultado.top3[0]?.afinidad ?? null,
            top2CandidatoId: resultado.top3[1]?.candidato.id ?? null,
            top2Afinidad: resultado.top3[1]?.afinidad ?? null,
            top3CandidatoId: resultado.top3[2]?.candidato.id ?? null,
            top3Afinidad: resultado.top3[2]?.afinidad ?? null,
            confianza: resultado.confianza / 100,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[DB] Estadísticas no guardadas (no bloquea):', dbErr);
    }

    const response = NextResponse.json(resultado, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;

  } catch (err) {
    console.error('[API] Error en calcular-afinidad:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
