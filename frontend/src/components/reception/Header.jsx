'use client';

export default function Header({ title, onToggleSidebar }) {
  return (
    <header className="content__header">
      <div className="header__left">
        <button className="btn btn--icon sidebar-toggle" onClick={onToggleSidebar}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__right">
        <div className="search-bar">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" placeholder="Buscar suítes..." />
        </div>
        <button className="btn btn--icon notification-btn">
          <ion-icon name="notifications-outline"></ion-icon>
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <span className="user-name">Recepcionista</span>
        </div>
      </div>
    </header>
  );
}