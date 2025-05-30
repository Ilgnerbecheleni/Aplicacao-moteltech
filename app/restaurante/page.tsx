import Header from "@/components/header"
import StatusCard from "@/components/status-card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed, Clock, Check, Filter, DollarSign } from "lucide-react"

export default function Restaurante() {
  const statusCards = [
    {
      icon: <UtensilsCrossed className="h-5 w-5 text-primary" />,
      value: "12",
      label: "Pedidos Hoje",
      change: { value: 8, positive: true },
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      value: "5",
      label: "Pedidos Pendentes",
      change: { value: 3, positive: false },
    },
    {
      icon: <Check className="h-5 w-5 text-primary" />,
      value: "7",
      label: "Pedidos Concluídos",
      change: { value: 12, positive: true },
    },
    {
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      value: "R$ 850",
      label: "Faturamento",
      change: { value: 15, positive: true },
    },
  ]

  const pedidos = [
    {
      id: "01",
      tipo: "BLACK",
      itens: [
        { quantidade: 1, nome: "Hambúrguer Especial" },
        { quantidade: 2, nome: "Batata Frita" },
        { quantidade: 2, nome: "Refrigerante Cola" },
      ],
      status: "NOVO",
      hora: "10:30",
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <Header title="Restaurante" />

      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statusCards.map((card, index) => (
            <StatusCard key={index} icon={card.icon} value={card.value} label={card.label} change={card.change} />
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Pedidos Ativos</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                <Filter className="h-4 w-4 mr-1" />
                Filtrar
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                + Novo Pedido
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden card-border-blue">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-primary/20 text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                      {pedido.id}
                    </div>
                    <span className="font-medium">{pedido.tipo}</span>
                    <span className="ml-auto text-gray-400 text-sm">{pedido.hora}</span>
                  </div>

                  <div className="mb-3">
                    {pedido.itens.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-1">
                        <span className="text-primary text-sm">{item.quantidade}x</span>
                        <span className="text-sm">{item.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-800 flex">
                  <div className="flex-1 py-2 px-3">
                    <span className="status-badge status-novo">{pedido.status}</span>
                  </div>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none h-10 w-10 text-green-500 hover:bg-green-500/10"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none h-10 w-10 text-gray-400 hover:bg-gray-700"
                    >
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
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
