import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { WorkoutDay, WorkoutExercise } from '../types';
import { getExerciseById } from '../store/exerciseStore';
import { colors } from '../theme';
import { WhyMessageCard, TaperBanner } from '../components/WhyMessageCard';
import { WhyMessage } from '../utils/whyMessageGenerator';

interface WorkoutDayScreenProps {
  day: WorkoutDay;
  programId: string;
  onStartWorkout: () => void;
  onBack: () => void;
  onViewExercise: (exerciseId: string) => void;
  whyMessage?: WhyMessage | null;
  taperStatus?: {
    status: string;
    severity: 'none' | 'light' | 'moderate' | 'heavy';
  } | null;
}

export const WorkoutDayScreen: React.FC<WorkoutDayScreenProps> = ({
  day,
  programId,
  onStartWorkout,
  onBack,
  onViewExercise,
  whyMessage,
  taperStatus,
}) => {
  const renderExercise = (exercise: WorkoutExercise, index: number) => {
    // Use the exerciseId from the workout data directly (populated by assembler or store)
    const exerciseId = exercise.exerciseId;
    const exerciseData = exerciseId ? getExerciseById(exerciseId) : null;
    const exerciseName = exerciseData?.name || exercise.notes || exercise.categorySlot;

    // Format sets display
    const setsCount = exercise.sets.length;
    const repsDisplay = exercise.sets[0]?.targetReps || '';
    const isPerSide = exercise.isPerSide;

    return (
      <TouchableOpacity
        key={`${exercise.exerciseSlot}-${index}`}
        style={styles.exerciseCard}
        onPress={() => exerciseId && onViewExercise(exerciseId)}
      >
        <View style={styles.exerciseHeader}>
          <View style={styles.slotBadge}>
            <Text style={styles.slotText}>{exercise.exerciseSlot}</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
            <Text style={styles.exerciseDetails}>
              {setsCount} × {repsDisplay}
              {isPerSide ? ' per side' : ''}
            </Text>
          </View>
        </View>
        {exercise.notes && (
          <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderSuperset = (exercises: WorkoutExercise[]) => {
    return (
      <View style={styles.supersetContainer}>
        <View style={styles.supersetIndicator}>
          <View style={styles.supersetLine} />
          <Text style={styles.supersetLabel}>Superset</Text>
        </View>
        <View style={styles.supersetExercises}>
          {exercises.map((ex, idx) => renderExercise(ex, idx))}
        </View>
      </View>
    );
  };

  const groupExercisesBySupersets = (exercises: WorkoutExercise[]) => {
    const groups: { isSuperSet: boolean; exercises: WorkoutExercise[] }[] = [];
    let currentSuperset: WorkoutExercise[] = [];
    let currentSupersetGroup: string | undefined;

    exercises.forEach((exercise, index) => {
      if (exercise.supersetGroup) {
        if (currentSupersetGroup === exercise.supersetGroup) {
          currentSuperset.push(exercise);
        } else {
          // Save previous superset if exists
          if (currentSuperset.length > 0) {
            groups.push({
              isSuperSet: currentSuperset.length > 1,
              exercises: currentSuperset,
            });
          }
          currentSuperset = [exercise];
          currentSupersetGroup = exercise.supersetGroup;
        }
      } else {
        // Save previous superset if exists
        if (currentSuperset.length > 0) {
          groups.push({
            isSuperSet: currentSuperset.length > 1,
            exercises: currentSuperset,
          });
          currentSuperset = [];
          currentSupersetGroup = undefined;
        }
        groups.push({ isSuperSet: false, exercises: [exercise] });
      }

      // Handle last item
      if (index === exercises.length - 1 && currentSuperset.length > 0) {
        groups.push({
          isSuperSet: currentSuperset.length > 1,
          exercises: currentSuperset,
        });
      }
    });

    return groups;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.dayName}>{day.name}</Text>
        {day.focus && <Text style={styles.dayFocus}>{day.focus}</Text>}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Taper Warning Banner */}
        {taperStatus && (
          <TaperBanner status={taperStatus.status} severity={taperStatus.severity} />
        )}

        {/* Why Message Card - explains workout customization */}
        {whyMessage && (
          <WhyMessageCard message={whyMessage} taperStatus={taperStatus} />
        )}

        {day.sections.map((section, sectionIndex) => (
          <View key={`${section.name}-${sectionIndex}`} style={styles.section}>
            <Text style={styles.sectionName}>{section.name}</Text>

            {groupExercisesBySupersets(section.exercises).map((group, groupIndex) => (
              <View key={groupIndex}>
                {group.isSuperSet
                  ? renderSuperset(group.exercises)
                  : group.exercises.map((ex, idx) => renderExercise(ex, idx))}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={onStartWorkout}>
          <Text style={styles.startButtonText}>Start Day {day.dayNumber}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
  },
  dayName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayFocus: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 1,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  slotBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
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
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#888',
  },
  exerciseNotes: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  supersetContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  supersetIndicator: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  supersetLine: {
    flex: 1,
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  supersetLabel: {
    fontSize: 8,
    color: colors.primary,
    marginTop: 4,
    transform: [{ rotate: '-90deg' }],
    width: 50,
    textAlign: 'center',
  },
  supersetExercises: {
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
