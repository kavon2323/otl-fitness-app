import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EquipmentId, WorkoutType, GeneratedWorkout, Program } from '../types';
import { generateWorkout, convertToProgram } from '../utils/workoutGenerator';

interface GeneratorState {
  // Selection state
  selectedEquipment: EquipmentId[];
  selectedWorkoutType: WorkoutType;
  selectedDuration: number; // minutes

  // Generation tracking
  generationCount: number;
  showFeedbackModal: boolean;
  currentWorkout: GeneratedWorkout | null;

  // Saved custom programs from generator
  customPrograms: Program[];

  // Actions - Selection
  setSelectedEquipment: (equipment: EquipmentId[]) => void;
  toggleEquipment: (equipmentId: EquipmentId) => void;
  setWorkoutType: (type: WorkoutType) => void;
  setDuration: (minutes: number) => void;

  // Actions - Generation
  generate: () => GeneratedWorkout;
  regenerate: () => GeneratedWorkout | null; // Returns null if feedback needed
  clearCurrentWorkout: () => void;

  // Actions - Feedback
  dismissFeedback: () => void;
  submitFeedback: (feedback: string) => void;

  // Actions - Save
  saveToPrograms: () => Program | null;
  deleteCustomProgram: (programId: string) => void;

  // Actions - Reset
  resetGenerator: () => void;
}

export const useGeneratorStore = create<GeneratorState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedEquipment: ['bodyweight'],
      selectedWorkoutType: 'full_body',
      selectedDuration: 30,
      generationCount: 0,
      showFeedbackModal: false,
      currentWorkout: null,
      customPrograms: [],

      // Selection actions
      setSelectedEquipment: (equipment) => set({ selectedEquipment: equipment }),

      toggleEquipment: (equipmentId) => {
        const current = get().selectedEquipment;

        // Special handling for "full_gym" - it's exclusive
        if (equipmentId === 'full_gym') {
          if (current.includes('full_gym')) {
            set({ selectedEquipment: ['bodyweight'] });
          } else {
            set({ selectedEquipment: ['full_gym'] });
          }
          return;
        }

        // Remove full_gym if selecting individual equipment
        const withoutFullGym = current.filter((id) => id !== 'full_gym');

        if (withoutFullGym.includes(equipmentId)) {
          // Remove equipment
          const newEquipment = withoutFullGym.filter((id) => id !== equipmentId);
          // Always keep at least bodyweight
          set({
            selectedEquipment: newEquipment.length > 0 ? newEquipment : ['bodyweight'],
          });
        } else {
          // Add equipment
          set({ selectedEquipment: [...withoutFullGym, equipmentId] });
        }
      },

      setWorkoutType: (type) => set({ selectedWorkoutType: type }),

      setDuration: (minutes) => set({ selectedDuration: minutes }),

      // Generation actions
      generate: () => {
        const { selectedEquipment, selectedWorkoutType, selectedDuration } = get();
        const workout = generateWorkout(selectedWorkoutType, selectedEquipment, selectedDuration);
        set({
          currentWorkout: workout,
          generationCount: 1,
        });
        return workout;
      },

      regenerate: () => {
        const { generationCount, selectedEquipment, selectedWorkoutType, selectedDuration } = get();

        // Check if we've hit the limit (4 regenerations, 5th attempt shows feedback)
        if (generationCount >= 4) {
          set({ showFeedbackModal: true });
          return null;
        }

        const workout = generateWorkout(selectedWorkoutType, selectedEquipment, selectedDuration);
        set({
          currentWorkout: workout,
          generationCount: generationCount + 1,
        });
        return workout;
      },

      clearCurrentWorkout: () => set({ currentWorkout: null }),

      // Feedback actions
      dismissFeedback: () => set({ showFeedbackModal: false }),

      submitFeedback: (feedback) => {
        // In a real app, this would send to analytics/backend
        console.log('Generator feedback:', feedback);
        set({
          showFeedbackModal: false,
          generationCount: 0, // Reset count after feedback
        });
      },

      // Save actions
      saveToPrograms: () => {
        const { currentWorkout, customPrograms } = get();
        if (!currentWorkout) return null;

        const program = convertToProgram(currentWorkout) as Program;
        set({
          customPrograms: [...customPrograms, program],
          currentWorkout: null,
          generationCount: 0,
        });
        return program;
      },

      deleteCustomProgram: (programId) => {
        const { customPrograms } = get();
        set({
          customPrograms: customPrograms.filter((p) => p.id !== programId),
        });
      },

      // Reset
      resetGenerator: () =>
        set({
          selectedEquipment: ['bodyweight'],
          selectedWorkoutType: 'full_body',
          selectedDuration: 30,
          generationCount: 0,
          showFeedbackModal: false,
          currentWorkout: null,
        }),
    }),
    {
      name: 'otl-generator-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist custom programs, not generation state
        customPrograms: state.customPrograms,
        // Optionally persist last selections
        selectedEquipment: state.selectedEquipment,
        selectedWorkoutType: state.selectedWorkoutType,
        selectedDuration: state.selectedDuration,
      }),
    }
  )
);
