import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { allPrograms } from '../data/programs';
import { useProgramStore } from '../store/programStore';
import { Program } from '../types';
import { colors } from '../theme';

interface ProgramsScreenProps {
  onSelectProgram: (program: Program) => void;
  onOpenGenerator?: () => void;
}

export const ProgramsScreen: React.FC<ProgramsScreenProps> = ({
  onSelectProgram,
  onOpenGenerator,
}) => {
  const { currentProgramId } = useProgramStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programs</Text>
        <Text style={styles.subtitle}>Browse training programs</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Workout Generator Card */}
        {onOpenGenerator && (
          <TouchableOpacity style={styles.generatorCard} onPress={onOpenGenerator}>
            <View style={styles.generatorIcon}>
              <Text style={styles.generatorIconText}>⚡</Text>
            </View>
            <View style={styles.generatorContent}>
              <Text style={styles.generatorTitle}>Generate Workout</Text>
              <Text style={styles.generatorDescription}>
                Create a custom workout based on your equipment and goals
              </Text>
            </View>
            <Text style={styles.generatorArrow}>→</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Training Programs</Text>

        {allPrograms.map((program) => {
          const isCurrentProgram = program.id === currentProgramId;
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
              ]}
              onPress={() => onSelectProgram(program)}
            >
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
                  <Text style={styles.statLabel}>workouts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{totalExercises}</Text>
                  <Text style={styles.statLabel}>exercises</Text>
                </View>
              </View>
              <View style={styles.daysPreview}>
                {program.days.map((day) => (
                  <View key={day.id} style={styles.dayPreview}>
                    <Text style={styles.dayPreviewName}>Day {day.dayNumber}</Text>
                    <Text style={styles.dayPreviewFocus} numberOfLines={1}>
                      {day.focus || day.name}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.viewDetails}>
                <Text style={styles.viewDetailsText}>
                  {isCurrentProgram ? 'View Details' : 'View Program'} →
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  content: {
    flex: 1,
    padding: 20,
  },
  generatorCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  generatorIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  generatorIconText: {
    fontSize: 24,
  },
  generatorContent: {
    flex: 1,
  },
  generatorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  generatorDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  generatorArrow: {
    fontSize: 20,
    color: colors.primary,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
