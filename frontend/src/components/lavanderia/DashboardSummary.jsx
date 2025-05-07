'use client';

import { Shirt, Clock, CheckSquare, Timer, ArrowUp, ArrowDown } from 'lucide-react';

export default function DashboardSummary() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <SummaryCard 
        icon={<Shirt className="h-6 w-6 text-blue-500" />}
        title="15"
        description="Solicitações Hoje"
        trend="up"
        percentage="12%"
      />
      
      <SummaryCard 
        icon={<Clock className="h-6 w-6 text-indigo-500" />}
        title="6"
        description="Em Processamento"
        trend="up"
        percentage="5%"
      />
      
      <SummaryCard 
        icon={<CheckSquare className="h-6 w-6 text-green-500" />}
        title="9"
        description="Concluídas"
        trend="up"
        percentage="8%"
      />
      
      <SummaryCard 
        icon={<Timer className="h-6 w-6 text-amber-500" />}
        title="2.5h"
        description="Tempo Médio"
        trend="down"
        percentage="10%"
      />
    </section>
  );
}

function SummaryCard({ icon, title, description, trend, percentage }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 rounded-md mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      
      <div className={`flex items-center ${
        trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend === 'up' ? (
          <ArrowUp className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 mr-1" />
        )}
        <span>{percentage}</span>
      </div>
    </div>
  );
}