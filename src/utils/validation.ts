import { Modifiers, ValidationErrors } from '../types';

/**
 * Validates the event code
 * Must be 7-16 alphanumeric characters
 */
export function validateEventCode(eventCode: string): string | undefined {
  if (!eventCode || eventCode.length < 7) {
    return 'Event codes must be 7-16 characters.';
  }
  if (eventCode.length > 16) {
    return 'Event codes must be 7-16 characters.';
  }
  if (!/^[a-zA-Z0-9]+$/.test(eventCode)) {
    return 'Event codes only use numbers and letters.';
  }
  return undefined;
}

/**
 * Validates the player number
 * Must be 3-16 numeric characters
 */
export function validatePlayerNumber(playerNumber: string): string | undefined {
  if (!playerNumber || playerNumber.length < 3) {
    return 'Player numbers are 3-16 digits long.';
  }
  if (playerNumber.length > 16) {
    return 'Player numbers are 3-16 digits long.';
  }
  if (!/^[0-9]+$/.test(playerNumber)) {
    return 'Player numbers can only be numerals.';
  }
  return undefined;
}

/**
 * Validates that a mining skill is selected
 */
export function validateMiningSkill(miningSkill: number | null): string | undefined {
  if (miningSkill === null) {
    return 'Select Mining skill to continue.';
  }
  return undefined;
}

/**
 * Checks for incompatible modifiers
 */
export function checkIncompatibleModifiers(modifiers: Modifiers): string | undefined {
  // Skip validation if "No modifiers" is enabled
  if (modifiers.noModifiers) {
    return undefined;
  }

  const incompatibleGroups = [
    // Group 1: Fast Worker & Slow Worker
    [modifiers.fastWorker, modifiers.slowWorker],
    // Group 2: Efficient Worker & Inefficient Worker
    [modifiers.efficientWorker, modifiers.inefficientWorker],
    // Group 3: Misc Bonus +2, Misc Bonus +1, Misc Penalty -1, Misc Penalty -2
    [
      modifiers.miscBonusPlus2,
      modifiers.miscBonusPlus1,
      modifiers.miscPenaltyMinus1,
      modifiers.miscPenaltyMinus2,
    ],
    // Group 4: Event Bonus +1, Event Penalty -1
    [modifiers.eventBonusPlus1, modifiers.eventPenaltyMinus1],
  ];

  for (const group of incompatibleGroups) {
    const activeCount = group.filter(Boolean).length;
    if (activeCount > 1) {
      return 'Two or more of the toggled modifiers are incompatible. Check the modifiers and make adjustments to continue.';
    }
  }

  return undefined;
}

/**
 * Validates all form data for screen 1
 */
export function validateScreen1(
  eventCode: string,
  playerNumber: string
): ValidationErrors {
  const errors: ValidationErrors = {};

  const eventCodeError = validateEventCode(eventCode);
  if (eventCodeError) {
    errors.eventCode = eventCodeError;
  }

  const playerNumberError = validatePlayerNumber(playerNumber);
  if (playerNumberError) {
    errors.playerNumber = playerNumberError;
  }

  return errors;
}

/**
 * Validates all form data for screen 2
 */
export function validateScreen2(
  miningSkill: number | null,
  modifiers: Modifiers
): ValidationErrors {
  const errors: ValidationErrors = {};

  const miningSkillError = validateMiningSkill(miningSkill);
  if (miningSkillError) {
    errors.miningSkill = miningSkillError;
  }

  const modifiersError = checkIncompatibleModifiers(modifiers);
  if (modifiersError) {
    errors.modifiers = modifiersError;
  }

  return errors;
}
