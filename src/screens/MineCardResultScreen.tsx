
import { Button } from '../components/Button';
import { MineCard as MineCardComponent } from '../components/MineCard';
import { MineCard } from '../types';
import styles from './MineCardResultScreen.module.css';

interface MineCardResultScreenProps {
  mineCard: MineCard;
  onDone: () => void;
}

export function MineCardResultScreen({
  mineCard,
  onDone,
}: MineCardResultScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.successMessage}>
        <div className={styles.checkmark}>✓</div>
        <div className={styles.successText}>
          Success! The Mine has been added to the node list and will activate in{' '}
          {mineCard.timeToOpen} minutes.
        </div>
      </div>

      <MineCardComponent card={mineCard} />

      <p className={styles.printInfo}>
        You may <span className={styles.printLink}>Print</span> this card or use it
        to manually fill an empty Mine Card.
      </p>

      <div className={styles.doneButton}>
        <Button onClick={onDone}>Done</Button>
      </div>
    </div>
  );
}
