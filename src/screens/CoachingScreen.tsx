import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useCoachStore } from '../store/coachStore';
import {
  CoachDashboardScreen,
  ClientListScreen,
  ClientDetailScreen,
  ProgramListScreen,
  ProgramBuilderScreen,
  DayBuilderScreen,
  AssignmentScreen,
} from './coach';
import { CustomProgram, CoachClient, ProgramAssignment, Feature, hasFeatureAccess, SubscriptionTier } from '../types';
import { UpgradeModal } from '../components';
import { colors } from '../theme';

type CoachScreen =
  | 'dashboard'
  | 'clients'
  | 'clientDetail'
  | 'programs'
  | 'programBuilder'
  | 'dayBuilder'
  | 'assignments'
  | 'clientProgramEditor';

export const CoachingScreen: React.FC = () => {
  const { user } = useAuthStore();
  const { userProfile, isCoach, isLoading, loadUserProfile } = useCoachStore();

  const [currentScreen, setCurrentScreen] = useState<CoachScreen>('dashboard');
  const [editingDayIndex, setEditingDayIndex] = useState<number>(0);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<Feature>('coach_messaging');
  const [selectedClient, setSelectedClient] = useState<CoachClient | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<ProgramAssignment | null>(null);
  const mountedRef = useRef(true);

  // Get user's subscription tier - defaults to 'free'
  // Note: subscriptionTier would come from UserProfile in production
  const userTier: SubscriptionTier = 'free';

  // Check feature access and show upgrade modal if needed
  const handleFeaturePress = (feature: Feature) => {
    if (hasFeatureAccess(userTier, feature)) {
      // Feature is accessible - in the future this would navigate to the feature
      console.log(`Accessing ${feature}`);
    } else {
      setUpgradeFeature(feature);
      setUpgradeModalVisible(true);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    let timeoutId: NodeJS.Timeout;

    const loadProfile = async () => {
      if (user?.id) {
        // Set a short timeout - if it doesn't load quickly, just show the non-coach view
        timeoutId = setTimeout(() => {
          if (mountedRef.current) {
            setHasAttemptedLoad(true);
          }
        }, 3000);

        try {
          await loadUserProfile(user.id);
        } catch (error) {
          console.error('Error loading profile:', error);
        } finally {
          if (mountedRef.current) {
            setHasAttemptedLoad(true);
          }
        }
      } else {
        setHasAttemptedLoad(true);
      }
    };

    loadProfile();

    return () => {
      mountedRef.current = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user?.id]);

  // Show loading only briefly, then show non-coach view if not a coach
  if (isLoading && !hasAttemptedLoad) {
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
              setSelectedClient(client);
              setCurrentScreen('clientDetail');
            }}
          />
        );

      case 'clientDetail':
        if (!selectedClient) {
          setCurrentScreen('clients');
          return null;
        }
        return (
          <ClientDetailScreen
            client={selectedClient}
            onBack={() => {
              setSelectedClient(null);
              setCurrentScreen('clients');
            }}
            onSendProgram={(client: CoachClient) => {
              // Navigate to assignments with pre-selected client
              setCurrentScreen('assignments');
            }}
            onEditProgram={(assignment: ProgramAssignment) => {
              setSelectedAssignment(assignment);
              setCurrentScreen('programBuilder');
            }}
            onMessageClient={(client: CoachClient) => {
              // TODO: Navigate to messaging screen
              // For now, show coming soon alert
              Alert.alert(
                'Message Client',
                `Messaging ${client.client?.displayName || 'client'} - Coming soon!`,
                [{ text: 'OK' }]
              );
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

  // Helper to render a feature item
  const renderFeatureItem = (
    icon: string,
    name: string,
    description: string,
    feature: Feature,
    isLocked: boolean
  ) => (
    <TouchableOpacity
      key={feature}
      style={[styles.featureItem, isLocked && styles.featureItemLocked]}
      onPress={() => handleFeaturePress(feature)}
      activeOpacity={0.7}
    >
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <View style={styles.featureNameRow}>
          <Text style={styles.featureName}>{name}</Text>
          {isLocked && <Text style={styles.lockBadge}>🔒</Text>}
        </View>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
      {!isLocked && <Text style={styles.chevron}>→</Text>}
    </TouchableOpacity>
  );

  // Handle scheduling a coaching call
  const handleScheduleCall = () => {
    // Replace with your actual Calendly URL
    const calendlyUrl = 'https://calendly.com/otl-coaching/1-hour-session';
    Linking.openURL(calendlyUrl);
  };

  // Regular user - show coaching features with upgrade prompts
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coaching</Text>
        <Text style={styles.subtitle}>Get Expert Guidance</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1-on-1 Coaching Call Card */}
        <TouchableOpacity style={styles.coachingCallCard} onPress={handleScheduleCall}>
          <View style={styles.coachingCallIcon}>
            <Ionicons name="videocam" size={32} color="#fff" />
          </View>
          <View style={styles.coachingCallContent}>
            <Text style={styles.coachingCallTitle}>1-on-1 Coaching Call</Text>
            <Text style={styles.coachingCallDescription}>
              Book a private 1-hour session with a professional coach to review your training, technique, and game strategy
            </Text>
            <View style={styles.coachingCallPricing}>
              <Text style={styles.coachingCallPrice}>$99</Text>
              <Text style={styles.coachingCallDuration}>/ 1 hour</Text>
            </View>
          </View>
          <View style={styles.coachingCallAction}>
            <Text style={styles.coachingCallActionText}>Schedule</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>OMEGA PRO FEATURES</Text>
        <Text style={styles.sectionSubtext}>
          Upgrade to OMEGA Pro for ongoing coaching access
        </Text>

        <View style={styles.featureList}>
          {renderFeatureItem(
            '📊',
            'Monthly Log Review',
            'Your coach reviews your training logs and provides personalized feedback',
            'monthly_log_review',
            !hasFeatureAccess(userTier, 'monthly_log_review')
          )}

          {renderFeatureItem(
            '💬',
            'Coach Messaging',
            'Message your coach with questions or request program modifications',
            'coach_messaging',
            !hasFeatureAccess(userTier, 'coach_messaging')
          )}

          {renderFeatureItem(
            '🔧',
            'Program Modifications',
            'Get your program customized to your specific needs and goals',
            'program_modifications',
            !hasFeatureAccess(userTier, 'program_modifications')
          )}

          {renderFeatureItem(
            '📹',
            'Form Review Videos',
            'Submit videos and get technique feedback from coaches',
            'form_review_videos',
            !hasFeatureAccess(userTier, 'form_review_videos')
          )}

          {renderFeatureItem(
            '📅',
            'Monthly Coaching Zoom',
            'Join live monthly group calls hosted by top pros and coaches',
            'monthly_coaching_zoom',
            !hasFeatureAccess(userTier, 'monthly_coaching_zoom')
          )}
        </View>

        {/* Upgrade prompt for OMEGA users - shown when subscriptionTier is implemented */}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <UpgradeModal
        visible={upgradeModalVisible}
        feature={upgradeFeature}
        onClose={() => setUpgradeModalVisible(false)}
      />
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
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  coachingCallCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  coachingCallIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coachingCallContent: {
    marginBottom: 16,
  },
  coachingCallTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  coachingCallDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 22,
    marginBottom: 12,
  },
  coachingCallPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  coachingCallPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  coachingCallDuration: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  coachingCallAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  coachingCallActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
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
  bottomPadding: {
    height: 100,
  },
  featureList: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureItemLocked: {
    opacity: 0.7,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureText: {
    flex: 1,
  },
  featureNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lockBadge: {
    fontSize: 12,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  chevron: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
  },
  upgradePrompt: {
    marginTop: 32,
    padding: 16,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.3)',
  },
  upgradeText: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
