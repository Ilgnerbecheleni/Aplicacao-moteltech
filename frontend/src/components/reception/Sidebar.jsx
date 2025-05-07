'use client';

import Link from 'next/link';

export default function Sidebar({ isExpanded }) {
  return (
    <aside className={`sidebar ${isExpanded ? 'sidebar--expanded' : ''}`}>
      <div className="sidebar__logo">
        <ion-icon name="home-outline"></ion-icon>
        <span className="logo-text">Moteltech</span>
      </div>
      <nav className="sidebar__navigation">
        <div className="item active">
          <ion-icon name="home-outline"></ion-icon>
          <span className="item-label">Recepção</span>
        </div>
        <div className="item">
          <ion-icon name="call-outline"></ion-icon>
          <span className="item-label">Chamadas</span>
        </div>
        <div className="item">
          <ion-icon name="bulb-outline"></ion-icon>
          <span className="item-label">Iluminação</span>
        </div>
        <div className="item">
          <ion-icon name="snow-outline"></ion-icon>
          <span className="item-label">Climatização</span>
        </div>
        <div className="item">
          <ion-icon name="tv-outline"></ion-icon>
          <span className="item-label">TV</span>
        </div>
        <div className="item">
          <ion-icon name="volume-high-outline"></ion-icon>
          <span className="item-label">Áudio</span>
        </div>
        <div className="item">
          <ion-icon name="play-outline"></ion-icon>
          <span className="item-label">Mídia</span>
        </div>
        <Link href="/restaurante" className="item">
          <ion-icon name="restaurant-outline"></ion-icon>
          <span className="item-label">Restaurante</span>
        </Link>
      </nav>
      <div className="sidebar__footer">
        <div className="item">
          <ion-icon name="log-out-outline"></ion-icon>
          <span className="item-label">Sair</span>
        </div>
      </div>
    </aside>
  );
}