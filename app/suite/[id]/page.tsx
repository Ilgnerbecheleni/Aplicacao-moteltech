"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Bed,
  Calendar,
  Clock,
  Coffee,
  Phone,
  ShirtIcon,
  User,
  Lightbulb,
  TvIcon,
  Thermometer,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Wind,
} from "lucide-react"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

import { type Suite, getStatusSuite } from "@/types/suite"
import ChamadaSuite from "@/components/ChamadaSuite"


type LampadaKey = "principal" | "banheiro" | "ambiente" | "led"

interface Lampada {
  ligada: boolean
  intensidade: number
}

type Lampadas = Record<LampadaKey, Lampada>

export default function SuiteDetails() {
  const params = useParams()
  const router = useRouter()
  const suiteId  = params.id
 

  const [suite, setSuite] = useState<Suite | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  function handleFazerPedido() {
    // Aqui você pode adicionar qualquer lógica antes do redirecionamento
    router.push("/restaurante/cardapio")
  }




  useEffect(() => {
    async function fetchSuite() {
      try {
        const response = await fetch(`/api/suites/${suiteId}`)
        if (!response.ok) {
          throw new Error("Erro ao carregar dados da suíte")
        }
        const data = await response.json()
        setSuite(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    if (suiteId) {
      fetchSuite()
    }
  }, [suiteId])

  // Dados simulados para demonstração
  const dadosEstadia = {
    cliente: "Cliente Anônimo",
    entrada: "29/05/2025 - 18:30",
    previsaoSaida: "29/05/2025 - 20:30",
    valorTotal: "R$ 120,00",
    consumo: [
      { id: 1, item: "Refrigerante Cola", quantidade: 2, valor: "R$ 10,00" },
      { id: 2, item: "Água Mineral", quantidade: 1, valor: "R$ 5,00" },
    ],
    servicos: [{ id: 1, tipo: "Lavanderia", descricao: "Lavagem de Roupas", status: "Concluído", hora: "19:15" }],
  }

  const [lampadas, setLampadas] = useState<Lampadas>({
    principal: { ligada: true, intensidade: 80 },
    banheiro: { ligada: false, intensidade: 60 },
    ambiente: { ligada: true, intensidade: 90 },
    led: { ligada: false, intensidade: 50 },
  })

  const [tv, setTv] = useState({
    ligada: true,
    volume: 25,
    canal: 15,
    mudo: false,
  })

  const [arCondicionado, setArCondicionado] = useState({
    ligado: true,
    temperatura: 22,
    velocidade: 2,
    modo: "frio", // 'frio', 'quente', 'ventilador'
  })

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Carregando..." showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando dados da suíte...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !suite) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Erro" showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Erro: {error || "Suíte não encontrada"}</p>
            <Button onClick={() => router.back()}>Voltar</Button>
          </div>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusSuite(suite.status);



  return (
    <div className="h-full flex flex-col bg-[#121212]">
      <Header title={`Detalhes da ${suite.nome}`} showSearch={false} />

      <div className="flex-1 p-2 sm:p-4 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          {/* <Button variant="outline" size="icon" onClick={() => router.back()} className="bg-white text-black">
            <ArrowLeft className="h-4 w-4" />
          </Button> */}
          <h1 className="text-xl font-bold">{suite.nome}</h1>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-4 w-full bg-white rounded-lg mb-4">
                <TabsTrigger value="info" className="text-black">
                  Info
                </TabsTrigger>
                <TabsTrigger value="luzes" className="text-black">
                  Luzes
                </TabsTrigger>
                <TabsTrigger value="tv" className="text-black">
                  TV
                </TabsTrigger>
                <TabsTrigger value="clima" className="text-black">
                  Clima
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="bg-[#1e1e1e] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Informações da Estadia</h2>
                <p className="text-sm text-gray-400 mb-6">Detalhes sobre a ocupação atual</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#2a2a2a] p-3 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Cliente</p>
                      <p className="font-medium">{dadosEstadia.cliente}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#2a2a2a] p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Ramal</p>
                      <p className="font-medium">{suite.ramal || `R${suite.numero}`}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#2a2a2a] p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Entrada</p>
                      <p className="font-medium">{dadosEstadia.entrada}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#2a2a2a] p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Previsão de Saída</p>
                      <p className="font-medium">{dadosEstadia.previsaoSaida}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Valor Total</h3>
                  <div className="text-2xl font-bold text-primary">{dadosEstadia.valorTotal}</div>
                </div>
              </TabsContent>

              <TabsContent value="luzes" className="bg-[#1e1e1e] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Controle de Iluminação</h2>
                <p className="text-sm text-gray-400 mb-6">Gerencie a iluminação da suite</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(lampadas).map(([key, lampada]) => (
                    <div key={key} className="bg-[#1a2035] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lightbulb className={`h-5 w-5 ${lampada.ligada ? "text-yellow-400" : "text-gray-400"}`} />
                          <span className="font-medium capitalize">{key.replace("_", " ")}</span>
                        </div>
                        <Button
                          variant={lampada.ligada ? "default" : "outline"}
                          size="sm"
                          className={`text-xs px-3 py-1 ${lampada.ligada ? "bg-primary" : "bg-white text-black"}`}
                          onClick={() =>
                            setLampadas((prev) => ({
                              ...prev,
                              [key as LampadaKey]: {
                                ...prev[key as LampadaKey],
                                ligada: !prev[key as LampadaKey].ligada,
                              },
                            }))
                          }
                        >
                          {lampada.ligada ? "ON" : "OFF"}
                        </Button>
                      </div>

                      {lampada.ligada && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Intensidade</span>
                            <span className="text-sm">{lampada.intensidade}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0 bg-white text-black"
                              onClick={() =>
                                setLampadas((prev) => ({
                                  ...prev,
                                  [key as LampadaKey]: {
                                    ...prev[key as LampadaKey],
                                    intensidade: Math.max(0, prev[key as LampadaKey].intensidade - 10),
                                  },
                                }))
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="flex-1 bg-gray-700 rounded-full h-2 min-w-0">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${lampada.intensidade}%` }}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0 bg-white text-black"
                              onClick={() =>
                                setLampadas((prev) => ({
                                  ...prev,
                                  [key as LampadaKey]: {
                                    ...prev[key as LampadaKey],
                                    intensidade: Math.min(100, prev[key as LampadaKey].intensidade + 10),
                                  },
                                }))
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button
                    className="w-full bg-primary"
                    onClick={() =>
                      setLampadas((prev) => ({
                        principal: { ...prev.principal, ligada: true },
                        banheiro: { ...prev.banheiro, ligada: true },
                        ambiente: { ...prev.ambiente, ligada: true },
                        led: { ...prev.led, ligada: true },
                      }))
                    }
                  >
                    Ligar Todas
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white text-black"
                    onClick={() =>
                      setLampadas((prev) => ({
                        principal: { ...prev.principal, ligada: false },
                        banheiro: { ...prev.banheiro, ligada: false },
                        ambiente: { ...prev.ambiente, ligada: false },
                        led: { ...prev.led, ligada: false },
                      }))
                    }
                  >
                    Desligar Todas
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="tv" className="bg-[#1e1e1e] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Controle da TV</h2>
                <p className="text-sm text-gray-400 mb-6">Controle remoto da televisão</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TvIcon className={`h-6 w-6 ${tv.ligada ? "text-primary" : "text-gray-400"}`} />
                        <span className="font-medium">TV</span>
                      </div>
                      <Button
                        variant={tv.ligada ? "default" : "outline"}
                        className={`text-xs px-3 py-1 ${tv.ligada ? "bg-primary" : "bg-white text-black"}`}
                        onClick={() => setTv((prev) => ({ ...prev, ligada: !prev.ligada }))}
                      >
                        {tv.ligada ? "ON" : "OFF"}
                      </Button>
                    </div>

                    {tv.ligada && (
                      <>
                        <div className="bg-[#1a2035] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Canal</span>
                            <span className="text-2xl font-bold">{tv.canal}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              className="w-full bg-white text-black"
                              onClick={() => setTv((prev) => ({ ...prev, canal: Math.max(1, prev.canal - 1) }))}
                            >
                              CH-
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full bg-white text-black"
                              onClick={() => setTv((prev) => ({ ...prev, canal: Math.min(999, prev.canal + 1) }))}
                            >
                              CH+
                            </Button>
                          </div>
                        </div>

                        <div className="bg-[#1a2035] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {tv.mudo ? (
                                <VolumeX className="h-4 w-4 text-red-400" />
                              ) : (
                                <Volume2 className="h-4 w-4 text-primary" />
                              )}
                              <span className="text-sm text-gray-400">Volume</span>
                            </div>
                            <span className="text-lg font-bold">{tv.volume}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0 bg-white text-black"
                              onClick={() => setTv((prev) => ({ ...prev, volume: Math.max(0, prev.volume - 5) }))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="flex-1 bg-gray-700 rounded-full h-2 min-w-0">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${tv.volume}%` }}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0 bg-white text-black"
                              onClick={() => setTv((prev) => ({ ...prev, volume: Math.min(100, prev.volume + 5) }))}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full bg-white text-black"
                            onClick={() => setTv((prev) => ({ ...prev, mudo: !prev.mudo }))}
                          >
                            {tv.mudo ? "Desmutar" : "Mutar"}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {tv.ligada && (
                    <div className="space-y-6">
                      <div className="bg-[#1a2035] rounded-lg p-4">
                        <h3 className="font-medium mb-3">Canais Favoritos</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {[5, 7, 13, 15, 21, 28].map((canal) => (
                            <Button
                              key={canal}
                              variant={tv.canal === canal ? "default" : "outline"}
                              className={`${tv.canal === canal ? "bg-primary" : "bg-white text-black"}`}
                              onClick={() => setTv((prev) => ({ ...prev, canal }))}
                            >
                              {canal}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#1a2035] rounded-lg p-4">
                        <h3 className="font-medium mb-3">Streaming</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-white text-black">
                            Netflix
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-white text-black">
                            YouTube
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-white text-black">
                            Prime Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="clima" className="bg-[#1e1e1e] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Controle de Climatização</h2>
                <p className="text-sm text-gray-400 mb-6">Gerencie o ar condicionado da suite</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className={`h-6 w-6 ${arCondicionado.ligado ? "text-primary" : "text-gray-400"}`} />
                        <span className="font-medium">Ar Condicionado</span>
                      </div>
                      <Button
                        variant={arCondicionado.ligado ? "default" : "outline"}
                        className={`text-xs px-3 py-1 ${arCondicionado.ligado ? "bg-primary" : "bg-white text-black"}`}
                        onClick={() => setArCondicionado((prev) => ({ ...prev, ligado: !prev.ligado }))}
                      >
                        {arCondicionado.ligado ? "ON" : "OFF"}
                      </Button>
                    </div>

                    {arCondicionado.ligado && (
                      <>
                        <div className="bg-[#1a2035] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-primary" />
                              <span className="text-sm text-gray-400">Temperatura</span>
                            </div>
                            <span className="text-2xl font-bold">{arCondicionado.temperatura}°C</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 flex-shrink-0 bg-white text-black"
                              onClick={() =>
                                setArCondicionado((prev) => ({
                                  ...prev,
                                  temperatura: Math.max(16, prev.temperatura - 1),
                                }))
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex-1 text-center">
                              <div className="text-xs text-gray-400">16°C - 30°C</div>
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 flex-shrink-0 bg-white text-black"
                              onClick={() =>
                                setArCondicionado((prev) => ({
                                  ...prev,
                                  temperatura: Math.min(30, prev.temperatura + 1),
                                }))
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="bg-[#1a2035] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Velocidade do Ventilador</span>
                            <span className="text-lg font-bold">Nível {arCondicionado.velocidade}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((vel) => (
                              <Button
                                key={vel}
                                variant={arCondicionado.velocidade === vel ? "default" : "outline"}
                                className={`${arCondicionado.velocidade === vel ? "bg-primary" : "bg-white text-black"}`}
                                onClick={() => setArCondicionado((prev) => ({ ...prev, velocidade: vel }))}
                              >
                                {vel}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {arCondicionado.ligado && (
                    <div className="space-y-4">
                      <div className="bg-[#1a2035] rounded-lg p-4">
                        <h3 className="font-medium mb-3">Modo de Operação</h3>
                        <div className="space-y-2">
                          {[
                            { key: "frio", label: "Refrigerar", icon: "❄️" },
                            { key: "quente", label: "Aquecer", icon: "🔥" },
                            { key: "ventilador", label: "Ventilador", icon: "💨" },
                          ].map((modo) => (
                            <Button
                              key={modo.key}
                              variant={arCondicionado.modo === modo.key ? "default" : "outline"}
                              className={`w-full justify-start ${arCondicionado.modo === modo.key ? "bg-primary" : "bg-white text-black"}`}
                              onClick={() => setArCondicionado((prev) => ({ ...prev, modo: modo.key }))}
                            >
                              <span className="mr-2">{modo.icon}</span>
                              {modo.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#1a2035] rounded-lg p-4">
                        <h3 className="font-medium mb-3">Temperaturas Rápidas</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {[18, 20, 22, 24].map((temp) => (
                            <Button
                              key={temp}
                              variant={arCondicionado.temperatura === temp ? "default" : "outline"}
                              className={`${arCondicionado.temperatura === temp ? "bg-primary" : "bg-white text-black"}`}
                              onClick={() => setArCondicionado((prev) => ({ ...prev, temperatura: temp }))}
                            >
                              {temp}°C
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="order-first xl:order-last">
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Ações Rápidas</h2>

              <div className="space-y-2">
                <Button className="w-full justify-start bg-primary">
                  <ShirtIcon className="h-4 w-4 mr-2" />
                  Solicitar Lavanderia
                </Button>
              <Button onClick={handleFazerPedido} className="w-full justify-start bg-primary">
      <Coffee className="h-4 w-4 mr-2" />
      Fazer Pedido
    </Button>
                <Button className="w-full justify-start bg-primary">
                  <Bed className="h-4 w-4 mr-2" />
                  Trocar de Quarto
                </Button>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
              <ChamadaSuite idsuite={suiteId} />
         


              </div>

              <Button variant="destructive" className="w-full justify-start mt-4">
                Finalizar Estadia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
