// components/SuiteInfoCard.jsx
import styles from './SuiteInfoCard.module.css';

export default function SuiteInfoCard({ suite }) {
  if (!suite) {
    return (
      <div className={styles.card}>
        <p>Carregando informações da suíte...</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Suíte {suite.nome}</h2>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Ramal:</span>
          <span className={styles.value}>{suite.ramal}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{suite.status}</span>
        </div>
      </div>
    </div>
  );
}
