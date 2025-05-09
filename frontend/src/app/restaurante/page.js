'use client';

import { useState, useEffect } from 'react';
import { 
  restaurant, call, shirt, time, settings, logOut, menu, search, 
  notifications, person, arrowUp, arrowDown, checkmarkDone, cash, 
  filter, add, checkmark, bicycle, create, close
} from 'ionicons/icons';
import CallModal from '@/components/reception/CallModal';
import NewOrderModal from '@/components/restaurante/NewOrderModal';
import '../../../styles/restaurant.css'

export default function Restaurante() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [callDestination, setCallDestination] = useState('');
  const [activeMenuTab, setActiveMenuTab] = useState('Entradas');

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleCallToReception = () => {
    setCallDestination('Recepção');
    setShowCallModal(true);
  };

  const handleCallToLaundry = () => {
    setCallDestination('Lavanderia');
    setShowCallModal(true);
  };

  const handleNewOrder = () => {
    setShowNewOrderModal(true);
  };

  // Este efeito simula a importação de recursos externos que estavam no HTML original
  useEffect(() => {
    // Adiciona a fonte Nunito do Google Fonts
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500;700&display=swap';
    document.head.appendChild(linkElement);
    
    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <div>
      <audio id="localAudio" autoPlay muted></audio>
      <audio id="remoteAudio" autoPlay></audio>

      <aside className="sidebar">
        <div className="sidebar__logo">
          <ion-icon name="restaurant-outline"></ion-icon>
          <span className="logo-text">Moteltech</span>
        </div>
        <nav className="sidebar__navigation">
          <div className="item active">
            <ion-icon name="restaurant-outline"></ion-icon>
            <span className="item-label">Restaurante</span>
          </div>
          <div className="item" id="btn--call-to-reception" onClick={handleCallToReception}>
            <ion-icon name="call-outline"></ion-icon>
            <span className="item-label">Recepção</span>
            <span className="tooltip">Chamar Recepção</span>
          </div>
          <div className="item" id="btn--call-to-lavanderia" onClick={handleCallToLaundry}>
            <ion-icon name="shirt-outline"></ion-icon>
            <span className="item-label">Lavanderia</span>
            <span className="tooltip">Chamar Lavanderia</span>
          </div>
          <div className="item">
            <ion-icon name="time-outline"></ion-icon>
            <span className="item-label">Histórico</span>
          </div>
          <div className="item">
            <ion-icon name="settings-outline"></ion-icon>
            <span className="item-label">Configurações</span>
          </div>
        </nav>
        <div className="sidebar__footer">
          <div className="item">
            <ion-icon name="log-out-outline"></ion-icon>
            <span className="item-label">Sair</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="content__header">
          <div className="header__left">
            <button className="btn btn--icon sidebar-toggle" onClick={toggleSidebar}>
              <ion-icon name="menu-outline"></ion-icon>
            </button>
            <h1 className="header__title">Restaurante</h1>
          </div>
          <div className="header__right">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Buscar pedidos..." />
            </div>
            <button className="btn btn--icon notification-btn">
              <ion-icon name="notifications-outline"></ion-icon>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <span className="user-name">Atendente</span>
            </div>
          </div>
        </header>

        <div className="content__container">
          {/* Dashboard Summary */}
          <section className="dashboard-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="restaurant-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>12</h3>
                <p>Pedidos Hoje</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>8%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>5</h3>
                <p>Pedidos Pendentes</p>
              </div>
              <div className="summary-trend down">
                <ion-icon name="arrow-down-outline"></ion-icon>
                <span>3%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="checkmark-done-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>7</h3>
                <p>Pedidos Concluídos</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>12%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="cash-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>R$ 850</h3>
                <p>Faturamento</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>15%</span>
              </div>
            </div>
          </section>

          {/* Active Orders Section */}
          <section className="content__section">
            <div className="section__header">
              <h2 className="section__title">Pedidos Ativos</h2>
              <div className="section__actions">
                <button className="btn btn--outline">
                  <ion-icon name="filter-outline"></ion-icon>
                  Filtrar
                </button>
                <button className="btn btn--primary" id="btn-new-order" onClick={handleNewOrder}>
                  <ion-icon name="add-outline"></ion-icon>
                  Novo Pedido
                </button>
              </div>
            </div>
            
            <div className="orders-container">
              {/* Order Card 1 */}
              <div className="order-card order-card--new">
                <div className="order-card__header">
                  <div className="order-card__suite">
                    <span className="suite-number">01</span>
                    <span className="suite-name">BLACK</span>
                  </div>
                  <div className="order-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>10:30</span>
                  </div>
                </div>
                <div className="order-card__items">
                  <div className="order-item">
                    <span className="order-item__quantity">1x</span>
                    <span className="order-item__name">Hambúrguer Especial</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">2x</span>
                    <span className="order-item__name">Batata Frita</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">2x</span>
                    <span className="order-item__name">Refrigerante Cola</span>
                  </div>
                </div>
                <div className="order-card__footer">
                  <div className="order-card__status">
                    <span className="status-badge status-badge--new">Novo</span>
                  </div>
                  <div className="order-card__actions">
                    <button className="btn btn--icon btn--accept">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </button>
                    <button className="btn btn--icon btn--call">
                      <ion-icon name="call-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Order Card 2 */}
              <div className="order-card order-card--preparing">
                <div className="order-card__header">
                  <div className="order-card__suite">
                    <span className="suite-number">03</span>
                    <span className="suite-name">PREMIUM</span>
                  </div>
                  <div className="order-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>10:15</span>
                  </div>
                </div>
                <div className="order-card__items">
                  <div className="order-item">
                    <span className="order-item__quantity">2x</span>
                    <span className="order-item__name">Filé Mignon</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">1x</span>
                    <span className="order-item__name">Salada Caesar</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">1x</span>
                    <span className="order-item__name">Vinho Tinto</span>
                  </div>
                </div>
                <div className="order-card__footer">
                  <div className="order-card__status">
                    <span className="status-badge status-badge--preparing">Preparando</span>
                  </div>
                  <div className="order-card__actions">
                    <button className="btn btn--icon btn--complete">
                      <ion-icon name="checkmark-done-outline"></ion-icon>
                    </button>
                    <button className="btn btn--icon btn--call">
                      <ion-icon name="call-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Order Card 3 */}
              <div className="order-card order-card--ready">
                <div className="order-card__header">
                  <div className="order-card__suite">
                    <span className="suite-number">02</span>
                    <span className="suite-name">ROYAL</span>
                  </div>
                  <div className="order-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>10:05</span>
                  </div>
                </div>
                <div className="order-card__items">
                  <div className="order-item">
                    <span className="order-item__quantity">2x</span>
                    <span className="order-item__name">Pizza Margherita</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">1x</span>
                    <span className="order-item__name">Tiramisu</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item__quantity">2x</span>
                    <span className="order-item__name">Água Mineral</span>
                  </div>
                </div>
                <div className="order-card__footer">
                  <div className="order-card__status">
                    <span className="status-badge status-badge--ready">Pronto</span>
                  </div>
                  <div className="order-card__actions">
                    <button className="btn btn--icon btn--deliver">
                      <ion-icon name="bicycle-outline"></ion-icon>
                    </button>
                    <button className="btn btn--icon btn--call">
                      <ion-icon name="call-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Menu Section */}
          <section className="content__section">
            <div className="section__header">
              <h2 className="section__title">Menu do Dia</h2>
              <div className="section__actions">
                <button className="btn btn--secondary">
                  <ion-icon name="create-outline"></ion-icon>
                  Editar Menu
                </button>
              </div>
            </div>
            
            <div className="menu-tabs">
              {['Entradas', 'Pratos Principais', 'Sobremesas', 'Bebidas'].map((tab) => (
                <button 
                  key={tab}
                  className={`menu-tab ${activeMenuTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveMenuTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="menu-container">
              <div className="menu-category active">
                <div className="menu-items">
                  <div className="menu-item">
                    <div className="menu-item__image">
                      <ion-icon name="restaurant-outline"></ion-icon>
                    </div>
                    <div className="menu-item__info">
                      <h5 className="menu-item__name">Bruschetta</h5>
                      <p className="menu-item__description">Pão italiano com tomate, alho e manjericão</p>
                    </div>
                    <div className="menu-item__price">R$ 25,00</div>
                  </div>
                  <div className="menu-item">
                    <div className="menu-item__image">
                      <ion-icon name="restaurant-outline"></ion-icon>
                    </div>
                    <div className="menu-item__info">
                      <h5 className="menu-item__name">Carpaccio</h5>
                      <p className="menu-item__description">Finas fatias de carne com molho especial</p>
                    </div>
                    <div className="menu-item__price">R$ 35,00</div>
                  </div>
                  <div className="menu-item">
                    <div className="menu-item__image">
                      <ion-icon name="restaurant-outline"></ion-icon>
                    </div>
                    <div className="menu-item__info">
                      <h5 className="menu-item__name">Camarão Empanado</h5>
                      <p className="menu-item__description">Camarões empanados com molho tártaro</p>
                    </div>
                    <div className="menu-item__price">R$ 45,00</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      {showCallModal && (
        <CallModal 
          destination={callDestination} 
          onClose={() => setShowCallModal(false)} 
        />
      )}

      {showNewOrderModal && (
        <NewOrderModal 
          onClose={() => setShowNewOrderModal(false)} 
        />
      )}
    </div>
  );
}