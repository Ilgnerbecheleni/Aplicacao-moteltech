import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChamadaServico from "./ChamadaServico"
import { useRef } from "react"


interface HeaderProps {
  title: string
  showSearch?: boolean
    showAtendent?: boolean
}

export default function Header({ title, showSearch = true }: HeaderProps) {
   const chamarClienteRef = useRef<((id: string) => Promise<void>) | undefined>();
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <h1 className="text-xl font-semibold">{title}</h1>
        <ChamadaServico id='recepcao'  onChamar={fn => { chamarClienteRef.current = fn; }}  />
      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar solicitações..."
              className="bg-gray-800 rounded-full pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

       

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            1
          </span>
        </Button>

          {showSearch && (
           <div className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-full">
          <User className="h-4 w-4" />
          <span className="text-sm">Atendente</span>
        </div>
        )}

      
      </div>
    </div>
  )
}
