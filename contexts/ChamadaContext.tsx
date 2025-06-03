"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ChamadaContextType = {
  logarId: (id: string) => void
  registrarLogger: (fn: (id: string) => void) => void
}

const ChamadaContext = createContext<ChamadaContextType | undefined>(undefined)

export function useChamada() {
  const ctx = useContext(ChamadaContext)
  if (!ctx) throw new Error("useChamada precisa estar dentro de ChamadaProvider")
  return ctx
}

export function ChamadaProvider({ children }: { children: ReactNode }) {
  const [logFn, setLogFn] = useState<(id: string) => void>(() => {
    return () => console.warn("logarId ainda não registrado.")
  })

  const registrarLogger = (fn: (id: string) => void) => {
    setLogFn(() => fn)
  }

  const logarId = (id: string) => {
    logFn(id)
  }

  return (
    <ChamadaContext.Provider value={{ logarId, registrarLogger }}>
      {children}
    </ChamadaContext.Provider>
  )
}
