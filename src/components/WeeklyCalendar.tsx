import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useScheduleStore, getDayName, getWorkoutTypeInfo, WorkoutType, ScheduledWorkout } from '../store/scheduleStore';
import { colors, typography, spacing, borderRadius } from '../theme';

interface WeeklyCalendarProps {
  onDayPress?: (dayOfWeek: number, workout: ScheduledWorkout | null) => void;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ onDayPress }) => {
  const { weekSchedule, setWorkoutForDay } = useScheduleStore();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const today = new Date().getDay(); // 0-6, Sunday = 0

  const handleDayPress = (dayOfWeek: number) => {
    setSelectedDay(dayOfWeek);
    setShowTypeSelector(true);
  };

  const handleSelectType = (type: WorkoutType | null) => {
    if (selectedDay !== null) {
      if (type === null || type === 'rest') {
        setWorkoutForDay(selectedDay, null);
      } else {
        setWorkoutForDay(selectedDay, { type });
      }

      // Notify parent if callback provided
      if (onDayPress) {
        onDayPress(selectedDay, type ? { type } : null);
      }
    }
    setShowTypeSelector(false);
    setSelectedDay(null);
  };

  const workoutTypes: (WorkoutType | null)[] = ['strength', 'speed', 'mobility', 'drills', null];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>THIS WEEK</Text>
        <Text style={styles.subtitle}>Tap to schedule</Text>
      </View>

      <View style={styles.calendar}>
        {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
          const workout = weekSchedule[dayOfWeek];
          const isToday = dayOfWeek === today;
          const typeInfo = workout ? getWorkoutTypeInfo(workout.type) : null;

          return (
            <TouchableOpacity
              key={dayOfWeek}
              style={[
                styles.dayColumn,
                isToday && styles.dayColumnToday,
              ]}
              onPress={() => handleDayPress(dayOfWeek)}
            >
              <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
                {getDayName(dayOfWeek, true)}
              </Text>

              <View style={[
                styles.dayCircle,
                isToday && styles.dayCircleToday,
                typeInfo && { backgroundColor: `${typeInfo.color}20` },
              ]}>
                {typeInfo ? (
                  <Ionicons
                    name={typeInfo.icon as any}
                    size={18}
                    color={typeInfo.color}
                  />
                ) : (
                  <Text style={styles.restText}>-</Text>
                )}
              </View>

              {typeInfo && (
                <Text style={[styles.typeLabel, { color: typeInfo.color }]}>
                  {typeInfo.label.slice(0, 3)}
                </Text>
              )}
              {!typeInfo && (
                <Text style={styles.restLabel}>Rest</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Workout Type Selector Modal */}
      <Modal
        visible={showTypeSelector}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTypeSelector(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeSelector(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedDay !== null ? getDayName(selectedDay) : ''}
            </Text>
            <Text style={styles.modalSubtitle}>Select workout type</Text>

            <View style={styles.typeOptions}>
              {workoutTypes.map((type) => {
                const info = type ? getWorkoutTypeInfo(type) : { label: 'Rest Day', color: '#666', icon: 'bed-outline' };
                const isSelected = selectedDay !== null &&
                  (type === null
                    ? weekSchedule[selectedDay] === null
                    : weekSchedule[selectedDay]?.type === type);

                return (
                  <TouchableOpacity
                    key={type || 'rest'}
                    style={[
                      styles.typeOption,
                      isSelected && styles.typeOptionSelected,
                      { borderColor: info.color },
                    ]}
                    onPress={() => handleSelectType(type)}
                  >
                    <Ionicons
                      name={info.icon as any}
                      size={24}
                      color={info.color}
                    />
                    <Text style={[styles.typeOptionLabel, { color: info.color }]}>
                      {info.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowTypeSelector(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  dayColumnToday: {
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
  },
  dayLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },
  dayLabelToday: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  restText: {
    fontSize: typography.fontSize.lg,
    color: colors.textMuted,
  },
  typeLabel: {
    fontSize: 9,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  restLabel: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  modalSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  typeOptions: {
    gap: spacing.md,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  typeOptionLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.md,
  },
  cancelButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
});
