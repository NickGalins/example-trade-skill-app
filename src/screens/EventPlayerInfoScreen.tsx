import { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { InfoPanel } from '../components/InfoPanel';
import { EventPlayerInfo, ValidationErrors } from '../types';
import { validateScreen1 } from '../utils/validation';
import styles from './EventPlayerInfoScreen.module.css';

interface EventPlayerInfoScreenProps {
  data: EventPlayerInfo;
  onUpdate: (data: EventPlayerInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EventPlayerInfoScreen({
  data,
  onUpdate,
  onNext,
  onBack,
}: EventPlayerInfoScreenProps) {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleNext = () => {
    setAttemptedSubmit(true);
    const validationErrors = validateScreen1(data.eventCode, data.playerNumber);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  const handleEventCodeChange = (value: string) => {
    onUpdate({ ...data, eventCode: value });
    if (attemptedSubmit) {
      const validationErrors = validateScreen1(value, data.playerNumber);
      setErrors(validationErrors);
    }
  };

  const handlePlayerNumberChange = (value: string) => {
    onUpdate({ ...data, playerNumber: value });
    if (attemptedSubmit) {
      const validationErrors = validateScreen1(data.eventCode, value);
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flowHeader}>
        <h1 className={styles.flowTitle}>Open a Mine</h1>
        <p className={styles.flowDescription}>
          You can use this flow to automatically generate a Mine card for a player.
          It takes 15 minutes for the mine to open, but modifiers can reduce this
          time. The result shouldn't be revealed to the player until the mine opens.
        </p>
      </div>

      <h2 className={styles.screenTitle}>Event & Player Information</h2>

      <div className={styles.formFields}>
        <TextField
          label="Event code"
          description="Enter the event code."
          value={data.eventCode}
          onChange={handleEventCodeChange}
          error={attemptedSubmit ? errors.eventCode : undefined}
          hasInfoPanel
          onInfoClick={() => setShowInfoPanel(true)}
          placeholder="e.g., JAN2026"
          maxLength={16}
        />

        <TextField
          label="Player number"
          description="Review the player's card and enter the player number."
          value={data.playerNumber}
          onChange={handlePlayerNumberChange}
          error={attemptedSubmit ? errors.playerNumber : undefined}
          tip="If a player number is less than 3 digits, include a '0' in missing places. For example, player number '47' would be entered as '047'."
          placeholder="e.g., 003"
          maxLength={16}
        />
      </div>

      <div className={styles.navigationButtons}>
        <Button variant="secondary" onClick={onBack}>
          &lt; Back
        </Button>
        <Button onClick={handleNext}>Next &gt;</Button>
      </div>

      <InfoPanel
        isOpen={showInfoPanel}
        onClose={() => setShowInfoPanel(false)}
        title="Event Code Information"
      >
        <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
          If you don't know the event code, use the first three letters of the month
          and four digit year. If this is a special event at a convention or marketing
          experience, add "SE" after the month and year.
        </p>
        <p style={{ marginBottom: '16px', fontWeight: 600 }}>Here are some examples:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                Event
              </th>
              <th
                style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                July 2019 regular event
              </td>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                JUL2019
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                December 2023 regular event
              </td>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                DEC2023
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                June 2020 marketing event
              </td>
              <td
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                JUN2020SE
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                April 2025 convention event
              </td>
              <td
                style={{
                  padding: '8px 12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                APR2025SE
              </td>
            </tr>
          </tbody>
        </table>
      </InfoPanel>
    </div>
  );
}
