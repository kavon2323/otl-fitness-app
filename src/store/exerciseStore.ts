import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Exercise, ExerciseCategory } from '../types';
import { exercisesStore } from '../data/exercisesStore';
import { defaultExercises } from '../data/exercises';

interface CustomExerciseRow {
  id: string;
  coach_id: string;
  name: string;
  category: ExerciseCategory;
  description: string | null;
  video_url: string | null;
  primary_muscles: string[] | null;
  secondary_muscles: string[] | null;
  equipment: string[] | null;
  tips: string[] | null;
  created_at: string;
  updated_at: string;
}

interface ExerciseState {
  // All exercises (local + custom)
  exercises: Exercise[];
  // Just the custom exercises from Supabase
  customExercises: Exercise[];
  // Loading state
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  // Last fetch timestamp
  lastFetched: number | null;

  // Actions
  initialize: () => Promise<void>;
  refresh: () => Promise<void>;

  // Helper functions (these work with the merged exercises)
  getExerciseById: (id: string) => Exercise | undefined;
  getExercisesByCategory: (category: ExerciseCategory) => Exercise[];
  getCategories: () => ExerciseCategory[];
}

// Convert Supabase row to Exercise type
const mapCustomExercise = (row: CustomExerciseRow): Exercise => ({
  id: row.id,
  name: row.name,
  category: row.category,
  description: row.description || '',
  videoUrl: row.video_url || undefined,
  musclesTargeted: {
    primary: row.primary_muscles || [],
    secondary: row.secondary_muscles || [],
  },
  equipment: row.equipment || undefined,
  tips: row.tips || undefined,
});

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  exercises: exercisesStore.getAll(), // Get from Supabase-backed store
  customExercises: [],
  isLoading: false,
  isInitialized: false,
  error: null,
  lastFetched: null,

  initialize: async () => {
    const state = get();

    // Skip if already initialized recently (within 5 minutes)
    if (state.isInitialized && state.lastFetched) {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      if (state.lastFetched > fiveMinutesAgo) {
        return;
      }
    }

    set({ isLoading: true, error: null });

    try {
      // Try to fetch custom exercises from Supabase
      // This table may not exist for all deployments, so handle errors gracefully
      let customExercisesData: CustomExerciseRow[] = [];

      try {
        const { data, error } = await supabase
          .from('custom_exercises')
          .select('*')
          .order('name');

        if (!error && data) {
          customExercisesData = data;
        }
        // If error, just log it - custom_exercises table is optional
        if (error) {
          console.log('Custom exercises not available (table may not exist)');
        }
      } catch {
        // Silently continue - custom_exercises is optional
      }

      // Map custom exercises to Exercise type
      const customExercises = customExercisesData.map(mapCustomExercise);

      // Merge base exercises and custom exercises
      const baseExercises = exercisesStore.getAll();
      const mergedExercises = [...customExercises, ...baseExercises];

      set({
        exercises: mergedExercises,
        customExercises,
        isLoading: false,
        isInitialized: true,
        lastFetched: Date.now(),
      });
    } catch (error) {
      console.error('Error initializing exercises:', error);
      set({
        isLoading: false,
        isInitialized: true,
        error: error instanceof Error ? error.message : 'Unknown error',
        exercises: exercisesStore.getAll(),
      });
    }
  },

  refresh: async () => {
    set({ lastFetched: null });
    await get().initialize();
  },

  getExerciseById: (id: string) => {
    return get().exercises.find((ex) => ex.id === id);
  },

  getExercisesByCategory: (category: ExerciseCategory) => {
    return get().exercises.filter((ex) => ex.category === category);
  },

  getCategories: () => {
    return [...new Set(get().exercises.map((ex) => ex.category))];
  },
}));

// Re-export defaultExercises for backwards compatibility
export { defaultExercises };

// Standalone helper functions that use the store
// These can be used in places where hooks can't be called
export const getExerciseById = (id: string): Exercise | undefined => {
  return useExerciseStore.getState().getExerciseById(id);
};

export const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
  return useExerciseStore.getState().getExercisesByCategory(category);
};

export const getCategories = (): ExerciseCategory[] => {
  return useExerciseStore.getState().getCategories();
};

// Get all exercises (for backwards compatibility)
export const getAllExercises = (): Exercise[] => {
  return useExerciseStore.getState().exercises;
};
