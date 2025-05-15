'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link';

import '../../../styles/laundry.css'

export default function LavanderiaPage() {
  const [showCallModal, setShowCallModal] = useState(false)
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)


  //também estrutar após chegada do BD

  // useEffect(() => {
  //   // Carregar Socket.IO
  //   const script = document.createElement('script')
  //   script.src = '/socket.io/socket.io.js'
  //   document.body.appendChild(script)

  //   // Carregar script da lavanderia após o Socket.IO
  //   script.onload = () => {
  //     const lavanderiaScript = document.createElement('script')
  //     lavanderiaScript.src = '/js/lavanderia.js'
  //     document.body.appendChild(lavanderiaScript)
  //   }

  //   return () => {
  //     document.querySelectorAll('script[src="/socket.io/socket.io.js"], script[src="/js/lavanderia.js"]').forEach(s => s.remove())
  //   }
  // }, [])

  return (
    <>
      <Script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"
      />
      <Script
        nomodule
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"
      />

      <audio id="localAudio" autoPlay muted></audio>
      <audio id="remoteAudio" autoPlay></audio>

      <aside className="sidebar">
        <div className="sidebar__logo">
          <ion-icon name="shirt-outline"></ion-icon>
          <span className="logo-text">Moteltech</span>
        </div>
        <nav className="sidebar__navigation">
          <div className="item active">
            <ion-icon name="shirt-outline"></ion-icon>
            <span className="item-label">Lavanderia</span>
          </div>
          <Link href="/reception" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="item" id="btn--navigate-to-reception">
        <ion-icon name="call-outline"></ion-icon>
        <span className="item-label">Recepção</span>
        <span className="tooltip">Ir para Recepção</span>
      </div>
    </Link>
          <div className="item" id="btn--call-to-restaurante">
            <ion-icon name="restaurant-outline"></ion-icon>
            <span className="item-label">Restaurante</span>
            <span className="tooltip">Chamar Restaurante</span>
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
            <button className="btn btn--icon sidebar-toggle">
              <ion-icon name="menu-outline"></ion-icon>
            </button>
            <h1 className="header__title">Lavanderia</h1>
          </div>
          <div className="header__right">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Buscar solicitações..." />
            </div>
            <button className="btn btn--icon notification-btn">
              <ion-icon name="notifications-outline"></ion-icon>
              <span className="notification-badge">2</span>
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
                <ion-icon name="shirt-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>15</h3>
                <p>Solicitações Hoje</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>12%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>6</h3>
                <p>Em Processamento</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>5%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="checkmark-done-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>9</h3>
                <p>Concluídas</p>
              </div>
              <div className="summary-trend up">
                <ion-icon name="arrow-up-outline"></ion-icon>
                <span>8%</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">
                <ion-icon name="timer-outline"></ion-icon>
              </div>
              <div className="summary-info">
                <h3>2.5h</h3>
                <p>Tempo Médio</p>
              </div>
              <div className="summary-trend down">
                <ion-icon name="arrow-down-outline"></ion-icon>
                <span>10%</span>
              </div>
            </div>
          </section>

          {/* Service Requests Section */}
          <section className="content__section">
            <div className="section__header">
              <h2 className="section__title">Solicitações de Serviço</h2>
              <div className="section__actions">
                <button className="btn btn--outline">
                  <ion-icon name="filter-outline"></ion-icon>
                  Filtrar
                </button>
                <button className="btn btn--primary" id="btn-new-request">
                  <ion-icon name="add-outline"></ion-icon>
                  Nova Solicitação
                </button>
              </div>
            </div>
            
            <div className="requests-container">
              {/* Request Card 1 */}
              <div className="request-card request-card--new">
                <div className="request-card__header">
                  <div className="request-card__suite">
                    <span className="suite-number">01</span>
                    <span className="suite-name">BLACK</span>
                  </div>
                  <div className="request-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>11:30</span>
                  </div>
                </div>
                <div className="request-card__content">
                  <div className="request-card__type">
                    <ion-icon name="shirt-outline"></ion-icon>
                    <span>Lavagem de Roupas</span>
                  </div>
                  <div className="request-card__details">
                    <p>2 camisas, 1 calça, 3 peças íntimas</p>
                    <p className="request-card__note">Obs: Cuidado com a camisa branca</p>
                  </div>
                  <div className="request-card__urgency">
                    <span className="urgency-badge urgency-badge--normal">Normal</span>
                  </div>
                </div>
                <div className="request-card__footer">
                  <div className="request-card__status">
                    <span className="status-badge status-badge--new">Novo</span>
                  </div>
                  <div className="request-card__actions">
                    <button className="btn btn--icon btn--accept">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </button>
                    <button className="btn btn--icon btn--call">
                      <ion-icon name="call-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Request Card 2 */}
              <div className="request-card request-card--processing">
                <div className="request-card__header">
                  <div className="request-card__suite">
                    <span className="suite-number">03</span>
                    <span className="suite-name">PREMIUM</span>
                  </div>
                  <div className="request-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>10:45</span>
                  </div>
                </div>
                <div className="request-card__content">
                  <div className="request-card__type">
                    <ion-icon name="water-outline"></ion-icon>
                    <span>Lavagem a Seco</span>
                  </div>
                  <div className="request-card__details">
                    <p>1 terno, 1 vestido de festa</p>
                    <p className="request-card__note">Obs: Urgente para hoje à noite</p>
                  </div>
                  <div className="request-card__urgency">
                    <span className="urgency-badge urgency-badge--urgent">Urgente</span>
                  </div>
                </div>
                <div className="request-card__footer">
                  <div className="request-card__status">
                    <span className="status-badge status-badge--processing">Em Processamento</span>
                  </div>
                  <div className="request-card__actions">
                    <button className="btn btn--icon btn--complete">
                      <ion-icon name="checkmark-done-outline"></ion-icon>
                    </button>
                    <button className="btn btn--icon btn--call">
                      <ion-icon name="call-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Request Card 3 */}
              <div className="request-card request-card--ready">
                <div className="request-card__header">
                  <div className="request-card__suite">
                    <span className="suite-number">02</span>
                    <span className="suite-name">ROYAL</span>
                  </div>
                  <div className="request-card__time">
                    <ion-icon name="time-outline"></ion-icon>
                    <span>09:15</span>
                  </div>
                </div>
                <div className="request-card__content">
                  <div className="request-card__type">
                    <ion-icon name="bed-outline"></ion-icon>
                    <span>Troca de Roupa de Cama</span>
                  </div>
                  <div className="request-card__details">
                    <p>Lençóis, fronhas e edredom</p>
                    <p className="request-card__note">Obs: Cliente solicitou lençóis de algodão egípcio</p>
                  </div>
                  <div className="request-card__urgency">
                    <span className="urgency-badge urgency-badge--normal">Normal</span>
                  </div>
                </div>
                <div className="request-card__footer">
                  <div className="request-card__status">
                    <span className="status-badge status-badge--ready">Pronto</span>
                  </div>
                  <div className="request-card__actions">
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

          {/* Services Section */}
          <section className="content__section">
            <div className="section__header">
              <h2 className="section__title">Serviços Disponíveis</h2>
              <div className="section__actions">
                <button className="btn btn--secondary">
                  <ion-icon name="create-outline"></ion-icon>
                  Editar Serviços
                </button>
              </div>
            </div>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="shirt-outline"></ion-icon>
                </div>
                <h4 className="service-card__title">Lavagem de Roupas</h4>
                <p className="service-card__description">Lavagem comum de roupas com produtos de alta qualidade.</p>
                <div className="service-card__details">
                  <div className="service-card__price">
                    <span>A partir de</span>
                    <span className="price">R$ 15,00</span>
                  </div>
                  <div className="service-card__time">
                    <span>Tempo estimado:</span>
                    <span>2-3 horas</span>
                  </div>
                </div>
                <button className="btn btn--primary btn--full">Solicitar</button>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="water-outline"></ion-icon>
                </div>
                <h4 className="service-card__title">Lavagem a Seco</h4>
                <p className="service-card__description">Ideal para roupas delicadas e tecidos especiais.</p>
                <div className="service-card__details">
                  <div className="service-card__price">
                    <span>A partir de</span>
                    <span className="price">R$ 30,00</span>
                  </div>
                  <div className="service-card__time">
                    <span>Tempo estimado:</span>
                    <span>4-5 horas</span>
                  </div>
                </div>
                <button className="btn btn--primary btn--full">Solicitar</button>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="bed-outline"></ion-icon>
                </div>
                <h4 className="service-card__title">Troca de Roupa de Cama</h4>
                <p className="service-card__description">Troca completa de lençóis, fronhas e edredom.</p>
                <div className="service-card__details">
                  <div className="service-card__price">
                    <span>A partir de</span>
                    <span className="price">R$ 50,00</span>
                  </div>
                  <div className="service-card__time">
                    <span>Tempo estimado:</span>
                    <span>30 minutos</span>
                  </div>
                </div>
                <button className="btn btn--primary btn--full">Solicitar</button>
              </div>
              
              <div className="service-card">
                <div className="service-card__icon">
                  <ion-icon name="flash-outline"></ion-icon>
                </div>
                <h4 className="service-card__title">Passadoria</h4>
                <p className="service-card__description">Serviço de passar roupas com acabamento profissional.</p>
                <div className="service-card__details">
                  <div className="service-card__price">
                    <span>A partir de</span>
                    <span className="price">R$ 10,00</span>
                  </div>
                  <div className="service-card__time">
                    <span>Tempo estimado:</span>
                    <span>1-2 horas</span>
                  </div>
                </div>
                <button className="btn btn--primary btn--full">Solicitar</button>
              </div>
            </div>
          </section>

          {/* Inventory Section */}
          <section className="content__section">
            <div className="section__header">
              <h2 className="section__title">Estoque de Suprimentos</h2>
              <div className="section__actions">
                <button className="btn btn--secondary">
                  <ion-icon name="add-outline"></ion-icon>
                  Adicionar Item
                </button>
              </div>
            </div>
            
            <div className="inventory-table-container">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Detergente Líquido</td>
                    <td>Produtos de Limpeza</td>
                    <td>25 litros</td>
                    <td><span className="inventory-status inventory-status--ok">OK</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Amaciante</td>
                    <td>Produtos de Limpeza</td>
                    <td>15 litros</td>
                    <td><span className="inventory-status inventory-status--ok">OK</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Alvejante</td>
                    <td>Produtos de Limpeza</td>
                    <td>5 litros</td>
                    <td><span className="inventory-status inventory-status--low">Baixo</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Cabides</td>
                    <td>Acessórios</td>
                    <td>120 unidades</td>
                    <td><span className="inventory-status inventory-status--ok">OK</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Sacos para Roupa</td>
                    <td>Acessórios</td>
                    <td>30 unidades</td>
                    <td><span className="inventory-status inventory-status--low">Baixo</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn--icon btn--small">
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Call Modal */}
      <div className="modal modal--call" id="callModal">
        <div className="modal__container">
          <div className="modal__header">
            <h3 className="modal__title">Chamada</h3>
            <button className="modal__close">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="modal__content">
            <div className="call-animation">
              <div className="call-icon">
                <ion-icon name="call"></ion-icon>
              </div>
              <div className="call-waves"></div>
            </div>
            <p className="modal__status" id="callStatus">Status da chamada</p>
            <div className="call-timer">00:00</div>
          </div>
          <div className="modal__actions">
            <button className="modal__button--icon modal__button--accept" id="btnAcceptCall">
              <ion-icon name="call"></ion-icon>
              <span>Atender</span>
            </button>
            <button className="modal__button--icon modal__button--end" id="btnEndCall">
              <ion-icon name="call"></ion-icon>
              <span>Encerrar</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      <div className="modal" id="newRequestModal">
        <div className="modal__container modal__container--large">
          <div className="modal__header">
            <h3 className="modal__title">Nova Solicitação</h3>
            <button className="modal__close" id="closeRequestModal">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="modal__content">
            <div className="form-group">
              <label htmlFor="suiteSelect">Suíte</label>
              <select id="suiteSelect" className="form-control">
                <option value="1">01 - BLACK</option>
                <option value="2">02 - ROYAL</option>
                <option value="3">03 - PREMIUM</option>
                <option value="4">04 - DELUXE</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="serviceType">Tipo de Serviço</label>
              <select id="serviceType" className="form-control">
                <option value="">Selecione um serviço</option>
                <option value="laundry">Lavagem de Roupas</option>
                <option value="dry-cleaning">Lavagem a Seco</option>
                <option value="bedding">Troca de Roupa de Cama</option>
                <option value="ironing">Passadoria</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="requestDetails">Detalhes</label>
              <textarea id="requestDetails" className="form-control" rows="3" placeholder="Descreva os itens e detalhes do serviço..."></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="requestNotes">Observações</label>
              <textarea id="requestNotes" className="form-control" rows="2" placeholder="Observações especiais para o serviço..."></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="urgencyLevel">Nível de Urgência</label>
              <select id="urgencyLevel" className="form-control">
                <option value="normal">Normal</option>
                <option value="urgent">Urgente</option>
                <option value="very-urgent">Muito Urgente</option>
              </select>
            </div>
          </div>
          <div className="modal__footer">
            <button className="btn btn--secondary" id="cancelRequestBtn">Cancelar</button>
            <button className="btn btn--primary" id="saveRequestBtn">Salvar Solicitação</button>
          </div>
        </div>
      </div>
    </>
  )
}