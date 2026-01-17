import { Modifiers, CalculatedValues } from '../types';

/**
 * Calculates the skill points cost
 * Base: (Mining Skill * 2)
 * Modified by Efficient Worker (-3) or Inefficient Worker (+3)
 * Minimum value: 1
 */
export function calculateSkillPointsCost(
  baseMiningSkill: number,
  modifiers: Modifiers
): number {
  let cost = baseMiningSkill * 2;

  if (modifiers.efficientWorker) {
    cost -= 3;
  }
  if (modifiers.inefficientWorker) {
    cost += 3;
  }

  // Ensure minimum value of 1
  return Math.max(1, cost);
}

/**
 * Calculates the effective mine level
 * Base: Mining Skill
 * Modified by bonuses and penalties
 * Range: 1-10
 */
export function calculateEffectiveMineLevel(
  baseMiningSkill: number,
  modifiers: Modifiers
): number {
  let level = baseMiningSkill;

  // Apply bonuses
  if (modifiers.miscBonusPlus2) {
    level += 2;
  }
  if (modifiers.miscBonusPlus1) {
    level += 1;
  }
  if (modifiers.eventBonusPlus1) {
    level += 1;
  }

  // Apply penalties
  if (modifiers.miscPenaltyMinus1) {
    level -= 1;
  }
  if (modifiers.miscPenaltyMinus2) {
    level -= 2;
  }
  if (modifiers.eventPenaltyMinus1) {
    level -= 1;
  }

  // Clamp to range 1-10
  return Math.max(1, Math.min(10, level));
}

/**
 * Calculates the time to open the mine
 * Default: 15 minutes
 * Fast Worker: 10 minutes
 * Slow Worker: 20 minutes
 */
export function calculateTimeToOpen(modifiers: Modifiers): number {
  if (modifiers.fastWorker) {
    return 10;
  }
  if (modifiers.slowWorker) {
    return 20;
  }
  return 15;
}

/**
 * Calculates all values based on mining skill and modifiers
 */
export function calculateAllValues(
  baseMiningSkill: number,
  modifiers: Modifiers
): CalculatedValues {
  return {
    skillPointsCost: calculateSkillPointsCost(baseMiningSkill, modifiers),
    effectiveMineLevel: calculateEffectiveMineLevel(baseMiningSkill, modifiers),
    timeToOpen: calculateTimeToOpen(modifiers),
  };
}
