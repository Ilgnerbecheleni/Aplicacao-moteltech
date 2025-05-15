'use client';

import { useEffect } from 'react';
import '../../styles/reception.css'


export default function Reception() {



  //ainda precisa ser implementada após BD estruturado


  // useEffect(() => {
  //   // Função para alternar a exibição da sidebar(AINDA PRECISA COLOCAR)
  //   const toggleSidebar = () => {
  //     const sidebar = document.querySelector('.sidebar');
  //     sidebar.classList.toggle('sidebar--expanded');
  //   };

  //   // Adiciona evento ao botão de toggle da sidebar (se existir)
  //   const sidebarToggle = document.querySelector('.sidebar-toggle');
  //   if (sidebarToggle) {
  //     sidebarToggle.addEventListener('click', toggleSidebar);
  //   }

  //   // Limpeza ao desmontar
  //   return () => {
  //     if (sidebarToggle) {
  //       sidebarToggle.removeEventListener('click', toggleSidebar);
  //     }
  //   };
  // }, []);



  return (
    <>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar__logo">
          <ion-icon name="bed-outline"></ion-icon>
          <span className="logo-text">MotelTech</span>
        </div>
        <nav className="sidebar__navigation">
          <div className="item active">
            <ion-icon name="home-outline"></ion-icon>
            <span className="item-label">Dashboard</span>
          </div>
          <div className="item">
            <ion-icon name="bed-outline"></ion-icon>
            <span className="item-label">Suítes</span>
          </div>
          <div className="item">
            <ion-icon name="calendar-outline"></ion-icon>
            <span className="item-label">Reservas</span>
          </div>
          <div className="item">
            <ion-icon name="cart-outline"></ion-icon>
            <span className="item-label">Serviços</span>
          </div>
          <div className="item">
            <ion-icon name="people-outline"></ion-icon>
            <span className="item-label">Clientes</span>
          </div>
          <div className="item">
            <ion-icon name="cash-outline"></ion-icon>
            <span className="item-label">Financeiro</span>
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
      </div>
      
      {/* Main Content */}
      <div className="content">
        <div className="content__header">
          <div className="header__left">
            <button className="btn btn--icon btn--secondary sidebar-toggle">
              <ion-icon name="menu-outline"></ion-icon>
            </button>
            <h1 className="header__title">Dashboard</h1>
          </div>
          <div className="header__right">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Buscar..." />
            </div>
            <button className="btn btn--icon btn--secondary notification-btn">
              <ion-icon name="notifications-outline"></ion-icon>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </div>
        
        <div className="content__container">
          {/* Dashboard Summary */}
          <div className="dashboard-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="bed-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>15/20</h3>
                <p>Suítes Ocupadas</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>8</h3>
                <p>Reservas Hoje</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="cash-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>R$ 3.750</h3>
                <p>Faturamento Diário</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>24</h3>
                <p>Serviços Atendidos</p>
              </div>
            </div>
          </div>
          
          {/* Suites Section */}
          <div className="content__section">
            <div className="section__header">
              <h2 className="section__title">Suítes</h2>
              <div className="section__actions">
                <button className="btn btn--outline">
                  <ion-icon name="filter-outline"></ion-icon>
                  Filtrar
                </button>
                <button className="btn btn--primary">
                  <ion-icon name="add-outline"></ion-icon>
                  Nova Entrada
                </button>
              </div>
            </div>
            
            <div className="suites-grid">
              {/* Suite Card - Available */}
              <div className="suite-card suite-card--available">
                <div className="suite-card__header">
                  <div className="suite-number">101</div>
                  <div className="suite-status">Disponível</div>
                </div>
                <div className="suite-card__content">
                  <h3 className="suite-name">Suíte Luxo</h3>
                  <div className="suite-details">
                    <div className="suite-detail">
                      <ion-icon name="star-outline"></ion-icon>
                      <span>Premium</span>
                    </div>
                    <div className="suite-detail">
                      <ion-icon name="cash-outline"></ion-icon>
                      <span>R$ 150 / 2h</span>
                    </div>
                  </div>
                </div>
                <div className="suite-card__footer">
                  <button className="btn btn--secondary btn--small">
                    <ion-icon name="eye-outline"></ion-icon>
                    Detalhes
                  </button>
                  <button className="btn btn--primary btn--small">
                    <ion-icon name="enter-outline"></ion-icon>
                    Entrada
                  </button>
                </div>
              </div>
              
              {/* Suite Card - Occupied */}
              <div className="suite-card suite-card--occupied">
                <div className="suite-card__header">
                  <div className="suite-number">102</div>
                  <div className="suite-status">Ocupado</div>
                </div>
                <div className="suite-card__content">
                  <h3 className="suite-name">Suíte Master</h3>
                  <div className="suite-details">
                    <div className="suite-detail">
                      <ion-icon name="star-outline"></ion-icon>
                      <span>Premium</span>
                    </div>
                    <div className="suite-detail">
                      <ion-icon name="cash-outline"></ion-icon>
                      <span>R$ 190 / 2h</span>
                    </div>
                  </div>
                  <div className="suite-occupancy">
                    <div className="occupant">
                      <ion-icon name="person-outline"></ion-icon>
                      <span>Cliente Anônimo</span>
                    </div>
                    <div className="check-times">
                      <div className="check-time">
                        <ion-icon name="log-in-outline"></ion-icon>
                        <span>18:30</span>
                      </div>
                      <div className="check-time">
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>20:30</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="suite-card__footer">
                  <button className="btn btn--secondary btn--small">
                    <ion-icon name="eye-outline"></ion-icon>
                    Detalhes
                  </button>
                  <button className="btn btn--primary btn--small">
                    <ion-icon name="exit-outline"></ion-icon>
                    Saída
                  </button>
                </div>
              </div>
              
              {/* Suite Card - Maintenance */}
              <div className="suite-card suite-card--maintenance">
                <div className="suite-card__header">
                  <div className="suite-number">103</div>
                  <div className="suite-status">Manutenção</div>
                </div>
                <div className="suite-card__content">
                  <h3 className="suite-name">Suíte Standard</h3>
                  <div className="suite-details">
                    <div className="suite-detail">
                      <ion-icon name="star-outline"></ion-icon>
                      <span>Standard</span>
                    </div>
                    <div className="suite-detail">
                      <ion-icon name="cash-outline"></ion-icon>
                      <span>R$ 100 / 2h</span>
                    </div>
                  </div>
                  <div className="maintenance-info">
                    <ion-icon name="construct-outline"></ion-icon>
                    <span>Manutenção no ar-condicionado</span>
                  </div>
                </div>
                <div className="suite-card__footer">
                  <button className="btn btn--secondary btn--small">
                    <ion-icon name="eye-outline"></ion-icon>
                    Detalhes
                  </button>
                  <button className="btn btn--primary btn--small">
                    <ion-icon name="checkmark-outline"></ion-icon>
                    Concluir
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="content__section">
            <div className="section__header">
              <h2 className="section__title">Serviços</h2>
              <div className="section__actions">
                <button className="btn btn--primary">
                  <ion-icon name="add-outline"></ion-icon>
                  Novo Serviço
                </button>
              </div>
            </div>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="restaurant-outline"></ion-icon>
                </div>
                <div className="service-card__content">
                  <h3 className="service-card__title">Restaurante</h3>
                  <p className="service-card__description">Refeições e bebidas com serviço de quarto.</p>
                  <div className="service-card__status">
                    <div className="status-indicator status-indicator--online"></div>
                    <span>Disponível</span>
                  </div>
                </div>
                <div className="service-card__footer">
                  <button className="btn btn--primary btn--full">
                    <ion-icon name="call-outline"></ion-icon>
                    Chamar
                  </button>
                </div>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="bed-outline"></ion-icon>
                </div>
                <div className="service-card__content">
                  <h3 className="service-card__title">Limpeza</h3>
                  <p className="service-card__description">Serviço de camareira e limpeza de suítes.</p>
                  <div className="service-card__status">
                    <div className="status-indicator status-indicator--busy"></div>
                    <span>Ocupado</span>
                  </div>
                </div>
                <div className="service-card__footer">
                  <button className="btn btn--primary btn--full">
                    <ion-icon name="call-outline"></ion-icon>
                    Chamar
                  </button>
                </div>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="construct-outline"></ion-icon>
                </div>
                <div className="service-card__content">
                  <h3 className="service-card__title">Manutenção</h3>
                  <p className="service-card__description">Reparos e manutenção de equipamentos.</p>
                  <div className="service-card__status">
                    <div className="status-indicator status-indicator--online"></div>
                    <span>Disponível</span>
                  </div>
                </div>
                <div className="service-card__footer">
                  <button className="btn btn--primary btn--full">
                    <ion-icon name="call-outline"></ion-icon>
                    Chamar
                  </button>
                </div>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
                <div className="service-card__content">
                  <h3 className="service-card__title">Suprimentos</h3>
                  <p className="service-card__description">Itens de consumo e produtos adicionais.</p>
                  <div className="service-card__status">
                    <div className="status-indicator status-indicator--offline"></div>
                    <span>Indisponível</span>
                  </div>
                </div>
                <div className="service-card__footer">
                  <button className="btn btn--primary btn--full" disabled>
                    <ion-icon name="call-outline"></ion-icon>
                    Chamar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Activity Section */}
          <div className="content__section">
            <div className="section__header">
              <h2 className="section__title">Atividades Recentes</h2>
            </div>
            
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <ion-icon name="log-in-outline"></ion-icon>
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h4>Entrada na Suíte 102</h4>
                    <span className="activity-time">há 15 minutos</span>
                  </div>
                  <p className="activity-description">Cliente anônimo entrou na suíte Master.</p>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <ion-icon name="restaurant-outline"></ion-icon>
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h4>Pedido de Serviço</h4>
                    <span className="activity-time">há 30 minutos</span>
                  </div>
                  <p className="activity-description">Suíte 105 solicitou serviço de restaurante.</p>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h4>Saída da Suíte 108</h4>
                    <span className="activity-time">há 1 hora</span>
                  </div>
                  <p className="activity-description">Cliente finalizou estadia na suíte Premium.</p>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <ion-icon name="construct-outline"></ion-icon>
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h4>Início de Manutenção</h4>
                    <span className="activity-time">há 2 horas</span>
                  </div>
                  <p className="activity-description">Suíte 103 entrou em manutenção para reparo no ar-condicionado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Chamada */}
      <div className="modal" id="callModal">
        <div className="modal__container">
          <div className="modal__header">
            <h2 className="modal__title">Chamada de Serviço</h2>
            <button className="modal__close">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="modal__content">
            <div className="call-animation ringing">
              <div className="call-icon">
                <ion-icon name="call-outline"></ion-icon>
              </div>
              <div className="call-waves"></div>
            </div>
            <h3 className="modal__status">Chamando...</h3>
            <p className="caller-name">Restaurante</p>
          </div>
          <div className="modal__actions">
            <button className="modal__button--icon modal__button--end">
              <ion-icon name="call-outline"></ion-icon>
              <span>Encerrar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}