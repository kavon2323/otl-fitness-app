import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { usePlayerProfileStore } from '../store/playerProfileStore';
import { useExerciseStore } from '../store/exerciseStore';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import { colors } from '../theme';

export const RootNavigator: React.FC = () => {
  const { session, isLoading } = useAuthStore();
  const { fetchProfile, needsOnboarding } = usePlayerProfileStore();
  const { initialize: initializeExercises } = useExerciseStore();
  const [profileChecked, setProfileChecked] = useState(false);
  const [justCompletedOnboarding, setJustCompletedOnboarding] = useState(false);
  // Track if we've ever had a session to prevent flashing during login
  const [hadSession, setHadSession] = useState(false);

  useEffect(() => {
    // Initialize exercises (fetches custom exercises from Supabase)
    initializeExercises();
  }, []);

  // Track when we get a session
  useEffect(() => {
    if (session) {
      setHadSession(true);
    }
  }, [session]);

  // Fetch player profile when session is available
  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile().finally(() => {
        setProfileChecked(true);
      });
    } else {
      setProfileChecked(false);
      setJustCompletedOnboarding(false);
    }
  }, [session?.user?.id]);

  // Not logged in and not currently logging in - show auth
  // Don't show auth screen during loading if we're in the middle of logging in
  if (!session && !isLoading) {
    return <AuthNavigator />;
  }

  // Show loading while logging in or checking session
  if (isLoading || !session) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Loading profile - only show loading if we haven't checked profile yet
  // Don't show loading spinner during profile updates (to prevent remounting AppNavigator)
  if (!profileChecked) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Check if user needs onboarding (no profile or onboarding not completed)
  if (needsOnboarding()) {
    return (
      <OnboardingNavigator
        onComplete={() => {
          // Mark that we just completed onboarding so we show program overview
          setJustCompletedOnboarding(true);
          // Profile was created, refetch to update state
          fetchProfile();
        }}
      />
    );
  }

  // Show main app - if just completed onboarding, go to program overview
  return (
    <AppNavigator
      initialScreen={justCompletedOnboarding ? 'programOverview' : 'home'}
      showRecommendedProgram={justCompletedOnboarding}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});
