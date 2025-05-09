'use client';

import { useState, useEffect } from 'react';

export default function CallModal({ destination, onClose }) {
  const [callStatus, setCallStatus] = useState('Chamando...');
  const [callTime, setCallTime] = useState('00:00');
  const [isCallActive, setIsCallActive] = useState(false);
  let timer = null;

  const acceptCall = () => {
    setCallStatus(`Em chamada com ${destination}`);
    setIsCallActive(true);
    
    // Inicia o cronômetro da chamada
    let seconds = 0;
    timer = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setCallTime(`${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
  };

  const endCall = () => {
    if (timer) clearInterval(timer);
    onClose();
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

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
          <p className="modal__status" id="callStatus">{callStatus}</p>
          <div className="call-timer">{callTime}</div>
        </div>
        <div className="modal__actions">
          {!isCallActive && (
            <button 
              className="modal__button--icon modal__button--accept" 
              id="btnAcceptCall"
              onClick={acceptCall}
            >
              <ion-icon name="call"></ion-icon>
              <span>Atender</span>
            </button>
          )}
          <button 
            className="modal__button--icon modal__button--end" 
            id="btnEndCall"
            onClick={endCall}
          >
            <ion-icon name="call"></ion-icon>
            <span>Encerrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}