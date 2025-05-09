'use client';

import { useState } from 'react';

export function LightingSection() {
  const [lights, setLights] = useState({
    bedroom: { on: true, brightness: 80 },
    bathroom: { on: true, brightness: 60 },
    relax: { on: true, brightness: 40 },
    ambient: { on: true, color: 'purple' }
  });

  const handleBrightnessChange = (zone, value) => {
    setLights(prev => ({
      ...prev,
      [zone]: {
        ...prev[zone],
        brightness: value
      }
    }));
  };

  const handleToggleLight = (zone) => {
    setLights(prev => ({
      ...prev,
      [zone]: {
        ...prev[zone],
        on: !prev[zone].on
      }
    }));
  };

  const handleColorChange = (color) => {
    setLights(prev => ({
      ...prev,
      ambient: {
        ...prev.ambient,
        color
      }
    }));
  };

  const toggleAllLights = () => {
    // Check if at least one light is on
    const anyLightOn = Object.values(lights).some(light => light.on);
    
    // Turn all lights on or off accordingly
    const newLightsState = {};
    Object.keys(lights).forEach(zone => {
      newLightsState[zone] = {
        ...lights[zone],
        on: !anyLightOn
      };
    });
    
    setLights(newLightsState);
  };

  return (
    <section className="content__section" id="lighting-section">
      <div className="section__header">
        <h2 className="section__title">Controle de Iluminação</h2>
        <div className="section__actions">
          <button className="btn btn--outline" id="btn-all-lights" onClick={toggleAllLights}>
            <ion-icon name="power-outline"></ion-icon>
            Todas as Luzes
          </button>
        </div>
      </div>
      
      <div className="lighting-grid">
        <div className="lighting-card">
          <div className="lighting-card__icon">
            <ion-icon name="bed-outline"></ion-icon>
          </div>
          <div className="lighting-card__content">
            <h3>Quarto Principal</h3>
            <div className="lighting-card__slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={lights.bedroom.brightness} 
                className="slider" 
                id="bedroom-light"
                onChange={(e) => handleBrightnessChange('bedroom', parseInt(e.target.value))}
              />
              <span className="slider-value">{lights.bedroom.brightness}%</span>
            </div>
          </div>
          <div className="lighting-card__toggle">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={lights.bedroom.on}
                onChange={() => handleToggleLight('bedroom')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="lighting-card">
          <div className="lighting-card__icon">
            <ion-icon name="water-outline"></ion-icon>
          </div>
          <div className="lighting-card__content">
            <h3>Banheiro</h3>
            <div className="lighting-card__slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={lights.bathroom.brightness} 
                className="slider" 
                id="bathroom-light"
                onChange={(e) => handleBrightnessChange('bathroom', parseInt(e.target.value))}
              />
              <span className="slider-value">{lights.bathroom.brightness}%</span>
            </div>
          </div>
          <div className="lighting-card__toggle">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={lights.bathroom.on}
                onChange={() => handleToggleLight('bathroom')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="lighting-card">
          <div className="lighting-card__icon">
            <ion-icon name="wine-outline"></ion-icon>
          </div>
          <div className="lighting-card__content">
            <h3>Área de Relaxamento</h3>
            <div className="lighting-card__slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={lights.relax.brightness} 
                className="slider" 
                id="relax-light"
                onChange={(e) => handleBrightnessChange('relax', parseInt(e.target.value))}
              />
              <span className="slider-value">{lights.relax.brightness}%</span>
            </div>
          </div>
          <div className="lighting-card__toggle">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={lights.relax.on}
                onChange={() => handleToggleLight('relax')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="lighting-card">
          <div className="lighting-card__icon">
            <ion-icon name="color-palette-outline"></ion-icon>
          </div>
          <div className="lighting-card__content">
            <h3>Iluminação Ambiente</h3>
            <div className="lighting-card__colors">
              {['red', 'blue', 'green', 'purple', 'orange'].map(color => (
                <div 
                  key={color}
                  className={`color-option color-option--${color} ${lights.ambient.color === color ? 'active' : ''}`}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="lighting-card__toggle">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={lights.ambient.on}
                onChange={() => handleToggleLight('ambient')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}