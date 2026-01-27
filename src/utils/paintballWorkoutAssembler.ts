import { WorkoutDay, WorkoutSection, WorkoutExercise, ExerciseSet } from '../types';
import {
  PaintballPosition,
  FieldSideBias,
  TrainingPhase,
  PlayerProfile,
  POSITION_BIAS_CONFIGS,
  SIDE_BIAS_CONFIGS,
  TrainingCycle,
  TrainingCyclePhase,
  calculateTrainingCycle,
} from '../types/paintball';
import {
  ExerciseTag,
  getExerciseTag,
  scoreExerciseForPlayer,
} from '../data/exerciseTags';
import {
  calculateWorkoutModifiers,
  WorkoutModifiers,
  applyRestModifier,
  getExperienceLevelFromYears,
  getDaysUntilTournament,
} from './modifierCalculator';
import {
  SlotCategory,
  getSlotType,
  calculateFinalSets,
  calculateFinalReps,
  getTempoPrescription,
  getLoadSuggestion,
  getTournamentRule,
  CombinedModifiers,
  PHASE_RULES,
  SESSION_TIME_LIMITS,
  estimateSessionTime,
  getTimeReduction,
} from './workoutRules';

// Types for assembled workout
export interface AssembledWorkout extends WorkoutDay {
  modifiers: WorkoutModifiers;
  playerContext: {
    position: PaintballPosition;
    sideBias: FieldSideBias;
    phase: TrainingPhase;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    trainingCycle?: TrainingCycle;
  };
  // Training info for display
  trainingInfo?: {
    tempo: string | null;
    loadSuggestion: string;
    phaseDescription: string;
    estimatedMinutes: number;
    timeReductionApplied?: string;
  };
}

// Infer category slot from section name and exercise properties
const inferCategorySlot = (
  sectionName: string,
  exercise: WorkoutExercise,
  exerciseTag: ExerciseTag | undefined
): SlotCategory => {
  const section = sectionName.toLowerCase();
  // Use categorySlot or exerciseId as identifier since WorkoutExercise doesn't have name
  const exName = (exercise.categorySlot || exercise.exerciseId || '').toLowerCase();

  // Activation/Prep/Mobility sections
  if (section.includes('activation') || section.includes('prep') || section.includes('warm')) {
    if (section.includes('mobility') || exName.includes('stretch') || exName.includes('mobility')) {
      return 'MOBILITY';
    }
    return 'ACTIVATION';
  }

  // Energy system / Conditioning
  if (section.includes('conditioning') || section.includes('energy') || section.includes('cardio')) {
    if (exName.includes('sprint') || exName.includes('run')) return 'SPRINT';
    return 'CONDITIONING';
  }

  // Use exercise tag if available
  if (exerciseTag) {
    const pattern = exerciseTag.movementPattern;

    // Hinge movements
    if (pattern === 'hip_hinge') {
      if (exName.includes('deadlift') || exName.includes('rdl')) {
        if (exName.includes('single') || exName.includes('s/l')) return 'SINGLE_LEG_HINGE';
        return 'PRIMARY_HINGE';
      }
      return 'ACCESSORY_HINGE';
    }

    // Squat movements
    if (pattern === 'squat') {
      if (exName.includes('jump') || exName.includes('velocity')) return 'PRIMARY_SQUAT_VELOCITY';
      if (exName.includes('goblet') || exName.includes('front') || exName.includes('back')) {
        return 'PRIMARY_SQUAT';
      }
      return 'ACCESSORY_SQUAT';
    }

    // Lunge movements
    if (pattern === 'lunge') {
      if (exName.includes('lateral') || exName.includes('cossack')) return 'LATERAL_LUNGE';
      return 'PRIMARY_LUNGE';
    }

    // Push movements
    if (pattern === 'push') {
      if (exName.includes('overhead') || exName.includes('press') && !exName.includes('bench')) {
        return 'VERTICAL_PRESS';
      }
      if (exName.includes('bench') || exName.includes('push-up') || exName.includes('pushup')) {
        return 'HORIZONTAL_PRESS';
      }
      if (exName.includes('single') || exName.includes('s/a')) return 'SINGLE_ARM_PRESS';
      return 'PRIMARY_PRESS';
    }

    // Pull movements
    if (pattern === 'pull') {
      if (exName.includes('pull-up') || exName.includes('pullup') || exName.includes('pulldown') || exName.includes('chin')) {
        return 'VERTICAL_PULL';
      }
      if (exName.includes('row')) {
        if (exName.includes('single') || exName.includes('s/a')) return 'SINGLE_ARM_VERTICAL_PULL';
        return 'HORIZONTAL_PULL';
      }
      return 'PRIMARY_PULL';
    }

    // Core movements
    if (pattern === 'anti_rotation' || pattern === 'rotation') {
      return 'CORE_VARIATION';
    }
    if (pattern === 'isometric') {
      if (section.includes('core') || exName.includes('plank') || exName.includes('hold')) {
        return 'ISO_HOLD';
      }
    }

    // Plyometric
    if (pattern === 'plyometric') return 'PLYOMETRIC';

    // Locomotion
    if (pattern === 'locomotion') {
      if (exName.includes('carry') || exName.includes('walk') || exName.includes('march')) {
        return 'LOADED_CARRY';
      }
      return 'CONDITIONING';
    }
  }

  // Default based on section
  if (section.includes('strength') || section.includes('main')) return 'PRIMARY_SQUAT';
  if (section.includes('accessory') || section.includes('auxiliary')) return 'ACCESSORY_SQUAT';
  if (section.includes('core')) return 'CORE_VARIATION';

  return 'ACCESSORY_SQUAT';
};

// Get exercises sorted by relevance score for a player
const getRelevantExercises = (
  exerciseIds: string[],
  position: PaintballPosition,
  sideBias: FieldSideBias,
  maxComplexity: 1 | 2 | 3
): string[] => {
  // Score and filter exercises
  const scored = exerciseIds
    .map((id) => {
      const tag = getExerciseTag(id);
      if (!tag) return { id, score: 0, complexity: 1 as const };
      return {
        id,
        score: scoreExerciseForPlayer(tag, position, sideBias),
        complexity: tag.complexityLevel,
      };
    })
    .filter((e) => e.complexity <= maxComplexity)
    .sort((a, b) => b.score - a.score);

  return scored.map((e) => e.id);
};

// Filter exercises by position-relevant energy systems
const filterByPositionEnergySystems = (
  exerciseIds: string[],
  position: PaintballPosition
): string[] => {
  const positionConfig = POSITION_BIAS_CONFIGS[position];

  return exerciseIds.filter((id) => {
    const tag = getExerciseTag(id);
    if (!tag) return true; // Keep exercises without tags

    // Check if exercise matches position's priority energy systems
    return positionConfig.conditioningFocus.includes(tag.energySystem);
  });
};

// Filter exercises by side bias movement patterns
const filterBySideBiasPatterns = (
  exerciseIds: string[],
  sideBias: FieldSideBias
): string[] => {
  if (sideBias === 'both') return exerciseIds;

  const sideConfig = SIDE_BIAS_CONFIGS[sideBias];

  return exerciseIds.filter((id) => {
    const tag = getExerciseTag(id);
    if (!tag) return true; // Keep exercises without tags

    // Prefer exercises that match side's focus areas
    return (
      sideConfig.mobilityFocus.includes(tag.movementPattern) ||
      sideConfig.strengthFocus.includes(tag.movementPattern) ||
      tag.sideBiasRelevance[sideBias] >= 4
    );
  });
};

// Apply modifiers to a workout exercise using comprehensive rules
const applyModifiersToExercise = (
  exercise: WorkoutExercise,
  sectionName: string,
  modifiers: WorkoutModifiers,
  combinedModifiers: CombinedModifiers
): WorkoutExercise => {
  const exerciseTag = getExerciseTag(exercise.exerciseId);
  const categorySlot = inferCategorySlot(sectionName, exercise, exerciseTag);

  // Calculate final sets using full rule chain
  const baseSets = exercise.sets.length;
  const targetSetCount = calculateFinalSets(baseSets, categorySlot, combinedModifiers);

  // Calculate final reps using full rule chain
  const baseReps = exercise.sets[0]?.targetReps || '8';
  const finalReps = calculateFinalReps(baseReps, categorySlot, combinedModifiers);

  // Get tempo prescription if applicable
  const tempo = getTempoPrescription(
    categorySlot,
    combinedModifiers.phase,
    combinedModifiers.daysUntilTournament
  );

  // Build modified sets
  const modifiedSets: ExerciseSet[] = exercise.sets.map((set, index) => ({
    ...set,
    targetReps: finalReps,
    // Keep weight as-is (RPE-based, not percentage-based)
    weight: set.weight,
    restSeconds: set.restSeconds
      ? applyRestModifier(set.restSeconds, modifiers)
      : undefined,
    // Add tempo as notes if applicable
    notes: tempo && index === 0 ? `Tempo: ${tempo}` : set.notes,
  }));

  // Adjust sets array length
  let finalSets: ExerciseSet[];
  if (targetSetCount < modifiedSets.length) {
    finalSets = modifiedSets.slice(0, targetSetCount);
  } else if (targetSetCount > modifiedSets.length && modifiedSets.length > 0) {
    // Duplicate last set to reach target
    finalSets = [...modifiedSets];
    const lastSet = modifiedSets[modifiedSets.length - 1];
    while (finalSets.length < targetSetCount) {
      finalSets.push({
        ...lastSet,
        setNumber: finalSets.length + 1,
        completed: false,
        notes: undefined, // Don't repeat tempo on duplicated sets
      });
    }
  } else {
    finalSets = modifiedSets;
  }

  return {
    ...exercise,
    sets: finalSets,
  };
};

// Assemble a workout for a specific player profile
export const assembleWorkoutForPlayer = (
  baseWorkout: WorkoutDay,
  profile: PlayerProfile
): AssembledWorkout => {
  const experienceLevel = getExperienceLevelFromYears(profile.yearsExperience);

  // Calculate current training cycle if program start date exists
  const trainingCycle = profile.programStartDate
    ? calculateTrainingCycle(profile.programStartDate)
    : undefined;

  // Get current cycle phase (default to eccentric if no cycle)
  const currentPhase: TrainingCyclePhase = trainingCycle?.currentPhase || 'eccentric';

  // Calculate days until tournament
  const daysUntilTournament = getDaysUntilTournament(profile.nextTournamentDate || null);

  // Build combined modifiers for the new rule system
  const combinedModifiers: CombinedModifiers = {
    phase: currentPhase,
    position: profile.primaryPosition,
    sideBias: profile.fieldSideBias,
    daysUntilTournament,
  };

  // Get tournament rule for conditioning mode check
  const tournamentRule = getTournamentRule(daysUntilTournament);

  // Keep old modifiers for backwards compatibility with rest times
  const modifiers = calculateWorkoutModifiers(
    profile.currentPhase,
    experienceLevel,
    profile.nextTournamentDate,
    trainingCycle || null
  );

  const playerContext = {
    position: profile.primaryPosition,
    sideBias: profile.fieldSideBias,
    phase: profile.currentPhase,
    experienceLevel,
    trainingCycle,
  };

  // Counters for time estimation
  let activationCount = 0;
  let primaryCount = 0;
  let secondaryCount = 0;
  let accessoryCount = 0;
  let conditioningCount = 0;
  let coreCount = 0;

  // Process each section
  const modifiedSections: WorkoutSection[] = baseWorkout.sections.map((section) => {
    const sectionName = section.name.toLowerCase();

    // Apply different filtering strategies based on section type
    let modifiedExercises = section.exercises;

    if (sectionName.includes('activation') || sectionName.includes('prep')) {
      // Filter activation exercises by position and side bias relevance
      modifiedExercises = section.exercises.filter((ex) => {
        const tag = getExerciseTag(ex.exerciseId);
        if (!tag) return true;

        const positionScore = tag.positionRelevance[profile.primaryPosition];
        const sideScore =
          profile.fieldSideBias === 'both'
            ? (tag.sideBiasRelevance.snake + tag.sideBiasRelevance.dorito) / 2
            : tag.sideBiasRelevance[profile.fieldSideBias];

        // Keep exercises with combined score >= 6
        return positionScore + sideScore >= 6;
      });

      // If we filtered too much, keep at least some exercises
      if (modifiedExercises.length < 2 && section.exercises.length >= 2) {
        modifiedExercises = section.exercises.slice(0, 3);
      }

      activationCount += modifiedExercises.length;
    } else if (sectionName.includes('conditioning') || sectionName.includes('energy')) {
      // Check tournament conditioning mode
      if (tournamentRule.conditioningMode === 'removed') {
        // Remove conditioning entirely close to tournament
        modifiedExercises = [];
      } else if (tournamentRule.conditioningMode === 'alactic_only') {
        // Keep only short-burst conditioning (phosphagen system)
        modifiedExercises = section.exercises.filter((ex) => {
          const tag = getExerciseTag(ex.exerciseId);
          if (!tag) return false;
          return tag.energySystem === 'phosphagen';
        });
      } else {
        // Filter conditioning by position energy systems
        const filteredIds = filterByPositionEnergySystems(
          section.exercises.map((e) => e.exerciseId),
          profile.primaryPosition
        );

        modifiedExercises = section.exercises.filter((e) =>
          filteredIds.includes(e.exerciseId)
        );
      }

      // If we filtered too much, keep at least one
      if (modifiedExercises.length < 1 && tournamentRule.conditioningMode === 'normal') {
        modifiedExercises = section.exercises.slice(0, 1);
      }

      conditioningCount += modifiedExercises.length;
    } else if (sectionName.includes('core')) {
      coreCount += modifiedExercises.length;
    } else {
      // Strength sections - categorize by slot type
      modifiedExercises.forEach((ex) => {
        const tag = getExerciseTag(ex.exerciseId);
        const slot = inferCategorySlot(section.name, ex, tag);
        const slotType = getSlotType(slot);

        switch (slotType) {
          case 'primary':
            primaryCount++;
            break;
          case 'secondary':
            secondaryCount++;
            break;
          case 'conditioning':
            conditioningCount++;
            break;
          case 'activation':
            activationCount++;
            break;
          default:
            accessoryCount++;
        }
      });
    }

    // Apply modifiers to all exercises in the section
    modifiedExercises = modifiedExercises.map((ex) =>
      applyModifiersToExercise(ex, section.name, modifiers, combinedModifiers)
    );

    // Filter by complexity level
    modifiedExercises = modifiedExercises.filter((ex) => {
      const tag = getExerciseTag(ex.exerciseId);
      if (!tag) return true;
      return tag.complexityLevel <= modifiers.maxComplexity;
    });

    return {
      ...section,
      exercises: modifiedExercises,
    };
  });

  // Estimate session time
  const estimatedMinutes = estimateSessionTime(
    activationCount,
    primaryCount,
    secondaryCount,
    accessoryCount,
    conditioningCount,
    coreCount
  );

  // Check time safety rail and apply reductions if needed
  const timeReduction = getTimeReduction(estimatedMinutes);
  let finalSections = modifiedSections;
  let timeReductionApplied: string | undefined;

  if (timeReduction) {
    timeReductionApplied = timeReduction.notes;

    // Apply accessory set reduction
    if (timeReduction.reduceAccessorySets > 0) {
      finalSections = finalSections.map((section) => {
        const sectionName = section.name.toLowerCase();
        if (
          !sectionName.includes('activation') &&
          !sectionName.includes('prep') &&
          !sectionName.includes('conditioning') &&
          !sectionName.includes('core')
        ) {
          return {
            ...section,
            exercises: section.exercises.map((ex) => {
              const tag = getExerciseTag(ex.exerciseId);
              const slot = inferCategorySlot(section.name, ex, tag);
              const slotType = getSlotType(slot);

              // Only reduce accessory exercises
              if (slotType === 'accessory' && ex.sets.length > 2) {
                return {
                  ...ex,
                  sets: ex.sets.slice(0, ex.sets.length - timeReduction.reduceAccessorySets),
                };
              }
              return ex;
            }),
          };
        }
        return section;
      });
    }

    // Apply conditioning volume reduction
    if (timeReduction.reduceConditioningVolume > 0) {
      finalSections = finalSections.map((section) => {
        const sectionName = section.name.toLowerCase();
        if (sectionName.includes('conditioning') || sectionName.includes('energy')) {
          const keepCount = Math.max(
            1,
            Math.ceil(section.exercises.length * (1 - timeReduction.reduceConditioningVolume))
          );
          return {
            ...section,
            exercises: section.exercises.slice(0, keepCount),
          };
        }
        return section;
      });
    }
  }

  // Build training info for display
  const loadSuggestion = getLoadSuggestion(currentPhase);
  const phaseRule = PHASE_RULES[currentPhase];

  const trainingInfo = {
    tempo: phaseRule.tempo,
    loadSuggestion: `${loadSuggestion.rpe} (${loadSuggestion.percentRange})`,
    phaseDescription: phaseRule.description,
    estimatedMinutes: Math.min(estimatedMinutes, SESSION_TIME_LIMITS.maximum),
    timeReductionApplied,
  };

  return {
    ...baseWorkout,
    sections: finalSections,
    modifiers,
    playerContext,
    trainingInfo,
  };
};

// Get exercise substitutions based on player profile
export const getExerciseSubstitutions = (
  exerciseId: string,
  profile: PlayerProfile,
  allExerciseIds: string[],
  maxSubstitutions: number = 3
): string[] => {
  const originalTag = getExerciseTag(exerciseId);
  if (!originalTag) return [];

  const experienceLevel = getExperienceLevelFromYears(profile.yearsExperience);
  const trainingCycle = profile.programStartDate
    ? calculateTrainingCycle(profile.programStartDate)
    : null;
  const modifiers = calculateWorkoutModifiers(
    profile.currentPhase,
    experienceLevel,
    profile.nextTournamentDate,
    trainingCycle
  );

  // Find exercises with same movement pattern
  const candidates = allExerciseIds
    .filter((id) => id !== exerciseId)
    .map((id) => {
      const tag = getExerciseTag(id);
      if (!tag) return null;

      // Score based on similarity and relevance
      let score = 0;

      // Same movement pattern is highly valued
      if (tag.movementPattern === originalTag.movementPattern) score += 5;

      // Same plane of motion
      if (tag.planeOfMotion === originalTag.planeOfMotion) score += 3;

      // Same energy system
      if (tag.energySystem === originalTag.energySystem) score += 2;

      // Position relevance
      score += tag.positionRelevance[profile.primaryPosition];

      // Side bias relevance
      if (profile.fieldSideBias === 'both') {
        score +=
          (tag.sideBiasRelevance.snake + tag.sideBiasRelevance.dorito) / 2;
      } else {
        score += tag.sideBiasRelevance[profile.fieldSideBias];
      }

      // Complexity within range
      if (tag.complexityLevel > modifiers.maxComplexity) return null;

      return { id, score };
    })
    .filter((item): item is { id: string; score: number } => item !== null)
    .sort((a, b) => b.score - a.score);

  return candidates.slice(0, maxSubstitutions).map((c) => c.id);
};

// Calculate workout focus areas based on profile
export const getWorkoutFocusAreas = (profile: PlayerProfile): string[] => {
  const focus: string[] = [];

  const positionConfig = POSITION_BIAS_CONFIGS[profile.primaryPosition];
  const sideConfig =
    profile.fieldSideBias !== 'both'
      ? SIDE_BIAS_CONFIGS[profile.fieldSideBias]
      : null;

  // Add position-specific focus
  focus.push(...positionConfig.priorityMovementPatterns.slice(0, 2));

  // Add side-specific focus
  if (sideConfig) {
    focus.push(...sideConfig.mobilityFocus.slice(0, 1));
  }

  // Map internal names to display names
  const displayMap: Record<string, string> = {
    plyometric: 'Explosive Power',
    lunge: 'Single-Leg Strength',
    locomotion: 'Speed & Agility',
    squat: 'Lower Body Strength',
    rotation: 'Rotational Power',
    anti_rotation: 'Core Stability',
    isometric: 'Positional Endurance',
    hip_hinge: 'Hip Power',
    push: 'Upper Body Push',
    pull: 'Upper Body Pull',
  };

  return [...new Set(focus)].map((f) => displayMap[f] || f);
};
