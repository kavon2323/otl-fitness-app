import {
  Exercise,
  ExerciseCategory,
  EquipmentId,
  EquipmentOption,
  WorkoutType,
  GeneratedWorkout,
  WorkoutDay,
  WorkoutSection,
  WorkoutExercise,
  ExerciseSet,
} from '../types';
import { getAllExercises } from '../store/exerciseStore';

// Get exercises dynamically from store
const getExercises = () => getAllExercises();

// Equipment options for multi-select
export const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { id: 'bodyweight', label: 'Bodyweight', equipment: [] },
  { id: 'bands', label: 'Bands', equipment: ['Resistance Band', 'Band'] },
  { id: 'kettlebells', label: 'Kettlebells', equipment: ['Kettlebell', 'Kettlebells'] },
  { id: 'dumbbells', label: 'Dumbbells', equipment: ['Dumbbell', 'Dumbbells'] },
  { id: 'barbell', label: 'Barbell', equipment: ['Barbell', 'Bench', 'Squat Rack', 'Trap Bar'] },
  { id: 'cables', label: 'Cables', equipment: ['Cable Machine', 'Cable'] },
  { id: 'pullup_bar', label: 'Pull-up Bar', equipment: ['Pull-Up Bar', 'Pull Up Bar'] },
  { id: 'full_gym', label: 'Full Gym', equipment: ['*'] },
];

// Workout type labels for display
export const WORKOUT_TYPE_OPTIONS: { id: WorkoutType; label: string; icon: string }[] = [
  { id: 'upper_body', label: 'Upper Body', icon: '💪' },
  { id: 'lower_body', label: 'Lower Body', icon: '🦵' },
  { id: 'full_body', label: 'Full Body', icon: '🏋️' },
  { id: 'cardio', label: 'Cardio', icon: '🏃' },
  { id: 'mobility', label: 'Mobility', icon: '🧘' },
];

// Workout structure templates - categories to use for each section
interface WorkoutTemplate {
  warmup: ExerciseCategory[];
  main: ExerciseCategory[];
  cooldown: ExerciseCategory[];
}

const WORKOUT_TEMPLATES: Record<WorkoutType, WorkoutTemplate> = {
  upper_body: {
    warmup: ['prep'],
    main: ['press', 'pull', 'press', 'pull', 'press', 'pull'],
    cooldown: ['core'],
  },
  lower_body: {
    warmup: ['prep'],
    main: ['squat', 'hinge', 'lunge', 'squat', 'hinge', 'lunge'],
    cooldown: ['core'],
  },
  full_body: {
    warmup: ['prep'],
    main: ['squat', 'press', 'hinge', 'pull', 'lunge', 'press', 'squat', 'pull'],
    cooldown: ['core'],
  },
  cardio: {
    warmup: ['prep'],
    main: ['energy_system', 'sprint', 'energy_system', 'sprint'],
    cooldown: ['prep'],
  },
  mobility: {
    warmup: ['prep'],
    main: ['prep', 'prehab', 'prep', 'prehab'],
    cooldown: ['prep'],
  },
};

// Default sets/reps based on category
const getDefaultSetsReps = (category: ExerciseCategory): { sets: number; reps: string } => {
  switch (category) {
    case 'prep':
    case 'prehab':
      return { sets: 2, reps: '8-10' };
    case 'squat':
    case 'hinge':
      return { sets: 4, reps: '6-8' };
    case 'lunge':
      return { sets: 3, reps: '8-10' };
    case 'press':
    case 'pull':
      return { sets: 3, reps: '8-12' };
    case 'core':
      return { sets: 3, reps: '12-15' };
    case 'sprint':
      return { sets: 4, reps: '20 seconds' };
    case 'energy_system':
      return { sets: 3, reps: '30 seconds' };
    default:
      return { sets: 3, reps: '10' };
  }
};

// Get all equipment strings from selected equipment IDs
const getSelectedEquipmentStrings = (selectedIds: EquipmentId[]): string[] => {
  if (selectedIds.includes('full_gym')) {
    return ['*'];
  }

  const equipmentStrings: string[] = [];
  selectedIds.forEach((id) => {
    const option = EQUIPMENT_OPTIONS.find((opt) => opt.id === id);
    if (option) {
      equipmentStrings.push(...option.equipment);
    }
  });

  return equipmentStrings;
};

// Check if an exercise is available with selected equipment
const isExerciseAvailable = (exercise: Exercise, selectedEquipment: string[]): boolean => {
  // Full gym means all exercises are available
  if (selectedEquipment.includes('*')) {
    return true;
  }

  // If exercise has no equipment requirements, it's always available
  if (!exercise.equipment || exercise.equipment.length === 0) {
    return true;
  }

  // Check if user has at least one of the required equipment items
  // OR if "bodyweight" is in selected and exercise has no equipment
  return exercise.equipment.some((eq) =>
    selectedEquipment.some((selected) =>
      eq.toLowerCase().includes(selected.toLowerCase()) ||
      selected.toLowerCase().includes(eq.toLowerCase())
    )
  );
};

// Filter exercises by category and available equipment
const getAvailableExercises = (
  category: ExerciseCategory,
  selectedEquipment: string[]
): Exercise[] => {
  return getExercises().filter(
    (ex) => ex.category === category && isExerciseAvailable(ex, selectedEquipment)
  );
};

// Get a random exercise from available ones
const getRandomExercise = (
  category: ExerciseCategory,
  selectedEquipment: string[],
  usedIds: Set<string>
): Exercise | null => {
  const available = getAvailableExercises(category, selectedEquipment).filter(
    (ex) => !usedIds.has(ex.id)
  );

  if (available.length === 0) {
    // If all exercises used, allow repeats
    const allAvailable = getAvailableExercises(category, selectedEquipment);
    if (allAvailable.length === 0) return null;
    return allAvailable[Math.floor(Math.random() * allAvailable.length)];
  }

  return available[Math.floor(Math.random() * available.length)];
};

// Calculate number of exercises based on duration
const calculateExerciseCount = (durationMinutes: number): { warmup: number; main: number; cooldown: number } => {
  // Rough estimates: ~3.5 min per exercise including rest
  const totalExercises = Math.max(2, Math.floor(durationMinutes / 3.5));

  if (durationMinutes <= 15) {
    return { warmup: 1, main: totalExercises - 1, cooldown: 0 };
  } else if (durationMinutes <= 30) {
    return { warmup: 1, main: totalExercises - 2, cooldown: 1 };
  } else if (durationMinutes <= 45) {
    return { warmup: 2, main: totalExercises - 3, cooldown: 1 };
  } else {
    return { warmup: 2, main: totalExercises - 4, cooldown: 2 };
  }
};

// Create workout exercise from exercise
const createWorkoutExercise = (
  exercise: Exercise,
  slot: string,
  supersetGroup?: string
): WorkoutExercise => {
  const { sets, reps } = getDefaultSetsReps(exercise.category);

  const exerciseSets: ExerciseSet[] = Array.from({ length: sets }, (_, i) => ({
    setNumber: i + 1,
    targetReps: reps,
    completed: false,
  }));

  return {
    exerciseId: exercise.id,
    exerciseSlot: slot,
    categorySlot: exercise.category,
    sets: exerciseSets,
    supersetGroup,
    isPerSide: exercise.name.toLowerCase().includes('single') ||
      exercise.name.toLowerCase().includes('unilateral') ||
      exercise.category === 'lunge',
  };
};

// Generate workout name based on type
const generateWorkoutName = (workoutType: WorkoutType): string => {
  const names: Record<WorkoutType, string[]> = {
    upper_body: ['Upper Body Blast', 'Push & Pull Power', 'Upper Strength'],
    lower_body: ['Leg Day', 'Lower Body Power', 'Legs & Glutes'],
    full_body: ['Total Body Workout', 'Full Body Strength', 'Complete Conditioning'],
    cardio: ['Cardio Burn', 'Heart Pumper', 'Sweat Session'],
    mobility: ['Mobility Flow', 'Stretch & Move', 'Active Recovery'],
  };

  const options = names[workoutType];
  return options[Math.floor(Math.random() * options.length)];
};

// Main generator function
export const generateWorkout = (
  workoutType: WorkoutType,
  selectedEquipment: EquipmentId[],
  durationMinutes: number
): GeneratedWorkout => {
  const template = WORKOUT_TEMPLATES[workoutType];
  const equipmentStrings = getSelectedEquipmentStrings(selectedEquipment);
  const counts = calculateExerciseCount(durationMinutes);
  const usedIds = new Set<string>();

  const sections: WorkoutSection[] = [];
  let slotCounter = 1;

  // Generate warmup section
  if (counts.warmup > 0) {
    const warmupExercises: WorkoutExercise[] = [];
    for (let i = 0; i < counts.warmup; i++) {
      const categoryIndex = i % template.warmup.length;
      const category = template.warmup[categoryIndex];
      const exercise = getRandomExercise(category, equipmentStrings, usedIds);

      if (exercise) {
        usedIds.add(exercise.id);
        warmupExercises.push(createWorkoutExercise(exercise, `W${i + 1}`));
      }
    }

    if (warmupExercises.length > 0) {
      sections.push({ name: 'WARMUP', exercises: warmupExercises });
    }
  }

  // Generate main section with supersets for strength workouts
  if (counts.main > 0) {
    const mainExercises: WorkoutExercise[] = [];
    const useSuperset = workoutType !== 'cardio' && workoutType !== 'mobility' && counts.main >= 4;

    for (let i = 0; i < counts.main; i++) {
      const categoryIndex = i % template.main.length;
      const category = template.main[categoryIndex];
      const exercise = getRandomExercise(category, equipmentStrings, usedIds);

      if (exercise) {
        usedIds.add(exercise.id);

        // Create supersets for pairs of exercises
        let supersetGroup: string | undefined;
        let slot: string;

        if (useSuperset) {
          const pairIndex = Math.floor(i / 2);
          const isSecondInPair = i % 2 === 1;
          supersetGroup = String(pairIndex + 1);
          slot = `${pairIndex + 1}${isSecondInPair ? 'B' : 'A'}`;
        } else {
          slot = `${slotCounter}`;
          slotCounter++;
        }

        mainExercises.push(createWorkoutExercise(exercise, slot, supersetGroup));
      }
    }

    if (mainExercises.length > 0) {
      sections.push({ name: 'MAIN', exercises: mainExercises });
    }
  }

  // Generate cooldown section
  if (counts.cooldown > 0) {
    const cooldownExercises: WorkoutExercise[] = [];
    for (let i = 0; i < counts.cooldown; i++) {
      const categoryIndex = i % template.cooldown.length;
      const category = template.cooldown[categoryIndex];
      const exercise = getRandomExercise(category, equipmentStrings, usedIds);

      if (exercise) {
        usedIds.add(exercise.id);
        cooldownExercises.push(createWorkoutExercise(exercise, `C${i + 1}`));
      }
    }

    if (cooldownExercises.length > 0) {
      sections.push({ name: 'COOLDOWN', exercises: cooldownExercises });
    }
  }

  const workoutDay: WorkoutDay = {
    id: `generated-${Date.now()}`,
    dayNumber: 1,
    name: generateWorkoutName(workoutType),
    focus: WORKOUT_TYPE_OPTIONS.find((opt) => opt.id === workoutType)?.label,
    sections,
  };

  return {
    id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: workoutDay.name,
    workoutType,
    selectedEquipment,
    durationMinutes,
    day: workoutDay,
    generatedAt: new Date().toISOString(),
  };
};

// Convert generated workout to a saveable program
export const convertToProgram = (generated: GeneratedWorkout): {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  days: WorkoutDay[];
  createdAt: string;
} => {
  return {
    id: `custom-${Date.now()}`,
    name: generated.name,
    description: `Generated ${generated.durationMinutes}-minute ${generated.workoutType.replace('_', ' ')} workout`,
    daysPerWeek: 1,
    days: [generated.day],
    createdAt: generated.generatedAt,
  };
};
