import Peer, { PeerJSOption } from 'peerjs';

let peer: Peer | null = null;
let peerReadyPromise: Promise<void> | null = null;
let peerReadyResolve: (() => void) | null = null;

const API_URL = 'webrtc.jobsconnect.com.br';

interface TokenResponse {
  urls: string[];
  username: string;
  credential: string;
}
export const iniciarPeer = async (meuId: string): Promise<Peer> => {
  // // Se já existir um peer com outro ID, destrua antes!
  // if (peer && peer.id !== meuId) destroyPeer();

  // Se já existe peer com mesmo ID E já está aberto, só retorna!
  if (peer && peer.id === meuId && peer.open) return peer;

  // Se existe peer mas não está aberto ainda (edge case), destrua para evitar inconsistência
  // if (peer) destroyPeer();

  const res = await fetch('https://webrtc.jobsconnect.com.br/token');
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

  // Promise para aguardar peer open
  peerReadyPromise = new Promise<void>((resolve) => {
    peerReadyResolve = resolve;
    peer!.once("open", () => resolve());
    peer!.once("error", (err) => {
      console.error("Erro no peer:", err);
      resolve();
    });
    // DICA: você pode também ouvir "close" para resolver
    peer!.once("close", () => resolve());
  });

  return peer;
};

export const getPeer = (): Peer | null => peer;

// Novo export: Promise que resolve quando peer estiver aberto
export const waitPeerOpen = async (): Promise<void> => {
  if (!peer) throw new Error("Peer não iniciado!");
  if (peer.open) return;

  // Se o peer for destruído antes de abrir, não fique preso!
  let erroHandler: any;
  let closeHandler: any;

  const erroPromise = new Promise<void>((_, reject) => {
    erroHandler = (err: any) => reject(err);
    closeHandler = () => reject(new Error("Peer destruído antes de abrir."));
    peer!.once("error", erroHandler);
    peer!.once("close", closeHandler);
  });

  await Promise.race([
    peerReadyPromise,
    erroPromise
  ]);

  // Cleanup handlers
  if (peer) {
    peer.off("error", erroHandler);
    peer.off("close", closeHandler);
  }
};



