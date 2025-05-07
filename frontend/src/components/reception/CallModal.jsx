'use client';

import { useEffect, useRef, useState } from 'react';

export default function CallModal({ 
  isVisible, 
  setIsVisible,
  status,
  setStatus,
  callerName,
  setCallerName,
  currentTarget,
  setCurrentTarget,
  isBusy,
  setIsBusy,
  showAcceptButton,
  setShowAcceptButton,
  showEndButton,
  setShowEndButton,
  socket
}) {
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);
  const [callTime, setCallTime] = useState('00:00');
  const callTimerRef = useRef(null);
  const callSecondsRef = useRef(0);

  useEffect(() => {
    if (!socket) return;

    socket.on("signal", async ({ from, data }) => {
      if (data.offer) {
        const friendlyName = getFriendlyName(from);
        setCallerName(friendlyName);

        if (isBusy) {
          socket.emit("signal", { to: from, data: { busy: true } });
          return;
        }
        
        setCurrentTarget(from);
        
        // Criar conexão peer se não existir
        if (!pcRef.current) {
          pcRef.current = createPeerConnection();
        }
        
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        setStatus("Recebendo chamada de");
        setIsVisible(true);
        setShowAcceptButton(true);
        setShowEndButton(true);

        // Adicionar animação de chamada
        const callAnimation = document.querySelector('.call-animation');
        if (callAnimation) {
          callAnimation.classList.add('ringing');
        }
      } else if (data.answer && pcRef.current) {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        startCallTimer();
      } else if (data.candidate && pcRef.current?.remoteDescription) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      } else if (data.busy) {
        setStatus("Ocupado");
        setCallerName(getFriendlyName(from));
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        setShowAcceptButton(false);
        setShowEndButton(false);
      }
    });

    socket.on("end-call", () => {
      endCurrentCall();
    });

    return () => {
      socket.off("signal");
      socket.off("end-call");
    };
  }, [socket, isBusy]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    };
  }, []);

  const createPeerConnection = () => {
    const newPc = new RTCPeerConnection({ 
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }] 
    });
    
    newPc.ontrack = event => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };
    
    newPc.onicecandidate = event => {
      if (event.candidate && currentTarget && socket) {
        socket.emit("signal", { 
          to: currentTarget, 
          data: { candidate: event.candidate } 
        });
      }
    };
    
    return newPc;
  };

  const setupLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      if (pcRef.current) {
        stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
      }
      
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar mídia:", err);
    }
  };

  const startCallTimer = () => {
    callSecondsRef.current = 0;
    setCallTime('00:00');
    
    const callAnimation = document.querySelector('.call-animation');
    if (callAnimation) {
      callAnimation.classList.remove('ringing');
      callAnimation.classList.add('in-call');
    }

    callTimerRef.current = setInterval(() => {
      callSecondsRef.current++;
      const minutes = Math.floor(callSecondsRef.current / 60);
      const seconds = callSecondsRef.current % 60;
      setCallTime(
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
  };

  const getFriendlyName = (id) => {
    const map = {
      suite1: "Suíte 01 - BLACK",
      suite2: "Suíte 02 - ROYAL",
      suite3: "Suíte 03 - PREMIUM",
      lavanderia: "Lavanderia",
      restaurante: "Restaurante"
    };
    return map[id] || id;
  };

  const handleAcceptCall = async () => {
    setIsBusy(true);
    
    if (!streamRef.current) {
      await setupLocalStream();
    }
    
    if (pcRef.current) {
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      
      if (socket && currentTarget) {
        socket.emit("signal", { to: currentTarget, data: { answer } });
      }
      
      setStatus("Chamada em andamento com");
      setShowAcceptButton(false);
      startCallTimer();
    }
  };

  const handleEndCall = () => {
    if (socket) {
      socket.emit("end-call");
    }
    endCurrentCall();
  };

  const endCurrentCall = () => {
    setIsBusy(false);
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = createPeerConnection();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    
    setIsVisible(false);
    setStatus("Status da chamada");
    setCallerName("Nenhuma");
    setShowAcceptButton(false);
    setShowEndButton(false);

    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    const callAnimation = document.querySelector('.call-animation');
    if (callAnimation) {
      callAnimation.classList.remove('ringing');
      callAnimation.classList.remove('in-call');
    }
  };

  const handleCloseModal = () => {
    if (isBusy) {
      if (confirm("Deseja encerrar a chamada?")) {
        if (socket) {
          socket.emit("end-call");
        }
        endCurrentCall();
      }
    } else {
      setIsVisible(false);
    }
  };

  return (
    <>
      <audio id="localAudio" ref={localAudioRef} autoPlay muted></audio>
      <audio id="remoteAudio" ref={remoteAudioRef} autoPlay></audio>
      
      <div className={`modal modal--call ${isVisible ? 'modal--visible' : ''}`} id="callModal">
        <div className="modal__container">
          <div className="modal__header">
            <h3 className="modal__title">Chamada</h3>
            <button className="modal__close" onClick={handleCloseModal}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="modal__content">
            <div className="call-animation">
              <div className="call-icon">
                <ion-icon name="call"></ion-icon>
              </div>
              <div className="call-waves"></div>
            </div>
            <p className="modal__status" id="callStatus">{status}</p>
            <p className="caller-name" id="callerName">{callerName}</p>
            <div className="call-timer">{callTime}</div>
          </div>
          <div className="modal__actions">
            {showAcceptButton && (
              <button 
                className="modal__button--icon modal__button--accept" 
                onClick={handleAcceptCall}
              >
                <ion-icon name="call"></ion-icon>
                <span>Atender</span>
              </button>
            )}
            {showEndButton && (
              <button 
                className="modal__button--icon modal__button--end" 
                onClick={handleEndCall}
              >
                <ion-icon name="call"></ion-icon>
                <span>Encerrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}