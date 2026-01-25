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
  videoUrl: string;
  tips?: string[];
  musclesTargeted?: {
    primary: string[];
    secondary?: string[];
  };
  equipment?: string[];
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
export type SubscriptionTier = 'free' | 'premium' | 'coaching';

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
