import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCoachStore } from '../../store/coachStore';
import { CoachClient, CustomProgram, ProgramAssignment } from '../../types';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface ClientDetailScreenProps {
  client: CoachClient;
  onBack: () => void;
  onSendProgram: (client: CoachClient) => void;
  onEditProgram: (assignment: ProgramAssignment) => void;
  onMessageClient?: (client: CoachClient) => void;
}

export const ClientDetailScreen: React.FC<ClientDetailScreenProps> = ({
  client,
  onBack,
  onSendProgram,
  onEditProgram,
  onMessageClient,
}) => {
  const { programs, assignments, isLoading } = useCoachStore();
  const [clientAssignments, setClientAssignments] = useState<ProgramAssignment[]>([]);

  useEffect(() => {
    // Filter assignments for this client
    const filtered = assignments.filter(a => a.clientId === client.clientId);
    setClientAssignments(filtered);
  }, [assignments, client.clientId]);

  const activeAssignment = clientAssignments.find(
    a => a.status === 'active' || a.status === 'assigned'
  );

  const getStatusColor = (status: CoachClient['status']) => {
    switch (status) {
      case 'active':
        return colors.primary;
      case 'pending':
        return '#FF9800';
      case 'paused':
        return '#9E9E9E';
      case 'terminated':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Client Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Client Info Card */}
        <View style={styles.clientCard}>
          <View style={styles.clientHeader}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientInitial}>
                {(client.client?.displayName || client.client?.email || 'U')
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>
                {client.client?.displayName || 'Unknown Client'}
              </Text>
              <Text style={styles.clientEmail}>
                {client.client?.email || 'No email'}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(client.status) },
              ]}
            >
              <Text style={styles.statusText}>{client.status.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.clientMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                Client since {formatDate(client.startedAt)}
              </Text>
            </View>
            {client.notes && (
              <View style={styles.metaItem}>
                <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>{client.notes}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Current Program Section */}
        <Text style={styles.sectionTitle}>CURRENT PROGRAM</Text>
        {activeAssignment ? (
          <View style={styles.programCard}>
            <View style={styles.programHeader}>
              <View style={styles.programIcon}>
                <Ionicons name="barbell" size={24} color={colors.primary} />
              </View>
              <View style={styles.programInfo}>
                <Text style={styles.programName}>
                  {activeAssignment.program?.name || 'Custom Program'}
                </Text>
                <Text style={styles.programMeta}>
                  Assigned {formatDate(activeAssignment.assignedAt)}
                </Text>
                {activeAssignment.startDate && (
                  <Text style={styles.programMeta}>
                    Started {formatDate(activeAssignment.startDate)}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.programStatusBadge,
                  {
                    backgroundColor:
                      activeAssignment.status === 'active'
                        ? 'rgba(76, 175, 80, 0.2)'
                        : 'rgba(255, 152, 0, 0.2)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.programStatusText,
                    {
                      color:
                        activeAssignment.status === 'active' ? '#4CAF50' : '#FF9800',
                    },
                  ]}
                >
                  {activeAssignment.status.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Program Actions */}
            <View style={styles.programActions}>
              <TouchableOpacity
                style={styles.programActionButton}
                onPress={() => onEditProgram(activeAssignment)}
              >
                <Ionicons name="create-outline" size={20} color={colors.primary} />
                <Text style={styles.programActionText}>Modify Program</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noProgram}>
            <Ionicons name="clipboard-outline" size={48} color={colors.textMuted} />
            <Text style={styles.noProgramTitle}>No Active Program</Text>
            <Text style={styles.noProgramText}>
              This client doesn't have an active program yet
            </Text>
          </View>
        )}

        {/* Actions Section */}
        <Text style={styles.sectionTitle}>ACTIONS</Text>
        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              if (onMessageClient) {
                onMessageClient(client);
              } else {
                Alert.alert(
                  'Message Client',
                  `Start a conversation with ${client.client?.displayName || 'this client'}?`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Coming Soon', style: 'default' },
                  ]
                );
              }
            }}
          >
            <View style={[styles.actionIcon, styles.messageIcon]}>
              <Ionicons name="chatbubble" size={22} color="#4CAF50" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Message</Text>
              <Text style={styles.actionDescription}>
                Send a direct message to this client
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => onSendProgram(client)}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="send" size={22} color={colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                {activeAssignment ? 'Send New Program' : 'Assign Program'}
              </Text>
              <Text style={styles.actionDescription}>
                {activeAssignment
                  ? 'Replace current program with a new one'
                  : 'Send a custom program to this client'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {activeAssignment && (
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => onEditProgram(activeAssignment)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="settings" size={22} color={colors.primary} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Modify Current Program</Text>
                <Text style={styles.actionDescription}>
                  Make changes to their active program
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Assignment History */}
        {clientAssignments.length > 1 && (
          <>
            <Text style={styles.sectionTitle}>PROGRAM HISTORY</Text>
            {clientAssignments
              .filter(a => a.id !== activeAssignment?.id)
              .map((assignment) => (
                <View key={assignment.id} style={styles.historyItem}>
                  <View style={styles.historyIcon}>
                    <Ionicons
                      name={
                        assignment.status === 'completed'
                          ? 'checkmark-circle'
                          : 'close-circle'
                      }
                      size={20}
                      color={
                        assignment.status === 'completed' ? '#4CAF50' : '#9E9E9E'
                      }
                    />
                  </View>
                  <View style={styles.historyContent}>
                    <Text style={styles.historyTitle}>
                      {assignment.program?.name || 'Custom Program'}
                    </Text>
                    <Text style={styles.historyMeta}>
                      {formatDate(assignment.assignedAt)} - {assignment.status}
                    </Text>
                  </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  clientCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  clientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  clientInitial: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  clientEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  clientMeta: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 1.5,
  },
  programCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  programIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  programMeta: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  programStatusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  programStatusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  programActions: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  programActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
  },
  programActionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  noProgram: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  noProgramTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  noProgramText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  messageIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyIcon: {
    marginRight: spacing.md,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  historyMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  bottomPadding: {
    height: 100,
  },
});
