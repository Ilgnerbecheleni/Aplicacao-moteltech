'use client';

import { useState } from 'react';

export default function Header({ currentTime, name }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    // Adiciona ou remove a classe no sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('sidebar--expanded');
    }
  };

  return (
    <header className="content__header">
      <div className="header__left">
        <button 
          className="btn btn--icon sidebar-toggle"
          onClick={handleSidebarToggle}
        >
          <i className="icon icon-menu"></i>
        </button>
        <h1 className="header__title"> { name}</h1>
      </div>
      <div className="header__right">
        <div className="time-display">
          <i className="icon icon-time"></i>
          <span id="current-time">{currentTime}</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <i className="icon icon-person"></i>
          </div>
          <span className="user-name">Recepção</span>
        </div>
      </div>
    </header>
  );
}