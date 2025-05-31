"use client"

import { useEffect, useState, useRef } from "react"
import { iniciarPeer, getPeer } from "@/services/peerManager"
import { iniciarChamada, atenderChamada, encerrarChamada } from "@/services/callManager"
import { Phone, PhoneOff,  Check, X } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import useSound from "use-sound"
import { MediaConnection } from "peerjs"

// Tipagem para cliente
interface Cliente {
  id: string;
  nome: string;
}
interface ChamadaServicoProps {
  id: string;
}


export default function ChamadaServico({ id }: ChamadaServicoProps) {
  const [meuId, setMeuId] = useState<string>("recepcao")
  const [chamadaDe, setChamadaDe] = useState<string | null>(null)
  const [chamadaAtiva, setChamadaAtiva] = useState<boolean>(false)
  const [conn, setConn] = useState<MediaConnection | null>(null)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [playRing, { stop: stopRing }] = useSound("/toque-cliente.mp3", { volume: 1.0, loop: true })

useEffect(() => {
  if (!id) return;
  iniciarPeer(id).then((peer) => {
    peer.on("call", (chamada: MediaConnection) => {
      console.log("📞 Recebendo chamada de", chamada.peer);
      setChamadaDe(chamada.peer);
      setConn(chamada);
      playRing();
    });
  });

  carregarClientes();

  // ⚡️ DESTROY O PEER AO DESMONTAR/SAIR
  // return () => {
  //   destroyPeer();
  // };
}, [id]);


const carregarClientes = async () => {
  try {
    const resp = await fetch("/api/suites");
    if (!resp.ok) throw new Error("Erro ao buscar suítes");
    const suites = await resp.json();

    // Garante que seja um array e filtra só os campos necessários
    const lista: Cliente[] = Array.isArray(suites)
      ? suites.map((item: any) => ({
          id: String(item.id),
          nome: String(item.nome)
        }))
      : [];

    setClientes(lista);
  } catch (error) {
    console.error("Erro ao listar clientes", error);
    toast.error("Erro ao carregar clientes");
  }
};


  const handleChamar = async (idDestino?: string) => {
    try {
      const idParaChamar = idDestino || destino
      if (!idParaChamar) {
        toast.error("Informe o ID do cliente.")
        return
      }

      const peer = getPeer()
      if (!peer) {
        toast.error("Peer ainda inicializando, aguarde...")
        return
      }

      console.log("📞 Iniciando chamada para", idParaChamar)
      await iniciarChamada(idParaChamar, setChamadaAtiva)
      toast("Chamando " + idParaChamar)

      timeoutRef.current = setTimeout(() => {
        console.log("⏰ Chamada não atendida, cancelando automaticamente.")
        handleEncerrar()
      }, 20000)
    } catch (error) {
      console.error("Erro ao iniciar chamada", error)
      toast.error("Erro ao iniciar chamada.")
    }
  }

  // Adicione este estado, que faltou no seu exemplo:
  const [destino, setDestino] = useState<string>("")

  const handleAtender = () => {
    if (conn) {
      console.log("✅ Chamada atendida")
      atenderChamada(conn, setChamadaAtiva)
      stopRing()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setChamadaDe(null)
      toast.success("Chamada atendida!")
    }
  }

  const handleRecusar = () => {
    if (conn) {
      console.log("❌ Chamada recusada")
      conn.close()
      stopRing()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setConn(null)
      setChamadaDe(null)
      toast("Chamada recusada")
    }
  }

  const handleEncerrar = () => {
    console.log("🔚 Encerrando chamada")
    encerrarChamada(setChamadaAtiva)
    stopRing()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setConn(null)
    setChamadaDe(null)
    toast("Chamada encerrada")
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl bg-[#1e1e1e] m">
  <Toaster />
 

 
  

      {chamadaDe && (
        <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-300 mb-3">Chamada recebida de {chamadaDe}</h3>
          <div className="flex space-x-3">
            <button onClick={handleAtender} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" /> Atender
            </button>
            <button onClick={handleRecusar} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <X className="mr-2 h-4 w-4" /> Recusar
            </button>
          </div>
        </div>
      )}

      {chamadaAtiva && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
          <h3 className="text-lg font-medium text-green-300 mb-3">Chamada em andamento</h3>
          <button onClick={handleEncerrar} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <PhoneOff className="mr-2 h-4 w-4" /> Encerrar Chamada
          </button>
        </div>
      )}

      <div className="bg-[#181818] p-4 rounded-lg border border-gray-800">
        <h3 className="text-lg font-medium text-gray-100 mb-3">Ligar para Cliente</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Digite ID do Cliente"
            value={destino}
            onChange={e => setDestino(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-700 bg-[#232323] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => handleChamar()} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Phone className="mr-2 h-4 w-4" /> Ligar
          </button>
        </div>
      </div>

      <ul className="divide-y divide-gray-800">
        {clientes.length === 0 ? (
          <li className="py-4 text-center text-gray-500">Nenhum cliente cadastrado.</li>
        ) : (
          clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors hover:bg-[#232323] rounded-md"
            >
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm text-gray-400">ID: {cliente.id}</span>
                <span className="font-medium text-gray-100">{cliente.nome}</span>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleChamar(cliente.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                  aria-label={`Ligar para ${cliente.nome}`}
                  title={`Ligar para ${cliente.nome}`}
                >
                  <Phone className="w-5 h-5" />
                </button>
                {/* Adicione aqui outros botões se quiser, como editar/excluir */}
              </div>
            </li>
          ))
        )}
      </ul>
  
 
</main>

  )
}
