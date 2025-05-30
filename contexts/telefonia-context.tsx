"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type StatusTelefonia = "idle" | "chamando" | "recebendo" | "em_chamada"

interface DadosChamada {
  numero?: string
  nome?: string
  ramal?: string
  duracao?: number
  tipo?: "entrada" | "saida"
}

interface TelefoniaContextType {
  status: StatusTelefonia
  dadosChamada: DadosChamada | null
  modalAberto: boolean
  iniciarChamada: (dados: DadosChamada) => void
  receberChamada: (dados: DadosChamada) => void
  atenderChamada: () => void
  encerrarChamada: () => void
  abrirModal: () => void
  fecharModal: () => void
}

const TelefoniaContext = createContext<TelefoniaContextType | undefined>(undefined)

export function TelefoniaProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<StatusTelefonia>("idle")
  const [dadosChamada, setDadosChamada] = useState<DadosChamada | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [duracao, setDuracao] = useState(0)

  const iniciarChamada = (dados: DadosChamada) => {
    setStatus("chamando")
    setDadosChamada({ ...dados, tipo: "saida" })
    setModalAberto(true)
    setDuracao(0)
  }

  const receberChamada = (dados: DadosChamada) => {
    setStatus("recebendo")
    setDadosChamada({ ...dados, tipo: "entrada" })
    setModalAberto(true)
    setDuracao(0)
  }

  const atenderChamada = () => {
    setStatus("em_chamada")
    // Iniciar contador de duração
    const interval = setInterval(() => {
      setDuracao((prev) => prev + 1)
    }, 1000)

    // Armazenar o interval para poder limpar depois
    if (dadosChamada) {
      setDadosChamada((prev) => ({ ...prev!, duracao: 0 }))
    }
  }

  const encerrarChamada = () => {
    setStatus("idle")
    setDadosChamada(null)
    setModalAberto(false)
    setDuracao(0)
  }

  const abrirModal = () => setModalAberto(true)
  const fecharModal = () => setModalAberto(false)

  return (
    <TelefoniaContext.Provider
      value={{
        status,
        dadosChamada: dadosChamada ? { ...dadosChamada, duracao } : null,
        modalAberto,
        iniciarChamada,
        receberChamada,
        atenderChamada,
        encerrarChamada,
        abrirModal,
        fecharModal,
      }}
    >
      {children}
    </TelefoniaContext.Provider>
  )
}

export function useTelefonia() {
  const context = useContext(TelefoniaContext)
  if (context === undefined) {
    throw new Error("useTelefonia deve ser usado dentro de um TelefoniaProvider")
  }
  return context
}
