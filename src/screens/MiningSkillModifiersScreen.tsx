import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { ValueBox } from '../components/ValueBox';
import { MiningSkillInfo, ValidationErrors, CalculatedValues, Modifiers } from '../types';
import { validateScreen2, checkIncompatibleModifiers } from '../utils/validation';
import { calculateAllValues } from '../utils/calculations';
import styles from './MiningSkillModifiersScreen.module.css';

interface MiningSkillModifiersScreenProps {
  data: MiningSkillInfo;
  onUpdate: (data: MiningSkillInfo) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const miningSkillOptions = [
  { value: '', label: 'Select Mining Skill' },
  ...Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `Mining ${i + 1}`,
  })),
];

export function MiningSkillModifiersScreen({
  data,
  onUpdate,
  onSubmit,
  onBack,
}: MiningSkillModifiersScreenProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    skillPointsCost: 0,
    effectiveMineLevel: 0,
    timeToOpen: 15,
  });

  // Real-time calculation of values
  useEffect(() => {
    if (data.miningSkill !== null) {
      const values = calculateAllValues(data.miningSkill, data.modifiers);
      setCalculatedValues(values);
    }
  }, [data.miningSkill, data.modifiers]);

  // Real-time modifier incompatibility check
  useEffect(() => {
    const modifierError = checkIncompatibleModifiers(data.modifiers);
    if (modifierError) {
      setErrors((prev) => ({ ...prev, modifiers: modifierError }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.modifiers;
        return newErrors;
      });
    }
  }, [data.modifiers]);

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    const validationErrors = validateScreen2(data.miningSkill, data.modifiers);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit();
    }
  };

  const handleMiningSkillChange = (value: number | null) => {
    onUpdate({ ...data, miningSkill: value });
  };

  const handleModifierToggle = (modifierKey: keyof Modifiers) => {
    const newModifiers = { ...data.modifiers };

    // If toggling "No modifiers"
    if (modifierKey === 'noModifiers') {
      if (!newModifiers.noModifiers) {
        // Turning on "No modifiers" - disable all others
        Object.keys(newModifiers).forEach((key) => {
          newModifiers[key as keyof Modifiers] = key === 'noModifiers';
        });
      } else {
        // Turning off "No modifiers" - just toggle it
        newModifiers.noModifiers = false;
      }
    } else {
      // Toggling a specific modifier - turn off "No modifiers" and toggle this one
      newModifiers.noModifiers = false;
      newModifiers[modifierKey] = !newModifiers[modifierKey];
    }

    onUpdate({ ...data, modifiers: newModifiers });
  };

  return (
    <div className={styles.container}>
      <div className={styles.flowHeader}>
        <h1 className={styles.flowTitle}>Open a Mine</h1>
        <p className={styles.flowDescription}>
          You can use this flow to automatically generate a Mine card for a player.
          <br />• It takes 15 minutes for the mine to open, but modifiers can reduce this time.
          <br />• The result shouldn't be revealed to the player until the mine opens.
        </p>
      </div>

      <h2 className={styles.screenTitle}>Mining Skill, Modifiers, & Skill Point Cost</h2>

      <div className={styles.formSection}>
        <Select
          label="Mining skill"
          description="Select the skill level used to open the mine."
          value={data.miningSkill}
          onChange={handleMiningSkillChange}
          options={miningSkillOptions}
          error={attemptedSubmit ? errors.miningSkill : undefined}
          tip="Players may open mines equal to, or less than, their Mining skill level. They must have enough unspent Skill Points available to open the mine."
        />
      </div>

      <div className={styles.modifiersSection}>
        <h3 className={styles.modifiersTitle}>Add modifiers</h3>
        <p className={styles.modifiersDescription}>
          To add modifiers, toggle "No modifiers" off and toggle any of the modifiers
          on.
        </p>

        <div className={styles.modifiersList}>
          <div className={styles.masterToggle}>
            <ToggleSwitch
              label="No modifiers"
              checked={data.modifiers.noModifiers}
              onChange={() => handleModifierToggle('noModifiers')}
            />
          </div>

          <ToggleSwitch
            label="Fast Worker"
            checked={data.modifiers.fastWorker}
            onChange={() => handleModifierToggle('fastWorker')}
            disabled={data.modifiers.noModifiers}
            description="Changes the time to open the Mine to 10 minutes"
          />
          <ToggleSwitch
            label="Slow Worker"
            checked={data.modifiers.slowWorker}
            onChange={() => handleModifierToggle('slowWorker')}
            disabled={data.modifiers.noModifiers}
            description="Changes the time to open the Mine to 20 minutes"
          />
          <ToggleSwitch
            label="Efficient Worker"
            checked={data.modifiers.efficientWorker}
            onChange={() => handleModifierToggle('efficientWorker')}
            disabled={data.modifiers.noModifiers}
            description="Reduces the Skill Point cost by 3, to a minimum of 1"
          />
          <ToggleSwitch
            label="Inefficient Worker"
            checked={data.modifiers.inefficientWorker}
            onChange={() => handleModifierToggle('inefficientWorker')}
            disabled={data.modifiers.noModifiers}
            description="Increases the Skill Point cost by 3"
          />
          <ToggleSwitch
            label="Misc Bonus +2"
            checked={data.modifiers.miscBonusPlus2}
            onChange={() => handleModifierToggle('miscBonusPlus2')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 2 higher to a maximum of 10"
          />
          <ToggleSwitch
            label="Misc Bonus +1"
            checked={data.modifiers.miscBonusPlus1}
            onChange={() => handleModifierToggle('miscBonusPlus1')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 1 higher to a maximum of 10"
          />
          <ToggleSwitch
            label="Misc Penalty -1"
            checked={data.modifiers.miscPenaltyMinus1}
            onChange={() => handleModifierToggle('miscPenaltyMinus1')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 1 lower to a minimum of 1"
          />
          <ToggleSwitch
            label="Misc Penalty -2"
            checked={data.modifiers.miscPenaltyMinus2}
            onChange={() => handleModifierToggle('miscPenaltyMinus2')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 2 lower to a minimum of 1"
          />
          <ToggleSwitch
            label="Event Bonus +1"
            checked={data.modifiers.eventBonusPlus1}
            onChange={() => handleModifierToggle('eventBonusPlus1')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 1 higher to a maximum of 10"
          />
          <ToggleSwitch
            label="Event Penalty -1"
            checked={data.modifiers.eventPenaltyMinus1}
            onChange={() => handleModifierToggle('eventPenaltyMinus1')}
            disabled={data.modifiers.noModifiers}
            description="Treats the Mining Skill as 1 lower to a minimum of 1"
          />
        </div>

        {errors.modifiers && (
          <div className={styles.modifiersError}>{errors.modifiers}</div>
        )}
      </div>

      {data.miningSkill !== null && (
        <ValueBox values={calculatedValues} />
      )}

      <div className={styles.note}>
        <strong>Note:</strong> If everything looks correct, choose Submit to generate
        the Mine card
      </div>

      <div className={styles.navigationButtons}>
        <Button variant="secondary" onClick={onBack}>
          &lt; Back
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
