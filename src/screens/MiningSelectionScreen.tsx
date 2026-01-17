
import { Button } from '../components/Button';
import styles from './MiningSelectionScreen.module.css';

interface MiningSelectionScreenProps {
  onSelectOpenMine: () => void;
  onBack: () => void;
}

export function MiningSelectionScreen({
  onSelectOpenMine,
  onBack,
}: MiningSelectionScreenProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>⛏️ Mining</h1>
      <h2 className={styles.question}>What is the player trying to do?</h2>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard} onClick={onSelectOpenMine}>
          <div className={styles.optionNumber}>1</div>
          <div className={styles.optionText}>Open a Mine</div>
        </div>

        <div className={`${styles.optionCard} ${styles.disabled}`}>
          <div className={styles.optionNumber}>2</div>
          <div className={styles.optionText}>Use a Mine</div>
        </div>
      </div>

      <div className={styles.reminder}>
        <strong>Reminder:</strong> Check the Player Card before proceeding
      </div>

      <div className={styles.backButton}>
        <Button variant="secondary" onClick={onBack}>
          &lt; Back
        </Button>
      </div>
    </div>
  );
}
