import {
  TrainingPhase,
  PhaseModifiers,
  ExperienceModifiers,
  PHASE_MODIFIERS,
  EXPERIENCE_MODIFIERS,
  ComplexityLevel,
  TrainingCyclePhase,
  TrainingCycle,
  TRAINING_CYCLE_MODIFIERS,
} from '../types/paintball';

export interface WorkoutModifiers {
  volumeMultiplier: number;
  intensityMultiplier: number;
  restMultiplier: number;
  sessionLengthMultiplier: number;
  maxComplexity: ComplexityLevel;
  exerciseVariety: number;
  // Training cycle specific modifiers
  cyclePhase?: TrainingCyclePhase;
  tempoFocus?: string; // e.g., '4-0-1' for eccentric
  primaryExerciseEmphasis?: string;
}

// Calculate days until tournament
export const getDaysUntilTournament = (tournamentDate: string | Date | null): number | null => {
  if (!tournamentDate) return null;

  const tournament = new Date(tournamentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  tournament.setHours(0, 0, 0, 0);

  const diffTime = tournament.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

// Get taper multiplier based on days until tournament
export const getTaperMultiplier = (daysUntilTournament: number | null): number => {
  if (daysUntilTournament === null) return 1.0;

  if (daysUntilTournament <= 3) {
    // Active recovery only
    return 0.3;
  } else if (daysUntilTournament <= 7) {
    // Heavy taper
    return 0.5;
  } else if (daysUntilTournament <= 14) {
    // Moderate taper
    return 0.75;
  } else {
    // Normal training
    return 1.0;
  }
};

// Get taper description for UI
export const getTaperDescription = (daysUntilTournament: number | null): string => {
  if (daysUntilTournament === null) return '';

  if (daysUntilTournament <= 3) {
    return 'Active recovery mode - light movement only';
  } else if (daysUntilTournament <= 7) {
    return 'Heavy taper - maintaining sharpness while reducing fatigue';
  } else if (daysUntilTournament <= 14) {
    return 'Taper starting - reducing volume while keeping intensity';
  } else {
    return 'Full training mode';
  }
};

// Calculate combined modifiers for a player
// NOTE: experienceLevel parameter is kept for backwards compatibility but is NOT used
// to modify workouts. Per user request, only position, side bias, phase, and days per week
// should affect the program. Experience level is collected but not applied.
export const calculateWorkoutModifiers = (
  phase: TrainingPhase,
  experienceLevel: 'beginner' | 'intermediate' | 'advanced',
  tournamentDate: string | Date | null = null,
  trainingCycle: TrainingCycle | null = null
): WorkoutModifiers => {
  const phaseModifiers = PHASE_MODIFIERS[phase];

  // Base volume from phase only (experience level NOT used per user request)
  let volumeMultiplier = phaseModifiers.volumeMultiplier;

  // Apply taper if pre-tournament
  if (phase === 'pre_tournament') {
    const daysUntil = getDaysUntilTournament(tournamentDate);
    const taperMultiplier = getTaperMultiplier(daysUntil);
    volumeMultiplier *= taperMultiplier;
  }

  // Get training cycle modifiers if available
  let restMultiplier = phaseModifiers.restMultiplier;
  let cyclePhase: TrainingCyclePhase | undefined;
  let tempoFocus: string | undefined;
  let primaryExerciseEmphasis: string | undefined;

  if (trainingCycle) {
    const cycleModifiers = TRAINING_CYCLE_MODIFIERS[trainingCycle.currentPhase];
    restMultiplier *= cycleModifiers.restMultiplier;
    cyclePhase = trainingCycle.currentPhase;
    tempoFocus = cycleModifiers.tempoFocus;
    primaryExerciseEmphasis = cycleModifiers.primaryExerciseEmphasis;
  }

  return {
    volumeMultiplier,
    intensityMultiplier: phaseModifiers.intensityMultiplier,
    restMultiplier,
    sessionLengthMultiplier: phaseModifiers.sessionLengthMultiplier,
    // All exercises available regardless of experience (maxComplexity = 3)
    maxComplexity: 3,
    // Standard exercise variety (experience level NOT used)
    exerciseVariety: 5,
    cyclePhase,
    tempoFocus,
    primaryExerciseEmphasis,
  };
};

// Apply modifiers to a set count
export const applySetsModifier = (
  baseSets: number,
  modifiers: WorkoutModifiers
): number => {
  const modified = Math.round(baseSets * modifiers.volumeMultiplier);
  return Math.max(1, modified); // Always at least 1 set
};

// Apply modifiers to reps (parsing rep ranges like "8-12")
export const applyRepsModifier = (
  baseReps: string,
  modifiers: WorkoutModifiers
): string => {
  // Handle rep ranges like "8-12"
  if (baseReps.includes('-')) {
    const [min, max] = baseReps.split('-').map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      const newMin = Math.round(min * modifiers.volumeMultiplier);
      const newMax = Math.round(max * modifiers.volumeMultiplier);
      return `${Math.max(1, newMin)}-${Math.max(1, newMax)}`;
    }
  }

  // Handle single numbers
  const reps = parseInt(baseReps, 10);
  if (!isNaN(reps)) {
    return String(Math.max(1, Math.round(reps * modifiers.volumeMultiplier)));
  }

  // Return as-is for non-numeric (e.g., "Max", "AMRAP")
  return baseReps;
};

// Apply modifiers to rest time
export const applyRestModifier = (
  baseRestSeconds: number,
  modifiers: WorkoutModifiers
): number => {
  return Math.round(baseRestSeconds * modifiers.restMultiplier);
};

// Apply modifiers to weight (percentage-based intensity)
export const applyIntensityModifier = (
  baseWeight: number | undefined,
  modifiers: WorkoutModifiers
): number | undefined => {
  if (baseWeight === undefined) return undefined;
  return Math.round(baseWeight * modifiers.intensityMultiplier);
};

// Format modifier summary for display
export const formatModifierSummary = (
  phase: TrainingPhase,
  experienceLevel: 'beginner' | 'intermediate' | 'advanced',
  tournamentDate: string | Date | null = null,
  trainingCycle: TrainingCycle | null = null
): string => {
  const modifiers = calculateWorkoutModifiers(phase, experienceLevel, tournamentDate, trainingCycle);

  const parts: string[] = [];

  if (modifiers.volumeMultiplier < 1) {
    parts.push(`${Math.round((1 - modifiers.volumeMultiplier) * 100)}% reduced volume`);
  } else if (modifiers.volumeMultiplier > 1) {
    parts.push(`${Math.round((modifiers.volumeMultiplier - 1) * 100)}% increased volume`);
  }

  if (modifiers.intensityMultiplier > 1) {
    parts.push(`${Math.round((modifiers.intensityMultiplier - 1) * 100)}% higher intensity`);
  } else if (modifiers.intensityMultiplier < 1) {
    parts.push(`${Math.round((1 - modifiers.intensityMultiplier) * 100)}% lower intensity`);
  }

  if (modifiers.cyclePhase) {
    const cycleNames: Record<TrainingCyclePhase, string> = {
      eccentric: 'Eccentric focus',
      isometric: 'Isometric focus',
      concentric: 'Concentric focus',
    };
    parts.push(cycleNames[modifiers.cyclePhase]);
  }

  if (parts.length === 0) {
    return 'Standard training parameters';
  }

  return parts.join(', ');
};

// Get experience level from years
export const getExperienceLevelFromYears = (years: number): 'beginner' | 'intermediate' | 'advanced' => {
  if (years <= 2) return 'beginner';
  if (years <= 5) return 'intermediate';
  return 'advanced';
};
