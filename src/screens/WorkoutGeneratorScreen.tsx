import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useGeneratorStore } from '../store/generatorStore';
import { EQUIPMENT_OPTIONS, WORKOUT_TYPE_OPTIONS } from '../utils/workoutGenerator';
import { EquipmentId, WorkoutType, GeneratedWorkout } from '../types';
import { getExerciseById } from '../data/exercises';
import { colors } from '../theme';

interface WorkoutGeneratorScreenProps {
  onBack: () => void;
  onStartWorkout: (workout: GeneratedWorkout) => void;
  onViewExercise: (exerciseId: string) => void;
}

export const WorkoutGeneratorScreen: React.FC<WorkoutGeneratorScreenProps> = ({
  onBack,
  onStartWorkout,
  onViewExercise,
}) => {
  const {
    selectedEquipment,
    selectedWorkoutType,
    selectedDuration,
    currentWorkout,
    showFeedbackModal,
    generationCount,
    toggleEquipment,
    setWorkoutType,
    setDuration,
    generate,
    regenerate,
    saveToPrograms,
    dismissFeedback,
    submitFeedback,
    clearCurrentWorkout,
  } = useGeneratorStore();

  const [feedbackText, setFeedbackText] = useState('');

  const handleGenerate = () => {
    if (currentWorkout) {
      regenerate();
    } else {
      generate();
    }
  };

  const handleSaveToPrograms = () => {
    const saved = saveToPrograms();
    if (saved) {
      onBack();
    }
  };

  const handleStartWorkout = () => {
    if (currentWorkout) {
      onStartWorkout(currentWorkout);
    }
  };

  const handleSubmitFeedback = () => {
    submitFeedback(feedbackText);
    setFeedbackText('');
  };

  const handleBackPress = () => {
    clearCurrentWorkout();
    onBack();
  };

  // Render equipment selector
  const renderEquipmentSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Available Equipment</Text>
      <Text style={styles.sectionSubtitle}>Select all equipment you have access to</Text>
      <View style={styles.equipmentGrid}>
        {EQUIPMENT_OPTIONS.map((option) => {
          const isSelected = selectedEquipment.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.equipmentChip, isSelected && styles.equipmentChipSelected]}
              onPress={() => toggleEquipment(option.id)}
            >
              <Text style={[styles.equipmentChipText, isSelected && styles.equipmentChipTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render workout type selector
  const renderWorkoutTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Workout Type</Text>
      <View style={styles.typeGrid}>
        {WORKOUT_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedWorkoutType === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.typeCard, isSelected && styles.typeCardSelected]}
              onPress={() => setWorkoutType(option.id)}
            >
              <Text style={styles.typeIcon}>{option.icon}</Text>
              <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render duration slider
  const renderDurationSlider = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Workout Duration</Text>
      <View style={styles.durationContainer}>
        <Text style={styles.durationValue}>{selectedDuration} minutes</Text>
        <Slider
          style={styles.slider}
          minimumValue={7}
          maximumValue={90}
          step={1}
          value={selectedDuration}
          onValueChange={setDuration}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#333"
          thumbTintColor={colors.primary}
        />
        <View style={styles.durationLabels}>
          <Text style={styles.durationLabel}>7 min</Text>
          <Text style={styles.durationLabel}>90 min</Text>
        </View>
      </View>
    </View>
  );

  // Render generated workout preview
  const renderWorkoutPreview = () => {
    if (!currentWorkout) return null;

    return (
      <View style={styles.previewSection}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>{currentWorkout.name}</Text>
          <Text style={styles.previewSubtitle}>
            {currentWorkout.durationMinutes} min • {currentWorkout.day.sections.reduce(
              (acc, s) => acc + s.exercises.length,
              0
            )} exercises
          </Text>
        </View>

        {currentWorkout.day.sections.map((section, sectionIndex) => (
          <View key={`${section.name}-${sectionIndex}`} style={styles.previewSectionGroup}>
            <Text style={styles.previewSectionName}>{section.name}</Text>
            {section.exercises.map((exercise, exerciseIndex) => {
              const exerciseData = getExerciseById(exercise.exerciseId);
              return (
                <TouchableOpacity
                  key={`${exercise.exerciseSlot}-${exerciseIndex}`}
                  style={styles.previewExercise}
                  onPress={() => onViewExercise(exercise.exerciseId)}
                >
                  <View style={styles.previewSlotBadge}>
                    <Text style={styles.previewSlotText}>{exercise.exerciseSlot}</Text>
                  </View>
                  <View style={styles.previewExerciseInfo}>
                    <Text style={styles.previewExerciseName}>
                      {exerciseData?.name || exercise.exerciseId}
                    </Text>
                    <Text style={styles.previewExerciseDetails}>
                      {exercise.sets.length} × {exercise.sets[0]?.targetReps}
                      {exercise.isPerSide ? ' per side' : ''}
                    </Text>
                  </View>
                  {exercise.supersetGroup && (
                    <View style={styles.supersetBadge}>
                      <Text style={styles.supersetBadgeText}>SS</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.actionButtonPrimary} onPress={handleStartWorkout}>
            <Text style={styles.actionButtonPrimaryText}>Do This Workout</Text>
          </TouchableOpacity>

          <View style={styles.actionButtonRow}>
            <TouchableOpacity style={styles.actionButtonSecondary} onPress={handleSaveToPrograms}>
              <Text style={styles.actionButtonSecondaryText}>Save to Programs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButtonSecondary} onPress={handleGenerate}>
              <Text style={styles.actionButtonSecondaryText}>Generate New</Text>
            </TouchableOpacity>
          </View>

          {generationCount > 0 && (
            <Text style={styles.generationCount}>
              Generation {generationCount} of 4
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Generator</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentWorkout ? (
          renderWorkoutPreview()
        ) : (
          <>
            {renderEquipmentSelector()}
            {renderWorkoutTypeSelector()}
            {renderDurationSlider()}

            <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
              <Text style={styles.generateButtonText}>Generate Workout</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedbackModal}
        transparent
        animationType="fade"
        onRequestClose={dismissFeedback}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Help Us Improve</Text>
            <Text style={styles.modalText}>
              Sorry, we're still working on this feature. Can you please tell us why the previous
              options didn't meet your expectations?
            </Text>

            <TextInput
              style={styles.feedbackInput}
              multiline
              numberOfLines={4}
              placeholder="Your feedback helps us improve..."
              placeholderTextColor="#666"
              value={feedbackText}
              onChangeText={setFeedbackText}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonSecondary} onPress={dismissFeedback}>
                <Text style={styles.modalButtonSecondaryText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButtonPrimary, !feedbackText && styles.modalButtonDisabled]}
                onPress={handleSubmitFeedback}
                disabled={!feedbackText}
              >
                <Text style={styles.modalButtonPrimaryText}>Submit</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipmentChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
  },
  equipmentChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  equipmentChipText: {
    fontSize: 14,
    color: '#888',
  },
  equipmentChipTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#1a3d1a',
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  typeLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  durationContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  durationValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  durationLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  durationLabel: {
    fontSize: 12,
    color: '#666',
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Preview styles
  previewSection: {
    flex: 1,
  },
  previewHeader: {
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  previewSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  previewSectionGroup: {
    marginBottom: 20,
  },
  previewSectionName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 12,
  },
  previewExercise: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  previewSlotBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  previewSlotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  previewExerciseInfo: {
    flex: 1,
  },
  previewExerciseName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  previewExerciseDetails: {
    fontSize: 12,
    color: '#888',
  },
  supersetBadge: {
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  supersetBadgeText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  previewActions: {
    marginTop: 24,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonPrimaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  actionButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  actionButtonSecondaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  generationCount: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 16,
  },
  bottomPadding: {
    height: 40,
  },
  // Modal styles
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
    marginBottom: 16,
  },
  feedbackInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
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
  modalButtonDisabled: {
    backgroundColor: '#333',
  },
  modalButtonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
