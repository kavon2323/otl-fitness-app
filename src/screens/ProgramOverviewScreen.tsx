import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme';
import { Program, WorkoutDay, WorkoutExercise, ProgramType } from '../types';
import { usePlayerProfileStore } from '../store/playerProfileStore';
import { useProgramStore } from '../store/programStore';
import { getExerciseById } from '../store/exerciseStore';
import {
  generateProgramRecommendation,
  getWeightRecommendation,
  selectExerciseForSlot,
} from '../utils/exerciseAutoSelector';
import { formatPosition, formatSideBias, formatPhase } from '../types/paintball';

interface ProgramOverviewScreenProps {
  program: Program;
  isRecommended?: boolean;
  onStartProgram: () => void;
  onSelectDay: (day: WorkoutDay, programType: ProgramType) => void;
  onStartOneOffWorkout: (day: WorkoutDay, program: Program) => void;
  onViewExercise: (exerciseId: string) => void;
  onSelectDifferentProgram: () => void;
  onBack?: () => void;
}

export const ProgramOverviewScreen: React.FC<ProgramOverviewScreenProps> = ({
  program,
  isRecommended = false,
  onStartProgram,
  onSelectDay,
  onStartOneOffWorkout,
  onViewExercise,
  onSelectDifferentProgram,
  onBack,
}) => {
  const { profile } = usePlayerProfileStore();
  const { setCurrentProgram, setExerciseSelection, currentProgramId, currentMobilityProgramId } = useProgramStore();
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [isSettingUp, setIsSettingUp] = useState(false);

  const programType: ProgramType = program.programType || 'strength';
  const isCurrentProgram = programType === 'mobility'
    ? currentMobilityProgramId === program.id
    : currentProgramId === program.id;

  // Generate recommendation reasons
  const recommendationReasons = useMemo(() => {
    if (!profile) return [];
    return generateProgramRecommendation(profile, program.daysPerWeek);
  }, [profile, program.daysPerWeek]);

  // Auto-select exercises for all days (day-specific to allow variety)
  const autoSelectedExercises = useMemo(() => {
    if (!profile) return new Map<string, string>();

    const selections = new Map<string, string>();
    const usedIds: string[] = [];

    for (const day of program.days) {
      for (const section of day.sections) {
        for (const exercise of section.exercises) {
          // Use day-specific key to allow different exercises on different days
          const slotKey = `day${day.dayNumber}-${exercise.exerciseSlot}`;
          if (!selections.has(slotKey)) {
            const recommendation = selectExerciseForSlot(
              exercise.categorySlot,
              profile,
              usedIds
            );
            if (recommendation) {
              selections.set(slotKey, recommendation.exerciseId);
              usedIds.push(recommendation.exerciseId);
            }
          }
        }
      }
    }

    return selections;
  }, [profile, program]);

  const toggleDay = (dayId: string) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayId)) {
        next.delete(dayId);
      } else {
        next.add(dayId);
      }
      return next;
    });
  };

  const handleStartProgram = async () => {
    setIsSettingUp(true);

    // Set as current program (passing the program type)
    setCurrentProgram(program.id, programType);

    // Save all auto-selected exercises (selections are now keyed by day-slot)
    for (const day of program.days) {
      for (const section of day.sections) {
        for (const exercise of section.exercises) {
          const slotKey = `day${day.dayNumber}-${exercise.exerciseSlot}`;
          const exerciseId = autoSelectedExercises.get(slotKey);
          if (exerciseId) {
            setExerciseSelection(program.id, day.dayNumber, exercise.exerciseSlot, exercise.categorySlot, exerciseId);
          }
        }
      }
    }

    setIsSettingUp(false);
    onStartProgram();
  };

  const getExerciseForSlot = (exercise: WorkoutExercise, dayNumber: number): { id: string; name: string } | null => {
    const slotKey = `day${dayNumber}-${exercise.exerciseSlot}`;
    const selectedId = autoSelectedExercises.get(slotKey);
    if (selectedId) {
      const ex = getExerciseById(selectedId);
      if (ex) return { id: ex.id, name: ex.name };
    }
    // Fallback to notes or category
    return { id: '', name: exercise.notes || exercise.categorySlot };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        {isRecommended && (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedBadgeText}>RECOMMENDED FOR YOU</Text>
          </View>
        )}
        <Text style={styles.title}>{program.name}</Text>
        <Text style={styles.subtitle}>{program.description}</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Program Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{program.daysPerWeek}</Text>
            <Text style={styles.statLabel}>days/week</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{program.days.length}</Text>
            <Text style={styles.statLabel}>workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {program.days.reduce(
                (acc, day) =>
                  acc + day.sections.reduce((s, sec) => s + sec.exercises.length, 0),
                0
              )}
            </Text>
            <Text style={styles.statLabel}>exercises</Text>
          </View>
        </View>

        {/* Why This Program */}
        {isRecommended && profile && (
          <View style={styles.whySection}>
            <Text style={styles.sectionTitle}>Why This Program?</Text>
            <View style={styles.profileSummary}>
              <Text style={styles.profileText}>
                {formatPosition(profile.primaryPosition)} • {formatSideBias(profile.fieldSideBias)} • {formatPhase(profile.currentPhase)}
              </Text>
            </View>
            {recommendationReasons.map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <Text style={styles.reasonBullet}>•</Text>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Weight Loading Guide */}
        <View style={styles.weightSection}>
          <Text style={styles.sectionTitle}>Weight Loading Guide</Text>
          <Text style={styles.weightIntro}>
            Use these percentages of your estimated 1RM (one-rep max) for each rep range:
          </Text>
          <View style={styles.weightGuide}>
            <View style={styles.weightRow}>
              <Text style={styles.weightReps}>1-3 reps</Text>
              <Text style={styles.weightPercent}>90-95%</Text>
              <Text style={styles.weightDesc}>Near-max</Text>
            </View>
            <View style={styles.weightRow}>
              <Text style={styles.weightReps}>4-6 reps</Text>
              <Text style={styles.weightPercent}>80-87%</Text>
              <Text style={styles.weightDesc}>Strength</Text>
            </View>
            <View style={styles.weightRow}>
              <Text style={styles.weightReps}>6-10 reps</Text>
              <Text style={styles.weightPercent}>70-80%</Text>
              <Text style={styles.weightDesc}>Hypertrophy</Text>
            </View>
            <View style={styles.weightRow}>
              <Text style={styles.weightReps}>10-15 reps</Text>
              <Text style={styles.weightPercent}>60-70%</Text>
              <Text style={styles.weightDesc}>Endurance</Text>
            </View>
          </View>
        </View>

        {/* Days List */}
        <View style={styles.daysSection}>
          <Text style={styles.sectionTitle}>Training Days</Text>
          {program.days.map((day) => {
            const isExpanded = expandedDays.has(day.id);
            return (
              <View key={day.id} style={styles.dayCard}>
                <TouchableOpacity
                  style={styles.dayHeader}
                  onPress={() => toggleDay(day.id)}
                >
                  <View style={styles.dayInfo}>
                    <Text style={styles.dayNumber}>Day {day.dayNumber}</Text>
                    <Text style={styles.dayFocus}>{day.focus || day.name}</Text>
                  </View>
                  <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.dayContent}>
                    {day.sections.map((section, sIdx) => (
                      <View key={sIdx} style={styles.sectionBlock}>
                        <Text style={styles.sectionName}>{section.name}</Text>
                        {section.exercises.map((exercise, eIdx) => {
                          const selectedExercise = getExerciseForSlot(exercise, day.dayNumber);
                          const weightRec = getWeightRecommendation(
                            exercise.sets[0]?.targetReps || '8-10'
                          );

                          return (
                            <TouchableOpacity
                              key={eIdx}
                              style={styles.exerciseRow}
                              onPress={() =>
                                selectedExercise?.id &&
                                onViewExercise(selectedExercise.id)
                              }
                              disabled={!selectedExercise?.id}
                            >
                              <View style={styles.exerciseSlot}>
                                <Text style={styles.exerciseSlotText}>
                                  {exercise.exerciseSlot}
                                </Text>
                              </View>
                              <View style={styles.exerciseInfo}>
                                <Text style={styles.exerciseName}>
                                  {selectedExercise?.name || 'Select exercise'}
                                </Text>
                                <Text style={styles.exerciseSets}>
                                  {exercise.sets.length} sets × {exercise.sets[0]?.targetReps}
                                  {exercise.isPerSide ? ' (per side)' : ''}
                                </Text>
                              </View>
                              <View style={styles.weightBadge}>
                                <Text style={styles.weightBadgeText}>
                                  {weightRec.percentage}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                    <View style={styles.dayActions}>
                      <TouchableOpacity
                        style={styles.viewDayButton}
                        onPress={() => onSelectDay(day, programType)}
                      >
                        <Text style={styles.viewDayButtonText}>View Full Workout →</Text>
                      </TouchableOpacity>
                      {!isCurrentProgram && (
                        <TouchableOpacity
                          style={styles.oneOffButton}
                          onPress={() => onStartOneOffWorkout(day, program)}
                        >
                          <Text style={styles.oneOffButtonText}>Do This Workout</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Different Program Link */}
        <TouchableOpacity
          style={styles.differentProgramButton}
          onPress={onSelectDifferentProgram}
        >
          <Text style={styles.differentProgramText}>
            Choose a different program →
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Start Button */}
      {!isCurrentProgram && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.startButton, isSettingUp && styles.startButtonDisabled]}
            onPress={handleStartProgram}
            disabled={isSettingUp}
          >
            {isSettingUp ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.startButtonText}>Start This Program</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
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
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  recommendedBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  recommendedBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#444',
  },
  whySection: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.2)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  profileSummary: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  profileText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  reasonItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reasonBullet: {
    color: colors.primary,
    fontSize: 14,
    marginRight: 8,
    lineHeight: 20,
  },
  reasonText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  weightSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  weightIntro: {
    color: '#888',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  weightGuide: {
    gap: 8,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
  },
  weightReps: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    width: 80,
  },
  weightPercent: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    width: 70,
  },
  weightDesc: {
    color: '#888',
    fontSize: 13,
    flex: 1,
  },
  daysSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dayCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  dayInfo: {
    flex: 1,
  },
  dayNumber: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayFocus: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  expandIcon: {
    color: '#888',
    fontSize: 24,
    width: 30,
    textAlign: 'center',
  },
  dayContent: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 16,
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionName: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  exerciseSlot: {
    backgroundColor: '#333',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  exerciseSlotText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  exerciseSets: {
    color: '#888',
    fontSize: 12,
  },
  weightBadge: {
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  weightBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  dayActions: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
    marginTop: 8,
    gap: 10,
  },
  viewDayButton: {
  },
  viewDayButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  oneOffButton: {
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  oneOffButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  differentProgramButton: {
    marginHorizontal: 20,
    padding: 16,
    alignItems: 'center',
  },
  differentProgramText: {
    color: '#888',
    fontSize: 14,
  },
  bottomPadding: {
    height: 120,
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
  startButtonDisabled: {
    opacity: 0.7,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
