// services/peerService.ts
import Peer, { PeerJSOption } from 'peerjs';

let peer: Peer | null = null;

export const connectPeer = (id: string): Peer => {
  const options: PeerJSOption = {
    host: 'webrtc.jobsconnect.com.br', // troque para seu domínio!
    port: 3000,
    path: '/peerjs',
    secure: false, // se usar HTTPS, mude para true
  };

  peer = new Peer(id, options);

  return peer;
};

export const getPeer = (): Peer | null => peer;
