import { supabase } from './supabase';
import { Exercise, ExerciseCategory } from '../types';

// Database row type (matches Supabase schema)
interface ExerciseRow {
  id: string;
  name: string;
  category: string;
  description: string;
  video_url: string | null;
  tips: string[];
  muscles_targeted: {
    primary: string[];
    secondary?: string[];
  } | null;
  equipment: string[];
  is_core_exercise: boolean;
  selection_pools: string[] | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Convert database row to Exercise type
function rowToExercise(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ExerciseCategory,
    description: row.description,
    videoUrl: row.video_url || undefined,
    tips: row.tips.length > 0 ? row.tips : undefined,
    musclesTargeted: row.muscles_targeted || undefined,
    equipment: row.equipment.length > 0 ? row.equipment : undefined,
    selectionPools: row.selection_pools && row.selection_pools.length > 0 ? row.selection_pools : undefined,
  };
}

// Fetch all exercises from Supabase (with pagination for large datasets)
export async function fetchExercises(): Promise<Exercise[]> {
  let allExercises: ExerciseRow[] = [];
  let from = 0;
  const batchSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name')
      .range(from, from + batchSize - 1);

    if (error) {
      console.error('Error fetching exercises:', error);
      throw new Error(`Failed to fetch exercises: ${error.message}`);
    }

    if (data && data.length > 0) {
      allExercises = [...allExercises, ...(data as ExerciseRow[])];
      from += batchSize;
      hasMore = data.length === batchSize;
    } else {
      hasMore = false;
    }
  }

  return allExercises.map(rowToExercise);
}

// Fetch exercises by category
export async function fetchExercisesByCategory(category: ExerciseCategory): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('category', category)
    .order('name');

  if (error) {
    console.error('Error fetching exercises by category:', error);
    throw new Error(`Failed to fetch exercises: ${error.message}`);
  }

  return (data as ExerciseRow[]).map(rowToExercise);
}

// Fetch a single exercise by ID
export async function fetchExerciseById(id: string): Promise<Exercise | null> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching exercise:', error);
    throw new Error(`Failed to fetch exercise: ${error.message}`);
  }

  return rowToExercise(data as ExerciseRow);
}

// Fetch only core exercises (used by workout generator)
export async function fetchCoreExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('is_core_exercise', true)
    .order('name');

  if (error) {
    console.error('Error fetching core exercises:', error);
    throw new Error(`Failed to fetch core exercises: ${error.message}`);
  }

  return (data as ExerciseRow[]).map(rowToExercise);
}

// Create a new exercise (coach only)
export async function createExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
  // Generate ID from name
  const id = exercise.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const row = {
    id,
    name: exercise.name,
    category: exercise.category,
    description: exercise.description,
    video_url: exercise.videoUrl || null,
    tips: exercise.tips || [],
    muscles_targeted: exercise.musclesTargeted || null,
    equipment: exercise.equipment || [],
    is_core_exercise: false,
  };

  const { data, error } = await supabase
    .from('exercises')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error('Error creating exercise:', error);
    throw new Error(`Failed to create exercise: ${error.message}`);
  }

  return rowToExercise(data as ExerciseRow);
}

// Update an existing exercise (coach only)
export async function updateExercise(id: string, updates: Partial<Exercise>): Promise<Exercise> {
  const row: Partial<ExerciseRow> = {};

  if (updates.name !== undefined) row.name = updates.name;
  if (updates.category !== undefined) row.category = updates.category;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.videoUrl !== undefined) row.video_url = updates.videoUrl || null;
  if (updates.tips !== undefined) row.tips = updates.tips || [];
  if (updates.musclesTargeted !== undefined) row.muscles_targeted = updates.musclesTargeted || null;
  if (updates.equipment !== undefined) row.equipment = updates.equipment || [];

  const { data, error } = await supabase
    .from('exercises')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating exercise:', error);
    throw new Error(`Failed to update exercise: ${error.message}`);
  }

  return rowToExercise(data as ExerciseRow);
}

// Delete an exercise (coach only)
export async function deleteExercise(id: string): Promise<void> {
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting exercise:', error);
    throw new Error(`Failed to delete exercise: ${error.message}`);
  }
}
