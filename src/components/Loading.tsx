import React from 'react';
import styles from './Loading.module.css';

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <div className={styles.text}>Rolling Results</div>
    </div>
  );
}
