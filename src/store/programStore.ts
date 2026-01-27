import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, UserExerciseSelection, WorkoutExercise, ProgramType } from '../types';
import { allPrograms, getProgramById } from '../data/programs';
import { defaultExercises, getExerciseById } from './exerciseStore';

interface ProgramState {
  // Current active programs (one per type)
  currentProgramId: string | null; // Strength program (legacy, kept for backward compatibility)
  currentMobilityProgramId: string | null; // Mobility program
  currentWeek: number;
  currentMobilityWeek: number;

  // User's exercise selections per program
  // Key is now programId + exerciseSlot (e.g., "A1", "1A") instead of categorySlot
  exerciseSelections: UserExerciseSelection[];

  // Actions
  setCurrentProgram: (programId: string, programType?: ProgramType) => void;
  setCurrentWeek: (week: number, programType?: ProgramType) => void;
  setExerciseSelection: (
    programId: string,
    dayNumber: number,
    exerciseSlot: string,
    categorySlot: string,
    exerciseId: string
  ) => void;
  getExerciseForSlot: (programId: string, dayNumber: number, exerciseSlot: string, categorySlot: string) => string;
  getCurrentProgram: (programType?: ProgramType) => Program | undefined;
  resetProgram: (programType?: ProgramType) => void;
  clearAll: () => void; // Clear all data (for logout)
  initializeDefaultSelections: (programId: string) => void;
}

export const useProgramStore = create<ProgramState>()(
  persist(
    (set, get) => ({
      currentProgramId: null,
      currentMobilityProgramId: null,
      currentWeek: 1,
      currentMobilityWeek: 1,
      exerciseSelections: [],

      setCurrentProgram: (programId: string, programType: ProgramType = 'strength') => {
        if (programType === 'mobility') {
          set({ currentMobilityProgramId: programId });
        } else {
          set({ currentProgramId: programId });
        }
        // Initialize default selections if none exist for this program
        get().initializeDefaultSelections(programId);
      },

      setCurrentWeek: (week: number, programType: ProgramType = 'strength') => {
        if (programType === 'mobility') {
          set({ currentMobilityWeek: week });
        } else {
          set({ currentWeek: week });
        }
      },

      setExerciseSelection: (
        programId: string,
        dayNumber: number,
        exerciseSlot: string,
        categorySlot: string,
        exerciseId: string
      ) => {
        // Include dayNumber in the key to ensure each day has unique selections
        const slotKey = `day${dayNumber}-${exerciseSlot}`;

        set((state) => {
          const existingIndex = state.exerciseSelections.findIndex(
            (sel) =>
              sel.programId === programId && sel.categorySlot === slotKey
          );

          const newSelection: UserExerciseSelection = {
            programId,
            categorySlot: slotKey,
            selectedExerciseId: exerciseId,
          };

          if (existingIndex >= 0) {
            const updated = [...state.exerciseSelections];
            updated[existingIndex] = newSelection;
            return { exerciseSelections: updated };
          }

          return {
            exerciseSelections: [...state.exerciseSelections, newSelection],
          };
        });
      },

      getExerciseForSlot: (programId: string, dayNumber: number, exerciseSlot: string, categorySlot: string) => {
        // Include dayNumber in the lookup key
        const slotKey = `day${dayNumber}-${exerciseSlot}`;

        const selection = get().exerciseSelections.find(
          (sel) =>
            sel.programId === programId && sel.categorySlot === slotKey
        );

        if (selection) {
          return selection.selectedExerciseId;
        }

        // Return default exercise for this category
        return defaultExercises[categorySlot] || '';
      },

      getCurrentProgram: (programType: ProgramType = 'strength') => {
        const { currentProgramId, currentMobilityProgramId } = get();
        const programId = programType === 'mobility' ? currentMobilityProgramId : currentProgramId;
        if (!programId) return undefined;
        return getProgramById(programId);
      },

      resetProgram: (programType?: ProgramType) => {
        if (programType === 'mobility') {
          set({
            currentMobilityProgramId: null,
            currentMobilityWeek: 1,
          });
        } else if (programType === 'strength') {
          set({
            currentProgramId: null,
            currentWeek: 1,
          });
        } else {
          // Reset both if no type specified
          set({
            currentProgramId: null,
            currentMobilityProgramId: null,
            currentWeek: 1,
            currentMobilityWeek: 1,
          });
        }
      },

      clearAll: () => {
        // Clear all state (used on logout to prevent data leaking to next user)
        set({
          currentProgramId: null,
          currentMobilityProgramId: null,
          currentWeek: 1,
          currentMobilityWeek: 1,
          exerciseSelections: [],
        });
      },

      initializeDefaultSelections: (programId: string) => {
        const program = getProgramById(programId);
        if (!program) return;

        const existingSelections = get().exerciseSelections.filter(
          (sel) => sel.programId === programId
        );

        // Collect all exercise slots from the program, with day-specific keys
        const newSelections: UserExerciseSelection[] = [];

        program.days.forEach((day) => {
          day.sections.forEach((section) => {
            section.exercises.forEach((exercise) => {
              // Include dayNumber in the key so each day has unique selections
              const slotKey = `day${day.dayNumber}-${exercise.exerciseSlot}`;
              const hasSelection = existingSelections.some(
                (sel) => sel.categorySlot === slotKey
              );

              if (!hasSelection && defaultExercises[exercise.categorySlot]) {
                newSelections.push({
                  programId,
                  categorySlot: slotKey,
                  selectedExerciseId: defaultExercises[exercise.categorySlot],
                });
              }
            });
          });
        });

        if (newSelections.length > 0) {
          set((state) => ({
            exerciseSelections: [...state.exerciseSelections, ...newSelections],
          }));
        }
      },
    }),
    {
      name: 'otl-program-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper function to get exercises for a workout with user selections applied
export const getWorkoutWithSelections = (
  program: Program,
  dayNumber: number,
  getExerciseForSlot: (programId: string, dayNumber: number, exerciseSlot: string, categorySlot: string) => string
): Program['days'][0] | undefined => {
  const day = program.days.find((d) => d.dayNumber === dayNumber);
  if (!day) return undefined;

  return {
    ...day,
    sections: day.sections.map((section) => ({
      ...section,
      exercises: section.exercises.map((exercise) => ({
        ...exercise,
        exerciseId: getExerciseForSlot(program.id, dayNumber, exercise.exerciseSlot, exercise.categorySlot),
      })),
    })),
  };
};
