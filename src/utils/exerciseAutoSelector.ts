import { WorkoutExercise, Exercise } from '../types';
import { PlayerProfile, PaintballPosition, FieldSideBias } from '../types/paintball';
import {
  getExerciseTag,
  scoreExerciseForPlayer,
  ExerciseTag,
} from '../data/exerciseTags';
import { getExerciseById, defaultExercises, getAllExercises } from '../store/exerciseStore';

// Get exercises from store
const allExercises = getAllExercises();
import { getExperienceLevelFromYears } from './modifierCalculator';

export interface ExerciseRecommendation {
  exerciseId: string;
  exercise: Exercise;
  score: number;
  reasons: string[];
}

// Map category slots to exercise categories for finding alternatives
const slotToCategoryMap: Record<string, string[]> = {
  PRIMARY_SQUAT: ['squat'],
  ACCESSORY_SQUAT: ['squat'],
  PRIMARY_HINGE: ['hinge'],
  SINGLE_LEG_HINGE: ['hinge'],
  ACCESSORY_HINGE: ['hinge'],
  PRIMARY_LUNGE: ['lunge'],
  LATERAL_LUNGE: ['lunge'],
  LUNGE: ['lunge'],
  PRIMARY_PRESS: ['press'],
  SECONDARY_PRESS: ['press'],
  VERTICAL_PRESS: ['press'],
  SINGLE_ARM_PRESS: ['press'],
  HORIZONTAL_PRESS: ['press'],
  ACCESSORY_PRESS: ['press'],
  ROTATIONAL_PRESS: ['press'],
  PRIMARY_PULL: ['pull'],
  HORIZONTAL_PULL: ['pull'],
  VERTICAL_PULL: ['pull'],
  SINGLE_ARM_VERTICAL_PULL: ['pull'],
  ACCESSORY_PULL: ['pull'],
  CORE_VARIATION: ['core'],
  ISO_HOLD: ['core'],
  STABILIZATION_CORE: ['core'],
  WEIGHTED_CORE: ['core'],
  ENERGY_SYSTEM: ['energy_system', 'sprint'],
  SPRINT: ['sprint'],
  CONDITIONING: ['sprint', 'energy_system'],
  PLYOMETRIC: ['prep'],
  PLYO_JUMP: ['prep'],
  PLYO_PUSH: ['prep'],
  WALKING_RDL: ['prep', 'hinge'],
  HIP_FLEXOR_PREP: ['prep', 'prehab'],
  PREP: ['prep'],
  SPEED_PREP: ['prep'],
  DYNAMIC_WARMUP: ['prep'],
  MOBILITY: ['prep', 'prehab'],
};

// Get exercises that match a category slot
const getExercisesForSlot = (categorySlot: string): Exercise[] => {
  const categories = slotToCategoryMap[categorySlot];
  if (!categories) {
    // Return default if no mapping
    const defaultId = defaultExercises[categorySlot];
    if (defaultId) {
      const ex = getExerciseById(defaultId);
      return ex ? [ex] : [];
    }
    return [];
  }

  return allExercises.filter((ex) => categories.includes(ex.category));
};

// Get the best exercise for a category slot based on player profile
export const selectExerciseForSlot = (
  categorySlot: string,
  profile: PlayerProfile,
  excludeIds: string[] = []
): ExerciseRecommendation | null => {
  const exercises = getExercisesForSlot(categorySlot);

  // If no exercises found, try the default
  if (exercises.length === 0) {
    const defaultId = defaultExercises[categorySlot];
    if (defaultId && !excludeIds.includes(defaultId)) {
      const ex = getExerciseById(defaultId);
      if (ex) {
        return {
          exerciseId: ex.id,
          exercise: ex,
          score: 5,
          reasons: ['Default exercise for this slot'],
        };
      }
    }
    return null;
  }

  const experienceLevel = getExperienceLevelFromYears(profile.yearsExperience);
  const maxComplexity = experienceLevel === 'beginner' ? 1 : experienceLevel === 'intermediate' ? 2 : 3;

  const scored = exercises
    .filter((ex) => !excludeIds.includes(ex.id))
    .map((exercise) => {
      const tag = getExerciseTag(exercise.id);
      if (!tag) {
        // No tag - use default score
        return { exercise, score: 3, reasons: ['Standard exercise'] };
      }

      // Filter by complexity
      if (tag.complexityLevel > maxComplexity) {
        return null;
      }

      const score = scoreExerciseForPlayer(tag, profile.primaryPosition, profile.fieldSideBias);
      const reasons = getRecommendationReasons(tag, profile);

      return { exercise, score, reasons };
    })
    .filter((item): item is { exercise: Exercise; score: number; reasons: string[] } => item !== null)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    // Fall back to default
    const defaultId = defaultExercises[categorySlot];
    if (defaultId && !excludeIds.includes(defaultId)) {
      const ex = getExerciseById(defaultId);
      if (ex) {
        return {
          exerciseId: ex.id,
          exercise: ex,
          score: 5,
          reasons: ['Default exercise for this slot'],
        };
      }
    }
    return null;
  }

  const best = scored[0];
  return {
    exerciseId: best.exercise.id,
    exercise: best.exercise,
    score: best.score,
    reasons: best.reasons,
  };
};

// Get alternative exercises for a slot
export const getAlternativesForSlot = (
  categorySlot: string,
  profile: PlayerProfile,
  currentExerciseId: string,
  maxAlternatives: number = 3
): ExerciseRecommendation[] => {
  const exercises = getExercisesForSlot(categorySlot);
  if (!exercises || exercises.length === 0) return [];

  const experienceLevel = getExperienceLevelFromYears(profile.yearsExperience);
  const maxComplexity = experienceLevel === 'beginner' ? 1 : experienceLevel === 'intermediate' ? 2 : 3;

  const scored = exercises
    .filter((ex) => ex.id !== currentExerciseId)
    .map((exercise) => {
      const tag = getExerciseTag(exercise.id);
      if (!tag || tag.complexityLevel > maxComplexity) {
        return null;
      }

      const score = scoreExerciseForPlayer(tag, profile.primaryPosition, profile.fieldSideBias);
      const reasons = getRecommendationReasons(tag, profile);

      return {
        exerciseId: exercise.id,
        exercise,
        score,
        reasons,
      };
    })
    .filter((item): item is ExerciseRecommendation => item !== null)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, maxAlternatives);
};

// Auto-select all exercises for a workout day based on profile
export const autoSelectExercisesForDay = (
  exercises: WorkoutExercise[],
  profile: PlayerProfile
): Map<string, string> => {
  const selections = new Map<string, string>();
  const usedExerciseIds: string[] = [];

  for (const workoutExercise of exercises) {
    const recommendation = selectExerciseForSlot(
      workoutExercise.categorySlot,
      profile,
      usedExerciseIds
    );

    if (recommendation) {
      selections.set(workoutExercise.categorySlot, recommendation.exerciseId);
      usedExerciseIds.push(recommendation.exerciseId);
    }
  }

  return selections;
};

// Get human-readable reasons for why an exercise is recommended
const getRecommendationReasons = (
  tag: ExerciseTag,
  profile: PlayerProfile
): string[] => {
  const reasons: string[] = [];

  // Position relevance
  const positionScore = tag.positionRelevance[profile.primaryPosition];
  if (positionScore >= 4) {
    reasons.push(`High relevance for ${formatPosition(profile.primaryPosition)}s`);
  }

  // Side bias relevance
  if (profile.fieldSideBias !== 'both') {
    const sideScore = tag.sideBiasRelevance[profile.fieldSideBias];
    if (sideScore >= 4) {
      reasons.push(`Great for ${profile.fieldSideBias} side play`);
    }
  }

  // Movement pattern match
  const positionPatterns: Record<PaintballPosition, string[]> = {
    front: ['plyometric', 'lunge', 'locomotion'],
    mid: ['locomotion', 'plyometric', 'squat'],
    back: ['rotation', 'anti_rotation', 'isometric'],
  };

  if (positionPatterns[profile.primaryPosition].includes(tag.movementPattern)) {
    reasons.push(`Matches ${profile.primaryPosition} movement needs`);
  }

  // Energy system match
  const positionEnergy: Record<PaintballPosition, string[]> = {
    front: ['phosphagen', 'glycolytic'],
    mid: ['glycolytic', 'mixed'],
    back: ['oxidative', 'mixed'],
  };

  if (positionEnergy[profile.primaryPosition].includes(tag.energySystem)) {
    reasons.push(`Trains your position's energy demands`);
  }

  return reasons.length > 0 ? reasons : ['Solid all-around exercise'];
};

const formatPosition = (position: PaintballPosition): string => {
  const labels: Record<PaintballPosition, string> = {
    front: 'Front Player',
    mid: 'Mid Player',
    back: 'Back Player',
  };
  return labels[position];
};

// Weight loading recommendations based on exercise type and phase
export interface WeightRecommendation {
  percentage: string;
  description: string;
}

export const getWeightRecommendation = (
  repScheme: string
): WeightRecommendation => {
  // Parse rep scheme to determine loading
  const lowerReps = repScheme.toLowerCase();

  // Max effort / RM work
  if (lowerReps.includes('rm') || lowerReps.includes('max')) {
    const rmMatch = lowerReps.match(/(\d+)\s*rm/);
    if (rmMatch) {
      const reps = parseInt(rmMatch[1], 10);
      if (reps <= 3) {
        return { percentage: '90-95%', description: 'Near-max effort' };
      } else if (reps <= 5) {
        return { percentage: '85-90%', description: 'Heavy strength work' };
      } else {
        return { percentage: '80-85%', description: 'Strength-hypertrophy' };
      }
    }
    return { percentage: '85-95%', description: 'Work to rep max' };
  }

  // Parse rep ranges
  const rangeMatch = lowerReps.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    const lowRep = parseInt(rangeMatch[1], 10);
    const highRep = parseInt(rangeMatch[2], 10);
    const avgRep = (lowRep + highRep) / 2;

    if (avgRep <= 5) {
      return { percentage: '80-87%', description: 'Strength focus' };
    } else if (avgRep <= 8) {
      return { percentage: '70-80%', description: 'Strength-hypertrophy' };
    } else if (avgRep <= 12) {
      return { percentage: '65-75%', description: 'Hypertrophy focus' };
    } else {
      return { percentage: '50-65%', description: 'Muscular endurance' };
    }
  }

  // Single number reps
  const singleMatch = lowerReps.match(/^(\d+)$/);
  if (singleMatch) {
    const reps = parseInt(singleMatch[1], 10);
    if (reps <= 3) {
      return { percentage: '87-93%', description: 'Near-max strength' };
    } else if (reps <= 6) {
      return { percentage: '80-87%', description: 'Strength focus' };
    } else if (reps <= 10) {
      return { percentage: '70-80%', description: 'Strength-hypertrophy' };
    } else {
      return { percentage: '60-70%', description: 'Volume work' };
    }
  }

  // Timed work (seconds)
  if (lowerReps.includes('second') || lowerReps.includes('sec')) {
    return { percentage: 'Bodyweight or light', description: 'Time under tension' };
  }

  // Default
  return { percentage: '65-75%', description: 'Moderate intensity' };
};

// Generate program recommendation explanation
export const generateProgramRecommendation = (
  profile: PlayerProfile,
  daysPerWeek: number
): string[] => {
  const reasons: string[] = [];

  // Days per week rationale
  if (daysPerWeek === 2) {
    reasons.push('2-day split focuses on full-body sessions to maximize training stimulus with limited gym time.');
  } else if (daysPerWeek === 3) {
    reasons.push('3-day split provides balanced coverage with dedicated lower, upper, and full-body sessions.');
  } else if (daysPerWeek === 4) {
    reasons.push('4-day split separates max effort and dynamic effort days for optimal strength and speed development.');
  }

  // Position-specific
  const positionFocus: Record<PaintballPosition, string> = {
    front: 'Your front player workouts emphasize explosive acceleration, hip mobility, and unilateral leg strength for quick breakouts.',
    mid: 'As a mid player, your program balances repeat sprint capacity with lateral movement and work capacity.',
    back: 'Your back player focus includes rotational power, trunk endurance, and upper body stamina for gun-up positions.',
  };
  reasons.push(positionFocus[profile.primaryPosition]);

  // Side bias
  if (profile.fieldSideBias === 'snake') {
    reasons.push('Snake side exercises prioritize hip internal rotation and low-position strength for tight bunker play.');
  } else if (profile.fieldSideBias === 'dorito') {
    reasons.push('Dorito side work emphasizes hip external rotation and vertical/lateral explosiveness.');
  } else {
    reasons.push('Balanced side training alternates emphasis to prepare you for any position on the field.');
  }

  // Phase-specific
  if (profile.currentPhase === 'off_season') {
    reasons.push('Off-season programming maximizes volume to build your strength and address weaknesses.');
  } else if (profile.currentPhase === 'pre_tournament') {
    reasons.push('Pre-tournament mode reduces volume while maintaining intensity to keep you sharp without fatigue.');
  } else {
    reasons.push('In-season programming prioritizes recovery while maintaining your fitness gains.');
  }

  return reasons;
};
