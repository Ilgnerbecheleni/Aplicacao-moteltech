'use client';


import Link from 'next/link';

export default function SuiteCard({ id, number, name, status, features, onCall }) {
  // status pode ser 'available', 'occupied', 'maintenance'
  const statusMap = {
    available: 'Disponível',
    occupied: 'Ocupada',
    maintenance: 'Manutenção'
  };

  const statusClass = `suite-card suite-card--${status}`;

  return (
    <div className={statusClass} id={id}>
      <div className="suite-card__header">
        <div className="suite-number">{number}</div>
        <div className="suite-status">{statusMap[status] || 'Disponível'}</div>
      </div>
      <div className="suite-card__content">
        <h3 className="suite-name">{name}</h3>
        <div className="suite-details">
          {features && features.map((feature, index) => (
            <div className="suite-detail" key={index}>
              <ion-icon name={feature.icon}></ion-icon>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="suite-card__footer">
        <Link href={`/suite/${number}`} className="btn btn--secondary btn--small">
          Detalhes
        </Link>
        <button className="btn btn--primary btn--call" onClick={onCall}>
          <ion-icon name="call-outline"></ion-icon>
          <span>VoIP</span>
        </button>
      </div>
    </div>
  );
}