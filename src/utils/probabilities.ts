import { MineType } from '../types';

/**
 * Probability tables for mine types based on effective skill level
 */
export const MINE_PROBABILITY_TABLES: Record<number, MineType[]> = {
  1: [
    { type: 'Metal Scraps', skillRequired: 1, probability: 100 },
  ],
  2: [
    { type: 'Metal Scraps', skillRequired: 1, probability: 75 },
    { type: 'Quartz', skillRequired: 1, probability: 25 },
  ],
  3: [
    { type: 'Metal Scraps', skillRequired: 1, probability: 25 },
    { type: 'Quartz', skillRequired: 1, probability: 25 },
    { type: 'Iron', skillRequired: 1, probability: 25 },
    { type: 'Copper', skillRequired: 1, probability: 25 },
  ],
  4: [
    { type: 'Metal Scraps', skillRequired: 1, probability: 10 },
    { type: 'Quartz', skillRequired: 1, probability: 10 },
    { type: 'Iron', skillRequired: 1, probability: 40 },
    { type: 'Copper', skillRequired: 1, probability: 40 },
  ],
  5: [
    { type: 'Iron', skillRequired: 1, probability: 25 },
    { type: 'Copper', skillRequired: 1, probability: 25 },
    { type: 'Gray Agate', skillRequired: 2, probability: 25 },
    { type: 'Moss Agate', skillRequired: 2, probability: 25 },
  ],
  6: [
    { type: 'Iron', skillRequired: 1, probability: 10 },
    { type: 'Copper', skillRequired: 1, probability: 10 },
    { type: 'Gray Agate', skillRequired: 2, probability: 40 },
    { type: 'Moss Agate', skillRequired: 2, probability: 40 },
  ],
  7: [
    { type: 'Gray Agate', skillRequired: 2, probability: 10 },
    { type: 'Moss Agate', skillRequired: 2, probability: 10 },
    { type: 'Vulcanium', skillRequired: 3, probability: 20 },
    { type: 'Mithril', skillRequired: 3, probability: 20 },
    { type: 'Adamantine', skillRequired: 3, probability: 20 },
    { type: 'Cobalt', skillRequired: 3, probability: 20 },
  ],
  8: [
    { type: 'Vulcanium', skillRequired: 3, probability: 20 },
    { type: 'Mithril', skillRequired: 3, probability: 20 },
    { type: 'Adamantine', skillRequired: 3, probability: 20 },
    { type: 'Cobalt', skillRequired: 3, probability: 20 },
    { type: 'Ruby', skillRequired: 5, probability: 5 },
    { type: 'Quicksilver', skillRequired: 5, probability: 5 },
    { type: 'Emerald', skillRequired: 5, probability: 5 },
    { type: 'Sapphire', skillRequired: 5, probability: 5 },
  ],
  9: [
    { type: 'Vulcanium', skillRequired: 3, probability: 15 },
    { type: 'Mithril', skillRequired: 3, probability: 15 },
    { type: 'Adamantine', skillRequired: 3, probability: 15 },
    { type: 'Cobalt', skillRequired: 3, probability: 15 },
    { type: 'Ruby', skillRequired: 5, probability: 10 },
    { type: 'Quicksilver', skillRequired: 5, probability: 10 },
    { type: 'Emerald', skillRequired: 5, probability: 10 },
    { type: 'Sapphire', skillRequired: 5, probability: 10 },
  ],
  10: [
    { type: 'Vulcanium', skillRequired: 3, probability: 10 },
    { type: 'Mithril', skillRequired: 3, probability: 10 },
    { type: 'Adamantine', skillRequired: 3, probability: 10 },
    { type: 'Cobalt', skillRequired: 3, probability: 10 },
    { type: 'Ruby', skillRequired: 5, probability: 10 },
    { type: 'Quicksilver', skillRequired: 5, probability: 10 },
    { type: 'Emerald', skillRequired: 5, probability: 10 },
    { type: 'Sapphire', skillRequired: 5, probability: 10 },
    { type: 'Voidsteel', skillRequired: 7, probability: 5 },
    { type: 'Voidstone', skillRequired: 7, probability: 5 },
  ],
};

/**
 * Array of possible uses remaining values
 */
export const USES_POOL = [
  4, 5, 6, 6, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15,
];

/**
 * Rolls for a mine type based on the effective skill level
 * Uses weighted random selection
 */
export function rollMineType(effectiveSkillLevel: number): MineType {
  const table = MINE_PROBABILITY_TABLES[effectiveSkillLevel];
  if (!table) {
    throw new Error(`Invalid effective skill level: ${effectiveSkillLevel}`);
  }

  // Calculate total probability (should always be 100, but calculate for safety)
  const totalProbability = table.reduce((sum, item) => sum + item.probability, 0);

  // Generate random number between 0 and total probability
  const roll = Math.random() * totalProbability;

  // Find the mine type based on the roll
  let cumulativeProbability = 0;
  for (const mineType of table) {
    cumulativeProbability += mineType.probability;
    if (roll <= cumulativeProbability) {
      return mineType;
    }
  }

  // Fallback (should never reach here)
  return table[table.length - 1]!;
}

/**
 * Randomly selects a uses remaining value from the pool
 */
export function rollUsesRemaining(): number {
  const randomIndex = Math.floor(Math.random() * USES_POOL.length);
  return USES_POOL[randomIndex]!;
}

/**
 * Generates a random 2-digit number as a string (00-99)
 */
export function generateRandomDigits(): string {
  const num = Math.floor(Math.random() * 100);
  return num.toString().padStart(2, '0');
}
