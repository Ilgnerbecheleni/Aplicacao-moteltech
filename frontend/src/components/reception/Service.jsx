'use client';

export default function ServiceCard({ id, icon, title, description, status, onCall, disabled }) {
  // status pode ser 'online', 'offline', 'busy'
  const statusIndicatorClass = `status-indicator status-indicator--${status}`;
  
  return (
    <div className="service-card" id={id}>
      <div className="service-card__icon">
        <ion-icon name={icon}></ion-icon>
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
        <div className="service-card__status">
          <span className={statusIndicatorClass}></span>
          <span>{status === 'online' ? 'Online' : status === 'busy' ? 'Ocupado' : 'Offline'}</span>
        </div>
      </div>
      <div className="service-card__footer">
        <button 
          className="btn btn--primary btn--full" 
          onClick={onCall}
          disabled={disabled}
        >
          Chamar
        </button>
      </div>
    </div>
  );
}