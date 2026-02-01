import React, { useEffect } from 'react';
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
import { CustomProgram } from '../../types';
import { colors } from '../../theme';

interface ProgramListScreenProps {
  onBack: () => void;
  onSelectProgram: (program: CustomProgram) => void;
  onCreateProgram: () => void;
}

export const ProgramListScreen: React.FC<ProgramListScreenProps> = ({
  onBack,
  onSelectProgram,
  onCreateProgram,
}) => {
  const { user } = useAuthStore();
  const { programs, isLoadingPrograms, refreshPrograms, removeProgram, editProgram } =
    useCoachStore();

  useEffect(() => {
    if (user?.id) {
      refreshPrograms(user.id);
    }
  }, [user?.id]);

  const handleDeleteProgram = (program: CustomProgram) => {
    Alert.alert(
      'Delete Program',
      `Are you sure you want to delete "${program.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeProgram(program.id),
        },
      ]
    );
  };

  const handleEditProgram = (program: CustomProgram) => {
    editProgram(program);
    onSelectProgram(program);
  };

  if (isLoadingPrograms) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading programs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>My Programs</Text>
            <Text style={styles.subtitle}>{programs.length} programs created</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={onCreateProgram}>
            <Text style={styles.createButtonText}>+ New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {programs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No Programs Yet</Text>
            <Text style={styles.emptyText}>
              Create your first program to assign to clients
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={onCreateProgram}>
              <Text style={styles.emptyButtonText}>Create Program</Text>
            </TouchableOpacity>
          </View>
        ) : (
          programs.map((program) => {
            // Safely access programData with fallbacks
            const days = program.programData?.days || [];
            const workoutCount = days.length;
            const exerciseCount = days.reduce(
              (acc, day) =>
                acc +
                (day.sections || []).reduce(
                  (sAcc, section) => sAcc + (section.exercises || []).length,
                  0
                ),
              0
            );

            return (
              <View key={program.id} style={styles.programCard}>
                <TouchableOpacity
                  style={styles.programContent}
                  onPress={() => handleEditProgram(program)}
                >
                  <Text style={styles.programName}>{program.name}</Text>
                  {program.description && (
                    <Text style={styles.programDescription} numberOfLines={2}>
                      {program.description}
                    </Text>
                  )}
                  <View style={styles.programStats}>
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>{program.daysPerWeek || 0}</Text>
                      <Text style={styles.statLabel}>days/week</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>{workoutCount}</Text>
                      <Text style={styles.statLabel}>workouts</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>{exerciseCount}</Text>
                      <Text style={styles.statLabel}>exercises</Text>
                    </View>
                  </View>
                  <Text style={styles.programDate}>
                    Created {new Date(program.createdAt).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>

                <View style={styles.programActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditProgram(program)}
                  >
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteProgram(program)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
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
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  programCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  programContent: {
    padding: 16,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  programDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 12,
  },
  programStats: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
  },
  programDate: {
    fontSize: 12,
    color: '#666',
  },
  programActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  actionButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    borderRightWidth: 0,
  },
  deleteButtonText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});
