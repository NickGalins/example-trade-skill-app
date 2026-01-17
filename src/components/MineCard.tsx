import React from 'react';
import styles from './MineCard.module.css';
import { MineCard as MineCardType } from '../types';

interface MineCardProps {
  card: MineCardType;
}

export function MineCard({ card }: MineCardProps) {
  // Generate array of numbers 1-15 for uses remaining display
  const allNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <div className={styles.mineNumber}>Mine #: {card.mineNumber}</div>

      <div className={styles.row}>
        <span className={styles.label}>Opened by Player:</span>
        <span className={styles.value}>#{card.openedByPlayer}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Mine type:</span>
        <span className={styles.value}>{card.mineType}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Skill required to Harvest:</span>
        <span className={styles.value}>{card.skillRequired}</span>
      </div>

      <div className={styles.usesContainer}>
        <span className={styles.usesLabel}>Uses Remaining:</span>
        <div className={styles.usesNumbers}>
          {allNumbers.map((num) => (
            <span
              key={num}
              className={`${styles.useNumber} ${
                num > card.usesRemaining ? styles.strikethrough : ''
              }`}
            >
              {num}
            </span>
          ))}
        </div>
        <div className={styles.note}>Dispose of card after final use.</div>
      </div>

      <div className={styles.shopkeeperRow}>
        <div className={styles.row}>
          <span className={styles.label}>Shopkeeper:</span>
          <span className={styles.value}>#{card.shopkeeper}</span>
        </div>
      </div>
    </div>
  );
}
