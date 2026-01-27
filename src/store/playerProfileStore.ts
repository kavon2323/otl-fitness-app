import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import {
  PlayerProfile,
  PlayerProfileDraft,
  PaintballPosition,
  FieldSideBias,
  TrainingPhase,
  Division,
  ExperienceLevel,
  getExperienceLevel,
  TrainingCycle,
  UpcomingTournament,
  calculateTrainingCycle,
} from '../types/paintball';

interface PlayerProfileState {
  // Profile data
  profile: PlayerProfile | null;
  isLoading: boolean;
  error: string | null;

  // Onboarding draft state (persisted locally during multi-screen flow)
  onboardingDraft: PlayerProfileDraft;

  // Actions
  fetchProfile: () => Promise<void>;
  createProfile: (data: PlayerProfileDraft) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<PlayerProfile>) => Promise<{ error: string | null }>;
  updatePhase: (phase: TrainingPhase, tournamentDate?: string) => Promise<{ error: string | null }>;
  startNewProgramCycle: () => Promise<{ error: string | null }>;
  getTrainingCycle: () => TrainingCycle | null;

  // Onboarding draft actions
  updateOnboardingDraft: (updates: PlayerProfileDraft) => void;
  clearOnboardingDraft: () => void;

  // Computed helpers
  needsOnboarding: () => boolean;
  getExperienceLevel: () => ExperienceLevel;

  // Clear state (for logout)
  clearProfile: () => void;
}

export const usePlayerProfileStore = create<PlayerProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      onboardingDraft: {},

      fetchProfile: async () => {
        set({ isLoading: true, error: null });

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            set({ isLoading: false, profile: null });
            return;
          }

          const { data, error } = await supabase
            .from('player_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            // PGRST116 = no rows returned, which is OK for new users
            if (error.code !== 'PGRST116') {
              throw error;
            }
            set({ profile: null, isLoading: false });
            return;
          }

          set({
            profile: mapDbToProfile(data),
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Error fetching player profile:', error);
          set({ error: error.message, isLoading: false });
        }
      },

      createProfile: async (profileData: PlayerProfileDraft) => {
        set({ isLoading: true, error: null });

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            throw new Error('Not authenticated');
          }

          // Validate required fields
          if (
            !profileData.primaryPosition ||
            !profileData.fieldSideBias ||
            !profileData.currentDivision ||
            profileData.yearsExperience === undefined ||
            !profileData.currentPhase ||
            !profileData.trainingDaysPerWeek
          ) {
            throw new Error('Missing required profile fields');
          }

          const { data, error } = await supabase
            .from('player_profiles')
            .upsert({
              user_id: user.id,
              primary_position: profileData.primaryPosition,
              field_side_bias: profileData.fieldSideBias,
              current_division: profileData.currentDivision,
              years_experience: profileData.yearsExperience,
              current_phase: profileData.currentPhase,
              next_tournament_date: profileData.nextTournamentDate || null,
              training_days_per_week: profileData.trainingDaysPerWeek,
              onboarding_completed: true,
              program_start_date: new Date().toISOString().split('T')[0], // Start training cycle
            }, {
              onConflict: 'user_id', // Update if user_id already exists
            })
            .select()
            .single();

          if (error) throw error;

          set({
            profile: mapDbToProfile(data),
            isLoading: false,
            onboardingDraft: {}, // Clear draft on successful creation
          });

          return { error: null };
        } catch (error: any) {
          console.error('Error creating player profile:', error);
          set({ error: error.message, isLoading: false });
          return { error: error.message };
        }
      },

      updateProfile: async (updates: Partial<PlayerProfile>) => {
        const current = get().profile;
        if (!current) {
          return { error: 'No profile to update' };
        }

        set({ isLoading: true, error: null });

        try {
          const dbUpdates = mapProfileToDb(updates);

          const { error } = await supabase
            .from('player_profiles')
            .update(dbUpdates)
            .eq('id', current.id);

          if (error) throw error;

          // Update local state
          set({
            profile: { ...current, ...updates, updatedAt: new Date().toISOString() },
            isLoading: false,
          });

          return { error: null };
        } catch (error: any) {
          console.error('Error updating player profile:', error);
          set({ error: error.message, isLoading: false });
          return { error: error.message };
        }
      },

      updatePhase: async (phase: TrainingPhase, tournamentDate?: string) => {
        return get().updateProfile({
          currentPhase: phase,
          nextTournamentDate: tournamentDate,
        });
      },

      startNewProgramCycle: async () => {
        const current = get().profile;
        if (!current) {
          return { error: 'No profile to update' };
        }

        // Set the program start date to today, which resets the training cycle
        const programStartDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        return get().updateProfile({
          programStartDate,
        });
      },

      getTrainingCycle: () => {
        const profile = get().profile;
        if (!profile || !profile.programStartDate) {
          // Default to first week of eccentric phase if no start date
          return {
            currentPhase: 'eccentric' as const,
            weekInPhase: 1,
            cycleNumber: 1,
          };
        }

        return calculateTrainingCycle(profile.programStartDate);
      },

      updateOnboardingDraft: (updates: PlayerProfileDraft) => {
        set((state) => ({
          onboardingDraft: { ...state.onboardingDraft, ...updates },
        }));
      },

      clearOnboardingDraft: () => {
        set({ onboardingDraft: {} });
      },

      needsOnboarding: (): boolean => {
        const profile = get().profile;
        return !profile || !profile.onboardingCompleted;
      },

      getExperienceLevel: (): ExperienceLevel => {
        const profile = get().profile;
        if (!profile) return 'beginner';
        return getExperienceLevel(profile.yearsExperience);
      },

      clearProfile: () => {
        set({
          profile: null,
          onboardingDraft: {},
          error: null,
        });
      },
    }),
    {
      name: 'otl-player-profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the onboarding draft, not the full profile (that comes from DB)
      partialize: (state) => ({
        onboardingDraft: state.onboardingDraft,
      }),
    }
  )
);

// ==================== DB MAPPING HELPERS ====================

const mapDbToProfile = (db: any): PlayerProfile => ({
  id: db.id,
  userId: db.user_id,
  primaryPosition: db.primary_position as PaintballPosition,
  fieldSideBias: db.field_side_bias as FieldSideBias,
  currentDivision: db.current_division as Division,
  yearsExperience: db.years_experience,
  experienceLevel: db.experience_level as ExperienceLevel,
  currentPhase: db.current_phase as TrainingPhase,
  nextTournamentDate: db.next_tournament_date,
  // JSONB fields are already parsed by Supabase - don't double-parse
  upcomingTournaments: db.upcoming_tournaments || undefined,
  trainingDaysPerWeek: db.training_days_per_week,
  programStartDate: db.program_start_date,
  onboardingCompleted: db.onboarding_completed,
  createdAt: db.created_at,
  updatedAt: db.updated_at,
});

const mapProfileToDb = (profile: Partial<PlayerProfile>): Record<string, any> => {
  const map: Record<string, any> = {};

  if (profile.primaryPosition !== undefined) {
    map.primary_position = profile.primaryPosition;
  }
  if (profile.fieldSideBias !== undefined) {
    map.field_side_bias = profile.fieldSideBias;
  }
  if (profile.currentDivision !== undefined) {
    map.current_division = profile.currentDivision;
  }
  if (profile.yearsExperience !== undefined) {
    map.years_experience = profile.yearsExperience;
  }
  if (profile.currentPhase !== undefined) {
    map.current_phase = profile.currentPhase;
  }
  if (profile.nextTournamentDate !== undefined) {
    map.next_tournament_date = profile.nextTournamentDate;
  }
  if (profile.trainingDaysPerWeek !== undefined) {
    map.training_days_per_week = profile.trainingDaysPerWeek;
  }
  if (profile.onboardingCompleted !== undefined) {
    map.onboarding_completed = profile.onboardingCompleted;
  }
  if (profile.programStartDate !== undefined) {
    map.program_start_date = profile.programStartDate;
  }
  if (profile.upcomingTournaments !== undefined) {
    // JSONB fields don't need JSON.stringify - Supabase handles it
    map.upcoming_tournaments = profile.upcomingTournaments;
  }

  return map;
};
