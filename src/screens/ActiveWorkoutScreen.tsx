import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Vibration,
  Switch,
} from 'react-native';
import { WorkoutDay, WorkoutExercise, LoggedSet } from '../types';
import { useWorkoutStore } from '../store/workoutStore';
import { useProgramStore } from '../store/programStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { getExerciseById } from '../data/exercises';
import { WorkoutTimer } from '../components';
import { colors } from '../theme';

interface ActiveWorkoutScreenProps {
  day: WorkoutDay;
  programId: string;
  weekNumber: number;
  onComplete: () => void;
  onCancel: () => void;
  onViewExercise: (exerciseId: string) => void;
}

interface FlatExercise {
  exercise: WorkoutExercise;
  sectionName: string;
  sectionIndex: number;
  exerciseIndex: number;
  isSuperset: boolean;
  supersetExercises?: WorkoutExercise[];
  supersetGroupId?: string;
}

// Group consecutive exercises that share a superset group
interface SupersetGroup {
  groupId: string;
  exercises: FlatExercise[];
  setsPerExercise: number;
}

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({
  day,
  programId,
  weekNumber,
  onComplete,
  onCancel,
  onViewExercise,
}) => {
  const {
    activeWorkout,
    startWorkout,
    endWorkout,
    cancelWorkout,
    logSet,
    completeSet,
  } = useWorkoutStore();

  const { getExerciseForSlot } = useProgramStore();
  const { supersetModeEnabled, toggleSupersetMode } = usePreferencesStore();

  // State for current position
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  // State for rest timer
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [restTotalTime, setRestTotalTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // State for logging
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  // State for workout completion
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  // Modal states
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Flatten all exercises into a single array for easy navigation
  const flatExercises = useMemo((): FlatExercise[] => {
    const result: FlatExercise[] = [];

    day.sections.forEach((section, sectionIndex) => {
      let i = 0;
      while (i < section.exercises.length) {
        const exercise = section.exercises[i];

        if (exercise.supersetGroup) {
          // Collect all exercises in this superset
          const supersetExercises: WorkoutExercise[] = [exercise];
          let j = i + 1;
          while (
            j < section.exercises.length &&
            section.exercises[j].supersetGroup === exercise.supersetGroup
          ) {
            supersetExercises.push(section.exercises[j]);
            j++;
          }

          // Add each superset exercise
          supersetExercises.forEach((ex) => {
            result.push({
              exercise: ex,
              sectionName: section.name,
              sectionIndex,
              exerciseIndex: result.length,
              isSuperset: supersetExercises.length > 1,
              supersetExercises: supersetExercises.length > 1 ? supersetExercises : undefined,
              supersetGroupId: exercise.supersetGroup,
            });
          });

          i = j;
        } else {
          result.push({
            exercise,
            sectionName: section.name,
            sectionIndex,
            exerciseIndex: result.length,
            isSuperset: false,
          });
          i++;
        }
      }
    });

    return result;
  }, [day]);

  // Get superset info for current exercise
  const getCurrentSupersetInfo = useCallback(() => {
    const current = flatExercises[currentExerciseIndex];
    if (!current || !current.isSuperset || !current.supersetGroupId) {
      return null;
    }

    // Find all exercises in this superset group
    const groupExercises = flatExercises.filter(
      (fe) => fe.supersetGroupId === current.supersetGroupId
    );

    // Find position of current exercise within the superset
    const positionInGroup = groupExercises.findIndex(
      (fe) => fe.exerciseIndex === currentExerciseIndex
    );

    return {
      groupId: current.supersetGroupId,
      exercises: groupExercises,
      positionInGroup,
      isFirstInGroup: positionInGroup === 0,
      isLastInGroup: positionInGroup === groupExercises.length - 1,
      totalInGroup: groupExercises.length,
    };
  }, [flatExercises, currentExerciseIndex]);

  // Start workout on mount
  useEffect(() => {
    if (!activeWorkout) {
      startWorkout(programId, day.dayNumber, weekNumber);
    }
  }, []);

  // Rest timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResting && !isPaused && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            Vibration.vibrate([0, 500, 200, 500]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResting, isPaused, restTimeRemaining]);

  // Get current exercise info
  const currentFlatExercise = flatExercises[currentExerciseIndex];
  const currentExercise = currentFlatExercise?.exercise;
  const currentSet = currentExercise?.sets[currentSetIndex];

  const exerciseId = currentExercise
    ? getExerciseForSlot(programId, currentExercise.exerciseSlot, currentExercise.categorySlot)
    : '';
  const exerciseData = exerciseId ? getExerciseById(exerciseId) : null;
  const exerciseName = exerciseData?.name || currentExercise?.notes || currentExercise?.categorySlot || '';

  // Get logged sets for current exercise
  const getLoggedSetsForExercise = (exId: string): LoggedSet[] => {
    if (!activeWorkout) return [];
    const exercise = activeWorkout.exercises.find((e) => e.exerciseId === exId);
    return exercise?.sets || [];
  };

  // Calculate default rest time based on exercise type
  const getDefaultRestTime = useCallback((): number => {
    if (!currentExercise) return 90;
    const targetReps = currentExercise.sets[0]?.targetReps || '';
    if (targetReps.includes('RM') || targetReps.includes('4') || targetReps.includes('5')) {
      return 180; // 3 min for heavy sets
    }
    if (targetReps.includes('8') || targetReps.includes('10')) {
      return 90; // 1.5 min for moderate sets
    }
    return 60; // 1 min for higher rep/accessory work
  }, [currentExercise]);

  // Check if this is a timed set (seconds, min, cal)
  const isTimedSet = currentSet?.targetReps
    ? currentSet.targetReps.toLowerCase().includes('second') ||
      currentSet.targetReps.toLowerCase().includes('min') ||
      currentSet.targetReps.toLowerCase().includes('cal')
    : false;

  // Handle completing a set - this is the main logic change for supersets
  const handleCompleteSet = () => {
    if (!currentExercise || !exerciseId) return;

    const data: { weight?: number; reps?: number } = {};
    if (weight) data.weight = parseFloat(weight);
    if (reps) data.reps = parseInt(reps, 10);

    logSet(exerciseId, currentSetIndex + 1, data);
    completeSet(exerciseId, currentSetIndex + 1);

    // Reset inputs
    setWeight('');
    setReps('');

    const supersetInfo = getCurrentSupersetInfo();
    const isInSuperset = supersetInfo !== null && supersetModeEnabled;

    if (isInSuperset) {
      // SUPERSET MODE: Alternate between exercises
      const isLastInGroup = supersetInfo.isLastInGroup;
      const isLastSetRound = currentSetIndex >= currentExercise.sets.length - 1;

      if (!isLastInGroup) {
        // Move to next exercise in superset (no rest)
        const nextExerciseInGroup = supersetInfo.exercises[supersetInfo.positionInGroup + 1];
        setCurrentExerciseIndex(nextExerciseInGroup.exerciseIndex);
        // Keep same set index - we're doing the same "round"
      } else if (isLastSetRound) {
        // Last exercise in group AND last set round - move to next group or finish
        const lastExerciseInGroup = supersetInfo.exercises[supersetInfo.exercises.length - 1];
        const nextExerciseIndex = lastExerciseInGroup.exerciseIndex + 1;

        if (nextExerciseIndex >= flatExercises.length) {
          // Workout complete
          setIsWorkoutComplete(true);
        } else {
          // Move to next exercise/group after rest
          startRest(getDefaultRestTime());
          setNextAfterRest({
            exerciseIndex: nextExerciseIndex,
            setIndex: 0,
          });
        }
      } else {
        // Last exercise in group but more sets to do - rest, then go back to first exercise
        const firstExerciseInGroup = supersetInfo.exercises[0];
        startRest(getDefaultRestTime());
        // After rest, we'll advance to next set and go back to first exercise
        // Store the target for after rest
        setNextAfterRest({
          exerciseIndex: firstExerciseInGroup.exerciseIndex,
          setIndex: currentSetIndex + 1,
        });
      }
    } else {
      // NON-SUPERSET MODE: Original behavior (rest after each set)
      const isLastSet = currentSetIndex >= currentExercise.sets.length - 1;
      const isLastExercise = currentExerciseIndex >= flatExercises.length - 1;

      if (isLastSet && isLastExercise) {
        setIsWorkoutComplete(true);
      } else if (isLastSet) {
        // Move to next exercise after rest
        startRest(getDefaultRestTime());
        setNextAfterRest({
          exerciseIndex: currentExerciseIndex + 1,
          setIndex: 0,
        });
      } else {
        // More sets remaining, start rest
        startRest(getDefaultRestTime());
      }
    }
  };

  // Track where to go after rest completes (for superset flow)
  const [nextAfterRest, setNextAfterRest] = useState<{
    exerciseIndex: number;
    setIndex: number;
  } | null>(null);

  // Start rest timer
  const startRest = (seconds: number) => {
    setRestTotalTime(seconds);
    setRestTimeRemaining(seconds);
    setIsResting(true);
    setIsPaused(false);
  };

  // Skip rest and continue
  const skipRest = () => {
    setIsResting(false);
    setRestTimeRemaining(0);

    if (nextAfterRest) {
      // Go to specific position (superset flow)
      setCurrentExerciseIndex(nextAfterRest.exerciseIndex);
      setCurrentSetIndex(nextAfterRest.setIndex);
      setNextAfterRest(null);
    } else if (currentExercise && currentSetIndex < currentExercise.sets.length - 1) {
      // Regular flow: advance to next set
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  // Add time to rest
  const addRestTime = (seconds: number) => {
    setRestTimeRemaining((prev) => prev + seconds);
    setRestTotalTime((prev) => prev + seconds);
  };

  // Handle rest timer complete
  useEffect(() => {
    if (isResting && restTimeRemaining === 0) {
      const timeout = setTimeout(() => {
        setIsResting(false);
        if (nextAfterRest) {
          // Go to specific position (superset flow)
          setCurrentExerciseIndex(nextAfterRest.exerciseIndex);
          setCurrentSetIndex(nextAfterRest.setIndex);
          setNextAfterRest(null);
        } else if (currentExercise && currentSetIndex < currentExercise.sets.length - 1) {
          // Regular flow: advance to next set
          setCurrentSetIndex(currentSetIndex + 1);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isResting, restTimeRemaining, currentExercise, currentSetIndex, nextAfterRest]);

  // Finish workout
  const handleFinishWorkout = () => {
    const completed = endWorkout();
    if (completed) {
      onComplete();
    }
  };

  // Cancel workout
  const handleCancelWorkout = () => {
    cancelWorkout();
    onCancel();
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate overall progress
  const calculateProgress = () => {
    let totalSets = 0;
    let completedSets = 0;

    flatExercises.forEach((fe) => {
      totalSets += fe.exercise.sets.length;
      const exId = getExerciseForSlot(programId, fe.exercise.exerciseSlot, fe.exercise.categorySlot);
      const logged = getLoggedSetsForExercise(exId);
      completedSets += logged.filter((s) => s.completed).length;
    });

    return { completed: completedSets, total: totalSets };
  };

  const progress = calculateProgress();
  const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  // Get superset info for display
  const supersetInfo = getCurrentSupersetInfo();

  if (!activeWorkout || !currentExercise) {
    return null;
  }

  // Workout Complete Screen
  if (isWorkoutComplete) {
    const workoutDurationMs = Date.now() - activeWorkout.startTime;
    const workoutMinutes = Math.floor(workoutDurationMs / 60000);

    return (
      <View style={styles.container}>
        <View style={styles.completionContainer}>
          <View style={styles.completionIcon}>
            <Text style={styles.completionIconText}>✓</Text>
          </View>
          <Text style={styles.completionTitle}>Workout Complete!</Text>
          <Text style={styles.completionSubtitle}>{day.name}</Text>

          <View style={styles.completionStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.total}</Text>
              <Text style={styles.statLabel}>Sets</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{flatExercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{workoutMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleFinishWorkout}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Rest Timer Screen
  if (isResting) {
    const progressWidth = restTotalTime > 0 ? ((restTotalTime - restTimeRemaining) / restTotalTime) * 100 : 0;
    const isComplete = restTimeRemaining === 0;

    // Determine what's next
    let nextUpText = '';
    let nextUpName = '';

    if (nextAfterRest) {
      // Superset: going back to first exercise for next round
      const nextExercise = flatExercises[nextAfterRest.exerciseIndex];
      const nextExId = getExerciseForSlot(
        programId,
        nextExercise.exercise.exerciseSlot,
        nextExercise.exercise.categorySlot
      );
      const nextExData = nextExId ? getExerciseById(nextExId) : null;
      nextUpText = `Round ${nextAfterRest.setIndex + 1}`;
      nextUpName = nextExData?.name || nextExercise.exercise.notes || '';
    } else {
      const isLastSet = currentSetIndex >= currentExercise.sets.length - 1;
      const nextExercise = isLastSet ? flatExercises[currentExerciseIndex + 1] : null;

      if (nextExercise) {
        const nextExId = getExerciseForSlot(
          programId,
          nextExercise.exercise.exerciseSlot,
          nextExercise.exercise.categorySlot
        );
        const nextExData = nextExId ? getExerciseById(nextExId) : null;
        nextUpText = 'Next Exercise';
        nextUpName = nextExData?.name || nextExercise.exercise.notes || '';
      } else {
        nextUpText = `Set ${currentSetIndex + 2} of ${currentExercise.sets.length}`;
        nextUpName = exerciseName;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowCancelConfirm(true)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <WorkoutTimer startTime={activeWorkout.startTime} />
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.restContainer}>
          <Text style={styles.restLabel}>{isComplete ? 'REST COMPLETE' : 'REST'}</Text>
          <Text style={[styles.restTime, isComplete && styles.restTimeComplete]}>
            {formatTime(restTimeRemaining)}
          </Text>

          <View style={styles.restProgressBar}>
            <View style={[styles.restProgressFill, { width: `${progressWidth}%` }]} />
          </View>

          <Text style={styles.nextUpLabel}>Next up:</Text>
          <Text style={styles.nextUpExercise}>{nextUpText}</Text>
          <Text style={styles.nextUpName}>{nextUpName}</Text>

          <View style={styles.restControls}>
            <TouchableOpacity
              style={styles.restButton}
              onPress={() => addRestTime(15)}
            >
              <Text style={styles.restButtonText}>+15s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.restButton}
              onPress={() => addRestTime(30)}
            >
              <Text style={styles.restButtonText}>+30s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.restButton, styles.restButtonPrimary]}
              onPress={() => setIsPaused(!isPaused)}
            >
              <Text style={styles.restButtonPrimaryText}>
                {isPaused ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={skipRest}
          >
            <Text style={styles.skipButtonText}>
              {isComplete ? 'Continue' : 'Skip Rest'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cancel Modal */}
        <Modal
          visible={showCancelConfirm}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCancelConfirm(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cancel Workout?</Text>
              <Text style={styles.modalText}>
                This will discard all progress from this workout. This cannot be undone.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonSecondary}
                  onPress={() => setShowCancelConfirm(false)}
                >
                  <Text style={styles.modalButtonSecondaryText}>Keep Going</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButtonPrimary, styles.modalButtonDanger]}
                  onPress={handleCancelWorkout}
                >
                  <Text style={styles.modalButtonPrimaryText}>Discard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Main Exercise Logging Screen
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowCancelConfirm(true)}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <WorkoutTimer startTime={activeWorkout.startTime} />
        <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
          <Text style={styles.settingsText}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {progress.completed} / {progress.total} sets
      </Text>

      {/* Current Exercise */}
      <View style={styles.exerciseContainer}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>{currentFlatExercise.sectionName}</Text>
        </View>

        <View style={styles.exerciseHeader}>
          <View style={styles.slotBadge}>
            <Text style={styles.slotText}>{currentExercise.exerciseSlot}</Text>
          </View>
          <TouchableOpacity onPress={() => exerciseId && onViewExercise(exerciseId)}>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
            <Text style={styles.viewDetails}>View exercise details →</Text>
          </TouchableOpacity>
        </View>

        {/* Superset indicator with position info */}
        {currentFlatExercise.isSuperset && supersetInfo && (
          <View style={styles.supersetIndicator}>
            <Text style={styles.supersetText}>
              SUPERSET {supersetInfo.positionInGroup + 1}/{supersetInfo.totalInGroup}
              {!supersetModeEnabled && ' (OFF)'}
            </Text>
          </View>
        )}

        {/* Set Info */}
        <View style={styles.setInfo}>
          <Text style={styles.setNumber}>
            Set {currentSetIndex + 1} of {currentExercise.sets.length}
          </Text>
          <Text style={styles.targetReps}>
            Target: {currentSet?.targetReps}
            {currentExercise.isPerSide ? ' per side' : ''}
          </Text>
        </View>

        {/* Input Fields */}
        {!isTimedSet && (
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (lbs)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
                placeholder={currentSet?.targetReps.split('-')[0] || '0'}
                placeholderTextColor="#666"
              />
            </View>
          </View>
        )}

        {/* Complete Button */}
        <TouchableOpacity
          style={styles.completeSetButton}
          onPress={handleCompleteSet}
        >
          <Text style={styles.completeSetButtonText}>
            {isTimedSet
              ? 'Complete Set'
              : supersetInfo && !supersetInfo.isLastInGroup && supersetModeEnabled
                ? `Log Set → Next Exercise`
                : 'Log Set & Rest'
            }
          </Text>
        </TouchableOpacity>

        {/* Exercise Notes */}
        {currentExercise.notes && (
          <Text style={styles.exerciseNotes}>{currentExercise.notes}</Text>
        )}
      </View>

      {/* Cancel Modal */}
      <Modal
        visible={showCancelConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Workout?</Text>
            <Text style={styles.modalText}>
              This will discard all progress from this workout. This cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => setShowCancelConfirm(false)}
              >
                <Text style={styles.modalButtonSecondaryText}>Keep Going</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButtonPrimary, styles.modalButtonDanger]}
                onPress={handleCancelWorkout}
              >
                <Text style={styles.modalButtonPrimaryText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Workout Settings</Text>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Superset Mode</Text>
                <Text style={styles.settingDescription}>
                  Alternate between paired exercises without rest
                </Text>
              </View>
              <Switch
                value={supersetModeEnabled}
                onValueChange={toggleSupersetMode}
                trackColor={{ false: '#333', true: colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <TouchableOpacity
              style={[styles.modalButtonPrimary, { marginTop: 24 }]}
              onPress={() => setShowSettingsModal(false)}
            >
              <Text style={styles.modalButtonPrimaryText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cancelText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '500',
  },
  settingsText: {
    color: '#888',
    fontSize: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  exerciseContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  sectionBadgeText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  slotBadge: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
  },
  slotText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  viewDetails: {
    fontSize: 14,
    color: colors.primary,
  },
  supersetIndicator: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  supersetText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  setInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  setNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  targetReps: {
    fontSize: 18,
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  completeSetButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeSetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  exerciseNotes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Rest Timer Styles
  restContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  restLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 16,
  },
  restTime: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    marginBottom: 24,
  },
  restTimeComplete: {
    color: '#FF9800',
  },
  restProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 48,
  },
  restProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  nextUpLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  nextUpExercise: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  nextUpName: {
    fontSize: 16,
    color: '#888',
    marginBottom: 48,
  },
  restControls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  restButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  restButtonPrimary: {
    backgroundColor: colors.primary,
  },
  restButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  restButtonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
  },
  skipButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButtonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  modalButtonDanger: {
    backgroundColor: '#FF5252',
  },
  modalButtonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Settings Modal Styles
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  },
  // Completion Screen Styles
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  completionIconText: {
    fontSize: 40,
    color: '#fff',
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  completionSubtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 48,
  },
  completionStats: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    marginBottom: 48,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 64,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
