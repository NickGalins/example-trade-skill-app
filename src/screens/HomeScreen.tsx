
import styles from './HomeScreen.module.css';

interface HomeScreenProps {
  onSelectMining: () => void;
}

const SKILLS = [
  { name: 'Mining', icon: '⛏️', enabled: true },
  { name: 'Lumberjacking', icon: '🪓', enabled: false },
  { name: 'Fishing', icon: '🎣', enabled: false },
  { name: 'Farming', icon: '🌾', enabled: false },
  { name: 'Alchemy', icon: '⚗️', enabled: false },
  { name: 'Transmutation', icon: '✨', enabled: false },
  { name: 'Blacksmithing', icon: '⚒️', enabled: false },
  { name: 'Architecture', icon: '🏛️', enabled: false },
  { name: 'Enhancement', icon: '💎', enabled: false },
  { name: 'Engineering', icon: '⚙️', enabled: false },
];

export function HomeScreen({ onSelectMining }: HomeScreenProps) {
  const handleSkillClick = (skill: typeof SKILLS[0]) => {
    if (skill.enabled && skill.name === 'Mining') {
      onSelectMining();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Sacred Grounds Shop</h1>
      <p className={styles.subtitle}>Select a trade skill to begin</p>

      <div className={styles.skillsGrid}>
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            className={`${styles.skillCard} ${
              skill.enabled ? styles.active : styles.disabled
            }`}
            onClick={() => handleSkillClick(skill)}
          >
            <div className={styles.skillIcon}>{skill.icon}</div>
            <div className={styles.skillName}>{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
