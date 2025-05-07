'use client';

import { useSocket } from './context/SocketContext';
import { 
  Shirt, 
  Phone, 
  Clock, 
  Settings, 
  LogOut,
  UtensilsCrossed
} from 'lucide-react';

export default function Sidebar({ expanded }) {
  const { startCall } = useSocket();

  return (
    <aside className={`bg-white shadow-md flex flex-col h-full transition-all duration-300 ${
      expanded ? 'w-64' : 'w-20'
    }`}>
      <div className="flex items-center p-5 border-b">
        <Shirt className="text-blue-600 h-6 w-6" />
        <span className={`ml-2 font-semibold transition-opacity duration-200 ${
          expanded ? 'opacity-100' : 'opacity-0 hidden'
        }`}>
          Moteltech
        </span>
      </div>
      
      <nav className="flex-1 py-5">
        <div className="flex items-center px-5 py-3 text-blue-600 bg-blue-50 cursor-pointer">
          <Shirt className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Lavanderia
          </span>
        </div>
        
        <div 
          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer group relative"
          onClick={() => startCall("reception")}
        >
          <Phone className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Recepção
          </span>
          {!expanded && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Chamar Recepção
            </span>
          )}
        </div>
        
        <div 
          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer group relative"
          onClick={() => startCall("restaurante")}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Restaurante
          </span>
          {!expanded && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Chamar Restaurante
            </span>
          )}
        </div>
        
        <div className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <Clock className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Histórico
          </span>
        </div>
        
        <div className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <Settings className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Configurações
          </span>
        </div>
      </nav>
      
      <div className="border-t py-3">
        <div className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <LogOut className="h-5 w-5" />
          <span className={`ml-3 transition-opacity duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            Sair
          </span>
        </div>
      </div>
    </aside>
  );
}