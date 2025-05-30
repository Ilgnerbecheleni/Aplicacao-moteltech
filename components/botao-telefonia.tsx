"use client"

import { Button } from "@/components/ui/button"
import { useTelefonia } from "@/contexts/telefonia-context"
import { Phone, PhoneCall } from "lucide-react"

export default function BotaoTelefonia() {
  const { status, abrirModal, iniciarChamada, receberChamada } = useTelefonia()

  const handleClick = () => {
    if (status === "idle") {
      // Simular uma chamada recebida para demonstração
      receberChamada({
        nome: "Suite 22",
        numero: "+55 11 99999-9999",
        ramal: "R1",
      })
    } else {
      abrirModal()
    }
  }

  const getButtonVariant = () => {
    switch (status) {
      case "chamando":
        return "default"
      case "recebendo":
        return "default"
      case "em_chamada":
        return "default"
      default:
        return "outline"
    }
  }

  const getButtonIcon = () => {
    switch (status) {
      case "chamando":
        return <PhoneCall className="h-4 w-4 animate-pulse" />
      case "recebendo":
        return <Phone className="h-4 w-4 animate-bounce text-green-400" />
      case "em_chamada":
        return <PhoneCall className="h-4 w-4 text-primary" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant={getButtonVariant()}
      size="icon"
      onClick={handleClick}
      className={`relative ${status === "recebendo" ? "bg-green-600 hover:bg-green-700" : ""} ${
        status === "em_chamada" ? "bg-primary hover:bg-primary/90" : ""
      }`}
    >
      {getButtonIcon()}
      {status !== "idle" && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
          !
        </span>
      )}
    </Button>
  )
}
