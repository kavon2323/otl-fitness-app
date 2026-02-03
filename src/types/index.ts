// Exercise and Program Types

export type ExerciseCategory =
  | 'prep'
  | 'hinge'
  | 'squat'
  | 'lunge'
  | 'press'
  | 'pull'
  | 'core'
  | 'sprint'
  | 'prehab'
  | 'energy_system';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  description: string;
  videoUrl?: string;
  tips?: string[];
  musclesTargeted?: {
    primary: string[];
    secondary?: string[];
  };
  equipment?: string[];
  selectionPools?: string[]; // e.g., ['primary_squat', 'accessory_squat']
}

export interface ExerciseSet {
  setNumber: number;
  targetReps: string; // Can be "8-10", "4RM", "25 seconds", etc.
  weight?: number;
  actualReps?: number;
  restSeconds?: number;
  completed: boolean;
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseSlot: string; // e.g., "1A", "2B", "3C"
  categorySlot: ExerciseCategory | string; // The category this slot expects
  sets: ExerciseSet[];
  supersetGroup?: string; // e.g., "1", "2", "3" - exercises with same group are supersets
  notes?: string;
  isPerSide?: boolean; // For unilateral exercises
}

export interface WorkoutDay {
  id: string;
  dayNumber: number;
  name: string;
  focus?: string; // e.g., "Lower Body Max Effort", "Pull Focus"
  sections: WorkoutSection[];
}

export interface WorkoutSection {
  name: string; // e.g., "ACTIVATION", "STRENGTH", "CORE FINISHER", "FITNESS"
  exercises: WorkoutExercise[];
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  totalWeeks?: number;
  daysPerWeek: number;
  days: WorkoutDay[];
  createdAt?: string;
  programType?: ProgramType; // 'strength' or 'mobility' - defaults to 'strength'
  useStaticExercises?: boolean; // If true, don't run through workout generator - use exercises as-is
}

// User-specific types
export interface UserExerciseSelection {
  programId: string;
  categorySlot: string;
  selectedExerciseId: string;
  weekNumber?: number;
}

export interface WorkoutLog {
  id: string;
  userId: string; // User who completed this workout
  programId: string;
  dayNumber: number;
  weekNumber: number;
  startTime: string;
  endTime?: string;
  exercises: LoggedExercise[];
  completed: boolean;
  notes?: string;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
}

export interface LoggedSet {
  setNumber: number;
  weight?: number;
  reps?: number;
  duration?: number; // For timed exercises
  restTaken?: number;
  completed: boolean;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  role?: UserRole;
  subscriptionTier?: SubscriptionTier;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionExpiresAt?: string;
  storeDiscountPercent?: number;
  currentProgramId?: string;
  currentWeek?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgramProgress {
  odId: string;
  programId: string;
  startDate: string;
  currentWeek: number;
  completedWorkouts: CompletedWorkout[];
  exerciseSelections: UserExerciseSelection[];
}

export interface CompletedWorkout {
  dayNumber: number;
  weekNumber: number;
  completedAt: string;
  workoutLogId: string;
}

// Timer types
export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  totalTime: number;
  type: 'rest' | 'work' | 'interval';
}

// Workout preferences
export interface WorkoutPreferences {
  supersetModeEnabled: boolean;
  defaultRestTime: number;
}

// Workout Generator Types
export type EquipmentId =
  | 'bodyweight'
  | 'bands'
  | 'kettlebells'
  | 'dumbbells'
  | 'barbell'
  | 'cables'
  | 'pullup_bar'
  | 'full_gym';

export type WorkoutType =
  | 'upper_body'
  | 'lower_body'
  | 'full_body'
  | 'cardio'
  | 'mobility';

export type ProgramType = 'strength' | 'mobility';

export interface EquipmentOption {
  id: EquipmentId;
  label: string;
  equipment: string[]; // Actual equipment names from exercise data
}

export interface GeneratedWorkout {
  id: string;
  name: string;
  workoutType: WorkoutType;
  selectedEquipment: EquipmentId[];
  durationMinutes: number;
  day: WorkoutDay; // Single day workout
  generatedAt: string;
}

// Coach Types
export type UserRole = 'user' | 'coach' | 'admin';

// Subscription Tiers:
// - free: Beta access (all features during beta)
// - omega: Program builder, library, workout logs, exercise library, supplements, store access
// - omega_pro: All OMEGA features + monthly log review, coach messaging, program modifications, form review videos, monthly coaching zoom
export type SubscriptionTier = 'free' | 'omega' | 'omega_pro';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing';

export interface CoachClient {
  id: string;
  coachId: string;
  clientId: string;
  status: 'pending' | 'active' | 'paused' | 'terminated';
  startedAt: string;
  notes?: string;
  client?: UserProfile;
}

export interface CustomProgram {
  id: string;
  coachId: string;
  name: string;
  description?: string;
  daysPerWeek: number;
  programData: Program;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramAssignment {
  id: string;
  programId: string;
  clientId: string;
  coachId: string;
  assignedAt: string;
  startDate?: string;
  endDate?: string;
  status: 'assigned' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  program?: CustomProgram;
  client?: UserProfile;
}

// Feature Access Configuration
export type Feature =
  | 'program_builder'
  | 'program_library'
  | 'workout_logs'
  | 'exercise_library'
  | 'supplements'
  | 'store_access'
  | 'monthly_log_review'
  | 'coach_messaging'
  | 'program_modifications'
  | 'form_review_videos'
  | 'monthly_coaching_zoom';

export interface TierFeatures {
  tier: SubscriptionTier;
  name: string;
  price: number; // Monthly price in dollars
  features: Feature[];
  storeDiscountPercent: number;
}

// Feature access by tier (during beta, 'free' has all features)
export const TIER_CONFIG: Record<SubscriptionTier, TierFeatures> = {
  free: {
    tier: 'free',
    name: 'Beta Access',
    price: 0,
    features: [
      'program_builder',
      'program_library',
      'workout_logs',
      'exercise_library',
      'supplements',
      'store_access',
      'monthly_log_review',
      'coach_messaging',
      'program_modifications',
      'form_review_videos',
      'monthly_coaching_zoom',
    ],
    storeDiscountPercent: 0, // No discount during free beta
  },
  omega: {
    tier: 'omega',
    name: 'OMEGA',
    price: 29,
    features: [
      'program_builder',
      'program_library',
      'workout_logs',
      'exercise_library',
      'supplements',
      'store_access',
    ],
    storeDiscountPercent: 0,
  },
  omega_pro: {
    tier: 'omega_pro',
    name: 'OMEGA Pro',
    price: 49,
    features: [
      'program_builder',
      'program_library',
      'workout_logs',
      'exercise_library',
      'supplements',
      'store_access',
      'monthly_log_review',
      'coach_messaging',
      'program_modifications',
      'form_review_videos',
      'monthly_coaching_zoom',
    ],
    storeDiscountPercent: 10,
  },
};

// Minimum tier required for each feature (for upgrade prompts)
export const FEATURE_MIN_TIER: Record<Feature, SubscriptionTier> = {
  program_builder: 'omega',
  program_library: 'omega',
  workout_logs: 'omega',
  exercise_library: 'omega',
  supplements: 'omega',
  store_access: 'omega',
  monthly_log_review: 'omega_pro',
  coach_messaging: 'omega_pro',
  program_modifications: 'omega_pro',
  form_review_videos: 'omega_pro',
  monthly_coaching_zoom: 'omega_pro',
};

// Feature display names for UI
export const FEATURE_NAMES: Record<Feature, string> = {
  program_builder: 'Program Builder',
  program_library: 'Program Library',
  workout_logs: 'Workout Logs',
  exercise_library: 'Exercise Library',
  supplements: 'Supplements',
  store_access: 'Store Access',
  monthly_log_review: 'Monthly Log Review',
  coach_messaging: 'Coach Messaging',
  program_modifications: 'Program Modifications',
  form_review_videos: 'Form Review Videos',
  monthly_coaching_zoom: 'Monthly Coaching Zoom',
};

// Helper function to check if a tier has access to a feature
export const hasFeatureAccess = (tier: SubscriptionTier | undefined, feature: Feature): boolean => {
  const userTier = tier || 'free';
  return TIER_CONFIG[userTier].features.includes(feature);
};

// Helper function to get store discount percentage
export const getStoreDiscount = (tier: SubscriptionTier | undefined): number => {
  const userTier = tier || 'free';
  return TIER_CONFIG[userTier].storeDiscountPercent;
};

// Helper function to get the minimum tier required for a feature
export const getRequiredTier = (feature: Feature): SubscriptionTier => {
  return FEATURE_MIN_TIER[feature];
};

// Helper function to get tier info for upgrade prompt
export const getUpgradeTierInfo = (feature: Feature): TierFeatures => {
  const requiredTier = FEATURE_MIN_TIER[feature];
  return TIER_CONFIG[requiredTier];
};
