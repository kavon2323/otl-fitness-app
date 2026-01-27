import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCoachStore } from '../../store/coachStore';
import { useAuthStore } from '../../store/authStore';
import { Logo } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface CoachDashboardScreenProps {
  onNavigateToClients: () => void;
  onNavigateToPrograms: () => void;
  onNavigateToProgramBuilder: () => void;
  onNavigateToAssignments: () => void;
}

export const CoachDashboardScreen: React.FC<CoachDashboardScreenProps> = ({
  onNavigateToClients,
  onNavigateToPrograms,
  onNavigateToProgramBuilder,
  onNavigateToAssignments,
}) => {
  const { user } = useAuthStore();
  const {
    userProfile,
    clients,
    programs,
    assignments,
    isLoading,
    loadCoachData,
    loadUserProfile,
  } = useCoachStore();

  useEffect(() => {
    if (user?.id) {
      loadUserProfile(user.id);
      loadCoachData(user.id);
    }
  }, [user?.id]);

  const activeClients = clients.filter((c) => c.status === 'active');
  const activeAssignments = assignments.filter(
    (a) => a.status === 'active' || a.status === 'assigned'
  );

  // Calculate subscriber counts (mock data for now - would come from API)
  // In production, this would filter clients by their subscription tier
  const omegaSubscribers = activeClients.filter((c) =>
    c.client?.subscriptionTier === 'omega'
  ).length;
  const proSubscribers = activeClients.filter((c) =>
    c.client?.subscriptionTier === 'omega_pro'
  ).length;

  // Calculate to-dos (mock counts - would come from API)
  // These represent: unread messages, pending form videos, scheduled calls
  const pendingMessages: number = 0; // Would come from messages API
  const pendingFormVideos: number = 0; // Would come from form review API
  const upcomingCalls: number = 0; // Would come from scheduling API
  const totalTodos = pendingMessages + pendingFormVideos + upcomingCalls;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Logo size="small" />
          <Text style={styles.headerBadge}>COACH</Text>
        </View>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Welcome back, {userProfile?.displayName || 'Coach'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeClients.length}</Text>
            <Text style={styles.statLabel}>MEMBERS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.omegaStatValue]}>{omegaSubscribers}</Text>
            <Text style={styles.statLabel}>OMEGA</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.proStatValue]}>{proSubscribers}</Text>
            <Text style={styles.statLabel}>PRO</Text>
          </View>
          <TouchableOpacity style={[styles.statCard, totalTodos > 0 && styles.statCardHighlight]}>
            <Text style={[styles.statValue, totalTodos > 0 && styles.todoStatValue]}>{totalTodos}</Text>
            <Text style={styles.statLabel}>TO-DOS</Text>
          </TouchableOpacity>
        </View>

        {/* To-Do Breakdown (if any) */}
        {totalTodos > 0 && (
          <View style={styles.todoBreakdown}>
            {pendingMessages > 0 && (
              <View style={styles.todoItem}>
                <Ionicons name="chatbubble" size={16} color={colors.primary} />
                <Text style={styles.todoText}>{pendingMessages} message{pendingMessages !== 1 ? 's' : ''} to reply</Text>
              </View>
            )}
            {pendingFormVideos > 0 && (
              <View style={styles.todoItem}>
                <Ionicons name="videocam" size={16} color={colors.primary} />
                <Text style={styles.todoText}>{pendingFormVideos} form video{pendingFormVideos !== 1 ? 's' : ''} to review</Text>
              </View>
            )}
            {upcomingCalls > 0 && (
              <View style={styles.todoItem}>
                <Ionicons name="call" size={16} color={colors.primary} />
                <Text style={styles.todoText}>{upcomingCalls} upcoming call{upcomingCalls !== 1 ? 's' : ''}</Text>
              </View>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={onNavigateToProgramBuilder}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="create-outline" size={28} color={colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Build Program</Text>
            <Text style={styles.actionDescription}>Create a new workout program</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onNavigateToAssignments}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="send-outline" size={28} color={colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Assign Program</Text>
            <Text style={styles.actionDescription}>Send to clients</Text>
          </TouchableOpacity>
        </View>

        {/* Management Sections */}
        <Text style={styles.sectionTitle}>MANAGEMENT</Text>

        <TouchableOpacity style={styles.menuItem} onPress={onNavigateToClients}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="people" size={22} color={colors.primary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Clients</Text>
            <Text style={styles.menuSubtitle}>
              {activeClients.length} active client{activeClients.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onNavigateToPrograms}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="clipboard" size={22} color={colors.primary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>My Programs</Text>
            <Text style={styles.menuSubtitle}>
              {programs.length} program{programs.length !== 1 ? 's' : ''} created
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onNavigateToAssignments}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="link" size={22} color={colors.primary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Assignments</Text>
            <Text style={styles.menuSubtitle}>
              {activeAssignments.length} active assignment
              {activeAssignments.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        {/* Recent Activity */}
        {activeAssignments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENT ASSIGNMENTS</Text>
            {activeAssignments.slice(0, 3).map((assignment) => (
              <View key={assignment.id} style={styles.recentItem}>
                <View style={styles.recentBadge}>
                  <Text style={styles.recentBadgeText}>
                    {assignment.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.recentTitle}>
                  {assignment.program?.name || 'Program'}
                </Text>
                <Text style={styles.recentSubtitle}>
                  Assigned to {assignment.client?.displayName || assignment.client?.email}
                </Text>
                <Text style={styles.recentDate}>
                  {new Date(assignment.assignedAt).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontSize: typography.fontSize.sm,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerBadge: {
    backgroundColor: colors.primary,
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.md,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  omegaStatValue: {
    color: colors.primary, // Gold for Omega
  },
  proStatValue: {
    color: '#9c27b0', // Purple for Pro
  },
  statCardHighlight: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
  },
  todoStatValue: {
    color: '#ff6b6b',
  },
  todoBreakdown: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  todoText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 1.5,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  actionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  recentItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  recentBadgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  recentTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  recentSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  recentDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  bottomPadding: {
    height: 100,
  },
});
