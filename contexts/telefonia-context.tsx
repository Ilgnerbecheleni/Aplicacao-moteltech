'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useCall } from '@/hooks/useCall';

export type StatusTelefonia = 'idle' | 'chamando' | 'recebendo' | 'em_chamada';

interface DadosChamada {
  numero?: string;
  nome?: string;
  ramal?: string;
  duracao?: number;
  tipo?: 'entrada' | 'saida';
}

interface TelefoniaContextType {
  status: StatusTelefonia;
  dadosChamada: DadosChamada | null;
  modalAberto: boolean;
  iniciarChamada: (dados: DadosChamada) => void;
  receberChamada: (dados: DadosChamada) => void;
  atenderChamada: () => void;
  encerrarChamada: () => void;
  abrirModal: () => void;
  fecharModal: () => void;
}

const TelefoniaContext = createContext<TelefoniaContextType | undefined>(
  undefined
);

export function TelefoniaProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<StatusTelefonia>('idle');
  const [dadosChamada, setDadosChamada] = useState<DadosChamada | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [duracao, setDuracao] = useState(0);

  const {
    call,
    answer,
    endCall,
    callInfo,
    emLigacao,
  } = useCall(dadosChamada?.ramal || '');

  // Controlar contagem da duração da chamada
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === 'em_chamada') {
      interval = setInterval(() => {
        setDuracao((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  // Atualiza status quando o WebRTC conecta
  useEffect(() => {
    if (emLigacao) {
      setStatus('em_chamada');
    }
  }, [emLigacao]);

  // Quando alguém te liga (WebRTC), abre o modal
  useEffect(() => {
    if (callInfo && status !== 'em_chamada') {
      setStatus('recebendo');
      setDadosChamada({
        nome: 'Ramal Desconhecido',
        ramal: 'Desconhecido',
        tipo: 'entrada',
      });
      setModalAberto(true);
      setDuracao(0);
    }
  }, [callInfo]);

  const iniciarChamada = (dados: DadosChamada) => {
    setStatus('chamando');
    setDadosChamada({ ...dados, tipo: 'saida' });
    setModalAberto(true);
    call(dados.ramal || '');
    setDuracao(0);
  };

  const atenderChamada = () => {
    setStatus('em_chamada');
    answer();
    setDuracao(0);
  };

  const encerrarChamada = () => {
    setStatus('idle');
    endCall();
    setDadosChamada(null);
    setModalAberto(false);
    setDuracao(0);
  };

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  return (
    <TelefoniaContext.Provider
      value={{
        status,
        dadosChamada: dadosChamada ? { ...dadosChamada, duracao } : null,
        modalAberto,
        iniciarChamada,
        receberChamada: () => {}, // não é mais necessário diretamente
        atenderChamada,
        encerrarChamada,
        abrirModal,
        fecharModal,
      }}
    >
      {children}
    </TelefoniaContext.Provider>
  );
}

export function useTelefonia() {
  const context = useContext(TelefoniaContext);
  if (context === undefined) {
    throw new Error(
      'useTelefonia deve ser usado dentro de um TelefoniaProvider'
    );
  }
  return context;
}
