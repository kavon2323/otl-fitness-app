import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutLog, LoggedExercise, LoggedSet, WorkoutDay } from '../types';
import { supabase } from '../lib/supabase';

interface ActiveWorkout {
  id: string;
  userId: string;
  programId: string;
  dayNumber: number;
  weekNumber: number;
  startTime: string;
  exercises: LoggedExercise[];
}

interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  totalTime: number;
}

interface WorkoutState {
  // Active workout being performed
  activeWorkout: ActiveWorkout | null;

  // Rest timer
  restTimer: TimerState;

  // Workout history
  workoutHistory: WorkoutLog[];

  // Actions
  startWorkout: (programId: string, dayNumber: number, weekNumber: number) => Promise<void>;
  endWorkout: (notes?: string) => WorkoutLog | null;
  cancelWorkout: () => void;

  // Exercise/Set logging
  logSet: (
    exerciseId: string,
    setNumber: number,
    data: { weight?: number; reps?: number; duration?: number }
  ) => void;
  completeSet: (exerciseId: string, setNumber: number) => void;
  updateSetNotes: (exerciseId: string, setNumber: number, notes: string) => void;

  // Rest timer
  startRestTimer: (seconds: number) => void;
  pauseRestTimer: () => void;
  resumeRestTimer: () => void;
  resetRestTimer: () => void;
  tickRestTimer: () => void;

  // History
  getWorkoutHistory: (programId?: string, limit?: number) => Promise<WorkoutLog[]>;
  getLastWorkoutForDay: (programId: string, dayNumber: number) => Promise<WorkoutLog | undefined>;
  isWorkoutCompletedThisWeek: (programId: string, dayNumber: number, weekNumber: number) => boolean;

  // Clear all state (for logout)
  clearAll: () => void;
}

const generateId = () => `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      activeWorkout: null,
      restTimer: {
        isRunning: false,
        timeRemaining: 0,
        totalTime: 0,
      },
      workoutHistory: [],

      startWorkout: async (programId: string, dayNumber: number, weekNumber: number) => {
        // Get current user ID
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || 'anonymous';

        const workout: ActiveWorkout = {
          id: generateId(),
          userId,
          programId,
          dayNumber,
          weekNumber,
          startTime: new Date().toISOString(),
          exercises: [],
        };
        set({ activeWorkout: workout });
      },

      endWorkout: (notes?: string) => {
        const { activeWorkout } = get();
        if (!activeWorkout) return null;

        const completedWorkout: WorkoutLog = {
          id: activeWorkout.id,
          userId: activeWorkout.userId,
          programId: activeWorkout.programId,
          dayNumber: activeWorkout.dayNumber,
          weekNumber: activeWorkout.weekNumber,
          startTime: activeWorkout.startTime,
          endTime: new Date().toISOString(),
          exercises: activeWorkout.exercises,
          completed: true,
          notes,
        };

        set((state) => ({
          activeWorkout: null,
          workoutHistory: [completedWorkout, ...state.workoutHistory],
          restTimer: { isRunning: false, timeRemaining: 0, totalTime: 0 },
        }));

        return completedWorkout;
      },

      cancelWorkout: () => {
        set({
          activeWorkout: null,
          restTimer: { isRunning: false, timeRemaining: 0, totalTime: 0 },
        });
      },

      logSet: (exerciseId, setNumber, data) => {
        set((state) => {
          if (!state.activeWorkout) return state;

          const exercises = [...state.activeWorkout.exercises];
          let exerciseIndex = exercises.findIndex((e) => e.exerciseId === exerciseId);

          if (exerciseIndex === -1) {
            exercises.push({
              exerciseId,
              sets: [],
            });
            exerciseIndex = exercises.length - 1;
          }

          const sets = [...exercises[exerciseIndex].sets];
          const setIndex = sets.findIndex((s) => s.setNumber === setNumber);

          const newSet: LoggedSet = {
            setNumber,
            weight: data.weight,
            reps: data.reps,
            duration: data.duration,
            completed: false,
            timestamp: new Date().toISOString(),
          };

          if (setIndex === -1) {
            sets.push(newSet);
          } else {
            sets[setIndex] = { ...sets[setIndex], ...newSet };
          }

          exercises[exerciseIndex] = { ...exercises[exerciseIndex], sets };

          return {
            activeWorkout: { ...state.activeWorkout, exercises },
          };
        });
      },

      completeSet: (exerciseId, setNumber) => {
        set((state) => {
          if (!state.activeWorkout) return state;

          const exercises = [...state.activeWorkout.exercises];
          const exerciseIndex = exercises.findIndex((e) => e.exerciseId === exerciseId);

          if (exerciseIndex === -1) {
            // Create exercise entry if it doesn't exist
            exercises.push({
              exerciseId,
              sets: [{
                setNumber,
                completed: true,
                timestamp: new Date().toISOString(),
              }],
            });
          } else {
            const sets = [...exercises[exerciseIndex].sets];
            const setIndex = sets.findIndex((s) => s.setNumber === setNumber);

            if (setIndex === -1) {
              sets.push({
                setNumber,
                completed: true,
                timestamp: new Date().toISOString(),
              });
            } else {
              sets[setIndex] = { ...sets[setIndex], completed: true, timestamp: new Date().toISOString() };
            }

            exercises[exerciseIndex] = { ...exercises[exerciseIndex], sets };
          }

          return {
            activeWorkout: { ...state.activeWorkout, exercises },
          };
        });
      },

      updateSetNotes: (exerciseId, setNumber, notes) => {
        // Notes can be stored at exercise level if needed
        // For now, this is a placeholder
      },

      startRestTimer: (seconds: number) => {
        set({
          restTimer: {
            isRunning: true,
            timeRemaining: seconds,
            totalTime: seconds,
          },
        });
      },

      pauseRestTimer: () => {
        set((state) => ({
          restTimer: { ...state.restTimer, isRunning: false },
        }));
      },

      resumeRestTimer: () => {
        set((state) => ({
          restTimer: { ...state.restTimer, isRunning: true },
        }));
      },

      resetRestTimer: () => {
        set({
          restTimer: { isRunning: false, timeRemaining: 0, totalTime: 0 },
        });
      },

      tickRestTimer: () => {
        set((state) => {
          if (!state.restTimer.isRunning || state.restTimer.timeRemaining <= 0) {
            return { restTimer: { ...state.restTimer, isRunning: false } };
          }
          return {
            restTimer: {
              ...state.restTimer,
              timeRemaining: state.restTimer.timeRemaining - 1,
            },
          };
        });
      },

      getWorkoutHistory: async (programId?: string, limit?: number) => {
        // Get current user ID to filter workouts
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

        let history = get().workoutHistory;

        // Filter by current user
        if (userId) {
          history = history.filter((w) => w.userId === userId);
        }

        if (programId) {
          history = history.filter((w) => w.programId === programId);
        }
        if (limit) {
          history = history.slice(0, limit);
        }
        return history;
      },

      getLastWorkoutForDay: async (programId: string, dayNumber: number) => {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

        return get().workoutHistory.find(
          (w) => w.programId === programId && w.dayNumber === dayNumber && (!userId || w.userId === userId)
        );
      },

      isWorkoutCompletedThisWeek: (programId: string, dayNumber: number, weekNumber: number) => {
        // Synchronous check using local workout history
        // User ID filtering happens at the workout level when workouts are logged
        return get().workoutHistory.some(
          (w) =>
            w.programId === programId &&
            w.dayNumber === dayNumber &&
            w.weekNumber === weekNumber &&
            w.completed
        );
      },

      clearAll: () => {
        // Clear all state (used on logout to prevent data leaking to next user)
        set({
          activeWorkout: null,
          restTimer: { isRunning: false, timeRemaining: 0, totalTime: 0 },
          workoutHistory: [],
        });
      },
    }),
    {
      name: 'otl-workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        workoutHistory: state.workoutHistory,
        // Don't persist activeWorkout or restTimer
      }),
    }
  )
);
