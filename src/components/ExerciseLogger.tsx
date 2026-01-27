import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { WorkoutExercise, LoggedSet } from '../types';
import { SetLogger } from './SetLogger';
import { getExerciseById } from '../store/exerciseStore';
import { colors } from '../theme';

interface ExerciseLoggerProps {
  exercise: WorkoutExercise;
  exerciseId: string;
  loggedSets: LoggedSet[];
  onCompleteSet: (setNumber: number, data: { weight?: number; reps?: number }) => void;
  onStartRest: (seconds: number) => void;
  onViewExercise: () => void;
  isSuperset?: boolean;
  supersetPosition?: 'first' | 'middle' | 'last' | 'single';
}

export const ExerciseLogger: React.FC<ExerciseLoggerProps> = ({
  exercise,
  exerciseId,
  loggedSets,
  onCompleteSet,
  onStartRest,
  onViewExercise,
  isSuperset,
  supersetPosition,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const exerciseData = getExerciseById(exerciseId);
  const exerciseName = exerciseData?.name || exercise.notes || exercise.categorySlot;

  const getSetStatus = (setNumber: number): { isCompleted: boolean; data?: LoggedSet } => {
    const logged = loggedSets.find((s) => s.setNumber === setNumber);
    return {
      isCompleted: logged?.completed || false,
      data: logged,
    };
  };

  const completedSets = loggedSets.filter((s) => s.completed).length;
  const totalSets = exercise.sets.length;
  const allComplete = completedSets === totalSets;

  // Default rest time based on exercise type
  const getDefaultRestTime = (): number => {
    const targetReps = exercise.sets[0]?.targetReps || '';
    if (targetReps.includes('RM') || targetReps.includes('4') || targetReps.includes('5')) {
      return 180; // 3 min for heavy sets
    }
    if (targetReps.includes('8') || targetReps.includes('10')) {
      return 90; // 1.5 min for moderate sets
    }
    return 60; // 1 min for higher rep/accessory work
  };

  return (
    <View style={[
      styles.container,
      isSuperset && styles.supersetContainer,
      supersetPosition === 'first' && styles.supersetFirst,
      supersetPosition === 'last' && styles.supersetLast,
      allComplete && styles.completedContainer,
    ]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.slotBadge, allComplete && styles.slotBadgeComplete]}>
            <Text style={styles.slotText}>{exercise.exerciseSlot}</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <TouchableOpacity onPress={onViewExercise}>
              <Text style={[styles.exerciseName, allComplete && styles.exerciseNameComplete]}>
                {exerciseName}
              </Text>
            </TouchableOpacity>
            <Text style={styles.progress}>
              {completedSets}/{totalSets} sets
              {exercise.isPerSide && ' • per side'}
            </Text>
          </View>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.setsContainer}>
          {exercise.sets.map((set) => {
            const status = getSetStatus(set.setNumber);
            return (
              <SetLogger
                key={set.setNumber}
                setNumber={set.setNumber}
                targetReps={set.targetReps}
                isCompleted={status.isCompleted}
                previousWeight={status.data?.weight}
                previousReps={status.data?.reps}
                onComplete={(data) => onCompleteSet(set.setNumber, data)}
                onStartRest={() => onStartRest(getDefaultRestTime())}
              />
            );
          })}
        </View>
      )}

      {exercise.notes && (
        <Text style={styles.notes}>{exercise.notes}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  supersetContainer: {
    marginBottom: 4,
    borderRadius: 12,
  },
  supersetFirst: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  supersetLast: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 12,
  },
  completedContainer: {
    backgroundColor: '#1a2a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2a2a2a',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  slotBadge: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 12,
  },
  slotBadgeComplete: {
    backgroundColor: '#2E7D32',
  },
  slotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  exerciseNameComplete: {
    color: '#81C784',
  },
  progress: {
    fontSize: 12,
    color: '#888',
  },
  expandIcon: {
    color: '#666',
    fontSize: 12,
  },
  setsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  notes: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
