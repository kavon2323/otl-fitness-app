import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PreferencesState {
  // Superset mode - when enabled, exercises in a superset alternate
  // When disabled, complete all sets of one exercise before moving to next
  supersetModeEnabled: boolean;

  // Rest timer enabled - when disabled, skip rest timer between sets
  restTimerEnabled: boolean;

  // Default rest time in seconds
  defaultRestTime: number;

  // Actions
  toggleSupersetMode: () => void;
  setSupersetMode: (enabled: boolean) => void;
  toggleRestTimer: () => void;
  setRestTimerEnabled: (enabled: boolean) => void;
  setDefaultRestTime: (seconds: number) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      supersetModeEnabled: true, // Default to enabled for proper superset flow
      restTimerEnabled: true, // Default to enabled
      defaultRestTime: 90, // 90 seconds default

      toggleSupersetMode: () =>
        set((state) => ({
          supersetModeEnabled: !state.supersetModeEnabled,
        })),

      setSupersetMode: (enabled: boolean) =>
        set({ supersetModeEnabled: enabled }),

      toggleRestTimer: () =>
        set((state) => ({
          restTimerEnabled: !state.restTimerEnabled,
        })),

      setRestTimerEnabled: (enabled: boolean) =>
        set({ restTimerEnabled: enabled }),

      setDefaultRestTime: (seconds: number) =>
        set({ defaultRestTime: seconds }),
    }),
    {
      name: 'otl-preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
