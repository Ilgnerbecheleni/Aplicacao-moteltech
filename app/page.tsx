"use client"

import Header from "@/components/header"
import { Info, Phone, ShirtIcon, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTelefonia } from "@/contexts/telefonia-context"
import { useEffect, useState } from "react"
import { type Suite, getStatusSuite } from "@/types/suite"

export default function Recepcao() {
  const { iniciarChamada } = useTelefonia()
  const [suites, setSuites] = useState<Suite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSuites() {
      try {
        const response = await fetch("/api/suites")
        if (!response.ok) {
          throw new Error("Erro ao carregar suítes")
        }
        const data = await response.json()
        setSuites(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchSuites()
  }, [])

  const contatosRapidos = [
    {
      id: "lavanderia",
      nome: "Lavanderia",
      icone: <ShirtIcon className="h-6 w-6 text-primary" />,
      ramal: "200",
      cor: "bg-blue-500/20 border-blue-500",
    },
    {
      id: "restaurante",
      nome: "Restaurante",
      icone: <UtensilsCrossed className="h-6 w-6 text-primary" />,
      ramal: "300",
      cor: "bg-green-500/20 border-green-500",
    },
  ]

  const handleChamarQuarto = (suite: Suite) => {
    iniciarChamada({
      nome: suite.nome,
      ramal: suite.ramal || `R${suite.numero}`,
      numero: `+55 11 9999-${suite.numero}`,
    })
  }

  const handleChamarContato = (contato: any) => {
    iniciarChamada({
      nome: contato.nome,
      ramal: contato.ramal,
      numero: `+55 11 9999-${contato.ramal}`,
    })
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Recepção" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando suítes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Recepção" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Erro: {error}</p>
            <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Recepção" />

      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Suites ({suites.length})</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                <Info className="h-4 w-4 mr-1" />
                Filtrar
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                + Nova Entrada
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suites.map((suite) => {
              const statusInfo = getStatusSuite(suite.status)
              return (
                <div key={suite.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-2xl font-bold">{suite.numero}</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium mb-2">{suite.nome}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {suite.ramal || `R${suite.numero}`}
                    </div>
                  </div>

                  <div className="border-t border-gray-800 flex">
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-3 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                      onClick={() => handleChamarQuarto(suite)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Chamar
                    </Button>
                    <Link href={`/suite/${suite.id}`} className="flex-1">
                      <Button
                        variant="ghost"
                        className="w-full rounded-none py-3 text-primary hover:bg-primary/20 hover:text-primary"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Contatos Rápidos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contatosRapidos.map((contato) => (
              <div key={contato.id} className={`bg-[#1e1e1e] rounded-xl overflow-hidden border-l-4 ${contato.cor}`}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#2a2a2a] p-3 rounded-full">{contato.icone}</div>
                    <div>
                      <h3 className="text-lg font-medium">{contato.nome}</h3>
                      <p className="text-sm text-gray-400">Ramal {contato.ramal}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full rounded-none py-3 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                    onClick={() => handleChamarContato(contato)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Chamar {contato.nome}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
