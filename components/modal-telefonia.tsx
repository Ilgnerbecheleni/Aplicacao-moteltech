"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTelefonia } from "@/contexts/telefonia-context"
import { Phone, PhoneCall, PhoneOff, User, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function ModalTelefonia() {
  const { status, dadosChamada, modalAberto, atenderChamada, encerrarChamada, fecharModal } = useTelefonia()
  const [duracaoFormatada, setDuracaoFormatada] = useState("00:00")

  useEffect(() => {
    if (status === "em_chamada" && dadosChamada?.duracao !== undefined) {
      const minutos = Math.floor(dadosChamada.duracao / 60)
      const segundos = dadosChamada.duracao % 60
      setDuracaoFormatada(`${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`)
    }
  }, [dadosChamada?.duracao, status])

  const getStatusInfo = () => {
    switch (status) {
      case "chamando":
        return {
          titulo: "Chamando...",
          icone: <PhoneCall className="h-8 w-8 text-blue-400 animate-pulse" />,
          cor: "border-blue-500",
        }
      case "recebendo":
        return {
          titulo: "Chamada Recebida",
          icone: <Phone className="h-8 w-8 text-green-400 animate-bounce" />,
          cor: "border-green-500",
        }
      case "em_chamada":
        return {
          titulo: "Em Chamada",
          icone: <PhoneCall className="h-8 w-8 text-primary" />,
          cor: "border-primary",
        }
      default:
        return {
          titulo: "Telefonia",
          icone: <Phone className="h-8 w-8 text-gray-400" />,
          cor: "border-gray-500",
        }
    }
  }

  const statusInfo = getStatusInfo()

  if (!modalAberto) return null

  return (
    <Dialog open={modalAberto} onOpenChange={fecharModal}>
      <DialogContent className="sm:max-w-md bg-[#1e1e1e] border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            {statusInfo.icone}
            {statusInfo.titulo}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Avatar e informações do contato */}
          <div className="flex flex-col items-center space-y-3">
            <div
              className={`w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-4 ${statusInfo.cor}`}
            >
              <User className="h-10 w-10 text-gray-300" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold">{dadosChamada?.nome || "Contato Desconhecido"}</h3>
              <p className="text-sm text-gray-400">
                {dadosChamada?.numero || dadosChamada?.ramal || "Número não identificado"}
              </p>
              {dadosChamada?.ramal && <p className="text-xs text-gray-500">Ramal: {dadosChamada.ramal}</p>}
            </div>
          </div>

          {/* Duração da chamada */}
          {status === "em_chamada" && (
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-lg font-mono">{duracaoFormatada}</span>
            </div>
          )}

          {/* Status da chamada */}
          <div className="text-center">
            {status === "chamando" && <p className="text-sm text-gray-400">Conectando...</p>}
            {status === "recebendo" && (
              <p className="text-sm text-gray-400">
                Chamada {dadosChamada?.tipo === "entrada" ? "recebida" : "saindo"}
              </p>
            )}
            {status === "em_chamada" && <p className="text-sm text-gray-400">Chamada ativa</p>}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-4">
            {status === "recebendo" && (
              <>
                <Button onClick={atenderChamada} className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14">
                  <Phone className="h-6 w-6" />
                </Button>
                <Button onClick={encerrarChamada} variant="destructive" className="rounded-full w-14 h-14">
                  <PhoneOff className="h-6 w-6" />
                </Button>
              </>
            )}

            {(status === "chamando" || status === "em_chamada") && (
              <Button onClick={encerrarChamada} variant="destructive" className="rounded-full w-14 h-14">
                <PhoneOff className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Informações adicionais */}
          <div className="text-xs text-gray-500 text-center">
            {status === "chamando" && "Aguardando atendimento..."}
            {status === "recebendo" && "Toque para atender ou rejeitar"}
            {status === "em_chamada" && "WebRTC ativo"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
