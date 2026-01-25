import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useCoachStore } from '../../store/coachStore';
import { getExerciseById, allExercises } from '../../data/exercises';
import { WorkoutSection, WorkoutExercise, ExerciseSet, Exercise } from '../../types';
import { colors } from '../../theme';

interface DayBuilderScreenProps {
  dayIndex: number;
  onBack: () => void;
  onViewExercise?: (exerciseId: string) => void;
}

export const DayBuilderScreen: React.FC<DayBuilderScreenProps> = ({
  dayIndex,
  onBack,
  onViewExercise,
}) => {
  const {
    programBuilder,
    updateDay,
    addSection,
    updateSection,
    removeSection,
    addExerciseToSection,
    updateExerciseInSection,
    removeExerciseFromSection,
    setSupersetGroup,
  } = useCoachStore();

  const day = programBuilder.days[dayIndex];

  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSupersetModal, setShowSupersetModal] = useState(false);
  const [supersetSectionIndex, setSupersetSectionIndex] = useState<number | null>(null);
  const [selectedForSuperset, setSelectedForSuperset] = useState<number[]>([]);

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;

    const section: WorkoutSection = {
      name: newSectionName.trim().toUpperCase(),
      exercises: [],
    };

    addSection(dayIndex, section);
    setNewSectionName('');
    setShowAddSection(false);
  };

  const handleAddExercise = (sectionIndex: number) => {
    setSelectedSectionIndex(sectionIndex);
    setSearchQuery('');
    setShowExercisePicker(true);
  };

  const handleSelectExercise = (exercise: Exercise) => {
    if (selectedSectionIndex === null) return;

    const section = day.sections[selectedSectionIndex];
    const existingCount = section.exercises.length;

    // Create default sets
    const defaultSets: ExerciseSet[] = Array.from({ length: 3 }, (_, i) => ({
      setNumber: i + 1,
      targetReps: '8-10',
      completed: false,
    }));

    const workoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      exerciseSlot: `${existingCount + 1}`,
      categorySlot: exercise.category,
      sets: defaultSets,
    };

    addExerciseToSection(dayIndex, selectedSectionIndex, workoutExercise);
    setShowExercisePicker(false);
    setSelectedSectionIndex(null);
  };

  const handleOpenSupersetModal = (sectionIndex: number) => {
    setSupersetSectionIndex(sectionIndex);
    setSelectedForSuperset([]);
    setShowSupersetModal(true);
  };

  const toggleExerciseForSuperset = (exerciseIndex: number) => {
    setSelectedForSuperset((prev) => {
      if (prev.includes(exerciseIndex)) {
        return prev.filter((i) => i !== exerciseIndex);
      }
      return [...prev, exerciseIndex];
    });
  };

  const handleCreateSuperset = () => {
    if (supersetSectionIndex === null || selectedForSuperset.length < 2) return;

    // Find the next available group ID
    const section = day.sections[supersetSectionIndex];
    const existingGroups = section.exercises
      .map((e) => e.supersetGroup)
      .filter(Boolean)
      .map((g) => parseInt(g || '0', 10));
    const nextGroupId = existingGroups.length > 0 ? Math.max(...existingGroups) + 1 : 1;

    // Update the slots to use letter notation (1A, 1B, etc.)
    const letters = ['A', 'B', 'C', 'D', 'E'];
    selectedForSuperset.forEach((exIndex, i) => {
      const exercise = section.exercises[exIndex];
      updateExerciseInSection(dayIndex, supersetSectionIndex, exIndex, {
        ...exercise,
        supersetGroup: String(nextGroupId),
        exerciseSlot: `${nextGroupId}${letters[i] || letters[0]}`,
      });
    });

    setShowSupersetModal(false);
    setSupersetSectionIndex(null);
    setSelectedForSuperset([]);
  };

  const filteredExercises = allExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Day {day.dayNumber}</Text>
        <TextInput
          style={styles.dayNameInput}
          placeholder="Day name (e.g., Upper Body)"
          placeholderTextColor="#666"
          value={day.name}
          onChangeText={(text) => updateDay(dayIndex, { ...day, name: text })}
        />
        <TextInput
          style={styles.focusInput}
          placeholder="Focus (e.g., Push emphasis)"
          placeholderTextColor="#666"
          value={day.focus || ''}
          onChangeText={(text) => updateDay(dayIndex, { ...day, focus: text })}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {day.sections.map((section, sectionIndex) => (
          <View key={`section-${sectionIndex}`} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionName}>{section.name}</Text>
              <View style={styles.sectionActions}>
                {section.exercises.length >= 2 && (
                  <TouchableOpacity
                    style={styles.supersetButton}
                    onPress={() => handleOpenSupersetModal(sectionIndex)}
                  >
                    <Text style={styles.supersetButtonText}>⚡ Superset</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => removeSection(dayIndex, sectionIndex)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {section.exercises.map((exercise, exerciseIndex) => {
              const exerciseData = getExerciseById(exercise.exerciseId);
              return (
                <View key={`ex-${exerciseIndex}`} style={styles.exerciseItem}>
                  <TouchableOpacity
                    style={styles.exerciseContent}
                    onPress={() => onViewExercise?.(exercise.exerciseId)}
                  >
                    <View style={styles.exerciseSlotBadge}>
                      <Text style={styles.exerciseSlotText}>{exercise.exerciseSlot}</Text>
                    </View>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>
                        {exerciseData?.name || 'Unknown Exercise'}
                      </Text>
                      <Text style={styles.exerciseSets}>
                        {exercise.sets.length} sets × {exercise.sets[0]?.targetReps || '?'}
                      </Text>
                      {exercise.supersetGroup && (
                        <View style={styles.supersetBadge}>
                          <Text style={styles.supersetBadgeText}>
                            Superset {exercise.supersetGroup}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      removeExerciseFromSection(dayIndex, sectionIndex, exerciseIndex)
                    }
                  >
                    <Text style={styles.removeExerciseText}>✕</Text>
                  </TouchableOpacity>
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.addExerciseButton}
              onPress={() => handleAddExercise(sectionIndex)}
            >
              <Text style={styles.addExerciseText}>+ Add Exercise</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Section Button */}
        {!showAddSection ? (
          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={() => setShowAddSection(true)}
          >
            <Text style={styles.addSectionText}>+ Add Section</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addSectionForm}>
            <TextInput
              style={styles.sectionInput}
              placeholder="Section name (e.g., STRENGTH)"
              placeholderTextColor="#666"
              value={newSectionName}
              onChangeText={setNewSectionName}
              autoFocus
            />
            <View style={styles.sectionFormButtons}>
              <TouchableOpacity
                style={styles.cancelFormButton}
                onPress={() => {
                  setShowAddSection(false);
                  setNewSectionName('');
                }}
              >
                <Text style={styles.cancelFormText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmFormButton} onPress={handleAddSection}>
                <Text style={styles.confirmFormText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Exercise Picker Modal */}
      <Modal
        visible={showExercisePicker}
        animationType="slide"
        onRequestClose={() => setShowExercisePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowExercisePicker(false)}>
              <Text style={styles.modalBackText}>← Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Exercise</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView style={styles.exerciseList}>
            {filteredExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.exercisePickerItem}
                onPress={() => handleSelectExercise(exercise)}
              >
                <Text style={styles.exercisePickerName}>{exercise.name}</Text>
                <Text style={styles.exercisePickerCategory}>{exercise.category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Superset Modal */}
      <Modal
        visible={showSupersetModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSupersetModal(false)}
      >
        <View style={styles.supersetModalOverlay}>
          <View style={styles.supersetModalContent}>
            <Text style={styles.supersetModalTitle}>Create Superset</Text>
            <Text style={styles.supersetModalSubtitle}>
              Select 2 or more exercises to group together
            </Text>

            {supersetSectionIndex !== null &&
              day.sections[supersetSectionIndex]?.exercises.map((exercise, i) => {
                const exerciseData = getExerciseById(exercise.exerciseId);
                const isSelected = selectedForSuperset.includes(i);
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.supersetExerciseItem,
                      isSelected && styles.supersetExerciseSelected,
                    ]}
                    onPress={() => toggleExerciseForSuperset(i)}
                  >
                    <View style={styles.supersetCheckbox}>
                      {isSelected && <Text style={styles.supersetCheckmark}>✓</Text>}
                    </View>
                    <Text style={styles.supersetExerciseName}>
                      {exerciseData?.name || 'Unknown'}
                    </Text>
                  </TouchableOpacity>
                );
              })}

            <View style={styles.supersetModalButtons}>
              <TouchableOpacity
                style={styles.supersetCancelButton}
                onPress={() => setShowSupersetModal(false)}
              >
                <Text style={styles.supersetCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.supersetConfirmButton,
                  selectedForSuperset.length < 2 && styles.supersetConfirmDisabled,
                ]}
                onPress={handleCreateSuperset}
                disabled={selectedForSuperset.length < 2}
              >
                <Text style={styles.supersetConfirmText}>Create Superset</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
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
    marginBottom: 12,
  },
  dayNameInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  focusInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supersetButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  supersetButtonText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    color: '#F44336',
    fontSize: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  exerciseContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseSlotBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  exerciseSlotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  exerciseSets: {
    fontSize: 12,
    color: '#888',
  },
  supersetBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  supersetBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  removeExerciseText: {
    color: '#666',
    fontSize: 14,
    padding: 8,
  },
  addExerciseButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addExerciseText: {
    color: colors.primary,
    fontSize: 14,
  },
  addSectionButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  addSectionText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  addSectionForm: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  sectionInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  sectionFormButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelFormButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
  },
  cancelFormText: {
    color: '#888',
    fontSize: 14,
  },
  confirmFormButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  confirmFormText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  modalBackText: {
    color: colors.primary,
    fontSize: 16,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    margin: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exercisePickerItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  exercisePickerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  exercisePickerCategory: {
    fontSize: 13,
    color: '#888',
    textTransform: 'capitalize',
  },
  supersetModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  supersetModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  supersetModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  supersetModalSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  supersetExerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  supersetExerciseSelected: {
    borderColor: '#FF9800',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  supersetCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supersetCheckmark: {
    color: '#FF9800',
    fontWeight: 'bold',
    fontSize: 14,
  },
  supersetExerciseName: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  supersetModalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  supersetCancelButton: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },
  supersetCancelText: {
    color: '#888',
    fontSize: 14,
  },
  supersetConfirmButton: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 8,
  },
  supersetConfirmDisabled: {
    opacity: 0.5,
  },
  supersetConfirmText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
