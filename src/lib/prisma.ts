// src/lib/prisma.ts
// Este archivo es OPCIONAL. Solo se usa si DATABASE_URL está configurada.
// El algoritmo de cálculo funciona sin base de datos.

let prismaInstance: import('@prisma/client').PrismaClient | null = null;

export async function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (!prismaInstance) {
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

// Export nombrado para compatibilidad con importación dinámica en route.ts
export const prisma = {
  sesionAnonima: {
    create: async (args: unknown) => {
      const client = await getPrisma();
      if (!client) throw new Error('DATABASE_URL no configurada');
      return (client.sesionAnonima as { create: (a: unknown) => Promise<unknown> }).create(args);
    }
  }
};
