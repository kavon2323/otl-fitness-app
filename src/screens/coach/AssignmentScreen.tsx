import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useCoachStore } from '../../store/coachStore';
import { useAuthStore } from '../../store/authStore';
import { CustomProgram, CoachClient } from '../../types';
import { colors } from '../../theme';

interface AssignmentScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const AssignmentScreen: React.FC<AssignmentScreenProps> = ({
  onBack,
  onComplete,
}) => {
  const { user } = useAuthStore();
  const {
    clients,
    programs,
    assignments,
    isLoading,
    loadCoachData,
    assignProgram,
    cancelClientAssignment,
  } = useCoachStore();

  const [selectedProgram, setSelectedProgram] = useState<CustomProgram | null>(null);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [step, setStep] = useState<'list' | 'assign'>('list');

  useEffect(() => {
    if (user?.id) {
      loadCoachData(user.id);
    }
  }, [user?.id]);

  const activeClients = clients.filter((c) => c.status === 'active');
  const activeAssignments = assignments.filter(
    (a) => a.status === 'active' || a.status === 'assigned'
  );

  const toggleClient = (clientId: string) => {
    setSelectedClients((prev) => {
      if (prev.includes(clientId)) {
        return prev.filter((id) => id !== clientId);
      }
      return [...prev, clientId];
    });
  };

  const handleStartAssign = (program: CustomProgram) => {
    setSelectedProgram(program);
    setSelectedClients([]);
    setStep('assign');
  };

  const handleAssign = async () => {
    if (!user?.id || !selectedProgram || selectedClients.length === 0) return;

    const success = await assignProgram(
      user.id,
      selectedProgram.id,
      selectedClients
    );

    if (success) {
      Alert.alert(
        'Success',
        `Program assigned to ${selectedClients.length} client${selectedClients.length > 1 ? 's' : ''}`,
        [{ text: 'OK', onPress: () => setStep('list') }]
      );
      setSelectedProgram(null);
      setSelectedClients([]);
    } else {
      Alert.alert('Error', 'Failed to assign program. Please try again.');
    }
  };

  const handleCancelAssignment = (assignmentId: string) => {
    Alert.alert(
      'Cancel Assignment',
      'Are you sure you want to cancel this assignment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelClientAssignment(assignmentId),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Client selection step
  if (step === 'assign' && selectedProgram) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep('list')} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Assign Program</Text>
          <Text style={styles.subtitle}>{selectedProgram.name}</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Select Clients</Text>

          {activeClients.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No active clients available</Text>
            </View>
          ) : (
            activeClients.map((clientRelation) => {
              const isSelected = selectedClients.includes(clientRelation.clientId);
              return (
                <TouchableOpacity
                  key={clientRelation.id}
                  style={[styles.clientOption, isSelected && styles.clientOptionSelected]}
                  onPress={() => toggleClient(clientRelation.clientId)}
                >
                  <View style={styles.checkbox}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>
                      {clientRelation.client?.displayName || 'Unknown'}
                    </Text>
                    <Text style={styles.clientEmail}>
                      {clientRelation.client?.email}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.assignButton,
              selectedClients.length === 0 && styles.assignButtonDisabled,
            ]}
            onPress={handleAssign}
            disabled={selectedClients.length === 0}
          >
            <Text style={styles.assignButtonText}>
              Assign to {selectedClients.length} Client
              {selectedClients.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main assignments list
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Assignments</Text>
        <Text style={styles.subtitle}>
          {activeAssignments.length} active assignment
          {activeAssignments.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Assign Section */}
        {programs.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Assign a Program</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.programScroll}
            >
              {programs.map((program) => (
                <TouchableOpacity
                  key={program.id}
                  style={styles.programCard}
                  onPress={() => handleStartAssign(program)}
                >
                  <Text style={styles.programName}>{program.name}</Text>
                  <Text style={styles.programDays}>
                    {program.daysPerWeek} days/week
                  </Text>
                  <Text style={styles.assignText}>Assign →</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Active Assignments */}
        <Text style={styles.sectionTitle}>Active Assignments</Text>

        {activeAssignments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📤</Text>
            <Text style={styles.emptyTitle}>No Assignments Yet</Text>
            <Text style={styles.emptyText}>
              Assign programs to your clients to get started
            </Text>
          </View>
        ) : (
          activeAssignments.map((assignment) => (
            <View key={assignment.id} style={styles.assignmentCard}>
              <View style={styles.assignmentBadge}>
                <Text style={styles.assignmentBadgeText}>
                  {assignment.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.assignmentProgram}>
                {assignment.program?.name || 'Unknown Program'}
              </Text>
              <Text style={styles.assignmentClient}>
                To: {assignment.client?.displayName || assignment.client?.email}
              </Text>
              <Text style={styles.assignmentDate}>
                Assigned {new Date(assignment.assignedAt).toLocaleDateString()}
              </Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelAssignment(assignment.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
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
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  programScroll: {
    marginBottom: 24,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  programCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    borderWidth: 1,
    borderColor: '#333',
  },
  programName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  programDays: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  assignText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  assignmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  assignmentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  assignmentBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  assignmentProgram: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  assignmentClient: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  assignmentDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  cancelButton: {
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 13,
  },
  clientOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  clientOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  clientEmail: {
    fontSize: 13,
    color: '#888',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  assignButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  assignButtonDisabled: {
    opacity: 0.5,
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
