import { Exercise, ExerciseCategory } from '../types';
import { fetchExercises } from '../lib/exercisesApi';
import { exercises as localExercises } from './exercises';

// In-memory store for exercises
class ExercisesStore {
  private exercises: Exercise[] = [];
  private isLoaded = false;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;

  // Initialize exercises from Supabase (call this on app startup)
  async initialize(): Promise<void> {
    if (this.isLoaded) return;
    if (this.isLoading && this.loadPromise) return this.loadPromise;

    this.isLoading = true;
    this.loadPromise = this.loadFromSupabase();

    try {
      await this.loadPromise;
    } finally {
      this.isLoading = false;
      this.loadPromise = null;
    }
  }

  private async loadFromSupabase(): Promise<void> {
    try {
      console.log('📥 Loading exercises from Supabase...');
      const exercises = await fetchExercises();
      this.exercises = exercises;
      this.isLoaded = true;
      console.log(`✅ Loaded ${exercises.length} exercises from Supabase`);
    } catch (error) {
      console.error('❌ Failed to load from Supabase, using local data:', error);
      this.exercises = localExercises;
      this.isLoaded = true;
    }
  }

  // Force refresh from Supabase
  async refresh(): Promise<void> {
    this.isLoaded = false;
    await this.initialize();
  }

  // Get all exercises (synchronous after initialization)
  getAll(): Exercise[] {
    if (!this.isLoaded) {
      console.warn('⚠️ Exercises not loaded yet, returning local data');
      return localExercises;
    }
    return this.exercises;
  }

  // Get exercises by category
  getByCategory(category: ExerciseCategory): Exercise[] {
    return this.getAll().filter(ex => ex.category === category);
  }

  // Get exercise by ID
  getById(id: string): Exercise | undefined {
    return this.getAll().find(ex => ex.id === id);
  }

  // Get all categories
  getCategories(): ExerciseCategory[] {
    return [...new Set(this.getAll().map(ex => ex.category))];
  }

  // Check if store is ready
  isReady(): boolean {
    return this.isLoaded;
  }
}

// Export singleton instance
export const exercisesStore = new ExercisesStore();

// Export convenience functions that match the old API
export const exercises = () => exercisesStore.getAll();
export const getExercisesByCategory = (category: ExerciseCategory) =>
  exercisesStore.getByCategory(category);
export const getExerciseById = (id: string) =>
  exercisesStore.getById(id);
export const getCategories = () =>
  exercisesStore.getCategories();
