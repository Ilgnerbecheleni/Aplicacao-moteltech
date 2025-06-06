"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { iniciarPeer } from "@/services/peerManager";
import { iniciarChamada, atenderChamada, encerrarChamada } from "@/services/callManager";
import ReactHowler from "react-howler";
import { Phone,  PhoneOff, Check, X, Coffee, Shirt, HandPlatter } from "lucide-react";
import { MediaConnection } from "peerjs";
import { useServiceIds } from "@/contexts/ServiceIdContext";
import { useRouter } from "next/router";

// Tipagem da lista de clientes (apenas o que você usa)
interface ClienteApi {
  id: string;
  nome: string;
}

interface ChamadaSuiteProps {
  idsuite: string
}

export default function ChamadaSuite({ idsuite }:ChamadaSuiteProps) {
  // useParams retorna um objeto com [key: string]: string | string[] | undefined
  const params = useParams();
  const id = String(idsuite);
const peerInicializado = useRef(false);
  const [clienteValido, setClienteValido] = useState<boolean | null>(null);
  const [nomeCliente, setNomeCliente] = useState<string>("");
  const [chamadaDe, setChamadaDe] = useState<string | null>(null);
  const [chamadaAtiva, setChamadaAtiva] = useState<boolean>(false);
  const [conn, setConn] = useState<MediaConnection | null>(null);
  const [tocandoToque, setTocandoToque] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "info" | "sucesso" | "">("");

  const { ids } = useServiceIds();

useEffect(() => {
  const validarCliente = async () => {
    try {
      const res = await fetch(`/api/suites/${id}`);
      if (!res.ok) throw new Error("Suíte não encontrada");
      const suite: { id: string; nome: string } = await res.json();
      if (suite && suite.id) {
        setClienteValido(true);
        setNomeCliente(suite.nome);
      } else {
        setClienteValido(false);
      }
    } catch (error) {
      console.error("Erro ao validar suíte:", error);
      setClienteValido(false);
    }
  };

  if (id) validarCliente();
}, [id]);


  useEffect(() => {
    if (id && clienteValido) {
      
      iniciarPeer(id).then((peer) => {
        console.log('iniciando peer '+ id)
        peer.on("call", (chamada: MediaConnection) => {
          console.log("📡 Peer inicializado para ID", id);
          setChamadaDe(chamada.peer);
          setConn(chamada);
          setTocandoToque(true);
          exibirMensagem("Chamada recebida da Recepção!", "info");
        });
          console.log('inicializado peer '+ id)
        // ☎️ Liga automaticamente para a recepção assim que o peer estiver pronto
        // iniciarChamada("recepcao", setChamadaAtiva);
        // exibirMensagem("Ligando automaticamente para a recepção...", "info");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, clienteValido]);

  const exibirMensagem = (texto: string, tipo: "erro" | "info" | "sucesso" = "sucesso") => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  };

  const handleAtender = async () => {
    if (conn) {
      setTocandoToque(false);
      await atenderChamada(conn, setChamadaAtiva);
      setChamadaDe(null);
      exibirMensagem("Chamada atendida!", "sucesso");
    }
  };

  const handleRecusar = async () => {
    if (conn) {
      setTocandoToque(false);
      conn.close();
      setConn(null);
      setChamadaDe(null);
      exibirMensagem("Chamada recusada.", "info");
    }
  };

  const handleChamarRecepcao = () => {
    iniciarChamada("recepcao", setChamadaAtiva);
    exibirMensagem("Ligando para a recepção...", "info");
  };

    const handleChamarLavanderia = () => {
    iniciarChamada("lavanderia", setChamadaAtiva);
    exibirMensagem("Ligando para a recepção...", "info");
  };

      const handleChamarRestaurante = () => {
    iniciarChamada("restaurante", setChamadaAtiva);
    exibirMensagem("Ligando para a recepção...", "info");
  };

  const handleEncerrar = () => {
    setTocandoToque(false);
    encerrarChamada(setChamadaAtiva);
    setConn(null);
    setChamadaDe(null);
    exibirMensagem("Chamada encerrada.", "info");
  };

  if (clienteValido === false) {
    return (
      <main className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Cliente não encontrado</h1>
        <p className="text-gray-600">Verifique o link ou entre em contato com a recepção.</p>
      </main>
    );
  }

  if (clienteValido === null) {
    return (
      <main className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <p className="text-gray-500">Verificando cliente...</p>
      </main>
    );
  }

  return (
    <main className=" ">
 

    {/* 🔔 Toque da chamada */}
    <ReactHowler src="/toque-cliente.mp3" playing={tocandoToque} loop={true} volume={1.0} />

    {mensagem && (
      <div
        className={`mb-6 p-4 rounded-lg ${
          tipoMensagem === "erro"
            ? "bg-red-900/30 text-red-300"
            : tipoMensagem === "info"
            ? "bg-blue-900/40 text-blue-300"
            : "bg-green-900/30 text-green-300"
        }`}
      >
        {mensagem}
      </div>
    )}

    {chamadaDe && (
      <div className="mb-6 p-5 bg-yellow-900/20 border border-yellow-700 rounded-lg animate-pulse flex  flex-col justify-center align-middle">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">Chamada recebida</h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleAtender}
            className="flex-1 flex items-center justify-center px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check className="mr-2 h-5 w-5" />
            
          </button>
          <button
            onClick={handleRecusar}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <X className="mr-2 h-5 w-5" />
            
          </button>
        </div>
      </div>
    )}

    {chamadaAtiva && (
      <div className="mb-6 p-5 bg-green-900/30 border border-green-700 rounded-lg">
        <h2 className="text-xl font-semibold text-green-300 mb-4">Chamada em andamento</h2>
        <div className="flex justify-center">
          <button
            onClick={handleEncerrar}
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <PhoneOff className="mr-2 h-5 w-5" />
            Encerrar Chamada
          </button>
        </div>
      </div>
    )}

    {!chamadaDe && !chamadaAtiva && (
<div className="w-full">
  <div className="flex flex-col gap-4 w-full mb-3">
   
    <button
      onClick={handleChamarRecepcao}
      className="group flex items-center justify-center px-6 py-4 bg-primary text-white rounded-2xl shadow-md transition-all hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <Phone className="mr-3 h-5 w-5 group-hover:animate-pulse" />
      <span className="font-medium">Recepção</span>
    </button>

    <button
      onClick={handleChamarRestaurante}
      className="group flex items-center justify-center px-6 py-4 bg-slate-600 text-white rounded-2xl shadow-md transition-all hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      <HandPlatter  className="mr-3 h-5 w-5 group-hover:animate-pulse"/>
      
      <span className="font-medium">Restaurante</span>
    </button>

    <button
      onClick={handleChamarLavanderia}
      className="group flex items-center justify-center px-6 py-4  bg-green-700 text-white rounded-2xl shadow-md transition-all hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50"
    >
      <Shirt className="mr-3 h-5 w-5 group-hover:animate-pulse"/>
      
      <span className="font-medium">Lavanderia</span>
    </button>
  </div>
</div>

    )}

 
 
</main>

  );
}
