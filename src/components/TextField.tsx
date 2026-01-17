
import styles from './TextField.module.css';

interface TextFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  tip?: string;
  hasInfoPanel?: boolean;
  onInfoClick?: () => void;
  placeholder?: string;
  maxLength?: number;
}

export function TextField({
  label,
  description,
  value,
  onChange,
  error,
  tip,
  hasInfoPanel,
  onInfoClick,
  placeholder,
  maxLength,
}: TextFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{label}</label>
        {hasInfoPanel && (
          <button
            type="button"
            className={styles.infoIcon}
            onClick={onInfoClick}
            aria-label="More information"
          >
            i
          </button>
        )}
      </div>

      {description && <div className={styles.description}>{description}</div>}

      <input
        type="text"
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />

      {error && <div className={styles.errorText}>{error}</div>}

      {tip && !error && <div className={styles.tipBox}>{tip}</div>}
    </div>
  );
}
