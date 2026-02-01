import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { usePlayerProfileStore } from './playerProfileStore';
import { useProgramStore } from './programStore';
import { useWorkoutStore } from './workoutStore';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  initialize: async () => {
    // Prevent multiple initializations
    if (get().isInitialized) {
      return;
    }

    try {
      set({ isLoading: true });

      // Get current session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
      }

      set({
        session,
        user: session?.user ?? null,
        isInitialized: true,
        isLoading: false,
      });

      // Listen for auth state changes
      supabase.auth.onAuthStateChange((event, session) => {
        const currentUser = get().user;
        const newUser = session?.user ?? null;

        // Clear all user-specific stores when switching users
        if (currentUser?.id && newUser?.id && currentUser.id !== newUser.id) {
          // Different user logged in - clear all stores
          usePlayerProfileStore.getState().clearProfile();
          useProgramStore.getState().clearAll();
          useWorkoutStore.getState().clearAll();
        } else if (event === 'SIGNED_OUT') {
          // User signed out - clear all stores
          usePlayerProfileStore.getState().clearProfile();
          useProgramStore.getState().clearAll();
          useWorkoutStore.getState().clearAll();
        }

        set({
          session,
          user: newUser,
        });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      set({ isLoading: false, error: error.message });
      return { error: error.message };
    }

    set({
      session: data.session,
      user: data.user,
      isLoading: false,
    });

    return { error: null };
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ isLoading: false, error: error.message });
      return { error: error.message };
    }

    set({
      session: data.session,
      user: data.user,
      isLoading: false,
    });

    return { error: null };
  },

  signOut: async () => {
    set({ isLoading: true });

    await supabase.auth.signOut();

    // Clear all user-specific stores to prevent data leaking to next user
    usePlayerProfileStore.getState().clearProfile();
    useProgramStore.getState().clearAll();
    useWorkoutStore.getState().clearAll();

    set({
      session: null,
      user: null,
      isLoading: false,
    });
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      set({ isLoading: false, error: error.message });
      return { error: error.message };
    }

    set({ isLoading: false });
    return { error: null };
  },

  clearError: () => set({ error: null }),
}));
