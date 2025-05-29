"use client"

import { useState } from "react"
import { FaPowerOff, FaVolumeUp, FaVolumeDown, FaChevronUp, FaChevronDown, FaTv } from "react-icons/fa"
import styles from "./TVControlCard.module.css"

export default function CardTv() {
  const [isOn, setIsOn] = useState(false)
  const [volume, setVolume] = useState(10)
  const [channel, setChannel] = useState(1)

  const togglePower = () => {
    setIsOn((prev) => !prev)
  }

  const increaseVolume = () => {
    if (isOn) setVolume((prev) => Math.min(prev + 1, 100))
  }

  const decreaseVolume = () => {
    if (isOn) setVolume((prev) => Math.max(prev - 1, 0))
  }

  const nextChannel = () => {
    if (isOn) setChannel((prev) => prev + 1)
  }

  const previousChannel = () => {
    if (isOn && channel > 1) setChannel((prev) => prev - 1)
  }

  return (
    <div className={`${styles.card} ${isOn ? styles.cardOn : styles.cardOff}`}>
      <div className={styles.header}>
        <div className={`${styles.iconContainer} ${isOn ? styles.iconOn : styles.iconOff}`}>
          <FaTv size={32} />
        </div>
        <h3 className={styles.title}>Smart TV</h3>
      </div>

      <div className={styles.statusSection}>
        <div className={`${styles.statusBadge} ${isOn ? styles.statusOn : styles.statusOff}`}>
          <div className={`${styles.statusDot} ${isOn ? styles.dotOn : styles.dotOff}`}></div>
          {isOn ? "Ligada" : "Desligada"}
        </div>

        {isOn && (
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Volume</span>
              <span className={styles.infoValue}>{volume}</span>
              <div className={styles.volumeBar}>
                <div className={styles.volumeFill} style={{ width: `${volume}%` }}></div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Canal</span>
              <span className={styles.infoValue}>{channel}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button className={`${styles.powerButton} ${isOn ? styles.powerOn : styles.powerOff}`} onClick={togglePower}>
          <FaPowerOff size={20} />
        </button>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Volume</span>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.controlButton} ${styles.volumeButton}`}
              onClick={decreaseVolume}
              disabled={!isOn}
            >
              <FaVolumeDown size={16} />
            </button>
            <button
              className={`${styles.controlButton} ${styles.volumeButton}`}
              onClick={increaseVolume}
              disabled={!isOn}
            >
              <FaVolumeUp size={16} />
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Canal</span>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.controlButton} ${styles.channelButton}`}
              onClick={previousChannel}
              disabled={!isOn || channel <= 1}
            >
              <FaChevronDown size={16} />
            </button>
            <button
              className={`${styles.controlButton} ${styles.channelButton}`}
              onClick={nextChannel}
              disabled={!isOn}
            >
              <FaChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
