import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Program, Exercise, ExerciseCategory, WorkoutDay, WorkoutExercise } from '../types';
import { useProgramStore } from '../store/programStore';
import { exercises, getExerciseById, defaultExercises } from '../data/exercises';
import { colors } from '../theme';

interface ExerciseSelectionScreenProps {
  program: Program;
  onComplete: () => void;
  onBack: () => void;
}

interface ExerciseSlotInfo {
  exerciseSlot: string; // e.g., "A1", "A2", "1A", "1B"
  categorySlot: string; // e.g., "PREP", "PRIMARY_SQUAT"
  displayName: string;
  availableExercises: Exercise[];
}

// Map category slots to exercise categories for filtering
const slotToCategoryMap: Record<string, ExerciseCategory[]> = {
  'PREP': ['prep'],
  'SPEED_PREP': ['prep', 'sprint'],
  'DYNAMIC_WARMUP': ['prep', 'sprint'],
  'MOBILITY': ['prep', 'prehab'],
  'PRIMARY_SQUAT': ['squat'],
  'ACCESSORY_SQUAT': ['squat'],
  'PRIMARY_HINGE': ['hinge'],
  'SINGLE_LEG_HINGE': ['hinge'],
  'ACCESSORY_HINGE': ['hinge'],
  'PRIMARY_LUNGE': ['lunge'],
  'LATERAL_LUNGE': ['lunge'],
  'LUNGE': ['lunge'],
  'PRIMARY_PRESS': ['press'],
  'SECONDARY_PRESS': ['press'],
  'VERTICAL_PRESS': ['press'],
  'HORIZONTAL_PRESS': ['press'],
  'SINGLE_ARM_PRESS': ['press'],
  'ACCESSORY_PRESS': ['press'],
  'ROTATIONAL_PRESS': ['press'],
  'PRIMARY_PULL': ['pull'],
  'HORIZONTAL_PULL': ['pull'],
  'VERTICAL_PULL': ['pull'],
  'SINGLE_ARM_VERTICAL_PULL': ['pull'],
  'ACCESSORY_PULL': ['pull'],
  'CORE_VARIATION': ['core'],
  'ISO_HOLD': ['core'],
  'STABILIZATION_CORE': ['core'],
  'WEIGHTED_CORE': ['core'],
  'ENERGY_SYSTEM': ['energy_system'],
  'SPRINT': ['sprint'],
  'CONDITIONING': ['sprint', 'energy_system'],
  'PLYOMETRIC': ['prep', 'sprint'],
  'LOADED_CARRY': ['core'],
  'BW_SQUAT': ['squat'],
  'BW_PRESS': ['press'],
  'BW_LUNGE': ['lunge'],
};

const formatCategoryName = (category: string): string => {
  return category
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export const ExerciseSelectionScreen: React.FC<ExerciseSelectionScreenProps> = ({
  program,
  onComplete,
  onBack,
}) => {
  const { setExerciseSelection, getExerciseForSlot, setCurrentProgram } = useProgramStore();
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ExerciseSlotInfo | null>(null);

  // Get exercise slot info from a workout exercise
  const getSlotInfo = (exercise: WorkoutExercise): ExerciseSlotInfo => {
    const categories = slotToCategoryMap[exercise.categorySlot] || ['prep'];
    const filteredExercises = exercises.filter((ex) =>
      categories.includes(ex.category)
    );

    return {
      exerciseSlot: exercise.exerciseSlot,
      categorySlot: exercise.categorySlot,
      displayName: formatCategoryName(exercise.categorySlot),
      availableExercises: filteredExercises,
    };
  };

  // Count how many exercises are selected for a day
  const getSelectedCountForDay = (day: WorkoutDay): { selected: number; total: number } => {
    let total = 0;
    let selected = 0;

    day.sections.forEach((section) => {
      section.exercises.forEach((exercise) => {
        total++;
        const exerciseId = getExerciseForSlot(program.id, exercise.exerciseSlot, exercise.categorySlot);
        if (exerciseId) selected++;
      });
    });

    return { selected, total };
  };

  const handleSelectExercise = (exerciseId: string) => {
    if (selectedSlot) {
      setExerciseSelection(program.id, selectedSlot.exerciseSlot, selectedSlot.categorySlot, exerciseId);
      setExerciseModalVisible(false);
      setSelectedSlot(null);
    }
  };

  const handleComplete = () => {
    setCurrentProgram(program.id);
    onComplete();
  };

  const renderExerciseOption = ({ item }: { item: Exercise }) => {
    const isSelected = selectedSlot &&
      getExerciseForSlot(program.id, selectedSlot.exerciseSlot, selectedSlot.categorySlot) === item.id;
    const isDefault = selectedSlot && defaultExercises[selectedSlot.categorySlot] === item.id;

    return (
      <TouchableOpacity
        style={[styles.exerciseOption, isSelected && styles.exerciseOptionSelected]}
        onPress={() => handleSelectExercise(item.id)}
      >
        <View style={styles.exerciseOptionContent}>
          <Text style={[styles.exerciseOptionName, isSelected && styles.exerciseOptionNameSelected]}>
            {item.name}
          </Text>
          {isDefault && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Suggested</Text>
            </View>
          )}
        </View>
        <Text style={styles.exerciseOptionCategory}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  // Main view - show workout days
  if (!selectedDay) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Your Exercises</Text>
          <Text style={styles.programName}>{program.name}</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Choose a workout day to customize your exercise selections. Suggested exercises are pre-selected.
          </Text>

          {program.days.map((day) => {
            const { selected, total } = getSelectedCountForDay(day);
            const isComplete = selected === total;

            return (
              <TouchableOpacity
                key={day.id}
                style={styles.dayCard}
                onPress={() => setSelectedDay(day)}
              >
                <View style={styles.dayHeader}>
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayBadgeText}>Day {day.dayNumber}</Text>
                  </View>
                  {isComplete && (
                    <View style={styles.completeBadge}>
                      <Text style={styles.completeBadgeText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.dayName}>{day.name}</Text>
                {day.focus && <Text style={styles.dayFocus}>{day.focus}</Text>}
                <View style={styles.dayFooter}>
                  <Text style={styles.exerciseCount}>
                    {total} exercises
                  </Text>
                  <Text style={styles.customizeText}>Customize →</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Start Program</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Day detail view - show exercises for selected day
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedDay(null)} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Workouts</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Day {selectedDay.dayNumber}</Text>
        <Text style={styles.programName}>{selectedDay.name}</Text>
        {selectedDay.focus && <Text style={styles.focusText}>{selectedDay.focus}</Text>}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Tap any exercise to change your selection. Suggested exercises are marked.
        </Text>

        {selectedDay.sections.map((section, sectionIndex) => (
          <View key={`${section.name}-${sectionIndex}`} style={styles.sectionContainer}>
            <Text style={styles.sectionName}>{section.name}</Text>

            {section.exercises.map((exercise, exerciseIndex) => {
              const slotInfo = getSlotInfo(exercise);
              const selectedExerciseId = getExerciseForSlot(
                program.id,
                exercise.exerciseSlot,
                exercise.categorySlot
              );
              const selectedExercise = getExerciseById(selectedExerciseId);
              const isDefault = defaultExercises[exercise.categorySlot] === selectedExerciseId;

              return (
                <TouchableOpacity
                  key={`${exercise.exerciseSlot}-${exerciseIndex}`}
                  style={styles.slotCard}
                  onPress={() => {
                    setSelectedSlot(slotInfo);
                    setExerciseModalVisible(true);
                  }}
                >
                  <View style={styles.slotHeader}>
                    <View style={styles.slotLabelRow}>
                      <View style={styles.slotBadge}>
                        <Text style={styles.slotBadgeText}>{exercise.exerciseSlot}</Text>
                      </View>
                      <Text style={styles.slotName}>{slotInfo.displayName}</Text>
                    </View>
                    <Text style={styles.changeText}>Change →</Text>
                  </View>
                  <View style={styles.selectedExerciseRow}>
                    <Text style={styles.selectedExercise}>
                      {selectedExercise?.name || 'Select an exercise'}
                    </Text>
                    {isDefault && selectedExercise && (
                      <View style={styles.suggestedTag}>
                        <Text style={styles.suggestedTagText}>Suggested</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => setSelectedDay(null)}
        >
          <Text style={styles.doneButtonText}>Save & Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Exercise Selection Modal */}
      <Modal
        visible={exerciseModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setExerciseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>{selectedSlot?.displayName}</Text>
              <Text style={styles.modalSlotLabel}>Slot {selectedSlot?.exerciseSlot}</Text>
            </View>
            <TouchableOpacity onPress={() => setExerciseModalVisible(false)}>
              <Text style={styles.modalClose}>Done</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>
            {selectedSlot?.availableExercises.length || 0} exercises available
          </Text>

          <FlatList
            data={selectedSlot?.availableExercises || []}
            renderItem={renderExerciseOption}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.exerciseList}
          />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  programName: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  focusText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
    lineHeight: 20,
  },
  // Day cards
  dayCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dayBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  completeBadge: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dayName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  dayFocus: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  dayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
    marginTop: 8,
  },
  exerciseCount: {
    fontSize: 12,
    color: '#666',
  },
  customizeText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  // Section styles
  sectionContainer: {
    marginBottom: 24,
  },
  sectionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 1,
  },
  // Slot cards
  slotCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slotLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slotBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  slotBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  slotName: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  changeText: {
    fontSize: 14,
    color: colors.primary,
  },
  selectedExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedExercise: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  suggestedTag: {
    backgroundColor: '#2d4a2d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  suggestedTagText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '600',
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
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  modalSlotLabel: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  modalClose: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  exerciseList: {
    padding: 20,
    paddingTop: 8,
  },
  exerciseOption: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#1a3a1a',
  },
  exerciseOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  exerciseOptionName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  exerciseOptionNameSelected: {
    color: colors.primary,
  },
  recommendedBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  exerciseOptionCategory: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
});
