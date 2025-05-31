// services/callManager.ts
import { getLocalStream, stopLocalStream } from './streamManager';
import {  getPeer, waitPeerOpen } from './peerManager';
import Peer, { MediaConnection } from 'peerjs';

// Tipagem para função de atualização de status
type SetStatusChamada = (status: boolean) => void;

let chamadaAtual: MediaConnection | null = null;
let verificarChamadaInterval: NodeJS.Timeout | null = null;

export const iniciarChamada = async (
  destinoId: string,
  setStatusChamada: SetStatusChamada
): Promise<void> => {
  const peer = getPeer();
  if (!peer) throw new Error('Peer não inicializado');

  await waitPeerOpen(); // 👈 Aguarda o peer abrir

  const stream = await getLocalStream();

  try {
    console.log("DEBUG: Tentando chamar peer", destinoId);
    console.log("DEBUG: peer id:", peer.id, "peer open:", peer.open);
    console.log("DEBUG: stream disponível?", !!stream);

    const chamada = peer.call(destinoId, stream);
    if (!chamada) throw new Error("Falha ao iniciar chamada");

    chamadaAtual = chamada;
    console.log("DEBUG: chamada retornada:", chamada);

    chamada.on("stream", (remoteStream: MediaStream) => {
      try {
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.play();
      } catch (err) {
        console.error("Erro ao lidar com remoteStream:", err);
      }
    });

    chamada.on("error", (err: any) => {
      console.error("Erro na chamada PeerJS:", err);
    });

    chamada.on("close", () => {
      encerrarChamada(setStatusChamada);
    });

    setStatusChamada(true);
    iniciarVerificacaoChamada(setStatusChamada);
  } catch (error) {
    console.error("Erro ao tentar iniciar chamada:", error);
  }
};

export const atenderChamada = async (
  chamada: MediaConnection,
  setStatusChamada: SetStatusChamada
): Promise<void> => {
  const stream = await getLocalStream();
  chamada.answer(stream);

  chamada.on('stream', (remoteStream: MediaStream) => {
    const audio = new Audio();
    audio.srcObject = remoteStream;
    audio.play();
  });

  chamada.on('close', () => {
    encerrarChamada(setStatusChamada);
  });

  chamadaAtual = chamada;
  setStatusChamada(true);
  iniciarVerificacaoChamada(setStatusChamada);
};

export const encerrarChamada = (setStatusChamada: SetStatusChamada): void => {
  if (chamadaAtual) {
    chamadaAtual.close();
    chamadaAtual = null;
  }
  stopLocalStream();
  setStatusChamada(false);
  if (verificarChamadaInterval) {
    clearInterval(verificarChamadaInterval);
    verificarChamadaInterval = null;
  }
  //destroyPeer();
};

function iniciarVerificacaoChamada(setStatusChamada: SetStatusChamada): void {
  if (verificarChamadaInterval) {
    clearInterval(verificarChamadaInterval);
  }

  verificarChamadaInterval = setInterval(() => {
    if (!chamadaAtual) {
      setStatusChamada(false);
      if (verificarChamadaInterval) clearInterval(verificarChamadaInterval);
    } else {
      try {
        // @ts-ignore: peerConnection não faz parte da tipagem padrão do PeerJS, mas geralmente está disponível.
        const pc = chamadaAtual.peerConnection;
        if (pc) {
          // @ts-ignore
          const state = pc.connectionState || pc.iceConnectionState;
          if (state === 'closed' || state === 'failed' || state === 'disconnected') {
            encerrarChamada(setStatusChamada);
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Erro ao verificar estado da chamada:', err);
      }
    }
  }, 2000);
}
