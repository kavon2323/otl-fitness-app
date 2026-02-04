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
  const [selectedTypes, setSelectedTypes] = useState<WorkoutType[]>([]);

  const today = new Date().getDay(); // 0-6, Sunday = 0

  const handleDayPress = (dayOfWeek: number) => {
    setSelectedDay(dayOfWeek);
    // Initialize with current selections
    const currentWorkout = weekSchedule[dayOfWeek];
    setSelectedTypes(currentWorkout?.types || []);
    setShowTypeSelector(true);
  };

  const handleToggleType = (type: WorkoutType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        // Remove 'rest' if selecting an activity, or remove activities if selecting 'rest'
        if (type === 'rest') {
          return ['rest'];
        } else {
          return [...prev.filter((t) => t !== 'rest'), type];
        }
      }
    });
  };

  const handleSave = () => {
    if (selectedDay !== null) {
      if (selectedTypes.length === 0 || (selectedTypes.length === 1 && selectedTypes[0] === 'rest')) {
        setWorkoutForDay(selectedDay, null);
      } else {
        setWorkoutForDay(selectedDay, { types: selectedTypes.filter((t) => t !== 'rest') });
      }

      // Notify parent if callback provided
      if (onDayPress) {
        onDayPress(selectedDay, selectedTypes.length > 0 ? { types: selectedTypes } : null);
      }
    }
    setShowTypeSelector(false);
    setSelectedDay(null);
  };

  const workoutTypes: WorkoutType[] = ['strength', 'speed', 'mobility', 'drills', 'play', 'rest'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WEEKLY SCHEDULE</Text>
        <Text style={styles.subtitle}>Tap to schedule</Text>
      </View>

      <View style={styles.calendar}>
        {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
          const workout = weekSchedule[dayOfWeek];
          const isToday = dayOfWeek === today;
          const types = workout?.types || [];
          const primaryType = types[0];
          const typeInfo = primaryType ? getWorkoutTypeInfo(primaryType) : null;
          const hasMultiple = types.length > 1;

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
                {hasMultiple && (
                  <View style={styles.multiIndicator}>
                    <Text style={styles.multiIndicatorText}>+{types.length - 1}</Text>
                  </View>
                )}
              </View>

              {typeInfo && (
                <Text style={[styles.typeLabel, { color: typeInfo.color }]} numberOfLines={1}>
                  {hasMultiple ? 'Multi' : typeInfo.label.slice(0, 3)}
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
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>
              {selectedDay !== null ? getDayName(selectedDay) : ''}
            </Text>
            <Text style={styles.modalSubtitle}>Select workout types (multi-select)</Text>

            <View style={styles.typeOptions}>
              {workoutTypes.map((type) => {
                const info = getWorkoutTypeInfo(type);
                const isSelected = selectedTypes.includes(type);

                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeOption,
                      isSelected && styles.typeOptionSelected,
                      isSelected && { borderColor: info.color },
                    ]}
                    onPress={() => handleToggleType(type)}
                  >
                    <View style={[styles.checkbox, isSelected && { backgroundColor: info.color, borderColor: info.color }]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                    </View>
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

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowTypeSelector(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
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
    position: 'relative',
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  restText: {
    fontSize: typography.fontSize.lg,
    color: colors.textMuted,
  },
  multiIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiIndicatorText: {
    fontSize: 9,
    fontWeight: typography.fontWeight.bold,
    color: '#000',
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
    gap: spacing.sm,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  typeOptionLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
  },
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  saveButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  saveButtonText: {
    fontSize: typography.fontSize.base,
    color: '#000',
    fontWeight: typography.fontWeight.bold,
  },
});
