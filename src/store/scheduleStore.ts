import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WorkoutType = 'strength' | 'speed' | 'mobility' | 'drills' | 'rest';

export interface ScheduledWorkout {
  type: WorkoutType;
  programId?: string;
  dayNumber?: number;
}

export interface WeekSchedule {
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  [dayOfWeek: number]: ScheduledWorkout | null;
}

interface ScheduleState {
  // Weekly schedule template
  weekSchedule: WeekSchedule;

  // Actions
  setWorkoutForDay: (dayOfWeek: number, workout: ScheduledWorkout | null) => void;
  clearSchedule: () => void;
}

const defaultSchedule: WeekSchedule = {
  0: null, // Sunday - rest
  1: { type: 'strength' }, // Monday
  2: { type: 'mobility' }, // Tuesday
  3: { type: 'strength' }, // Wednesday
  4: { type: 'speed' }, // Thursday
  5: { type: 'strength' }, // Friday
  6: null, // Saturday - rest
};

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      weekSchedule: defaultSchedule,

      setWorkoutForDay: (dayOfWeek: number, workout: ScheduledWorkout | null) =>
        set((state) => ({
          weekSchedule: {
            ...state.weekSchedule,
            [dayOfWeek]: workout,
          },
        })),

      clearSchedule: () =>
        set({ weekSchedule: defaultSchedule }),
    }),
    {
      name: 'otl-schedule-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper to get day name
export const getDayName = (dayOfWeek: number, short = false): string => {
  const days = short
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
};

// Helper to get workout type display info
export const getWorkoutTypeInfo = (type: WorkoutType): { label: string; color: string; icon: string } => {
  switch (type) {
    case 'strength':
      return { label: 'Strength', color: '#E7A700', icon: 'barbell-outline' };
    case 'speed':
      return { label: 'Speed', color: '#FF6B6B', icon: 'flash-outline' };
    case 'mobility':
      return { label: 'Mobility', color: '#4ECDC4', icon: 'body-outline' };
    case 'drills':
      return { label: 'Drills', color: '#9B59B6', icon: 'football-outline' };
    case 'rest':
      return { label: 'Rest', color: '#666', icon: 'bed-outline' };
    default:
      return { label: 'Rest', color: '#666', icon: 'bed-outline' };
  }
};
