"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bed, ShirtIcon, PhoneCall, UtensilsCrossed } from "lucide-react"

// Adicione o useState e useEffect para buscar os dados da API
import { useState, useEffect } from "react"

// Defina a interface para os dados de configuração
interface ConfigData {
  company_logo: string
  companyname: string
}

// Modifique a função Sidebar para buscar e usar os dados da API
export default function Sidebar() {
  const pathname = usePathname()
  const [configData, setConfigData] = useState<ConfigData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("/api/config")
        if (response.ok) {
          const data = await response.json()
          setConfigData(data)
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const getLogo = () => {
    if (pathname.includes("/lavanderia")) {
      return <ShirtIcon className="h-6 w-6 text-primary" />
    } else if (pathname.includes("/restaurante")) {
      return <UtensilsCrossed className="h-6 w-6 text-primary" />
    } else {
      return <Bed className="h-6 w-6 text-primary" />
    }
  }

  return (
    <div className="w-48 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b border-gray-800 min-h-[60px]">
        {configData?.company_logo ? (
          <div className="flex-shrink-0 w-8 h-8 bg-white rounded-md p-1">
            <img
              src={configData.company_logo || "/placeholder.svg"}
              alt="Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback para ícone se a imagem falhar
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        ) : (
          <div className="flex-shrink-0">{getLogo()}</div>
        )}
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm leading-tight block truncate">
            {configData?.companyname || "MotelTech"}
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-2">
        <Link
          href="/"
          className={`flex items-center gap-2 p-3 rounded-lg ${
            isActive("/") ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <PhoneCall className="h-5 w-5" />
          <span>Recepção</span>
        </Link>

        <Link
          href="/lavanderia"
          className={`flex items-center gap-2 p-3 rounded-lg ${
            isActive("/lavanderia") ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <ShirtIcon className="h-5 w-5" />
          <span>Lavanderia</span>
        </Link>

        <Link
          href="/restaurante"
          className={`flex items-center gap-2 p-3 rounded-lg ${
            isActive("/restaurante") ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span>Restaurante</span>
        </Link>
      </nav>

      <div className="mt-auto p-4">
        <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-md">
          <span className="text-xs font-medium">1 Issue</span>
        </div>
      </div>
    </div>
  )
}
