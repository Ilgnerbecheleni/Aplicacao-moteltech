'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [callStatus, setCallStatus] = useState("Status da chamada");
  const [callTimer, setCallTimer] = useState("00:00");
  const [isRinging, setIsRinging] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  
  const socketRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);
  const offerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const callSecondsRef = useRef(0);
  
  useEffect(() => {
    // Inicializa o socket apenas no cliente
    if (typeof window !== 'undefined') {
      socketRef.current = io();
      socketRef.current.emit("register", "lavanderia");
      
      setupSocketListeners();
    }
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      endCall();
    };
  }, []);
  
  const setupSocketListeners = () => {
    socketRef.current.on("call", handleIncomingCall);
    socketRef.current.on("signal", handleSignal);
    socketRef.current.on("end-call", endCall);
  };
  
  const createPeerConnection = () => {
    if (typeof window === 'undefined') return null;
    
    const pc = new RTCPeerConnection({ 
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }] 
    });
    
    pc.ontrack = event => {
      const remoteAudio = document.getElementById("remoteAudio");
      if (remoteAudio) {
        remoteAudio.srcObject = event.streams[0];
      }
    };
    
    pc.onicecandidate = event => {
      if (event.candidate && currentTarget) {
        socketRef.current.emit("signal", { 
          to: currentTarget, 
          data: { candidate: event.candidate } 
        });
      }
    };
    
    return pc;
  };
  
  const handleIncomingCall = async ({ from }) => {
    if (isBusy) {
      socketRef.current.emit("signal", { to: from, data: { busy: true } });
      return;
    }
    
    setCurrentTarget(from);
    setCallStatus(`Recebendo chamada de ${from}`);
    setShowCallModal(true);
    setShowAcceptButton(true);
    setShowEndButton(true);
    setIsRinging(true);
  };
  
  const handleSignal = async ({ from, data }) => {
    if (!pcRef.current) {
      pcRef.current = createPeerConnection();
    }
    
    if (data.offer) {
      offerRef.current = data.offer;
    } else if (data.answer && pcRef.current) {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      startCallTimer();
    } else if (data.candidate && pcRef.current && pcRef.current.remoteDescription) {
      await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    } else if (data.busy) {
      setCallStatus(`${from} está ocupado.`);
      setTimeout(() => {
        setShowCallModal(false);
      }, 3000);
      setShowAcceptButton(false);
      setShowEndButton(true);
    }
  };
  
  const setupLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      if (pcRef.current) {
        stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
      }
      
      const localAudio = document.getElementById("localAudio");
      if (localAudio) {
        localAudio.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
      setCallStatus('Erro ao acessar o microfone');
    }
  };
  
  const startCallTimer = () => {
    callSecondsRef.current = 0;
    setCallTimer('00:00');
    setIsRinging(false);
    setInCall(true);
    
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      callSecondsRef.current++;
      const minutes = Math.floor(callSecondsRef.current / 60);
      const seconds = callSecondsRef.current % 60;
      setCallTimer(
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
  };
  
  const acceptCall = async () => {
    if (!offerRef.current) return;
    
    setIsBusy(true);
    await setupLocalStream();
    
    if (!pcRef.current) {
      pcRef.current = createPeerConnection();
    }
    
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(offerRef.current));
    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);
    
    socketRef.current.emit("signal", { 
      to: currentTarget, 
      data: { answer } 
    });
    
    setCallStatus(`Chamada em andamento com ${currentTarget}`);
    setShowAcceptButton(false);
    startCallTimer();
  };
  
  const startCall = async (to) => {
    if (isBusy) {
      alert("Lavanderia ocupada.");
      return;
    }
    
    setIsBusy(true);
    setCurrentTarget(to);
    setCallStatus(`Chamando ${to}...`);
    
    await setupLocalStream();
    
    if (!pcRef.current) {
      pcRef.current = createPeerConnection();
    }
    
    const offerDescription = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offerDescription);
    
    socketRef.current.emit("call", { to });
    socketRef.current.emit("signal", { 
      to, 
      data: { offer: offerDescription } 
    });
    
    setShowCallModal(true);
    setShowAcceptButton(false);
    setShowEndButton(true);
    setIsRinging(true);
  };
  
  const endCall = () => {
    setIsBusy(false);
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = createPeerConnection();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    
    setShowCallModal(false);
    setCallStatus("Status da chamada");
    setShowAcceptButton(false);
    setShowEndButton(false);
    offerRef.current = null;
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    setIsRinging(false);
    setInCall(false);
    setCallTimer('00:00');
  };
  
  return (
    <SocketContext.Provider value={{
      callStatus,
      callTimer,
      isRinging,
      inCall,
      isBusy,
      showCallModal,
      showAcceptButton,
      showEndButton,
      currentTarget,
      startCall,
      acceptCall,
      endCall,
      setShowCallModal
    }}>
      {children}
      <audio id="localAudio" autoPlay muted></audio>
      <audio id="remoteAudio" autoPlay></audio>
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);