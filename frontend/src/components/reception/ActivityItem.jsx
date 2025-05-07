'use client';

export default function ActivityItem({ icon, title, time, description }) {
  return (
    <div className="activity-item">
      <div className="activity-icon">
        <ion-icon name={icon}></ion-icon>
      </div>
      <div className="activity-content">
        <div className="activity-header">
          <h4>{title}</h4>
          <span className="activity-time">{time}</span>
        </div>
        <p className="activity-description">{description}</p>
      </div>
    </div>
  );
}