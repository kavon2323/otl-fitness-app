import {
  PaintballPosition,
  FieldSideBias,
  TrainingPhase,
  PlayerProfile,
  formatPosition,
  formatSideBias,
  formatPhase,
  formatCyclePhase,
  calculateTrainingCycle,
  POSITION_BIAS_CONFIGS,
  SIDE_BIAS_CONFIGS,
  TRAINING_CYCLE_MODIFIERS,
  TrainingCyclePhase,
} from '../types/paintball';
import { WorkoutDay } from '../types';
import {
  getDaysUntilTournament,
  getTaperDescription,
  formatModifierSummary,
  getExperienceLevelFromYears,
} from './modifierCalculator';

export interface WhyMessage {
  headline: string;
  detail: string;
  focusAreas: string[];
  phaseNote?: string;
  cycleNote?: string;
  tempoFocus?: string;
}

// Get workout focus based on day name/number
const getWorkoutFocus = (workout: WorkoutDay): string => {
  const name = workout.name.toLowerCase();

  if (name.includes('lower') || name.includes('leg')) {
    return 'Lower Body Power';
  } else if (name.includes('upper')) {
    return 'Upper Body Strength';
  } else if (name.includes('full') || name.includes('total')) {
    return 'Full Body Integration';
  } else if (name.includes('push')) {
    return 'Push Strength';
  } else if (name.includes('pull')) {
    return 'Pull Strength';
  } else if (name.includes('dynamic') || name.includes('power')) {
    return 'Dynamic Power';
  } else if (name.includes('conditioning') || name.includes('cardio')) {
    return 'Work Capacity';
  }

  return 'Strength & Power';
};

// Generate position-specific training rationale
const getPositionRationale = (
  position: PaintballPosition,
  workoutFocus: string
): string => {
  const positionName = formatPosition(position).toLowerCase();
  const config = POSITION_BIAS_CONFIGS[position];

  const rationales: Record<PaintballPosition, Record<string, string>> = {
    front: {
      'Lower Body Power':
        'Building the explosive leg power you need to win races off the break and drive into bunkers.',
      'Upper Body Strength':
        'Developing the upper body stability for quick gun transitions and snap shooting from tight positions.',
      'Full Body Integration':
        'Training the total body coordination that lets you move fast, shoot straight, and recover quickly between points.',
      'Dynamic Power':
        'Training the reactive speed and acceleration that separates good front players from great ones.',
      default:
        'Building the physical foundation that keeps you first to your bunker and explosive through the point.',
    },
    mid: {
      'Lower Body Power':
        'Developing the leg endurance to push lanes, fill gaps, and make secondary moves throughout the point.',
      'Upper Body Strength':
        'Building the shoulder endurance for sustained lane control and the strength for quick bunker adjustments.',
      'Full Body Integration':
        'Training the work capacity to be everywhere on the field and still execute when it matters.',
      'Dynamic Power':
        'Building the repeat sprint ability that lets you support fronts, fill gaps, and make game-winning moves.',
      default:
        'Developing the all-around conditioning that makes you the engine of your team.',
    },
    back: {
      'Lower Body Power':
        'Building the hip stability to shoot from awkward positions and the leg endurance for long points.',
      'Upper Body Strength':
        'Developing the trunk endurance to hold your gun up and the shoulder stability for accurate sustained fire.',
      'Full Body Integration':
        'Training the postural endurance and rotational power to control lanes and communicate all game.',
      'Dynamic Power':
        'Building the core power to snap in and out of your bunker and the hip mobility for dynamic shooting positions.',
      default:
        'Developing the positional strength and endurance that lets you command the field.',
    },
  };

  return rationales[position][workoutFocus] || rationales[position].default;
};

// Generate side bias-specific training note
const getSideBiasNote = (
  sideBias: FieldSideBias,
  position: PaintballPosition
): string => {
  if (sideBias === 'both') {
    return 'Balanced mobility work prepares you to play either side of the field.';
  }

  const config = SIDE_BIAS_CONFIGS[sideBias];

  if (sideBias === 'snake') {
    switch (position) {
      case 'front':
        return "Today's work emphasizes the hip mobility and low-position strength you need for snake-side play.";
      case 'mid':
        return "Building the lateral agility and hip range to support snake-side movements and fill gaps.";
      case 'back':
        return "Training the hip rotation and stability for shooting angles into the snake.";
    }
  } else {
    switch (position) {
      case 'front':
        return "Today's work focuses on the vertical explosiveness and lateral power for dorito-side bunker work.";
      case 'mid':
        return "Building the lateral drive and change-of-direction power to dominate dorito-side transitions.";
      case 'back':
        return "Training the trunk rotation and shoulder stability for optimal dorito-side lane control.";
    }
  }

  return '';
};

// Generate training cycle-specific note
const getCycleNote = (
  cyclePhase: TrainingCyclePhase,
  weekInPhase: number
): string => {
  const cycleModifiers = TRAINING_CYCLE_MODIFIERS[cyclePhase];
  const weekText = weekInPhase === 1 ? 'first' : weekInPhase === 2 ? 'second' : weekInPhase === 3 ? 'third' : 'fourth';

  switch (cyclePhase) {
    case 'eccentric':
      return `Week ${weekInPhase} of Eccentric Phase. ${cycleModifiers.primaryExerciseEmphasis}. Focus on the 4-second lowering tempo on main lifts.`;
    case 'isometric':
      return `Week ${weekInPhase} of Isometric Phase. ${cycleModifiers.primaryExerciseEmphasis}. Use a 3-second pause at the bottom of main lifts.`;
    case 'concentric':
      return `Week ${weekInPhase} of Concentric Phase. ${cycleModifiers.primaryExerciseEmphasis}. Move the weight with maximum velocity.`;
  }
};

// Generate phase-specific training note
const getPhaseNote = (
  phase: TrainingPhase,
  tournamentDate: string | Date | null
): string => {
  switch (phase) {
    case 'off_season':
      return "Off-season means we're building your base. Higher volume today to bank strength for the season.";
    case 'in_season':
      return 'In-season training keeps you sharp without wearing you down. Maintenance volume, optimal recovery.';
    case 'pre_tournament': {
      const daysUntil = getDaysUntilTournament(tournamentDate);
      if (daysUntil !== null) {
        if (daysUntil <= 3) {
          return `${daysUntil} days out. Active recovery only - stay loose, stay fresh, be ready to compete.`;
        } else if (daysUntil <= 7) {
          return `${daysUntil} days to tournament. Heavy taper - maintaining sharpness while cutting fatigue.`;
        } else if (daysUntil <= 14) {
          return `${daysUntil} days out. Starting your taper - reducing volume while keeping your edge.`;
        }
      }
      return "Pre-tournament phase: We're sharpening your edge while keeping you fresh for game day.";
    }
  }
};

// Main function to generate Why message for a workout
export const generateWhyMessage = (
  workout: WorkoutDay,
  profile: PlayerProfile
): WhyMessage => {
  const workoutFocus = getWorkoutFocus(workout);
  const positionLabel = formatPosition(profile.primaryPosition);
  const phaseLabel = formatPhase(profile.currentPhase);

  // Calculate training cycle if available
  const trainingCycle = profile.programStartDate
    ? calculateTrainingCycle(profile.programStartDate)
    : null;

  // Generate headline with cycle phase if available
  let headline: string;
  if (trainingCycle) {
    const cycleLabel = formatCyclePhase(trainingCycle.currentPhase);
    headline = `${positionLabel} ${phaseLabel}: ${workoutFocus} (${cycleLabel} Week ${trainingCycle.weekInPhase})`;
  } else {
    headline = `${positionLabel} ${phaseLabel}: ${workoutFocus}`;
  }

  // Generate detail paragraphs
  const positionRationale = getPositionRationale(
    profile.primaryPosition,
    workoutFocus
  );
  const sideBiasNote = getSideBiasNote(
    profile.fieldSideBias,
    profile.primaryPosition
  );
  const phaseNote = getPhaseNote(
    profile.currentPhase,
    profile.nextTournamentDate ?? null
  );

  // Generate training cycle note if available
  let cycleNote: string | undefined;
  let tempoFocus: string | undefined;
  if (trainingCycle) {
    cycleNote = getCycleNote(trainingCycle.currentPhase, trainingCycle.weekInPhase);
    tempoFocus = TRAINING_CYCLE_MODIFIERS[trainingCycle.currentPhase].tempoFocus;
  }

  // Combine into detail
  const detail = `${positionRationale} ${sideBiasNote}`.trim();

  // Get focus areas
  const focusAreas = getFocusAreasForWorkout(workout, profile);

  return {
    headline,
    detail,
    focusAreas,
    phaseNote,
    cycleNote,
    tempoFocus,
  };
};

// Get focus areas based on workout and profile
const getFocusAreasForWorkout = (
  workout: WorkoutDay,
  profile: PlayerProfile
): string[] => {
  const focus: string[] = [];
  const positionConfig = POSITION_BIAS_CONFIGS[profile.primaryPosition];

  // Map movement patterns to display names
  const patternNames: Record<string, string> = {
    plyometric: 'Explosive Power',
    lunge: 'Single-Leg Strength',
    locomotion: 'Speed & Agility',
    squat: 'Leg Strength',
    rotation: 'Rotational Power',
    anti_rotation: 'Core Stability',
    isometric: 'Positional Hold',
    hip_hinge: 'Hip Power',
  };

  // Add position priority patterns
  positionConfig.priorityMovementPatterns.slice(0, 2).forEach((pattern: string) => {
    if (patternNames[pattern]) {
      focus.push(patternNames[pattern]);
    }
  });

  // Add side-specific focus
  if (profile.fieldSideBias !== 'both') {
    const sideConfig = SIDE_BIAS_CONFIGS[profile.fieldSideBias];
    if (profile.fieldSideBias === 'snake') {
      focus.push('Hip Mobility');
    } else {
      focus.push('Lateral Power');
    }
  }

  return [...new Set(focus)].slice(0, 3);
};

// Generate a quick summary for workout cards
export const generateQuickSummary = (
  workout: WorkoutDay,
  profile: PlayerProfile
): string => {
  const workoutFocus = getWorkoutFocus(workout);
  const positionLabel = formatPosition(profile.primaryPosition);

  return `${positionLabel}-optimized ${workoutFocus.toLowerCase()}`;
};

// Generate taper status if applicable
export const generateTaperStatus = (
  profile: PlayerProfile
): { status: string; severity: 'none' | 'light' | 'moderate' | 'heavy' } | null => {
  if (profile.currentPhase !== 'pre_tournament' || !profile.nextTournamentDate) {
    return null;
  }

  const daysUntil = getDaysUntilTournament(profile.nextTournamentDate);

  if (daysUntil === null || daysUntil > 14) {
    return null;
  }

  if (daysUntil <= 3) {
    return {
      status: `${daysUntil}d out - Active Recovery`,
      severity: 'heavy',
    };
  } else if (daysUntil <= 7) {
    return {
      status: `${daysUntil}d out - Heavy Taper`,
      severity: 'heavy',
    };
  } else {
    return {
      status: `${daysUntil}d out - Taper Starting`,
      severity: 'moderate',
    };
  }
};
