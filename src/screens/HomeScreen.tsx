import React, { useEffect } from 'react';
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
import { usePlayerProfileStore } from '../store/playerProfileStore';
import { useMessageStore } from '../store/messageStore';
import { Program, WorkoutDay, ProgramType } from '../types';
import { Logo, WeeklyCalendar } from '../components';
import { colors, typography, spacing, borderRadius } from '../theme';
import { supabase } from '../lib/supabase';
import { formatPosition, formatSideBias, formatPhase } from '../types/paintball';

interface HomeScreenProps {
  onSelectNewProgram: () => void;
  onSelectDay: (day: WorkoutDay, programType: ProgramType) => void;
  onEditExercises: () => void;
  onOpenSettings?: () => void;
  onOpenMessages?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectNewProgram,
  onSelectDay,
  onEditExercises,
  onOpenSettings,
  onOpenMessages,
}) => {
  const { user, signOut } = useAuthStore();
  const { getCurrentProgram, currentWeek, currentMobilityWeek, setCurrentWeek, resetProgram } = useProgramStore();
  const { isWorkoutCompletedThisWeek } = useWorkoutStore();
  const { profile, clearProfile } = usePlayerProfileStore();
  const { unreadCount, loadUnreadCount } = useMessageStore();

  const currentProgram = getCurrentProgram('strength');
  const currentMobilityProgram = getCurrentProgram('mobility');

  // Load unread message count on mount
  useEffect(() => {
    if (user?.id) {
      loadUnreadCount(user.id);
    }
  }, [user?.id]);

  // DEV: Reset player profile to test onboarding
  const handleResetProfile = async () => {
    try {
      // Delete from Supabase
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await supabase.from('player_profiles').delete().eq('user_id', authUser.id);
      }
      // Clear local state
      clearProfile();
    } catch (error) {
      console.error('Error resetting profile:', error);
    }
  };

  const handleChangeProgram = (programType: ProgramType = 'strength') => {
    resetProgram(programType);
    onSelectNewProgram();
  };

  // Show empty state only if no strength program (mobility is optional)
  if (!currentProgram) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileButton} onPress={onOpenSettings}>
            <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Logo size="small" />
          </View>
          <TouchableOpacity style={styles.headerRight} onPress={onOpenMessages}>
            <View style={styles.notificationButton}>
              <Ionicons
                name={unreadCount > 0 ? 'notifications' : 'notifications-outline'}
                size={24}
                color={unreadCount > 0 ? colors.primary : colors.textSecondary}
              />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Logo size="large" showText />
          <Text style={styles.emptyTitle}>Ready to Train?</Text>
          <Text style={styles.emptySubtitle}>
            Get a personalized training program built for your position, experience level, and goals
          </Text>
          <TouchableOpacity style={styles.selectButton} onPress={onSelectNewProgram}>
            <Ionicons name="fitness" size={22} color={colors.text} style={styles.buttonIconLeft} />
            <Text style={styles.selectButtonText}>Get My Custom Plan</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.text} style={styles.buttonIcon} />
          </TouchableOpacity>
          <Text style={styles.emptyHint}>
            Answer a few questions and we'll build your program
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={onOpenSettings}>
          <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Logo size="small" />
        </View>
        <TouchableOpacity style={styles.headerRight} onPress={onOpenMessages}>
          <View style={styles.notificationButton}>
            <Ionicons
              name={unreadCount > 0 ? 'notifications' : 'notifications-outline'}
              size={24}
              color={unreadCount > 0 ? colors.primary : colors.textSecondary}
            />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.programCard}>
          <View style={styles.programHeader}>
            <View>
              <Text style={styles.currentLabel}>CURRENT PROGRAM</Text>
              <Text style={styles.programName}>{currentProgram.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleChangeProgram('strength')} style={styles.changeButton}>
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

        {/* Player Profile Card */}
        {profile && (
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileLabel}>YOUR TRAINING PROFILE</Text>
              <TouchableOpacity onPress={handleResetProfile} style={styles.resetButton}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileBadges}>
              <View style={styles.profileBadge}>
                <Text style={styles.badgeText}>{formatPosition(profile.primaryPosition)}</Text>
              </View>
              <View style={styles.profileBadge}>
                <Text style={styles.badgeText}>{formatSideBias(profile.fieldSideBias)}</Text>
              </View>
              <View style={styles.profileBadge}>
                <Text style={styles.badgeText}>{formatPhase(profile.currentPhase)}</Text>
              </View>
            </View>
            {profile.nextTournamentDate && (
              <Text style={styles.tournamentDate}>
                Next Tournament: {new Date(profile.nextTournamentDate).toLocaleDateString()}
              </Text>
            )}
          </View>
        )}

        {/* Weekly Schedule Calendar */}
        <WeeklyCalendar />

        <Text style={styles.sectionTitle}>THIS WEEK'S WORKOUTS</Text>

        {currentProgram.days.map((day) => {
          const isCompleted = isWorkoutCompletedThisWeek(currentProgram.id, day.dayNumber, currentWeek);

          return (
            <TouchableOpacity
              key={day.id}
              style={[styles.dayCard, isCompleted && styles.dayCardCompleted]}
              onPress={() => onSelectDay(day, 'strength')}
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

        {/* Mobility Program Section */}
        {currentMobilityProgram ? (
          <>
            <View style={styles.mobilityCard}>
              <View style={styles.programHeader}>
                <View>
                  <Text style={styles.mobilityLabel}>MOBILITY PROGRAM</Text>
                  <Text style={styles.programName}>{currentMobilityProgram.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleChangeProgram('mobility')} style={styles.changeButton}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mobilityDays}>
                {currentMobilityProgram.days.slice(0, 3).map((day) => {
                  const isCompleted = isWorkoutCompletedThisWeek(currentMobilityProgram.id, day.dayNumber, currentMobilityWeek);
                  return (
                    <TouchableOpacity
                      key={day.id}
                      style={[styles.mobilityDayCard, isCompleted && styles.mobilityDayCardCompleted]}
                      onPress={() => onSelectDay(day, 'mobility')}
                    >
                      <Text style={[styles.mobilityDayName, isCompleted && styles.mobilityDayNameCompleted]}>
                        {day.focus || day.name}
                      </Text>
                      {isCompleted ? (
                        <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                      ) : (
                        <Ionicons name="play-circle-outline" size={20} color={colors.textMuted} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              {currentMobilityProgram.days.length > 3 && (
                <Text style={styles.moreMobilityDays}>
                  +{currentMobilityProgram.days.length - 3} more routines
                </Text>
              )}
            </View>
          </>
        ) : (
          <TouchableOpacity style={styles.addMobilityCard} onPress={onSelectNewProgram}>
            <View style={styles.addMobilityContent}>
              <View style={styles.addMobilityIcon}>
                <Ionicons name="body-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.addMobilityText}>
                <Text style={styles.addMobilityTitle}>Add Mobility Program</Text>
                <Text style={styles.addMobilitySubtitle}>
                  Stack a daily mobility routine alongside your strength training
                </Text>
              </View>
            </View>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}

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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
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
  buttonIconLeft: {
    marginRight: spacing.sm,
  },
  emptyHint: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.lg,
    textAlign: 'center',
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
  // Profile Card Styles
  profileCard: {
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.2)',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1.5,
  },
  resetButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  resetText: {
    color: '#ff6b6b',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  profileBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  profileBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  tournamentDate: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    marginTop: spacing.md,
  },
  // Mobility Card Styles
  mobilityCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mobilityLabel: {
    fontSize: typography.fontSize.xs,
    color: '#4ecdc4',
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  mobilityDays: {
    gap: spacing.sm,
  },
  mobilityDayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  mobilityDayCardCompleted: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  mobilityDayName: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  mobilityDayNameCompleted: {
    color: colors.textSecondary,
  },
  moreMobilityDays: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  addMobilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderStyle: 'dashed',
  },
  addMobilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addMobilityIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(78, 205, 196, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addMobilityText: {
    flex: 1,
  },
  addMobilityTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  addMobilitySubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
