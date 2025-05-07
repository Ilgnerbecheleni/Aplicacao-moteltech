'use client';

export default function SummaryCard({ icon, value, label }) {
  return (
    <div className="summary-card">
      <div className="summary-icon">
        <ion-icon name={icon}></ion-icon>
      </div>
      <div className="summary-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}