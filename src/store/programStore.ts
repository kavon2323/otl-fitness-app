import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, UserExerciseSelection, WorkoutExercise } from '../types';
import { allPrograms, getProgramById } from '../data/programs';
import { defaultExercises, getExerciseById } from '../data/exercises';

interface ProgramState {
  // Current active program
  currentProgramId: string | null;
  currentWeek: number;

  // User's exercise selections per program
  // Key is now programId + exerciseSlot (e.g., "A1", "1A") instead of categorySlot
  exerciseSelections: UserExerciseSelection[];

  // Actions
  setCurrentProgram: (programId: string) => void;
  setCurrentWeek: (week: number) => void;
  setExerciseSelection: (
    programId: string,
    exerciseSlot: string,
    categorySlot: string,
    exerciseId: string
  ) => void;
  getExerciseForSlot: (programId: string, exerciseSlot: string, categorySlot: string) => string;
  getCurrentProgram: () => Program | undefined;
  resetProgram: () => void;
  initializeDefaultSelections: (programId: string) => void;
}

export const useProgramStore = create<ProgramState>()(
  persist(
    (set, get) => ({
      currentProgramId: null,
      currentWeek: 1,
      exerciseSelections: [],

      setCurrentProgram: (programId: string) => {
        set({ currentProgramId: programId });
        // Initialize default selections if none exist for this program
        get().initializeDefaultSelections(programId);
      },

      setCurrentWeek: (week: number) => {
        set({ currentWeek: week });
      },

      setExerciseSelection: (
        programId: string,
        exerciseSlot: string,
        categorySlot: string,
        exerciseId: string
      ) => {
        // Use exerciseSlot as the unique key for each exercise position
        const slotKey = `${exerciseSlot}`;

        set((state) => {
          const existingIndex = state.exerciseSelections.findIndex(
            (sel) =>
              sel.programId === programId && sel.categorySlot === slotKey
          );

          const newSelection: UserExerciseSelection = {
            programId,
            categorySlot: slotKey, // Store exerciseSlot in categorySlot field for backward compatibility
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

      getExerciseForSlot: (programId: string, exerciseSlot: string, categorySlot: string) => {
        // First try to find by exerciseSlot (new way)
        const selection = get().exerciseSelections.find(
          (sel) =>
            sel.programId === programId && sel.categorySlot === exerciseSlot
        );

        if (selection) {
          return selection.selectedExerciseId;
        }

        // Return default exercise for this category
        return defaultExercises[categorySlot] || '';
      },

      getCurrentProgram: () => {
        const { currentProgramId } = get();
        if (!currentProgramId) return undefined;
        return getProgramById(currentProgramId);
      },

      resetProgram: () => {
        set({
          currentProgramId: null,
          currentWeek: 1,
        });
      },

      initializeDefaultSelections: (programId: string) => {
        const program = getProgramById(programId);
        if (!program) return;

        const existingSelections = get().exerciseSelections.filter(
          (sel) => sel.programId === programId
        );

        // Collect all exercise slots from the program
        const newSelections: UserExerciseSelection[] = [];

        program.days.forEach((day) => {
          day.sections.forEach((section) => {
            section.exercises.forEach((exercise) => {
              const slotKey = exercise.exerciseSlot;
              const hasSelection = existingSelections.some(
                (sel) => sel.categorySlot === slotKey
              );

              if (!hasSelection && defaultExercises[exercise.categorySlot]) {
                newSelections.push({
                  programId,
                  categorySlot: slotKey, // Use exerciseSlot as key
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
  getExerciseForSlot: (programId: string, exerciseSlot: string, categorySlot: string) => string
): Program['days'][0] | undefined => {
  const day = program.days.find((d) => d.dayNumber === dayNumber);
  if (!day) return undefined;

  return {
    ...day,
    sections: day.sections.map((section) => ({
      ...section,
      exercises: section.exercises.map((exercise) => ({
        ...exercise,
        exerciseId: getExerciseForSlot(program.id, exercise.exerciseSlot, exercise.categorySlot),
      })),
    })),
  };
};
