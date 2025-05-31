"use client";

import ChamadaServico from "@/components/ChamadaServico";
import Header from "@/components/header";
import StatusCard from "@/components/status-card";
import { Button } from "@/components/ui/button";

import { Clock, Check, Filter, ShirtIcon, Droplet, Bed, Zap, Phone } from "lucide-react";
import { Pencil } from "lucide-react";


export default function Lavanderia() {


  const statusCards = [
    {
      icon: <ShirtIcon className="h-5 w-5 text-primary" />,
      value: "15",
      label: "Solicitações",
      change: { value: 12, positive: true },
      sublabel: "Hoje",
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      value: "6",
      label: "Em Processamento",
      change: { value: 5, positive: true },
    },
    {
      icon: <Check className="h-5 w-5 text-primary" />,
      value: "9",
      label: "Concluídas",
      change: { value: 8, positive: true },
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      value: "2.5h",
      label: "Tempo Médio",
      change: { value: 10, positive: false },
    },
  ];

  const solicitacoes = [
    {
      id: "01",
      tipo: "BLACK",
      servico: "Lavagem de Roupas",
      detalhes: "2 camisas, 1 calça, 3 peças íntimas",
      observacao: "Cuidado com a camisa branca",
      status: "NORMAL",
      statusAtual: "NOVO",
      hora: "11:30",
      cor: "blue",
    },
    {
      id: "03",
      tipo: "PREMIUM",
      servico: "Lavagem a Seco",
      detalhes: "1 terno, 1 vestido de festa",
      observacao: "Urgente para hoje à noite",
      status: "URGENTE",
      statusAtual: "EM PROCESSAMENTO",
      hora: "10:45",
      cor: "amber",
    },
    {
      id: "02",
      tipo: "ROYAL",
      servico: "Troca de Roupa de Cama",
      detalhes: "Lençóis, fronhas e edredom",
      observacao: "Cliente solicitou lençóis de algodão egípcio",
      status: "NORMAL",
      statusAtual: "PRONTO",
      hora: "09:15",
      cor: "green",
    },
  ];

  const servicos = [
    { id: 1, nome: "Lavagem de Roupas", icon: <ShirtIcon className="h-5 w-5 text-primary" /> },
    { id: 2, nome: "Lavagem a Seco", icon: <Droplet className="h-5 w-5 text-primary" /> },
    { id: 3, nome: "Troca de Roupa de Cama", icon: <Bed className="h-5 w-5 text-primary" /> },
    { id: 4, nome: "Passadoria", icon: <Zap className="h-5 w-5 text-primary" /> },
  ];

 

  return (
    <div className="h-full flex flex-col">
      <Header title="Lavanderia" />
       <ChamadaServico id="lavanderia"/>
    
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statusCards.map((card, index) => (
            <StatusCard
              key={index}
              icon={card.icon}
              value={card.value}
              label={card.label}
              change={card.change}
              sublabel={card.sublabel}
            />
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Solicitações de Serviço</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                <Filter className="h-4 w-4 mr-1" />
                Filtrar
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                + Nova Solicitação
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solicitacoes.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className={`bg-[#1e1e1e] rounded-xl overflow-hidden card-border-${solicitacao.cor}`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-primary/20 text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                      {solicitacao.id}
                    </div>
                    <span className="font-medium">{solicitacao.tipo}</span>
                    <span className="ml-auto text-gray-400 text-sm">{solicitacao.hora}</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-start gap-2 mb-1">
                      {solicitacao.servico === "Lavagem de Roupas" && <ShirtIcon className="h-5 w-5 text-primary" />}
                      {solicitacao.servico === "Lavagem a Seco" && <Droplet className="h-5 w-5 text-primary" />}
                      {solicitacao.servico === "Troca de Roupa de Cama" && <Bed className="h-5 w-5 text-primary" />}
                      <h3 className="font-medium">{solicitacao.servico}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{solicitacao.detalhes}</p>
                    <p className="text-xs text-gray-500 mt-1">Obs: {solicitacao.observacao}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`status-badge status-${solicitacao.status.toLowerCase()}`}>
                      {solicitacao.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-800 flex">
                  <div className="flex-1 py-2 px-3">
                    <span className={`status-badge status-${solicitacao.statusAtual.toLowerCase().replace(/ /g, "-")}`}>
                      {solicitacao.statusAtual}
                    </span>
                  </div>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none h-10 w-10 text-green-500 hover:bg-green-500/10"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
              
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold border-l-4 border-primary pl-2">Serviços Disponíveis</h2>
            <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
              <Pencil className="h-4 w-4 mr-1" />
              Editar Serviços
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className="bg-[#1e1e1e] rounded-xl p-4 flex flex-col items-center justify-center gap-3"
              >
                <div className="bg-[#2a2a2a] p-3 rounded-full">{servico.icon}</div>
                <span className="text-sm font-medium text-center">{servico.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
