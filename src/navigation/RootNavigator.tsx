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
  const { session, isInitialized, isLoading, initialize } = useAuthStore();
  const { isLoading: profileLoading, fetchProfile, needsOnboarding } = usePlayerProfileStore();
  const { initialize: initializeExercises } = useExerciseStore();
  const [profileChecked, setProfileChecked] = useState(false);
  const [justCompletedOnboarding, setJustCompletedOnboarding] = useState(false);

  useEffect(() => {
    initialize();
    // Initialize exercises (fetches custom exercises from Supabase)
    initializeExercises();
  }, []);

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

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Not logged in - show auth
  if (!session) {
    return <AuthNavigator />;
  }

  // Loading profile
  if (!profileChecked || profileLoading) {
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
