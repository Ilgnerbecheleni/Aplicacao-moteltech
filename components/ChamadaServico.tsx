"use client"

import { useEffect, useState, useRef, useImperativeHandle } from "react"
import { iniciarPeer, getPeer } from "@/services/peerManager"
import { iniciarChamada, atenderChamada, encerrarChamada } from "@/services/callManager"
import { Phone, PhoneOff, Check, X } from "lucide-react"
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
  onChamar?: (fn: (destinoId: string) => Promise<void>) => void; // nova prop opcional
}


export default function ChamadaServico({ id, onChamar }: ChamadaServicoProps,) {
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


  useEffect(() => {
    if (onChamar) onChamar(handleChamar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChamar]);






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
    <main className="">
      <Toaster />





      {chamadaDe && (


        <div className="w-full flex justify-center items-center gap-3 py-4">
  <span className="font-medium text-white">
    Chamada  de suite {chamadaDe}
  </span>
  <button
    onClick={handleAtender}
    className="flex items-center px-5 py-2 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 transition"
  >
    <Check className="mr-2 h-4 w-4" /> Atender
  </button>
  <button
    onClick={handleRecusar}
    className="flex items-center px-5 py-2 bg-red-600 text-white rounded-2xl shadow-md hover:bg-red-700 transition"
  >
    <X className="mr-2 h-4 w-4" /> Recusar
  </button>
</div>



      )}

      {chamadaAtiva && (
       <div className=" p-2 bg-green-900/30 border border-green-700 rounded-2xl flex items-center justify-center gap-4">
  <h3 className="text-lg font-medium text-green-300 m-0">
    Chamada em andamento
  </h3>
  <button
    onClick={handleEncerrar}
    className="flex items-center px-5 py-2 bg-red-600 text-white rounded-2xl shadow-md hover:bg-red-700 transition"
  >
    <PhoneOff className="mr-2 h-4 w-4" /> Encerrar Chamada
  </button>
</div>

      )}





    </main>

  )
}
