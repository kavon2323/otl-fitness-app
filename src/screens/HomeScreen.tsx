import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useProgramStore } from '../store/programStore';
import { useWorkoutStore } from '../store/workoutStore';
import { Program, WorkoutDay } from '../types';
import { Logo } from '../components';
import { colors, typography, spacing, borderRadius } from '../theme';

interface HomeScreenProps {
  onSelectNewProgram: () => void;
  onSelectDay: (day: WorkoutDay) => void;
  onEditExercises: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectNewProgram,
  onSelectDay,
  onEditExercises,
}) => {
  const { user, signOut } = useAuthStore();
  const { getCurrentProgram, currentWeek, setCurrentWeek, resetProgram } = useProgramStore();
  const { isWorkoutCompletedThisWeek } = useWorkoutStore();

  const currentProgram = getCurrentProgram();

  const handleChangeProgram = () => {
    resetProgram();
    onSelectNewProgram();
  };

  if (!currentProgram) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Logo size="small" />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Welcome,</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Logo size="large" showText />
          <Text style={styles.emptyTitle}>No Active Program</Text>
          <Text style={styles.emptySubtitle}>
            Select a training program to get started
          </Text>
          <TouchableOpacity style={styles.selectButton} onPress={onSelectNewProgram}>
            <Text style={styles.selectButtonText}>Select Program</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.text} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo size="small" />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.programCard}>
          <View style={styles.programHeader}>
            <View>
              <Text style={styles.currentLabel}>CURRENT PROGRAM</Text>
              <Text style={styles.programName}>{currentProgram.name}</Text>
            </View>
            <TouchableOpacity onPress={handleChangeProgram} style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekSelector}>
            <Text style={styles.weekLabel}>WEEK</Text>
            <View style={styles.weekButtons}>
              {[1, 2, 3, 4].map((week) => (
                <TouchableOpacity
                  key={week}
                  style={[
                    styles.weekButton,
                    currentWeek === week && styles.weekButtonActive,
                  ]}
                  onPress={() => setCurrentWeek(week)}
                >
                  <Text
                    style={[
                      styles.weekButtonText,
                      currentWeek === week && styles.weekButtonTextActive,
                    ]}
                  >
                    {week}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.editExercisesButton} onPress={onEditExercises}>
            <Ionicons name="options-outline" size={18} color={colors.primary} style={styles.editIcon} />
            <Text style={styles.editExercisesText}>Edit Exercise Selections</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>THIS WEEK'S WORKOUTS</Text>

        {currentProgram.days.map((day) => {
          const isCompleted = isWorkoutCompletedThisWeek(currentProgram.id, day.dayNumber, currentWeek);

          return (
            <TouchableOpacity
              key={day.id}
              style={[styles.dayCard, isCompleted && styles.dayCardCompleted]}
              onPress={() => onSelectDay(day)}
            >
              <View style={styles.dayHeader}>
                <View style={[styles.dayNumberBadge, isCompleted && styles.dayNumberBadgeCompleted]}>
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={14} color={colors.text} />
                  ) : (
                    <Text style={styles.dayNumberText}>Day {day.dayNumber}</Text>
                  )}
                </View>
                <Text style={[styles.dayName, isCompleted && styles.dayNameCompleted]}>
                  {day.name}
                </Text>
              </View>
              {day.focus && (
                <Text style={[styles.dayFocus, isCompleted && styles.dayFocusCompleted]}>
                  {day.focus}
                </Text>
              )}
              <View style={styles.dayFooter}>
                <Text style={[styles.exerciseCount, isCompleted && styles.exerciseCountCompleted]}>
                  {isCompleted ? 'Completed this week' : `${day.sections.reduce((acc, s) => acc + s.exercises.length, 0)} exercises`}
                </Text>
                <View style={styles.viewAction}>
                  <Text style={[styles.viewText, isCompleted && styles.viewTextCompleted]}>
                    {isCompleted ? 'View Log' : 'Start'}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={isCompleted ? colors.textMuted : colors.primary}
                    style={styles.arrowIcon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  email: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: 2,
  },
  signOutButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing['2xl'],
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
  },
  selectButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing['3xl'],
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButtonText: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: spacing.sm,
  },
  programCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  currentLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  programName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  changeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  changeText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  weekLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1,
    marginRight: spacing.lg,
  },
  weekButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  weekButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekButtonActive: {
    backgroundColor: colors.primary,
  },
  weekButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  weekButtonTextActive: {
    color: colors.text,
  },
  editExercisesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },
  editIcon: {
    marginRight: spacing.sm,
  },
  editExercisesText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },
  dayCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardCompleted: {
    backgroundColor: '#1a2530',
    borderColor: '#1e3a4d',
    opacity: 0.85,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dayNumberBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.md,
  },
  dayNumberBadgeCompleted: {
    backgroundColor: '#1e3a4d',
  },
  dayNumberText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  dayName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  dayNameCompleted: {
    color: colors.textSecondary,
  },
  dayFocus: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  dayFocusCompleted: {
    color: colors.textMuted,
  },
  dayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
  },
  exerciseCount: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exerciseCountCompleted: {
    color: colors.primary,
  },
  viewAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  viewTextCompleted: {
    color: colors.textMuted,
  },
  arrowIcon: {
    marginLeft: spacing.xs,
  },
  bottomPadding: {
    height: spacing['3xl'],
  },
});
