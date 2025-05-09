'use client';

import { useState } from 'react';

export function ClimateSection({ temperature, onTemperatureChange }) {
  const [mode, setMode] = useState('cooling');
  const [fanSpeed, setFanSpeed] = useState('low');
  
  const fanSpeedOptions = [
    { id: 'low', label: 'Baixa' },
    { id: 'medium', label: 'Média' },
    { id: 'high', label: 'Alta' },
    { id: 'auto', label: 'Auto' }
  ];
  
  const climateModes = [
    { id: 'cooling', icon: 'snow-outline', label: 'Refrigeração' },
    { id: 'heating', icon: 'flame-outline', label: 'Aquecimento' },
    { id: 'dehumidify', icon: 'water-outline', label: 'Desumidificação' },
    { id: 'ventilation', icon: 'refresh-outline', label: 'Ventilação' }
  ];

  return (
    <section className="content__section" id="climate-section">
      <div className="section__header">
        <h2 className="section__title">Controle de Climatização</h2>
      </div>
      
      <div className="climate-control">
        <div className="temperature-display">
          <div className="temperature-circle">
            <div className="temperature-value">{temperature}°C</div>
            <div className="temperature-status">Temperatura Atual</div>
          </div>
          <div className="temperature-controls">
            <button 
              className="btn btn--icon btn--large" 
              id="temp-down-large"
              onClick={() => onTemperatureChange(-1)}
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <button 
              className="btn btn--icon btn--large" 
              id="temp-up-large"
              onClick={() => onTemperatureChange(1)}
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
        
        <div className="climate-options">
          {climateModes.map(climateMode => (
            <div className="climate-option" key={climateMode.id}>
              <div className="climate-option__icon">
                <ion-icon name={climateMode.icon}></ion-icon>
              </div>
              <div className="climate-option__label">{climateMode.label}</div>
              <div className="climate-option__toggle">
                <label className="toggle">
                  <input 
                    type="radio" 
                    name="climate-mode" 
                    checked={mode === climateMode.id}
                    onChange={() => setMode(climateMode.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="fan-speed">
          <h3>Velocidade do Ventilador</h3>
          <div className="fan-speed__options">
            {fanSpeedOptions.map(option => (
              <button 
                key={option.id}
                className={`fan-speed__option ${fanSpeed === option.id ? 'active' : ''}`}
                onClick={() => setFanSpeed(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}