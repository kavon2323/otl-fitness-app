import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { allPrograms } from '../data/programs';
import { Program } from '../types';
import { colors } from '../theme';

interface ProgramSelectScreenProps {
  onSelectProgram: (program: Program) => void;
  onBack: () => void;
}

export const ProgramSelectScreen: React.FC<ProgramSelectScreenProps> = ({
  onSelectProgram,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select a Program</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Choose a training program that fits your schedule
        </Text>

        {allPrograms.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={styles.programCard}
            onPress={() => onSelectProgram(program)}
          >
            <View style={styles.programHeader}>
              <Text style={styles.programName}>{program.name}</Text>
              <View style={styles.daysPerWeekBadge}>
                <Text style={styles.daysPerWeekText}>
                  {program.daysPerWeek} days/week
                </Text>
              </View>
            </View>

            {program.description && (
              <Text style={styles.programDescription}>{program.description}</Text>
            )}

            <View style={styles.programDetails}>
              {program.days.map((day) => (
                <View key={day.id} style={styles.dayPill}>
                  <Text style={styles.dayPillText}>
                    {day.focus || day.name}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.selectRow}>
              <Text style={styles.selectText}>Select Program →</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  programCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  programName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  daysPerWeekBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  daysPerWeekText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  programDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    lineHeight: 20,
  },
  programDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayPill: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dayPillText: {
    color: '#aaa',
    fontSize: 12,
  },
  selectRow: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  selectText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
