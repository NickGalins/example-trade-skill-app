import { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  description?: string;
  value: string | number | null;
  onChange: (value: number | null) => void;
  options: SelectOption[];
  error?: string;
  tip?: string;
}

export function Select({
  label,
  description,
  value,
  onChange,
  options,
  error,
  tip,
}: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '') {
      onChange(null);
    } else {
      onChange(Number(selectedValue));
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      {description && <div className={styles.description}>{description}</div>}

      <select
        className={`${styles.select} ${error ? styles.error : ''}`}
        value={value ?? ''}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <div className={styles.errorText}>{error}</div>}

      {tip && !error && <div className={styles.tipBox}>{tip}</div>}
    </div>
  );
}
