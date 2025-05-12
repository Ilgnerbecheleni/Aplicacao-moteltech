'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home');

  const handleNavClick = (id) => {
    setActiveItem(id);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <i className="icon icon-bed"></i>
        <span className="logo-text">Moteltech</span>
      </div>
      <nav className="sidebar__navigation">
        <div 
          className={`item ${activeItem === 'home' ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <i className="icon icon-home"></i>
          <span className="item-label">Início</span>
        </div>
        <div 
          className={`item ${activeItem === 'telephony' ? 'active' : ''}`} 
          id="nav-telephony"
          onClick={() => handleNavClick('telephony')}
        >
          <i className="icon icon-call"></i>
          <span className="item-label">Telefonia</span>
        </div>
        <div 
          className={`item ${activeItem === 'lights' ? 'active' : ''}`} 
          id="nav-lights"
          onClick={() => handleNavClick('lights')}
        >
          <i className="icon icon-bulb"></i>
          <span className="item-label">Iluminação</span>
        </div>
        <div 
          className={`item ${activeItem === 'climate' ? 'active' : ''}`} 
          id="nav-climate"
          onClick={() => handleNavClick('climate')}
        >
          <i className="icon icon-snow"></i>
          <span className="item-label">Climatização</span>
        </div>
        <div 
          className={`item ${activeItem === 'tv' ? 'active' : ''}`} 
          id="nav-tv"
          onClick={() => handleNavClick('tv')}
        >
          <i className="icon icon-tv"></i>
          <span className="item-label">TV</span>
        </div>
        <div 
          className={`item ${activeItem === 'audio' ? 'active' : ''}`} 
          id="nav-audio"
          onClick={() => handleNavClick('audio')}
        >
          <i className="icon icon-volume"></i>
          <span className="item-label">Áudio</span>
        </div>
        <div 
          className={`item ${activeItem === 'restaurant' ? 'active' : ''}`} 
          id="nav-restaurant"
          onClick={() => handleNavClick('restaurant')}
        >
          <i className="icon icon-restaurant"></i>
          <span className="item-label">Restaurante</span>
        </div>
      </nav>
      <div className="sidebar__footer">
        <div className="item">
          <i className="icon icon-help"></i>
          <span className="item-label">Ajuda</span>
        </div>
      </div>
    </aside>
  );
}