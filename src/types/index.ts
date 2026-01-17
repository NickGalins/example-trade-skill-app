// Screen navigation types
export type ScreenType =
  | 'home'
  | 'mining-selection'
  | 'event-player-info'
  | 'mining-skill-modifiers'
  | 'loading'
  | 'mine-card-result';

// Modifier types
export type ModifierType =
  | 'Fast Worker'
  | 'Slow Worker'
  | 'Efficient Worker'
  | 'Inefficient Worker'
  | 'Misc Bonus +2'
  | 'Misc Bonus +1'
  | 'Misc Penalty -1'
  | 'Misc Penalty -2'
  | 'Event Bonus +1'
  | 'Event Penalty -1';

export interface Modifiers {
  noModifiers: boolean;
  fastWorker: boolean;
  slowWorker: boolean;
  efficientWorker: boolean;
  inefficientWorker: boolean;
  miscBonusPlus2: boolean;
  miscBonusPlus1: boolean;
  miscPenaltyMinus1: boolean;
  miscPenaltyMinus2: boolean;
  eventBonusPlus1: boolean;
  eventPenaltyMinus1: boolean;
}

// Form data types
export interface EventPlayerInfo {
  eventCode: string;
  playerNumber: string;
}

export interface MiningSkillInfo {
  miningSkill: number | null;
  modifiers: Modifiers;
}

// Mine type data
export interface MineType {
  type: string;
  skillRequired: number;
  probability: number;
}

// Generated mine card
export interface MineCard {
  mineNumber: string;
  openedByPlayer: string;
  mineType: string;
  skillRequired: number;
  usesRemaining: number;
  shopkeeper: string;
  timeToOpen: number;
}

// Calculated values
export interface CalculatedValues {
  skillPointsCost: number;
  effectiveMineLevel: number;
  timeToOpen: number;
}

// Validation errors
export interface ValidationErrors {
  eventCode?: string;
  playerNumber?: string;
  miningSkill?: string;
  modifiers?: string;
}

// App state
export interface AppState {
  currentScreen: ScreenType;
  eventPlayerInfo: EventPlayerInfo;
  miningSkillInfo: MiningSkillInfo;
  calculatedValues: CalculatedValues;
  mineCard: MineCard | null;
  validationErrors: ValidationErrors;
}
