'use client';

export function Header({ title, onToggleSidebar }) {
  return (
    <header className="content__header">
      <div className="header__left">
        <button className="btn btn--icon sidebar-toggle" onClick={onToggleSidebar}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__right">
        <div className="time-display">
          <ion-icon name="time-outline"></ion-icon>
          <span id="current-time">00:00</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <span className="user-name">Hóspede</span>
        </div>
      </div>
    </header>
  );
}