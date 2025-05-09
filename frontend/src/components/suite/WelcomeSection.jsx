'use client';

export function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-card">
        <div className="welcome-card__content">
          <h2>Bem-vindo ao Moteltech</h2>
          <p>Esperamos que tenha uma estadia agradável. Use o painel de controle para gerenciar todos os recursos da sua suíte.</p>
        </div>
        <div className="welcome-card__image">
          <ion-icon name="bed-outline"></ion-icon>
        </div>
      </div>
    </section>
  );
}