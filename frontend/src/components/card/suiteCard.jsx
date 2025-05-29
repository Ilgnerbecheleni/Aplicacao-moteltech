'use client';

import Link from 'next/link';

export default function SuiteCard({ id, numero, nome, ramal, status }) {
  const getStatusLabel = (status) => {
    if (status === '1') return 'Disponível';
    if (status === '2') return 'Ocupado';
    if (status === '3') return 'Manutenção';
    return 'Indefinido';
  };

  const getStatusClass = (status) => {
    if (status === '1') return 'suite-card--available';
    if (status === '2') return 'suite-card--occupied';
    if (status === '3') return 'suite-card--maintenance';
    return '';
  };

  return (
    <div className={`suite-card ${getStatusClass(status)}`}>
      <div className="suite-card__header">
        <div className="suite-number">{numero}</div>
        <div className="suite-status">{getStatusLabel(status)}</div>
      </div>
      <div className="suite-card__content">
        <h3 className="suite-name">{nome}</h3>
        <div className="suite-details">
          <div className="suite-detail">
            <ion-icon name="call-outline"></ion-icon>
            <span>Ramal {ramal}</span>
          </div>
        </div>
      </div>
      <div className="suite-card__footer">
        <button className="btn btn--secondary btn--small">
          <ion-icon name="eye-outline"></ion-icon>
          Detalhes
        </button>
        <Link href={`/suite-admin/${id}`}>
          <button className="btn btn--primary btn--small">
            <ion-icon name="information-circle-outline"></ion-icon>
            Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
}
