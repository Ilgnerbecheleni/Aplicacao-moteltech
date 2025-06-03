"use client"

import Header from "@/components/header"
import { Info, Phone, ShirtIcon, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { useCallback, useEffect, useRef, useState } from "react"
import { type Suite, getStatusSuite } from "@/types/suite"

import { useServiceIds } from "@/contexts/ServiceIdContext"
import ChamadaServico from "@/components/ChamadaServico"


export default function Recepcao() {

  const [suites, setSuites] = useState<Suite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  //const chamarClienteRef = useRef<((id: string) => Promise<void>) | undefined>();
  const [chamarFn, setChamarFn] = useState<((id: string) => Promise<void>) | null>(null);

function chamarSuite(id: string) {
  if (chamarFn) {
    chamarFn(id);
  } else {
    console.warn("Função ainda não registrada");
  }
}


const registrarChamarFn = useCallback((fn: (id: string) => Promise<void>) => {
  setChamarFn(() => fn);
}, []);

  const { ids } = useServiceIds();
  useEffect(() => {
    async function fetchSuites() {
      try {
        const response = await fetch("/api/suites")
        if (!response.ok) throw new Error("Erro ao carregar suítes")
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

 

  if (loading) {
    return (
      <div className="h-full flex flex-col">
      
        
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
      <Header title="Recepção" id="recepcao"  />
  
      <ChamadaServico id="recepcao" onChamar={registrarChamarFn} />
      <div className="flex-1 p-4 overflow-auto">
        {/* Lista de suítes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Suítes ({suites.length})</h2>
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
              const ramal = suite.ramal || `R${suite.numero}`
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
                      <Phone className="h-4 w-4 mr-1" />
                      {ramal}
                    </div>
                  </div>

                  <div className="border-t border-gray-800 flex">
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-3 text-green-400 hover:bg-green-400/20 hover:text-green-400"
                      onClick={() => { 
                       chamarSuite(suite.id)
                      }}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Chamar
                    </Button>

                    <div className="border-l border-gray-800" />

                    <Link href={`/suite/${suite.id}`} className="flex-1">
                      <Button
                        variant="ghost"
                        className="w-full rounded-none py-3 text-primary hover:bg-primary/20 hover:text-primary"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Comandar
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contatos Rápidos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Contatos Rápidos</h2>
          </div>
          
        </div>
      </div>
    </div>
  )
}
