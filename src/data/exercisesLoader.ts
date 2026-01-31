import { Exercise, ExerciseCategory } from '../types';
import { fetchExercises, fetchExercisesByCategory, fetchExerciseById } from '../lib/exercisesApi';

// Cache for exercises
let exercisesCache: Exercise[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load exercises from Supabase (with caching)
export async function loadExercises(): Promise<Exercise[]> {
  const now = Date.now();

  // Return cached data if still fresh
  if (exercisesCache && (now - lastFetchTime) < CACHE_DURATION) {
    return exercisesCache;
  }

  try {
    const exercises = await fetchExercises();
    exercisesCache = exercises;
    lastFetchTime = now;
    return exercises;
  } catch (error) {
    console.error('Failed to load exercises from Supabase:', error);

    // If we have cached data, return it even if stale
    if (exercisesCache) {
      console.log('Using stale cached exercises');
      return exercisesCache;
    }

    // Otherwise, fall back to importing local data
    console.log('Falling back to local exercises data');
    const { exercises: localExercises } = await import('./exercises');
    return localExercises;
  }
}

// Get exercises by category
export async function getExercisesByCategory(category: ExerciseCategory): Promise<Exercise[]> {
  try {
    return await fetchExercisesByCategory(category);
  } catch (error) {
    console.error('Failed to fetch exercises by category:', error);
    const allExercises = await loadExercises();
    return allExercises.filter(ex => ex.category === category);
  }
}

// Get exercise by ID
export async function getExerciseById(id: string): Promise<Exercise | undefined> {
  try {
    const exercise = await fetchExerciseById(id);
    return exercise || undefined;
  } catch (error) {
    console.error('Failed to fetch exercise by ID:', error);
    const allExercises = await loadExercises();
    return allExercises.find(ex => ex.id === id);
  }
}

// Get all unique categories
export async function getCategories(): Promise<ExerciseCategory[]> {
  const allExercises = await loadExercises();
  return [...new Set(allExercises.map(ex => ex.category))];
}

// Clear the cache (useful after editing exercises)
export function clearExercisesCache() {
  exercisesCache = null;
  lastFetchTime = 0;
}
