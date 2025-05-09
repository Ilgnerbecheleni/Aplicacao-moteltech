'use client';

import { useState, useEffect } from 'react';

export function CallModal({ isOpen, status, onClose }) {
  const [callTime, setCallTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  
  useEffect(() => {
    let interval;
    
    if (isCallActive && isOpen) {
      interval = setInterval(() => {
        setCallTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isCallActive, isOpen]);
  
  // Reset timer when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCallTime(0);
      setIsCallActive(false);
    }
  }, [isOpen]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleAcceptCall = () => {
    setIsCallActive(true);
  };
  
  const handleEndCall = () => {
    setIsCallActive(false);
    setCallTime(0);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal modal--call" id="callModal">
      <div className="modal__container">
        <div className="modal__header">
          <h3 className="modal__title">Chamada</h3>
          <button className="modal__close" onClick={onClose}>
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
          <div className="call-timer">{formatTime(callTime)}</div>
        </div>
        <div className="modal__actions">
          {!isCallActive ? (
            <button 
              className="modal__button--icon modal__button--accept" 
              id="btnAcceptCall"
              onClick={handleAcceptCall}
            >
              <ion-icon name="call"></ion-icon>
              <span>Atender</span>
            </button>
          ) : null}
          <button 
            className="modal__button--icon modal__button--end" 
            id="btnEndCall"
            onClick={handleEndCall}
          >
            <ion-icon name="call"></ion-icon>
            <span>Encerrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}