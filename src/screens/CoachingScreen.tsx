import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useCoachStore } from '../store/coachStore';
import {
  CoachDashboardScreen,
  ClientListScreen,
  ProgramListScreen,
  ProgramBuilderScreen,
  DayBuilderScreen,
  AssignmentScreen,
} from './coach';
import { CustomProgram, CoachClient } from '../types';
import { colors } from '../theme';

type CoachScreen =
  | 'dashboard'
  | 'clients'
  | 'programs'
  | 'programBuilder'
  | 'dayBuilder'
  | 'assignments';

export const CoachingScreen: React.FC = () => {
  const { user } = useAuthStore();
  const { userProfile, isCoach, isLoading, loadUserProfile } = useCoachStore();

  const [currentScreen, setCurrentScreen] = useState<CoachScreen>('dashboard');
  const [editingDayIndex, setEditingDayIndex] = useState<number>(0);

  useEffect(() => {
    if (user?.id) {
      loadUserProfile(user.id);
    }
  }, [user?.id]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Coach dashboard
  if (isCoach) {
    switch (currentScreen) {
      case 'clients':
        return (
          <ClientListScreen
            onBack={() => setCurrentScreen('dashboard')}
            onSelectClient={(client: CoachClient) => {
              // Could navigate to client detail in the future
              console.log('Selected client:', client);
            }}
          />
        );

      case 'programs':
        return (
          <ProgramListScreen
            onBack={() => setCurrentScreen('dashboard')}
            onSelectProgram={(program: CustomProgram) => {
              setCurrentScreen('programBuilder');
            }}
            onCreateProgram={() => setCurrentScreen('programBuilder')}
          />
        );

      case 'programBuilder':
        return (
          <ProgramBuilderScreen
            onBack={() => setCurrentScreen('programs')}
            onEditDay={(dayIndex: number) => {
              setEditingDayIndex(dayIndex);
              setCurrentScreen('dayBuilder');
            }}
            onComplete={() => setCurrentScreen('programs')}
          />
        );

      case 'dayBuilder':
        return (
          <DayBuilderScreen
            dayIndex={editingDayIndex}
            onBack={() => setCurrentScreen('programBuilder')}
          />
        );

      case 'assignments':
        return (
          <AssignmentScreen
            onBack={() => setCurrentScreen('dashboard')}
            onComplete={() => setCurrentScreen('dashboard')}
          />
        );

      case 'dashboard':
      default:
        return (
          <CoachDashboardScreen
            onNavigateToClients={() => setCurrentScreen('clients')}
            onNavigateToPrograms={() => setCurrentScreen('programs')}
            onNavigateToProgramBuilder={() => setCurrentScreen('programBuilder')}
            onNavigateToAssignments={() => setCurrentScreen('assignments')}
          />
        );
    }
  }

  // Regular user placeholder
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coaching</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.comingSoonTitle}>Coaching Features</Text>
        <Text style={styles.comingSoonText}>
          Personalized coaching, form feedback, and training guidance will be
          available here in a future update.
        </Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💬</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Direct Messaging</Text>
              <Text style={styles.featureDescription}>
                Chat with your coach for personalized guidance
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📹</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Form Review</Text>
              <Text style={styles.featureDescription}>
                Submit videos for technique feedback
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📈</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Progress Tracking</Text>
              <Text style={styles.featureDescription}>
                Track your improvements over time
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎓</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Education</Text>
              <Text style={styles.featureDescription}>
                Learn training principles and techniques
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
    marginTop: 20,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureList: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureText: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
});
