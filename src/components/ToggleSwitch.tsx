import React from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
}

export function ToggleSwitch({
  label,
  checked,
  onChange,
  disabled = false,
  description,
}: ToggleSwitchProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <>
      <div
        className={`${styles.container} ${disabled ? styles.disabled : ''}`}
        onClick={handleClick}
      >
        <div
          className={`${styles.switch} ${checked ? styles.checked : ''} ${
            disabled ? styles.disabled : ''
          }`}
        >
          <div className={`${styles.slider} ${checked ? styles.checked : ''}`} />
        </div>
        <span
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
        >
          {label}
        </span>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </>
  );
}
