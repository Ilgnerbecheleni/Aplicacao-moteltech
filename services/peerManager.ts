import Peer, { PeerJSOption } from 'peerjs';

let peer: Peer | null = null;
let peerIdEmUso: string | null = null;
let peerReadyPromise: Promise<void> | null = null;
let peerReadyResolve: (() => void) | null = null;

const API_URL = 'turn.livintech.com.br';

interface TokenResponse {
  urls: string[];
  username: string;
  credential: string;
}
export const iniciarPeer = async (meuId: string): Promise<Peer> => {
  // Caso 1: já estamos criando/abrindo ou já abrimos um peer com este mesmo meuId
  if (peer && peerIdEmUso === meuId) {
    // Se já está aberto, retorna imediatamente
    if (peer.open) {
      return peer;
    }
    // Se ainda não abriu, aguarda até ele entrar em “open” (ou erro/close)
    await waitPeerOpen();
    return peer!;
  }

  // Caso 2: temos um peer existente COM outro ID ou que já terminou de abrir
  if (peer) {
    // Destrói o peer anterior antes de criar outro
    peer.destroy();
    peer = null;
    peerIdEmUso = null;
    peerReadyPromise = null;
    peerReadyResolve = null;
  }

  // Agora vamos criar um novo Peer
  const res = await fetch('https://turn.livintech.com.br/token');
  const token: TokenResponse = await res.json();

  const options: PeerJSOption = {
    host: API_URL,
    port: 443,
    secure: true,
    path: '/peerjs',
    config: {
      iceServers: [
        {
          urls: token.urls,
          username: token.username,
          credential: token.credential,
        }
      ]
    }
  };

  peer = new Peer(meuId, options);
  peerIdEmUso = meuId;

  // Criamos a promessa que será resolvida quando este peer disparar “open” ou “error/close”
  peerReadyPromise = new Promise<void>((resolve) => {
    peerReadyResolve = resolve;
    peer!.once("open", () => resolve());
    peer!.once("error", err => {
      console.error("[peerManager] erro no peer durante open:", err);
      resolve(); // mesmo em erro, resolvemos para não travar a waitPeerOpen
    });
    peer!.once("close", () => {
      console.log("[peerManager] peer foi fechado antes de open");
      resolve();
    });
  });

  // Retorna o peer (o chamador pode aguardar waitPeerOpen se quiser)
  return peer;
};
export const getPeer = (): Peer | null => peer;

// Novo export: Promise que resolve quando peer estiver aberto
export const waitPeerOpen = async (): Promise<void> => {
  if (!peer) throw new Error("Peer não iniciado!");
  if (peer.open) return;
  // Aguardar a promise que montamos em iniciarPeer
  await peerReadyPromise;
};



