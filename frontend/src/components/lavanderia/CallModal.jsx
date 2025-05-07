'use client';

import { useSocket } from '../context/SocketContext';
import { Phone, X } from 'lucide-react';

export default function CallModal() {
  const { 
    showCallModal, 
    callStatus, 
    callTimer, 
    isRinging, 
    inCall, 
    showAcceptButton, 
    showEndButton, 
    acceptCall, 
    endCall, 
    setShowCallModal 
  } = useSocket();

  if (!showCallModal) return null;

  const handleClose = () => {
    if (inCall) {
      if (confirm("Deseja encerrar a chamada?")) {
        endCall();
      }
    } else {
      setShowCallModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Chamada</h3>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <div className={`relative mb-4 ${isRinging ? 'animate-pulse' : ''}`}>
            <div className="bg-blue-500 rounded-full p-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            
            {isRinging && (
              <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></div>
            )}
            
            {inCall && (
              <div className="absolute -inset-2 rounded-full border-2 border-blue-500 animate-pulse"></div>
            )}
          </div>
          
          <p className="text-center text-gray-700 mb-2">{callStatus}</p>
          <div className="text-lg font-medium">{callTimer}</div>
        </div>
        
        <div className="flex justify-center p-4 gap-4 border-t">
          {showAcceptButton && (
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={acceptCall}
            >
              <Phone className="h-5 w-5" />
              <span>Atender</span>
            </button>
          )}
          
          {showEndButton && (
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={endCall}
            >
              <Phone className="h-5 w-5" />
              <span>Encerrar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}