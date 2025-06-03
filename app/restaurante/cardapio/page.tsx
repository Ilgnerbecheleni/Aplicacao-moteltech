"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, ShoppingCart, Package, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import type { ItemCardapio, CategoriaCardapio } from "@/types/cardapio"

export default function CardapioPage() {
  const router = useRouter()
  const [produtos, setProdutos] = useState<ItemCardapio[]>([])
  const [categorias, setCategorias] = useState<Map<number, CategoriaCardapio>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Buscar produtos
        const produtosResponse = await fetch("/api/restaurante/cardapio")
        if (!produtosResponse.ok) {
          throw new Error("Erro ao carregar produtos")
        }
        const produtosData = await produtosResponse.json()
        setProdutos(produtosData)

        // Buscar categorias únicas
        const categoryIds = [...new Set(produtosData.map((item: ItemCardapio) => item.product_category_id))]
        await fetchCategorias(categoryIds)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  async function fetchCategorias(categoryIds: number[]) {
    const categoriasMap = new Map<number, CategoriaCardapio>()

    for (const categoryId of categoryIds) {
      try {
        const response = await fetch(`/api/restaurante/categorias/${categoryId}`)
        if (response.ok) {
          const categoria = await response.json()
          // Usar product_category_id do produto como chave, mas armazenar a categoria completa
          categoriasMap.set(categoryId, categoria)
        } else {
          console.warn(`Categoria ${categoryId} não encontrada`)
        }
      } catch (error) {
        console.error(`Erro ao buscar categoria ${categoryId}:`, error)
      }
    }

    setCategorias(categoriasMap)
  }

  // Função para formatar preço em reais
  const formatarPreco = (rate: string) => {
    const preco = Number.parseFloat(rate) || 0
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  // Função para calcular preço total (rate + taxes)
  const calcularPrecoTotal = (rate: string, taxes: string) => {
    const precoBase = Number.parseFloat(rate) || 0
    const taxas = Number.parseFloat(taxes) || 0
    return precoBase + taxas
  }

  // Função para obter nome da categoria
  const getNomeCategoria = (categoryId: number) => {
    const categoria = categorias.get(categoryId)
    return categoria?.p_category_name || `Categoria ${categoryId}`
  }

  // Função para obter descrição da categoria
  const getDescricaoCategoria = (categoryId: number) => {
    const categoria = categorias.get(categoryId)
    return categoria?.p_category_description || ""
  }

  // Função para obter categorias únicas para filtro
  const getCategoriasUnicas = () => {
    const categoryIds = [...new Set(produtos.map((item) => item.product_category_id))]
    return categoryIds
      .map((id) => ({
        id,
        name: getNomeCategoria(id),
        description: getDescricaoCategoria(id),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  // Função para filtrar itens
  const getItensFiltrados = () => {
    return produtos.filter((item) => {
      const matchSearch =
        searchTerm === "" ||
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getNomeCategoria(item.product_category_id).toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategoria = filtroCategoria === null || item.product_category_id === filtroCategoria

      return matchSearch && matchCategoria
    })
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando cardápio...</p>
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

  const itensFiltrados = getItensFiltrados()
  const categoriasUnicas = getCategoriasUnicas()

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      

      <div className="flex-1 p-2 sm:p-4 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="bg-white text-black">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Cardápio do Restaurante</h1>
        </div>

        {/* Filtros */}
        <div className="space-y-4 mb-6">
          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              className="w-full bg-[#1e1e1e] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtro de categoria */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filtroCategoria === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroCategoria(null)}
              className={`flex-shrink-0 ${
                filtroCategoria === null ? "bg-primary" : "bg-[#1e1e1e] text-gray-400 border-gray-700"
              }`}
            >
              Todas
            </Button>
            {categoriasUnicas.map((categoria) => (
              <Button
                key={categoria.id}
                variant={filtroCategoria === categoria.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroCategoria(categoria.id)}
                className={`flex-shrink-0 ${
                  filtroCategoria === categoria.id ? "bg-primary" : "bg-[#1e1e1e] text-gray-400 border-gray-700"
                }`}
                title={categoria.description} // Tooltip com descrição da categoria
              >
                {categoria.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de itens */}
        <div className="space-y-4">
          {itensFiltrados.map((item) => {
            const precoTotal = calcularPrecoTotal(item.rate, item.taxes)
            const temTaxas = item.taxes && Number.parseFloat(item.taxes) > 0

            return (
              <div
                key={item.id}
                className="bg-[#1e1e1e] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Imagem */}
                  <div className="w-full sm:w-48 h-40 sm:h-32 relative flex-shrink-0">
                    <img
                      src={item.product_image || "/placeholder.svg?height=200&width=300"}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                      }}
                    />
                    {item.quantity_number === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white font-medium px-3 py-1 bg-red-500/80 rounded-md text-sm">
                          Esgotado
                        </span>
                      </div>
                    )}
                    {item.is_digital === 1 && (
                      <div className="absolute top-2 left-2">
                        <span className="text-white font-medium px-2 py-1 bg-blue-500/80 rounded-md text-xs">
                          Digital
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-lg">{item.product_name}</h3>
                          <span
                            className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md flex items-center gap-1 cursor-help"
                            title={getDescricaoCategoria(item.product_category_id)}
                          >
                            <Tag className="h-3 w-3" />
                            {getNomeCategoria(item.product_category_id)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.product_description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-primary font-bold text-lg">{formatarPreco(precoTotal.toString())}</div>
                        {temTaxas && (
                          <div className="text-xs text-gray-400">
                            Base: {formatarPreco(item.rate)}
                            <br />
                            Taxa: {formatarPreco(item.taxes)}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-400 justify-end mt-1">
                          <Package className="h-3 w-3" />
                          <span>Estoque: {item.quantity_number}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${
                            item.quantity_number > 10
                              ? "bg-green-500/20 text-green-400"
                              : item.quantity_number > 0
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {item.quantity_number > 10
                            ? "Disponível"
                            : item.quantity_number > 0
                              ? "Pouco estoque"
                              : "Esgotado"}
                        </span>
                        {item.recurring === 1 && (
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md">
                            Recorrente
                          </span>
                        )}
                      </div>
                      <Button
                        className="bg-primary hover:bg-primary/90"
                        disabled={item.quantity_number === 0}
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Adicionar ao Pedido</span>
                        <span className="sm:hidden">Adicionar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Mensagem quando não há itens */}
          {itensFiltrados.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 space-y-2">
                <p className="text-lg">😔 Nenhum item encontrado</p>
                <p className="text-sm">
                  {searchTerm || filtroCategoria !== null
                    ? "Tente ajustar os filtros de busca"
                    : "Nenhum produto disponível no momento"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Resumo */}
        {produtos.length > 0 && (
          <div className="mt-8 bg-[#1e1e1e] rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{itensFiltrados.length}</div>
                <div className="text-gray-400">Itens exibidos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{produtos.length}</div>
                <div className="text-gray-400">Total produtos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{categoriasUnicas.length}</div>
                <div className="text-gray-400">Categorias</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {produtos.filter((p) => p.quantity_number > 0).length}
                </div>
                <div className="text-gray-400">Disponíveis</div>
              </div>
            </div>
          </div>
        )}

        {/* Debug info - remover em produção */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 bg-gray-800 rounded-lg p-4 text-xs">
            <details>
              <summary className="cursor-pointer text-gray-400">Debug Info</summary>
              <div className="mt-2 space-y-2">
                <div>Produtos carregados: {produtos.length}</div>
                <div>Categorias carregadas: {categorias.size}</div>
                <div>
                  Categorias:{" "}
                  {Array.from(categorias.values())
                    .map((c) => c.p_category_name)
                    .join(", ")}
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}
