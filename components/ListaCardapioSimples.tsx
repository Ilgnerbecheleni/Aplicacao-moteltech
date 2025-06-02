import { useState, useEffect } from "react"
import { Coffee, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ItemCardapio } from "@/types/cardapio"

export function ListaCardapioSimples() {
  const [produtos, setProdutos] = useState<ItemCardapio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true)
        const res = await fetch("/api/restaurante/cardapio")
        if (!res.ok) throw new Error("Erro ao carregar cardápio")
        const data = await res.json()
        setProdutos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }
    fetchProdutos()
  }, [])

  const formatarPreco = (rate: string) => {
    const preco = Number.parseFloat(rate) || 0
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  if (loading) return <div className="py-6 text-center text-gray-400">Carregando...</div>
  if (error) return <div className="py-6 text-center text-red-400">Erro: {error}</div>
  if (!produtos.length) return <div className="py-6 text-center text-gray-400">Nenhum item encontrado.</div>

  return (
    <>
      {/* Botão Fazer Pedido */}
      <div className="mb-4 w-full flex justify-end">
        <Button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow">
          <Coffee className="h-5 w-5" />
          Fazer Pedido
        </Button>
      </div>

      {/* Lista simples */}
      <ul className="space-y-2 w-full">
        {produtos.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 bg-[#232323] px-2 py-1 rounded-lg w-full"
          >
            <img
              src={item.product_image || "/placeholder.svg?height=60&width=60"}
              alt={item.product_name}
              className="w-12 h-12 object-cover rounded-md border border-gray-700 bg-black"
              onError={e => { e.currentTarget.src = "/placeholder.svg?height=60&width=60" }}
            />

            <div className="flex-1 min-w-0">
              <div className="font-sans truncate text-sm">{item.product_name}</div>
              <div className="text-sm text-gray-400 truncate">{item.product_description}</div>
              <div className="text-primary font-semibold text-sm">{formatarPreco(item.rate)}</div>
            </div>

            <Button
              size="icon"
              className="bg-primary hover:bg-primary/90"
              disabled={item.quantity_number === 0}
              title={item.quantity_number === 0 ? "Esgotado" : "Adicionar"}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
