'use client';

import { useState } from 'react';

export function QuickActions({ temperature, onTemperatureChange }) {
  const [isDndActive, setIsDndActive] = useState(false);
  const [isLightsOn, setLightsOn] = useState(true);

  return (
    <section className="quick-actions">
      <div className="section__header">
        <h2 className="section__title">Ações Rápidas</h2>
      </div>
      <div className="actions-grid">
        <div className="action-card" id="action-dnd">
          <div className="action-card__icon">
            <ion-icon name="moon-outline"></ion-icon>
          </div>
          <div className="action-card__content">
            <h3>Não Perturbe</h3>
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
        
        <div className="action-card" id="action-lights">
          <div className="action-card__icon">
            <ion-icon name="bulb-outline"></ion-icon>
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
                checked={isLightsOn}
                onChange={() => setLightsOn(!isLightsOn)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="action-card" id="action-climate">
          <div className="action-card__icon">
            <ion-icon name="thermometer-outline"></ion-icon>
          </div>
          <div className="action-card__content">
            <h3>Temperatura</h3>
            <p>{temperature}°C</p>
          </div>
          <div className="action-card__controls">
            <button 
              className="btn btn--icon btn--small" 
              id="temp-down"
              onClick={() => onTemperatureChange(-1)}
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <button 
              className="btn btn--icon btn--small" 
              id="temp-up"
              onClick={() => onTemperatureChange(1)}
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
        
        <div className="action-card" id="action-housekeeping">
          <div className="action-card__icon">
            <ion-icon name="sparkles-outline"></ion-icon>
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
  );
}