'use client';

import Link from 'next/link';

export function TelephonySection({ onCallAction }) {
  const contacts = [
    {
      id: 'reception',
      icon: 'home-outline',
      title: 'Recepção',
      description: 'Atendimento 24h',
      status: 'online',
      voipLink: 'https://webrtc-voip-next.vercel.app/cliente/suite1'
    },
    {
      id: 'lavanderia',
      icon: 'shirt-outline',
      title: 'Lavanderia',
      description: 'Serviços de lavagem e passadoria',
      status: 'online'
    },
    {
      id: 'restaurante',
      icon: 'restaurant-outline',
      title: 'Restaurante',
      description: 'Serviço de alimentação e bebidas',
      status: 'online'
    },
    {
      id: 'manutencao',
      icon: 'construct-outline',
      title: 'Manutenção',
      description: 'Serviços de reparo e manutenção',
      status: 'offline'
    }
  ];

  return (
    <section className="content__section" id="telephony-section">
      <div className="section__header">
        <h2 className="section__title">Telefonia</h2>
        <div className="section__actions">
          <button className="btn btn--outline">
            <ion-icon name="time-outline"></ion-icon>
            Histórico
          </button>
        </div>
      </div>
      
      <div className="contacts-grid">
        {contacts.map(contact => (
          <div className="contact-card" key={contact.id}>
            <div className="contact-card__icon">
              <ion-icon name={contact.icon}></ion-icon>
            </div>
            <div className="contact-card__content">
              <h3 className="contact-card__title">{contact.title}</h3>
              <p className="contact-card__description">{contact.description}</p>
              <div className="contact-card__status">
                <span className={`status-indicator status-indicator--${contact.status}`}></span>
                <span>{contact.status === 'online' ? 'Disponível' : 'Indisponível'}</span>
              </div>
            </div>
            <div className="contact-card__action">
              {contact.voipLink ? (
                <Link href={contact.voipLink} className="btn btn--primary btn--call">
                  <ion-icon name="call-outline"></ion-icon>
                  <span>VoIP</span>
                </Link>
              ) : (
                <button 
                  className="btn btn--primary btn--call" 
                  id={`btn--call-to-${contact.id}`}
                  onClick={() => onCallAction(contact.title)}
                  disabled={contact.status !== 'online'}
                >
                  <ion-icon name="call-outline"></ion-icon>
                  <span>Chamar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}