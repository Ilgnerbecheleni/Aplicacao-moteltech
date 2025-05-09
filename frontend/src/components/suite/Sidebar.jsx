'use client';

export function Sidebar({ activeSection, onNavigate, isOpen }) {
  const menuItems = [
    { id: 'home', icon: 'home-outline', label: 'Início' },
    { id: 'telephony', icon: 'call-outline', label: 'Telefonia' },
    { id: 'lights', icon: 'bulb-outline', label: 'Iluminação' },
    { id: 'climate', icon: 'snow-outline', label: 'Climatização' },
    { id: 'tv', icon: 'tv-outline', label: 'TV' },
    { id: 'audio', icon: 'volume-high-outline', label: 'Áudio' },
    { id: 'restaurant', icon: 'restaurant-outline', label: 'Restaurante' }
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__logo">
        <ion-icon name="bed-outline"></ion-icon>
        <span className="logo-text">Moteltech</span>
      </div>
      
      <nav className="sidebar__navigation">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`item ${activeSection === item.id ? 'active' : ''}`}
            id={`nav-${item.id}`}
            onClick={() => onNavigate(item.id)}
          >
            <ion-icon name={item.icon}></ion-icon>
            <span className="item-label">{item.label}</span>
          </div>
        ))}
      </nav>
      
      <div className="sidebar__footer">
        <div className="item">
          <ion-icon name="help-circle-outline"></ion-icon>
          <span className="item-label">Ajuda</span>
        </div>
      </div>
    </aside>
  );
}