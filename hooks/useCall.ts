'use client';

import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:3001'); // ajuste para sua URL de produção

export function useCall(localRamal: string) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callInfo, setCallInfo] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [emLigacao, setEmLigacao] = useState(false);
  const peerRef = useRef<any>(null);

  useEffect(() => {
    socket.emit('join', { ramal: localRamal });

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(setStream)
      .catch((err) => console.error('Erro ao acessar microfone:', err));

    socket.on('incoming-call', ({ from, offer }) => {
      setCallInfo({ from, offer });
    });

    socket.on('call-answered', ({ answer }) => {
      peerRef.current?.signal(answer);
    });

    socket.on('ice-candidate', ({ candidate }) => {
      peerRef.current?.signal(candidate);
    });

    return () => {
      socket.disconnect();
    };
  }, [localRamal]);

  const call = (toRamal: string) => {
    if (!stream) return;

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('call', { to: toRamal, offer: data });
    });

    peer.on('stream', (remote) => {
      setRemoteStream(remote);
      const audio = new Audio();
      audio.srcObject = remote;
      audio.play();
    });

    peer.on('connect', () => {
      setEmLigacao(true);
    });

    peer.on('close', () => {
      setEmLigacao(false);
    });

    peerRef.current = peer;
  };

  const answer = () => {
    if (!stream || !callInfo) return;

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answer', { to: callInfo.from, answer: data });
    });

    peer.on('stream', (remote) => {
      setRemoteStream(remote);
      const audio = new Audio();
      audio.srcObject = remote;
      audio.play();
    });

    peer.on('connect', () => {
      setEmLigacao(true);
    });

    peer.on('close', () => {
      setEmLigacao(false);
    });

    peer.signal(callInfo.offer);
    peerRef.current = peer;
  };

  const endCall = () => {
    peerRef.current?.destroy();
    setEmLigacao(false);
    setCallInfo(null);
    setRemoteStream(null);
  };

  return {
    call,
    answer,
    endCall,
    callInfo,
    emLigacao,
    remoteStream
  };
}
