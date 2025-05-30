"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Cardapio } from "@/types/cardapio"

export default function CardapioPage() {
  const router = useRouter()
  const [cardapio, setCardapio] = useState<Cardapio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCardapio() {
      try {
        setLoading(true)
        const response = await fetch("/api/restaurante/cardapio")
        if (!response.ok) {
          throw new Error("Erro ao carregar o cardápio")
        }
        const data = await response.json()
        setCardapio(data)

        // Define a primeira categoria como ativa por padrão
        if (data.categorias && data.categorias.length > 0) {
          setCategoriaAtiva(data.categorias[0].id.toString())
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchCardapio()
  }, [])

  // Função para formatar preço em reais
  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Cardápio" showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando cardápio...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !cardapio) {
    return (
      <div className="h-full flex flex-col">
        <Header title="Cardápio" showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Erro: {error || "Cardápio não encontrado"}</p>
            <Button onClick={() => router.back()}>Voltar</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      <Header title="Cardápio" showSearch={false} />

      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="bg-white text-black">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Cardápio do Restaurante</h1>
        </div>

        {/* Barra de pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar no cardápio..."
            className="w-full bg-[#1e1e1e] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs de categorias */}
        <Tabs value={categoriaAtiva || ""} onValueChange={setCategoriaAtiva} className="w-full">
          <TabsList className="w-full bg-[#1e1e1e] rounded-lg mb-6 overflow-x-auto flex whitespace-nowrap p-1">
            {cardapio.categorias.map((categoria) => (
              <TabsTrigger
                key={categoria.id}
                value={categoria.id.toString()}
                className="flex-shrink-0 text-gray-400 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {categoria.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          {cardapio.categorias.map((categoria) => (
            <TabsContent key={categoria.id} value={categoria.id.toString()} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoria.itens
                  .filter(
                    (item) =>
                      searchTerm === "" ||
                      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((item) => (
                    <div key={item.id} className="bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <div className="h-40 relative">
                        <img
                          src={item.imagem || "/placeholder.svg"}
                          alt={item.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                          }}
                        />
                        {!item.disponivel && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-white font-medium px-3 py-1 bg-red-500/80 rounded-md">
                              Indisponível
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg">{item.nome}</h3>
                          <span className="text-primary font-bold">{formatarPreco(item.preco)}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{item.descricao}</p>
                        <Button className="w-full bg-primary hover:bg-primary/90" disabled={!item.disponivel}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Adicionar ao Pedido
                        </Button>
                      </div>
                    </div>
                  ))}

                {/* Mensagem quando não há itens após a filtragem */}
                {categoria.itens.filter(
                  (item) =>
                    searchTerm === "" ||
                    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
                ).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-400">Nenhum item encontrado para "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
