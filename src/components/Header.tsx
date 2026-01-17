import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Sacred Grounds Shop</h1>
      <div className={styles.shopkeeper}>
        <span className={styles.shopkeeperLabel}>Logged in as:</span> Shopkeeper#003
      </div>
    </header>
  );
}
