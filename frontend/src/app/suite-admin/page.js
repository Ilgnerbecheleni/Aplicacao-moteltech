'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/suite-admin/Sidebar';
import Header from '@/components/suite-admin/Header';

import '../../../styles/suite-admin.css'

export default function SuiteAdmin() {
  const [temperature, setTemperature] = useState(22);
  const [isDndActive, setIsDndActive] = useState(false);
  const [areLightsOn, setAreLightsOn] = useState(true);
  const [doorStatus, setDoorStatus] = useState('Fechada');
  const [currentTime, setCurrentTime] = useState('00:00');

  useEffect(() => {
    // Atualização do relógio
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // Obtém estado inicial das luzes
    const fetchInitialLightState = async () => {
      try {
        const response = await fetch('/api/haproxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: '/states/switch.esp32_com_mcp23017_mcp23017_saida_7',
            data: null
          })
        });

        const data = await response.json();
        setAreLightsOn(data.state === 'on');
      } catch (error) {
        console.error('Erro ao obter estado inicial do switch:', error);
      }
    };

    fetchInitialLightState();

    return () => clearInterval(timeInterval);
  }, []);

  const handleToggleLights = async () => {
    const newState = !areLightsOn;
    const service = newState ? 'turn_on' : 'turn_off';

    try {
      await fetch('/api/haproxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: `/services/switch/${service}`,
          data: {
            entity_id: 'switch.esp32_com_mcp23017_mcp23017_saida_7'
          }
        })
      });

      setAreLightsOn(newState);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

  const handleTemperatureChange = (amount) => {
    setTemperature(prev => prev + amount);
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <main className="content">
        <Header currentTime={currentTime} />

        <div className="content__container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-card__content">
                <h2>Bem-vindo ao Motel Medieval</h2>
                <p>Esperamos que tenha uma estadia agradável. Use o painel de controle para gerenciar todos os recursos da sua suíte.</p>
              </div>
              <div className="welcome-card__image">
                <i className="icon icon-bed-large"></i>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <div className="section__header">
              <h2 className="section__title">Ações Rápidas</h2>
            </div>
            <div className="actions-grid">
              {/* Door Sensor Card */}
              <div className="action-card" id="action-door">
                <div className="action-card__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bb86fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>
                    <path d="M2 20h20"/>
                    <path d="M14 12v.01"/>
                  </svg>
                </div>
                <div className="action-card__content">
                  <h3>Status da Porta</h3>
                  <p id="door-status">{doorStatus}</p>
                  <div className="status-indicator-container">
                    <span className="status-indicator status-indicator--closed"></span>
                  </div>
                </div>
              </div>

              {/* Do Not Disturb Card */}
              <div className="action-card" id="action-dnd">
                <div className="action-card__icon">
                  <i className="icon icon-moon"></i>
                </div>
                <div className="action-card__content">
                  <h3>Não Pertube</h3>
                  <p>Ativar modo não perturbe</p>
                </div>
                <div className="action-card__toggle">
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      id="toggle-dnd" 
                      checked={isDndActive}
                      onChange={() => setIsDndActive(!isDndActive)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              {/* Lights Card */}
              <div className="action-card" id="action-lights" style={{ opacity: areLightsOn ? 1 : 0.5 }}>
                <div className="action-card__icon">
                  <i className="icon icon-bulb"></i>
                </div>
                <div className="action-card__content">
                  <h3>Iluminação</h3>
                  <p>Controlar luzes da suíte</p>
                </div>
                <div className="action-card__toggle">
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      id="toggle-lights"
                      checked={areLightsOn}
                      onChange={handleToggleLights}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              {/* Climate Card */}
              <div className="action-card" id="action-climate">
                <div className="action-card__icon">
                  <i className="icon icon-thermometer"></i>
                </div>
                <div className="action-card__content">
                  <h3>Temperatura</h3>
                  <p>{temperature}°C</p>
                </div>
                <div className="action-card__controls">
                  <button 
                    className="btn btn--icon btn--small" 
                    id="temp-down"
                    onClick={() => handleTemperatureChange(-1)}
                  >
                    <i className="icon icon-remove"></i>
                  </button>
                  <button 
                    className="btn btn--icon btn--small" 
                    id="temp-up"
                    onClick={() => handleTemperatureChange(1)}
                  >
                    <i className="icon icon-add"></i>
                  </button>
                </div>
              </div>
              
              {/* Housekeeping Card */}
              <div className="action-card" id="action-housekeeping">
                <div className="action-card__icon">
                  <i className="icon icon-sparkles"></i>
                </div>
                <div className="action-card__content">
                  <h3>Limpeza</h3>
                  <p>Solicitar serviço de limpeza</p>
                </div>
                <div className="action-card__button">
                  <button className="btn btn--primary btn--small">Solicitar</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}