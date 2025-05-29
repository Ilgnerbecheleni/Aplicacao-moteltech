'use client';

import { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import styles from './CardLamp.module.css';

export default function CardLamp() {
  const [isOn, setIsOn] = useState(true);

  const toggleLamp = async () => {
    const newState = !isOn;
    const service = newState ? 'turn_on' : 'turn_off';

    try {
      await fetch('/api/haproxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: `/services/switch/${service}`,
          data: {
            entity_id: 'switch.esp32_com_mcp23017_mcp23017_saida_7',
          },
        }),
      });

      setIsOn(newState);
    } catch (error) {
      console.error('Erro ao alterar estado da lâmpada:', error);
    }
  };

  return (
    <div className={styles.card} style={{ opacity: isOn ? 1 : 0.5 }}>
      <div className={styles.icon}>
        <FaLightbulb size={48} color={isOn ? '#f1c40f' : '#888'} />
      </div>
      <div className={styles.content}>
        <h3>Lâmpada</h3>
        <p>{isOn ? 'Ligada' : 'Desligada'}</p>
      </div>
   <div className={styles.controls}>
  <label className={styles.toggle}>
    <input
      type="checkbox"
      checked={isOn}
      onChange={toggleLamp}
    />
    <span className={styles.slider}></span>
  </label>
</div>
    </div>
  );
}
