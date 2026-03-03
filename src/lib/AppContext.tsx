// src/lib/AppContext.tsx
'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { EstadoApp, PesosTemas, PerfilCandidato, RespuestaAPI } from '@/types';

const ESTADO_INICIAL: EstadoApp = {
  paso: 0,
  pesos_temas: null,
  perfil_buscado: null,
  vetados: [],
  respuestas: new Array(15).fill(0),
  resultados: null,
};

interface AppContextType {
  estado: EstadoApp;
  irAPaso: (paso: number) => void;
  setPesosTemas: (p: PesosTemas) => void;
  setPerfilBuscado: (p: PerfilCandidato | null) => void;
  toggleVetado: (id: number) => void;
  setRespuesta: (index: number, valor: number) => void;
  setResultados: (r: RespuestaAPI) => void;
  reiniciar: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoApp>(ESTADO_INICIAL);

  const irAPaso = useCallback((paso: number) => {
    setEstado(prev => ({ ...prev, paso }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setPesosTemas = useCallback((p: PesosTemas) => {
    setEstado(prev => ({ ...prev, pesos_temas: p }));
  }, []);

  const setPerfilBuscado = useCallback((p: PerfilCandidato | null) => {
    setEstado(prev => ({ ...prev, perfil_buscado: p }));
  }, []);

  const toggleVetado = useCallback((id: number) => {
    setEstado(prev => ({
      ...prev,
      vetados: prev.vetados.includes(id)
        ? prev.vetados.filter(v => v !== id)
        : [...prev.vetados, id],
    }));
  }, []);

  const setRespuesta = useCallback((index: number, valor: number) => {
    setEstado(prev => {
      const r = [...prev.respuestas];
      r[index] = valor;
      return { ...prev, respuestas: r };
    });
  }, []);

  const setResultados = useCallback((r: RespuestaAPI) => {
    setEstado(prev => ({ ...prev, resultados: r, paso: 5 }));
  }, []);

  const reiniciar = useCallback(() => {
    setEstado(ESTADO_INICIAL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AppContext.Provider value={{
      estado, irAPaso, setPesosTemas, setPerfilBuscado,
      toggleVetado, setRespuesta, setResultados, reiniciar,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
