/**
 * OTL Workout Generation Rules
 *
 * This file defines all the rules for modifying workouts based on:
 * 1. Training Cycle Phase (Eccentric → Isometric → Concentric)
 * 2. Player Position (Front / Mid / Back)
 * 3. Side Bias (Snake / Dorito / Both)
 * 4. Tournament Proximity
 * 5. Load Suggestions (RPE-based)
 * 6. Time Safety Rails
 */

import {
  PaintballPosition,
  FieldSideBias,
  TrainingCyclePhase,
} from '../types/paintball';

// ==================== SLOT CATEGORIES ====================

// Category slot types for identifying exercise types
export type SlotCategory =
  | 'PRIMARY_SQUAT'
  | 'PRIMARY_SQUAT_VELOCITY'
  | 'ACCESSORY_SQUAT'
  | 'PRIMARY_HINGE'
  | 'HEAVY_HINGE'
  | 'SINGLE_LEG_HINGE'
  | 'ACCESSORY_HINGE'
  | 'PRIMARY_LUNGE'
  | 'LATERAL_LUNGE'
  | 'LUNGE'
  | 'PRIMARY_PRESS'
  | 'SECONDARY_PRESS'
  | 'VERTICAL_PRESS'
  | 'HORIZONTAL_PRESS'
  | 'SINGLE_ARM_PRESS'
  | 'ACCESSORY_PRESS'
  | 'PRIMARY_PULL'
  | 'HORIZONTAL_PULL'
  | 'VERTICAL_PULL'
  | 'SINGLE_ARM_VERTICAL_PULL'
  | 'ACCESSORY_PULL'
  | 'CORE_VARIATION'
  | 'ISO_HOLD'
  | 'STABILIZATION_CORE'
  | 'WEIGHTED_CORE'
  | 'ENERGY_SYSTEM'
  | 'SPRINT'
  | 'CONDITIONING'
  | 'PLYOMETRIC'
  | 'LOADED_CARRY'
  | 'PREP'
  | 'ACTIVATION'
  | 'MOBILITY';

// Identify slot type from category slot string
export const getSlotType = (categorySlot: string): 'primary' | 'secondary' | 'accessory' | 'conditioning' | 'activation' => {
  const slot = categorySlot.toUpperCase();

  if (slot.includes('PRIMARY') || slot.includes('HEAVY')) return 'primary';
  if (slot.includes('SECONDARY') || slot.includes('VERTICAL_PRESS') || slot.includes('HORIZONTAL_')) return 'secondary';
  if (slot.includes('ENERGY') || slot.includes('SPRINT') || slot.includes('CONDITIONING')) return 'conditioning';
  if (slot.includes('PREP') || slot.includes('ACTIVATION') || slot.includes('MOBILITY')) return 'activation';
  return 'accessory';
};

// Check if slot is a bilateral compound movement
export const isBilateralPrimary = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return (
    slot.includes('PRIMARY_SQUAT') ||
    slot.includes('PRIMARY_HINGE') ||
    slot.includes('HEAVY_HINGE') ||
    slot.includes('PRIMARY_PRESS') ||
    slot.includes('PRIMARY_PULL')
  );
};

// Check if slot is a unilateral movement
export const isUnilateralSlot = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return (
    slot.includes('LUNGE') ||
    slot.includes('SINGLE_LEG') ||
    slot.includes('SINGLE_ARM') ||
    slot.includes('S/L') ||
    slot.includes('S/A')
  );
};

// Check if slot is upper body
export const isUpperBodySlot = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return (
    slot.includes('PRESS') ||
    slot.includes('PULL') ||
    slot.includes('PUSH')
  );
};

// Check if slot is for jumping/plyo
export const isJumpSlot = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return (
    slot.includes('PLYO') ||
    slot.includes('JUMP') ||
    slot.includes('VELOCITY')
  );
};

// Check if slot is core
export const isCoreSlot = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return (
    slot.includes('CORE') ||
    slot.includes('ISO_HOLD') ||
    slot.includes('STABILIZATION')
  );
};

// Check if slot is lateral movement
export const isLateralSlot = (categorySlot: string): boolean => {
  const slot = categorySlot.toUpperCase();
  return slot.includes('LATERAL');
};

// ==================== PHASE MODIFIERS (ECC → ISO → CON) ====================

export interface PhaseRuleModifiers {
  setsMultiplier: number;      // Applied to set count
  repsModifier: string;        // How to modify reps
  tempo: string;               // e.g., '4-0-1' (eccentric-pause-concentric)
  loadRange: string;           // e.g., '65-80%' or 'RPE 7-8'
  restMultiplier: number;      // Applied to rest periods
  description: string;
}

export const PHASE_RULES: Record<TrainingCyclePhase, PhaseRuleModifiers> = {
  eccentric: {
    setsMultiplier: 1.0,       // Keep set count
    repsModifier: 'reduce',    // Reduce reps if needed
    tempo: '4-0-1',            // 4s eccentric, 0 pause, 1s concentric
    loadRange: 'RPE 7-8',      // 65-80% equivalent
    restMultiplier: 1.2,       // Longer rest for eccentric stress
    description: 'Control the lowering phase with 4-second eccentric',
  },
  isometric: {
    setsMultiplier: 1.0,       // Keep sets
    repsModifier: 'moderate',  // Keep reps moderate
    tempo: '2-3-1',            // 2s down, 3s pause, 1s up
    loadRange: 'RPE 7.5-8.5',  // 70-85% equivalent
    restMultiplier: 1.0,       // Standard rest
    description: 'Hold and stabilize at key positions with 3-second pause',
  },
  concentric: {
    setsMultiplier: 0.9,       // Slightly reduce sets
    repsModifier: 'reduce',    // Lower reps
    tempo: '2-0-X',            // 2s down, 0 pause, explosive up
    loadRange: 'RPE 6-7',      // 50-75% equivalent, speed priority
    restMultiplier: 1.3,       // Longer rest for explosive work
    description: 'Explosive power on the lift with maximum velocity',
  },
};

// Apply phase modifier to reps
export const applyPhaseToReps = (baseReps: string, phase: TrainingCyclePhase): string => {
  const modifier = PHASE_RULES[phase].repsModifier;

  // Parse rep range
  if (baseReps.includes('-')) {
    const [min, max] = baseReps.split('-').map(Number);
    if (modifier === 'reduce') {
      // Reduce by ~20%
      return `${Math.max(3, Math.floor(min * 0.8))}-${Math.max(4, Math.floor(max * 0.8))}`;
    }
    return baseReps;
  }

  const reps = parseInt(baseReps, 10);
  if (!isNaN(reps)) {
    if (modifier === 'reduce') {
      return String(Math.max(3, Math.floor(reps * 0.8)));
    }
  }

  return baseReps;
};

// ==================== POSITION MODIFIERS ====================

export interface PositionSetModifier {
  bilateralPrimary: number;     // Adjustment to bilateral primary lifts
  unilateralLower: number;      // Adjustment to lunges/split squats
  upperBodyPush: number;        // Adjustment to push movements
  upperBodyPull: number;        // Adjustment to pull movements
  repBias: 'lower' | 'balanced' | 'higher';
  loadBias: 'lighter' | 'moderate' | 'heavier';
  conditioningDensity: 'lower' | 'standard' | 'higher';
  notes: string;
}

export const POSITION_SET_MODIFIERS: Record<PaintballPosition, PositionSetModifier> = {
  front: {
    bilateralPrimary: -1,       // -1 set on bilateral only
    unilateralLower: 1,         // +1 set on lunges
    upperBodyPush: 0,
    upperBodyPull: 0,
    repBias: 'lower',           // Lower reps, higher intent
    loadBias: 'lighter',        // Slightly lighter, faster
    conditioningDensity: 'lower',
    notes: 'Protect acceleration and CNS freshness. Never below 3 working sets on primary.',
  },
  mid: {
    bilateralPrimary: 0,        // No change
    unilateralLower: 0,
    upperBodyPush: 0,
    upperBodyPull: 0,
    repBias: 'balanced',
    loadBias: 'moderate',
    conditioningDensity: 'higher', // Slightly higher conditioning density
    notes: 'Balanced approach with emphasis on work capacity.',
  },
  back: {
    bilateralPrimary: 0,        // Keep full sets
    unilateralLower: 0,
    upperBodyPush: 1,           // +1 set upper body
    upperBodyPull: 1,           // +1 set upper body
    repBias: 'higher',          // Slightly higher reps
    loadBias: 'moderate',       // Moderate, repeatable
    conditioningDensity: 'standard',
    notes: 'Keep full sets for strength. Add upper body volume.',
  },
};

// Apply position modifier to sets
export const applyPositionToSets = (
  baseSets: number,
  categorySlot: string,
  position: PaintballPosition
): number => {
  const modifier = POSITION_SET_MODIFIERS[position];
  let adjustment = 0;

  if (isBilateralPrimary(categorySlot)) {
    adjustment = modifier.bilateralPrimary;
  } else if (isUnilateralSlot(categorySlot)) {
    adjustment = modifier.unilateralLower;
  } else if (isUpperBodySlot(categorySlot)) {
    // Check push vs pull
    const slot = categorySlot.toUpperCase();
    if (slot.includes('PRESS') || slot.includes('PUSH')) {
      adjustment = modifier.upperBodyPush;
    } else if (slot.includes('PULL') || slot.includes('ROW')) {
      adjustment = modifier.upperBodyPull;
    }
  }

  const newSets = baseSets + adjustment;

  // Never below 3 working sets on primary movements
  if (isBilateralPrimary(categorySlot)) {
    return Math.max(3, newSets);
  }

  // Never below 2 sets on anything
  return Math.max(2, newSets);
};

// Apply position rep bias
export const applyPositionToReps = (baseReps: string, position: PaintballPosition): string => {
  const bias = POSITION_SET_MODIFIERS[position].repBias;

  if (baseReps.includes('-')) {
    const [min, max] = baseReps.split('-').map(Number);

    switch (bias) {
      case 'lower':
        // Shift toward lower end
        return `${Math.max(3, min - 1)}-${max - 1}`;
      case 'higher':
        // Shift toward higher end
        return `${min + 1}-${max + 2}`;
      default:
        return baseReps;
    }
  }

  const reps = parseInt(baseReps, 10);
  if (!isNaN(reps)) {
    switch (bias) {
      case 'lower':
        return String(Math.max(3, reps - 1));
      case 'higher':
        return String(reps + 1);
      default:
        return baseReps;
    }
  }

  return baseReps;
};

// ==================== SIDE BIAS MODIFIERS ====================

export interface SideBiasSetModifier {
  lungeLatCore: number;        // Adjustment to lunge/lateral/core
  sqautBoundPush: number;      // Adjustment to squat/bound/push
  isometricDuration: 'standard' | 'longer';
  jumpVolumeMultiplier: number;
  unilateralLowerMultiplier: number;
  repBias: 'lower' | 'standard';
  explosiveIntent: 'standard' | 'higher';
  notes: string;
}

export const SIDE_BIAS_MODIFIERS: Record<FieldSideBias, SideBiasSetModifier> = {
  snake: {
    lungeLatCore: 1,            // +1 set on lunge/lateral/core
    sqautBoundPush: 0,
    isometricDuration: 'longer',
    jumpVolumeMultiplier: 0.8,  // -20% jump volume
    unilateralLowerMultiplier: 1.0,
    repBias: 'standard',
    explosiveIntent: 'standard',
    notes: 'Low-position strength, ground-to-sprint patterns, reduced jump volume.',
  },
  dorito: {
    lungeLatCore: 0,
    sqautBoundPush: 1,          // +1 set on squat/bound/push
    isometricDuration: 'standard',
    jumpVolumeMultiplier: 1.0,
    unilateralLowerMultiplier: 1.0,
    repBias: 'lower',           // Rep ranges skew lower
    explosiveIntent: 'higher',  // More explosive intent
    notes: 'Vertical force, open-chain power, more explosive intent.',
  },
  both: {
    lungeLatCore: 0,
    sqautBoundPush: 0,
    isometricDuration: 'standard',
    jumpVolumeMultiplier: 1.0,
    unilateralLowerMultiplier: 0.85, // -10-15% unilateral lower
    repBias: 'standard',
    explosiveIntent: 'standard',
    notes: 'Balanced approach, alternating emphasis. Reduce unilateral stress.',
  },
};

// Apply side bias modifier to sets
export const applySideBiasToSets = (
  baseSets: number,
  categorySlot: string,
  sideBias: FieldSideBias
): number => {
  const modifier = SIDE_BIAS_MODIFIERS[sideBias];
  let adjustment = 0;

  // Snake: +1 set on lunge/lateral/core
  if (sideBias === 'snake') {
    if (isUnilateralSlot(categorySlot) || isLateralSlot(categorySlot) || isCoreSlot(categorySlot)) {
      adjustment = modifier.lungeLatCore;
    }
  }

  // Dorito: +1 set on squat/bound/push
  if (sideBias === 'dorito') {
    const slot = categorySlot.toUpperCase();
    if (slot.includes('SQUAT') || slot.includes('PLYO') || slot.includes('PUSH') || slot.includes('BOUND')) {
      adjustment = modifier.sqautBoundPush;
    }
  }

  // Both: reduce unilateral lower
  if (sideBias === 'both' && isUnilateralSlot(categorySlot)) {
    return Math.max(2, Math.round(baseSets * modifier.unilateralLowerMultiplier));
  }

  return Math.max(2, baseSets + adjustment);
};

// Apply side bias to jump/plyo sets
export const applySideBiasToJumpVolume = (
  baseSets: number,
  sideBias: FieldSideBias
): number => {
  const modifier = SIDE_BIAS_MODIFIERS[sideBias];
  return Math.max(2, Math.round(baseSets * modifier.jumpVolumeMultiplier));
};

// ==================== TOURNAMENT PROXIMITY OVERRIDES ====================

export interface TournamentProximityRule {
  volumeMultiplier: number;
  maxSetsPerExercise: number;
  keepIntensity: boolean;
  removeNewExercises: boolean;
  removeEccentrics: boolean;
  conditioningMode: 'normal' | 'alactic_only' | 'removed';
  description: string;
}

export const TOURNAMENT_PROXIMITY_RULES: { threshold: number; rule: TournamentProximityRule }[] = [
  {
    threshold: 14, // ≥14 days out
    rule: {
      volumeMultiplier: 1.0,
      maxSetsPerExercise: 99,
      keepIntensity: true,
      removeNewExercises: false,
      removeEccentrics: false,
      conditioningMode: 'normal',
      description: 'Full training mode - no changes',
    },
  },
  {
    threshold: 7, // 7-13 days out
    rule: {
      volumeMultiplier: 0.75, // -20-30% volume
      maxSetsPerExercise: 4,
      keepIntensity: true,
      removeNewExercises: true,
      removeEccentrics: false,
      conditioningMode: 'normal',
      description: 'Taper starting - reduced volume, maintain intensity',
    },
  },
  {
    threshold: 0, // ≤6 days out
    rule: {
      volumeMultiplier: 0.5, // -40-60% volume
      maxSetsPerExercise: 3,
      keepIntensity: true,
      removeNewExercises: true,
      removeEccentrics: true,
      conditioningMode: 'alactic_only',
      description: 'Heavy taper - minimal volume, no eccentrics',
    },
  },
];

// Get tournament proximity rule based on days until tournament
export const getTournamentRule = (daysUntil: number | null): TournamentProximityRule => {
  if (daysUntil === null) {
    return TOURNAMENT_PROXIMITY_RULES[0].rule; // Full training
  }

  // Find the appropriate rule
  for (const { threshold, rule } of TOURNAMENT_PROXIMITY_RULES) {
    if (daysUntil >= threshold) {
      return rule;
    }
  }

  // Default to heaviest taper
  return TOURNAMENT_PROXIMITY_RULES[TOURNAMENT_PROXIMITY_RULES.length - 1].rule;
};

// Apply tournament taper to sets
export const applyTournamentToSets = (
  baseSets: number,
  daysUntil: number | null
): number => {
  const rule = getTournamentRule(daysUntil);
  const modified = Math.round(baseSets * rule.volumeMultiplier);
  return Math.min(Math.max(2, modified), rule.maxSetsPerExercise);
};

// ==================== LOAD SUGGESTION (RPE-BASED) ====================

export interface LoadSuggestion {
  rpe: string;           // e.g., 'RPE 7-8'
  percentRange: string;  // e.g., '65-80%'
  description: string;
}

// Get load suggestion based on training cycle phase
export const getLoadSuggestion = (phase: TrainingCyclePhase): LoadSuggestion => {
  switch (phase) {
    case 'eccentric':
      return {
        rpe: 'RPE 7-8',
        percentRange: '65-80%',
        description: 'Moderate load with controlled tempo',
      };
    case 'isometric':
      return {
        rpe: 'RPE 7.5-8.5',
        percentRange: '70-85%',
        description: 'Moderate-heavy load with pauses',
      };
    case 'concentric':
      return {
        rpe: 'RPE 6-7',
        percentRange: '50-75%',
        description: 'Lighter load with maximum speed',
      };
  }
};

// ==================== TIME SAFETY RAIL (45-90 MIN) ====================

export const SESSION_TIME_LIMITS = {
  minimum: 45,
  maximum: 90,
  targetAverage: 60,
};

// Estimated time per exercise (in minutes)
export const EXERCISE_TIME_ESTIMATES = {
  activation: 2,      // Per activation exercise
  primaryLift: 8,     // Per primary compound lift (including rest)
  secondaryLift: 6,   // Per secondary lift
  accessory: 4,       // Per accessory exercise
  conditioning: 10,   // Per conditioning block
  core: 4,            // Per core exercise
};

// Estimate total session time
export const estimateSessionTime = (
  activationCount: number,
  primaryCount: number,
  secondaryCount: number,
  accessoryCount: number,
  conditioningCount: number,
  coreCount: number
): number => {
  return (
    activationCount * EXERCISE_TIME_ESTIMATES.activation +
    primaryCount * EXERCISE_TIME_ESTIMATES.primaryLift +
    secondaryCount * EXERCISE_TIME_ESTIMATES.secondaryLift +
    accessoryCount * EXERCISE_TIME_ESTIMATES.accessory +
    conditioningCount * EXERCISE_TIME_ESTIMATES.conditioning +
    coreCount * EXERCISE_TIME_ESTIMATES.core
  );
};

// Determine what to reduce if session exceeds max time
export interface TimeReduction {
  reduceAccessorySets: number;
  reduceConditioningVolume: number;
  notes: string;
}

export const getTimeReduction = (estimatedMinutes: number): TimeReduction | null => {
  if (estimatedMinutes <= SESSION_TIME_LIMITS.maximum) {
    return null; // No reduction needed
  }

  const excess = estimatedMinutes - SESSION_TIME_LIMITS.maximum;

  // Never remove: Activation, Primary lift slot
  // Reduce: Accessory sets, Conditioning volume

  if (excess <= 10) {
    return {
      reduceAccessorySets: 1,
      reduceConditioningVolume: 0,
      notes: 'Reduced accessory sets by 1 to fit time',
    };
  } else if (excess <= 20) {
    return {
      reduceAccessorySets: 1,
      reduceConditioningVolume: 0.5, // 50% conditioning
      notes: 'Reduced accessory sets and conditioning volume',
    };
  } else {
    return {
      reduceAccessorySets: 2,
      reduceConditioningVolume: 0.5,
      notes: 'Significantly reduced accessories and conditioning to fit time',
    };
  }
};

// ==================== COMBINED MODIFIER APPLICATION ====================

export interface CombinedModifiers {
  phase: TrainingCyclePhase;
  position: PaintballPosition;
  sideBias: FieldSideBias;
  daysUntilTournament: number | null;
}

// Calculate final sets for an exercise after all modifiers
export const calculateFinalSets = (
  baseSets: number,
  categorySlot: string,
  modifiers: CombinedModifiers
): number => {
  let sets = baseSets;

  // 1. Apply phase modifier (global multiplier)
  sets = Math.round(sets * PHASE_RULES[modifiers.phase].setsMultiplier);

  // 2. Apply position modifier
  sets = applyPositionToSets(sets, categorySlot, modifiers.position);

  // 3. Apply side bias modifier
  if (isJumpSlot(categorySlot)) {
    sets = applySideBiasToJumpVolume(sets, modifiers.sideBias);
  } else {
    sets = applySideBiasToSets(sets, categorySlot, modifiers.sideBias);
  }

  // 4. Apply tournament proximity override (last, global override)
  sets = applyTournamentToSets(sets, modifiers.daysUntilTournament);

  return sets;
};

// Calculate final reps for an exercise after all modifiers
export const calculateFinalReps = (
  baseReps: string,
  categorySlot: string,
  modifiers: CombinedModifiers
): string => {
  let reps = baseReps;

  // 1. Apply phase modifier
  reps = applyPhaseToReps(reps, modifiers.phase);

  // 2. Apply position modifier (only on primary lifts)
  if (getSlotType(categorySlot) === 'primary') {
    reps = applyPositionToReps(reps, modifiers.position);
  }

  return reps;
};

// Get tempo prescription for an exercise
export const getTempoPrescription = (
  categorySlot: string,
  phase: TrainingCyclePhase,
  daysUntilTournament: number | null
): string | null => {
  // No tempo work close to tournament
  const rule = getTournamentRule(daysUntilTournament);
  if (rule.removeEccentrics && phase === 'eccentric') {
    return null; // Skip eccentric tempo
  }

  // Only apply tempo to primary lifts
  if (getSlotType(categorySlot) !== 'primary') {
    return null;
  }

  return PHASE_RULES[phase].tempo;
};
