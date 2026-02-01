import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProgramsByType } from '../data/programs';
import { useProgramStore } from '../store/programStore';
import { useCoachStore } from '../store/coachStore';
import { useAuthStore } from '../store/authStore';
import { Program } from '../types';
import { colors } from '../theme';

interface ProgramsScreenProps {
  onSelectProgram: (program: Program) => void;
}

type TabType = 'strength' | 'mobility';

export const ProgramsScreen: React.FC<ProgramsScreenProps> = ({
  onSelectProgram,
}) => {
  const { currentProgramId, currentMobilityProgramId } = useProgramStore();
  const { clientAssignments, loadClientAssignments, isLoadingAssignments } = useCoachStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('strength');

  // Load assigned programs on mount
  useEffect(() => {
    if (user?.id) {
      console.log('📥 Loading assigned programs for user:', user.id);
      loadClientAssignments(user.id);
    }
  }, [user?.id, loadClientAssignments]);

  const strengthPrograms = useMemo(() => getProgramsByType('strength'), []);
  const mobilityPrograms = useMemo(() => getProgramsByType('mobility'), []);

  // Convert assigned programs to Program format
  const assignedPrograms = useMemo(() => {
    console.log('📋 Client assignments count:', clientAssignments.length);

    // Debug: log each assignment
    clientAssignments.forEach((a, i) => {
      console.log(`  Assignment ${i + 1}:`, {
        id: a.id,
        status: a.status,
        programName: a.program?.name,
        hasProgramData: !!a.program?.programData,
        programDataDays: a.program?.programData?.days?.length || 0,
      });
    });

    const validAssignments = clientAssignments
      .filter(a => a.status === 'active' || a.status === 'assigned')
      .filter(a => {
        // Check if program exists and has valid programData
        if (!a.program) {
          console.log('  ⚠️ Assignment missing program:', a.id);
          return false;
        }
        if (!a.program.programData) {
          console.log('  ⚠️ Assignment program missing programData:', a.program.name);
          return false;
        }
        return true;
      })
      .map(a => a.program!.programData);

    console.log('✅ Valid assigned programs:', validAssignments.length);
    return validAssignments;
  }, [clientAssignments]);

  const displayedPrograms = activeTab === 'strength' ? strengthPrograms : mobilityPrograms;
  const currentId = activeTab === 'strength' ? currentProgramId : currentMobilityProgramId;

  const renderProgramCard = (program: Program, isAssigned: boolean = false) => {
    const isCurrentProgram = program.id === currentId;
    const totalExercises = program.days.reduce(
      (acc, day) =>
        acc +
        day.sections.reduce((sAcc, section) => sAcc + section.exercises.length, 0),
      0
    );

    return (
      <TouchableOpacity
        key={program.id}
        style={[
          styles.programCard,
          isCurrentProgram && styles.programCardActive,
          isAssigned && styles.programCardAssigned,
        ]}
        onPress={() => onSelectProgram(program)}
      >
        {isAssigned && (
          <View style={styles.assignedBadge}>
            <Ionicons name="star" size={14} color="#000" />
            <Text style={styles.assignedBadgeText}>FROM YOUR COACH</Text>
          </View>
        )}
        {isCurrentProgram && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>CURRENT</Text>
          </View>
        )}
        <Text style={styles.programName}>{program.name}</Text>
        <Text style={styles.programDescription}>{program.description}</Text>
        <View style={styles.programStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{program.daysPerWeek}</Text>
            <Text style={styles.statLabel}>days/week</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{program.days.length}</Text>
            <Text style={styles.statLabel}>
              {activeTab === 'mobility' ? 'routines' : 'workouts'}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalExercises}</Text>
            <Text style={styles.statLabel}>
              {activeTab === 'mobility' ? 'movements' : 'exercises'}
            </Text>
          </View>
        </View>
        <View style={styles.daysPreview}>
          {program.days.slice(0, 4).map((day) => (
            <View key={day.id} style={styles.dayPreview}>
              <Text style={styles.dayPreviewName}>Day {day.dayNumber}</Text>
              <Text style={styles.dayPreviewFocus} numberOfLines={1}>
                {day.focus || day.name}
              </Text>
            </View>
          ))}
          {program.days.length > 4 && (
            <Text style={styles.moreDays}>
              +{program.days.length - 4} more days
            </Text>
          )}
        </View>
        <View style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>
            {isCurrentProgram ? 'View Details' : 'View Program'} →
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programs</Text>
        <Text style={styles.subtitle}>Browse training programs</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'strength' && styles.tabActive]}
          onPress={() => setActiveTab('strength')}
        >
          <Text style={[styles.tabText, activeTab === 'strength' && styles.tabTextActive]}>
            Strength
          </Text>
          {(currentProgramId || assignedPrograms.length > 0) && (
            <View style={styles.tabDot} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mobility' && styles.tabActive]}
          onPress={() => setActiveTab('mobility')}
        >
          <Text style={[styles.tabText, activeTab === 'mobility' && styles.tabTextActive]}>
            Mobility
          </Text>
          {currentMobilityProgramId && (
            <View style={styles.tabDot} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Assigned Programs Section */}
        {activeTab === 'strength' && (
          <>
            {isLoadingAssignments && assignedPrograms.length === 0 && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.loadingText}>Loading assigned programs...</Text>
              </View>
            )}

            {assignedPrograms.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Assigned by Your Coach</Text>
                {assignedPrograms.map((program) => renderProgramCard(program, true))}
              </>
            )}
          </>
        )}

        <Text style={styles.sectionTitle}>
          {activeTab === 'strength' ? 'Strength & Conditioning' : 'Mobility & Recovery'}
        </Text>

        {displayedPrograms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab} programs available yet.
            </Text>
          </View>
        ) : (
          displayedPrograms.map((program) => renderProgramCard(program, false))
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    gap: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
  },
  emptyState: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  programCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  programCardActive: {
    borderColor: colors.primary,
  },
  programCardAssigned: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(231, 167, 0, 0.08)',
  },
  assignedBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  assignedBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  currentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  currentBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  programName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 16,
  },
  programStats: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
  },
  daysPreview: {
    gap: 8,
    marginBottom: 16,
  },
  dayPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayPreviewName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    width: 50,
  },
  dayPreviewFocus: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  moreDays: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  viewDetails: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
  },
  viewDetailsText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});
