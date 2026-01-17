import React from 'react';
import styles from './ValueBox.module.css';
import { CalculatedValues } from '../types';

interface ValueBoxProps {
  values: CalculatedValues;
}

export function ValueBox({ values }: ValueBoxProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Values for Mine Card generation</h3>
      <p className={styles.description}>
        After selecting the mining skill and toggling modifiers, the values will
        adjust. Check the Skill Point cost against the Player card before proceeding.
      </p>
      <div className={styles.values}>
        <div className={styles.valueItem}>
          <div className={styles.valueLabel}>Skill Points Cost</div>
          <div className={styles.valueNumber}>{values.skillPointsCost}</div>
        </div>
        <div className={styles.valueItem}>
          <div className={styles.valueLabel}>Effective Mine Level</div>
          <div className={styles.valueNumber}>{values.effectiveMineLevel}</div>
        </div>
        <div className={styles.valueItem}>
          <div className={styles.valueLabel}>Time to open</div>
          <div>
            <span className={styles.valueNumber}>{values.timeToOpen}</span>
            <span className={styles.valueUnit}>minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
