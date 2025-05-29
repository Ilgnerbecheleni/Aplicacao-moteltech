
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/suite-admin/Sidebar';
import Header from '@/components/suite-admin/Header';

import '../../../../styles/suite-admin.css';
import CardTv from '@/components/suite-admin/CardTv/CardTv';
import CardLamp from '@/components/suite-admin/CardLamp/CardLamp';

export default function SuiteAdmin() {
  const [suite, setSuite] = useState(null);
  const [nome ,setNome] = useState("nome")
  const [temperature, setTemperature] = useState(22);
  const [isDndActive, setIsDndActive] = useState(false);
  const [areLightsOn, setAreLightsOn] = useState(true);
  const [doorStatus, setDoorStatus] = useState('Fechada');
  const [currentTime, setCurrentTime] = useState('00:00');

  const params = useParams();
  const suiteId = params?.id;

  useEffect(() => {
    async function fetchSuiteDetails() {
      try {
        const res = await fetch(`/api/suites/${suiteId}`);
        const data = await res.json();
        setSuite(data);
        setNome(data.nome);
        console.log(data)
      } catch (err) {
        console.error('Erro ao buscar dados da suíte:', err);
      }
    }

    if (suiteId) fetchSuiteDetails();
  }, [suiteId]);

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleToggleLights = async () => {
    const newState = !areLightsOn;
    const service = newState ? 'turn_on' : 'turn_off';

    try {
      await fetch('/api/haproxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: `/services/switch/${service}`,
          data: {
            entity_id: 'switch.esp32_com_mcp23017_mcp23017_saida_7',
          },
        }),
      });

      setAreLightsOn(newState);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

  const handleTemperatureChange = (amount) => {
    setTemperature((prev) => prev + amount);
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="content">
        <Header currentTime={currentTime} name ={nome}/>

        <div className="content__container">
          <section className="welcome-section">
            <div className="welcome-card">
             <div className="welcome-card__content">
  <h2>{suite ? `Suíte ${suite.nome}` : 'Carregando...'}</h2>
  <p>Use o painel abaixo para gerenciar todos os recursos da suíte.</p>
  {suite && (
    <p><strong>Ramal:</strong> {suite.ramal} &nbsp; | &nbsp; <strong>Status:</strong> {suite.status}</p>
  )}
  <button className="btn-call-reception" onClick={() => alert('Recepção foi chamada.')}>
    Chamar Recepção
  </button>
</div>


            </div>
          </section>

          {/* Ações rápidas mantidas */}
         <section className="quick-actions">
  <div className="section__header">
    <h2 className="section__title">Ações Rápidas</h2>
  </div>
 <div className="actions-grid">
  <CardLamp />
  <CardTv />
</div>
</section>

        </div>
      </main>
    </div>
  );
}
