// ==================== PAINTBALL POSITION TYPES ====================

export type PaintballPosition = 'back' | 'mid' | 'front';

export type FieldSideBias = 'snake' | 'dorito' | 'both';

export type TrainingPhase = 'off_season' | 'in_season' | 'pre_tournament';

// Training Cycle Phases for primary movements (each cycle is 4 weeks)
export type TrainingCyclePhase = 'eccentric' | 'isometric' | 'concentric';

// Full training cycle: Eccentric (4 weeks) -> Isometric (4 weeks) -> Concentric (4 weeks) -> Repeat
export interface TrainingCycle {
  currentPhase: TrainingCyclePhase;
  weekInPhase: number; // 1-4
  cycleNumber: number; // Which full cycle (1, 2, 3, etc.)
}

export type Division =
  | 'recreational'
  | 'D5'
  | 'D4'
  | 'D3'
  | 'D2'
  | 'D1'
  | 'Pro';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

// ==================== PLAYER PROFILE ====================

export interface UpcomingTournament {
  id: string;
  name: string;
  date: string; // ISO date string
  location?: string;
}

export interface PlayerProfile {
  id: string;
  userId: string;

  // Position & Field Preferences
  primaryPosition: PaintballPosition;
  fieldSideBias: FieldSideBias;

  // Experience & Division
  currentDivision: Division;
  yearsExperience: number;
  experienceLevel: ExperienceLevel; // Computed from yearsExperience

  // Training Phase
  currentPhase: TrainingPhase;
  nextTournamentDate?: string; // ISO date string (deprecated, use upcomingTournaments)
  upcomingTournaments?: UpcomingTournament[]; // Multiple upcoming tournaments

  // Training Availability
  trainingDaysPerWeek: number; // 2, 3, or 4

  // Training Cycle Tracking
  trainingCycle?: TrainingCycle; // Current position in the Eccentric/Isometric/Concentric cycle
  programStartDate?: string; // When the current 4-week cycle started

  // Metadata
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Draft version for onboarding (all fields optional except what's been filled)
export type PlayerProfileDraft = Partial<Omit<PlayerProfile, 'id' | 'userId' | 'experienceLevel' | 'onboardingCompleted' | 'createdAt' | 'updatedAt'>> & {
  trainingDaysPerWeek?: number;
};

// ==================== EXERCISE TAGS ====================

export type MovementPattern =
  | 'hip_hinge'
  | 'squat'
  | 'lunge'
  | 'push'
  | 'pull'
  | 'rotation'
  | 'anti_rotation'
  | 'locomotion'
  | 'plyometric'
  | 'isometric';

export type PlaneOfMotion =
  | 'sagittal'      // Forward/backward
  | 'frontal'       // Side-to-side
  | 'transverse'    // Rotational
  | 'multi_planar';

export type EnergySystem =
  | 'phosphagen'    // 0-10 seconds, max effort (ATP-PC)
  | 'glycolytic'    // 10-120 seconds, high intensity
  | 'oxidative'     // 2+ minutes, endurance
  | 'mixed';

// Position relevance scoring (1-5 scale)
export interface PositionRelevance {
  front: number;  // 1-5
  mid: number;    // 1-5
  back: number;   // 1-5
}

// Side bias relevance scoring (1-5 scale)
export interface SideBiasRelevance {
  snake: number;   // 1-5
  dorito: number;  // 1-5
}

// Extended Exercise tags for paintball specificity
export interface PaintballExerciseTags {
  movementPattern: MovementPattern;
  planeOfMotion: PlaneOfMotion;
  energySystem: EnergySystem;
  positionRelevance: PositionRelevance;
  sideBiasRelevance: SideBiasRelevance;
}

// Complexity level for experience-based filtering
export type ComplexityLevel = 1 | 2 | 3;
// Level 1: Basic movements, bodyweight, simple patterns
// Level 2: Loaded movements, compound exercises, moderate complexity
// Level 3: Olympic lifts, complex plyometrics, advanced progressions

// ==================== WORKOUT MODIFIERS ====================

export interface PhaseModifiers {
  volumeMultiplier: number;        // 0.5 - 1.5
  intensityMultiplier: number;     // 0.5 - 1.5
  restMultiplier: number;          // 0.5 - 1.5
  sessionLengthMultiplier: number; // 0.5 - 1.5
}

export interface ExperienceModifiers {
  complexityLevel: ComplexityLevel; // Max complexity allowed
  volumeMultiplier: number;         // 0.5 - 1.5
  exerciseVariety: number;          // How many exercise options to show
}

export const PHASE_MODIFIERS: Record<TrainingPhase, PhaseModifiers> = {
  off_season: {
    volumeMultiplier: 1.2,
    intensityMultiplier: 1.0,
    restMultiplier: 1.0,
    sessionLengthMultiplier: 1.2,
  },
  pre_tournament: {
    volumeMultiplier: 0.7,
    intensityMultiplier: 1.1,
    restMultiplier: 0.8,
    sessionLengthMultiplier: 0.85,
  },
  in_season: {
    volumeMultiplier: 0.6,
    intensityMultiplier: 0.85,
    restMultiplier: 1.2,
    sessionLengthMultiplier: 0.7,
  },
};

export const EXPERIENCE_MODIFIERS: Record<ExperienceLevel, ExperienceModifiers> = {
  beginner: {
    complexityLevel: 1,
    volumeMultiplier: 0.8,
    exerciseVariety: 3,
  },
  intermediate: {
    complexityLevel: 2,
    volumeMultiplier: 1.0,
    exerciseVariety: 5,
  },
  advanced: {
    complexityLevel: 3,
    volumeMultiplier: 1.15,
    exerciseVariety: 8,
  },
};

// ==================== TRAINING CYCLE MODIFIERS ====================

export interface TrainingCycleModifiers {
  tempoFocus: string; // e.g., "4-0-1" for eccentric, "3-3-1" for isometric
  primaryExerciseEmphasis: string;
  repRangeAdjustment: string;
  restMultiplier: number;
  description: string;
}

export const TRAINING_CYCLE_MODIFIERS: Record<TrainingCyclePhase, TrainingCycleModifiers> = {
  eccentric: {
    tempoFocus: '4-0-1', // 4 second eccentric, 0 pause, 1 second concentric
    primaryExerciseEmphasis: 'Control the lowering phase',
    repRangeAdjustment: 'Lower reps (4-6) with heavier load',
    restMultiplier: 1.2, // Longer rest for heavier loads
    description: 'Focus on the eccentric (lowering) phase of primary movements. Build strength through controlled negative work. 4-second lowering tempo on main lifts.',
  },
  isometric: {
    tempoFocus: '2-3-1', // 2 second eccentric, 3 second hold, 1 second concentric
    primaryExerciseEmphasis: 'Hold and stabilize at key positions',
    repRangeAdjustment: 'Moderate reps (6-8) with pause at bottom',
    restMultiplier: 1.0,
    description: 'Focus on isometric holds at key positions. Build stability and strength at sticking points. 3-second pause at bottom position on main lifts.',
  },
  concentric: {
    tempoFocus: '2-0-X', // 2 second eccentric, 0 pause, explosive concentric
    primaryExerciseEmphasis: 'Explosive power on the lift',
    repRangeAdjustment: 'Varied reps (3-5) with maximal intent',
    restMultiplier: 1.3, // Longer rest for explosive work
    description: 'Focus on explosive concentric power. Move the weight with maximum velocity and intent. Apply paintball-specific speed to primary movements.',
  },
};

// ==================== POSITION BIAS CONFIGS ====================

export interface PositionBiasConfig {
  priorityMovementPatterns: MovementPattern[];
  priorityPlanes: PlaneOfMotion[];
  activationFocus: string[];
  conditioningFocus: EnergySystem[];
  description: string;
}

export const POSITION_BIAS_CONFIGS: Record<PaintballPosition, PositionBiasConfig> = {
  front: {
    priorityMovementPatterns: ['plyometric', 'lunge', 'locomotion'],
    priorityPlanes: ['sagittal', 'multi_planar'],
    activationFocus: ['hip_mobility', 'acceleration', 'unilateral_strength'],
    conditioningFocus: ['phosphagen', 'glycolytic'],
    description: 'Acceleration, change of direction, unilateral strength, hip mobility',
  },
  mid: {
    priorityMovementPatterns: ['locomotion', 'plyometric', 'squat'],
    priorityPlanes: ['frontal', 'sagittal', 'multi_planar'],
    activationFocus: ['lateral_movement', 'repeat_sprint', 'work_capacity'],
    conditioningFocus: ['glycolytic', 'mixed'],
    description: 'Repeat sprint ability, lateral/linear transitions, work capacity',
  },
  back: {
    priorityMovementPatterns: ['rotation', 'anti_rotation', 'isometric', 'push'],
    priorityPlanes: ['transverse', 'frontal'],
    activationFocus: ['trunk_endurance', 'upper_body_stamina', 'rotational_control'],
    conditioningFocus: ['oxidative', 'mixed'],
    description: 'Trunk endurance, upper-body stamina, rotational control',
  },
};

export interface SideBiasConfig {
  priorityMovementPatterns: MovementPattern[];
  mobilityFocus: string[];
  strengthFocus: string[];
  description: string;
}

export const SIDE_BIAS_CONFIGS: Record<FieldSideBias, SideBiasConfig> = {
  snake: {
    priorityMovementPatterns: ['lunge', 'squat', 'plyometric'],
    mobilityFocus: ['hip_internal_rotation', 'adductors'],
    strengthFocus: ['low_position_strength', 'ground_to_sprint'],
    description: 'Hip internal rotation, adductors, low-position strength, ground-to-sprint patterns',
  },
  dorito: {
    priorityMovementPatterns: ['plyometric', 'push', 'locomotion'],
    mobilityFocus: ['hip_external_rotation', 'lateral_drive'],
    strengthFocus: ['vertical_force', 'open_chain_power'],
    description: 'Hip external rotation, lateral drive, vertical force, open-chain power',
  },
  both: {
    priorityMovementPatterns: ['lunge', 'squat', 'plyometric', 'locomotion'],
    mobilityFocus: ['hip_internal_rotation', 'hip_external_rotation'],
    strengthFocus: ['low_position_strength', 'lateral_drive'],
    description: 'Balanced exposure with alternating emphasis each session',
  },
};

// ==================== DIVISION CONFIG ====================

export interface DivisionConfig {
  label: string;
  description: string;
  recommendedDaysPerWeek: number;
}

export const DIVISION_CONFIGS: Record<Division, DivisionConfig> = {
  recreational: {
    label: 'Recreational',
    description: 'Casual play, occasional events',
    recommendedDaysPerWeek: 2,
  },
  D5: {
    label: 'Division 5',
    description: 'Entry-level competitive',
    recommendedDaysPerWeek: 2,
  },
  D4: {
    label: 'Division 4',
    description: 'Developing competitive',
    recommendedDaysPerWeek: 3,
  },
  D3: {
    label: 'Division 3',
    description: 'Intermediate competitive',
    recommendedDaysPerWeek: 3,
  },
  D2: {
    label: 'Division 2',
    description: 'Advanced competitive',
    recommendedDaysPerWeek: 4,
  },
  D1: {
    label: 'Division 1',
    description: 'Elite amateur',
    recommendedDaysPerWeek: 4,
  },
  Pro: {
    label: 'Professional',
    description: 'Professional level',
    recommendedDaysPerWeek: 4,
  },
};

// ==================== WHY MESSAGES ====================

export interface WhyMessageContext {
  position: PaintballPosition;
  sideBias: FieldSideBias;
  phase: TrainingPhase;
  workoutFocus: string;
}

export interface WhyMessage {
  headline: string;
  detail: string;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate experience level from years of experience
 */
export const getExperienceLevel = (yearsExperience: number): ExperienceLevel => {
  if (yearsExperience >= 5) return 'advanced';
  if (yearsExperience >= 2) return 'intermediate';
  return 'beginner';
};

/**
 * Get days until a tournament date
 */
export const getDaysUntilTournament = (tournamentDate: string | undefined): number | null => {
  if (!tournamentDate) return null;
  const target = new Date(tournamentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get taper multiplier based on days until tournament
 */
export const getTaperMultiplier = (daysUntil: number | null): number => {
  if (daysUntil === null) return 1.0;
  if (daysUntil <= 3) return 0.3;  // Active recovery only
  if (daysUntil <= 7) return 0.5;  // Significant reduction
  if (daysUntil <= 14) return 0.75; // Moderate reduction
  return 1.0;
};

/**
 * Format position for display
 */
export const formatPosition = (position: PaintballPosition): string => {
  const labels: Record<PaintballPosition, string> = {
    front: 'Front Player',
    mid: 'Mid Player',
    back: 'Back Player',
  };
  return labels[position];
};

/**
 * Format side bias for display
 */
export const formatSideBias = (sideBias: FieldSideBias): string => {
  const labels: Record<FieldSideBias, string> = {
    snake: 'Snake Side',
    dorito: 'Dorito Side',
    both: 'Both Sides',
  };
  return labels[sideBias];
};

/**
 * Format training phase for display
 */
export const formatPhase = (phase: TrainingPhase): string => {
  const labels: Record<TrainingPhase, string> = {
    off_season: 'Off-Season',
    in_season: 'In-Season',
    pre_tournament: 'Pre-Tournament',
  };
  return labels[phase];
};

// ==================== TRAINING CYCLE HELPERS ====================

/**
 * Get the next training cycle phase
 */
export const getNextCyclePhase = (currentPhase: TrainingCyclePhase): TrainingCyclePhase => {
  const sequence: TrainingCyclePhase[] = ['eccentric', 'isometric', 'concentric'];
  const currentIndex = sequence.indexOf(currentPhase);
  return sequence[(currentIndex + 1) % sequence.length];
};

/**
 * Calculate current training cycle based on program start date
 */
export const calculateTrainingCycle = (programStartDate: string): TrainingCycle => {
  const start = new Date(programStartDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Each phase is 4 weeks (28 days)
  const weeksTotal = Math.floor(daysSinceStart / 7);
  const phaseIndex = Math.floor(weeksTotal / 4) % 3; // 0=eccentric, 1=isometric, 2=concentric
  const weekInPhase = (weeksTotal % 4) + 1; // 1-4
  const cycleNumber = Math.floor(weeksTotal / 12) + 1; // Full cycle is 12 weeks

  const phases: TrainingCyclePhase[] = ['eccentric', 'isometric', 'concentric'];

  return {
    currentPhase: phases[phaseIndex],
    weekInPhase,
    cycleNumber,
  };
};

/**
 * Format training cycle phase for display
 */
export const formatCyclePhase = (phase: TrainingCyclePhase): string => {
  const labels: Record<TrainingCyclePhase, string> = {
    eccentric: 'Eccentric Phase',
    isometric: 'Isometric Phase',
    concentric: 'Concentric Phase',
  };
  return labels[phase];
};

/**
 * Get cycle phase description
 */
export const getCyclePhaseDescription = (phase: TrainingCyclePhase): string => {
  return TRAINING_CYCLE_MODIFIERS[phase].description;
};

/**
 * Get the next upcoming tournament (closest date)
 */
export const getNextTournament = (tournaments: UpcomingTournament[] | undefined): UpcomingTournament | null => {
  if (!tournaments || tournaments.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = tournaments
    .filter(t => new Date(t.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcoming.length > 0 ? upcoming[0] : null;
};
