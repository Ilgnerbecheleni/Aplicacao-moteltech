'use client';

import { Menu, Search, Bell, User } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-md" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Lavanderia</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-gray-100 rounded-md px-3 py-2 w-64">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Buscar solicitações..."
              className="bg-transparent outline-none border-none w-full text-sm"
            />
          </div>
          
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 p-2 rounded-full">
              <User className="h-5 w-5 text-gray-700" />
            </div>
            <span className="font-medium text-gray-700">Atendente</span>
          </div>
        </div>
      </div>
    </header>
  );
}