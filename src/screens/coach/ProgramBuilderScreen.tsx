import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useCoachStore } from '../../store/coachStore';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme';

interface ProgramBuilderScreenProps {
  onBack: () => void;
  onEditDay: (dayIndex: number) => void;
  onComplete: () => void;
}

export const ProgramBuilderScreen: React.FC<ProgramBuilderScreenProps> = ({
  onBack,
  onEditDay,
  onComplete,
}) => {
  const { user } = useAuthStore();
  const {
    programBuilder,
    isEditingProgram,
    setProgramName,
    setProgramDescription,
    initNewProgram,
    createProgram,
    saveProgram,
    clearProgramBuilder,
  } = useCoachStore();

  const [daysPerWeek, setDaysPerWeek] = useState(programBuilder.daysPerWeek);
  const [isSelectingDays, setIsSelectingDays] = useState(!isEditingProgram && !programBuilder.name);

  const handleDaysSelected = () => {
    initNewProgram(daysPerWeek);
    setIsSelectingDays(false);
  };

  const handleSave = async () => {
    if (!programBuilder.name.trim()) {
      Alert.alert('Error', 'Please enter a program name');
      return;
    }

    if (!user?.id) return;

    let success = false;
    if (isEditingProgram) {
      success = await saveProgram(isEditingProgram);
    } else {
      const program = await createProgram(user.id);
      success = !!program;
    }

    if (success) {
      clearProgramBuilder();
      onComplete();
    } else {
      Alert.alert('Error', 'Failed to save program. Please try again.');
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes?',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            clearProgramBuilder();
            onBack();
          },
        },
      ]
    );
  };

  const getTotalExercises = (dayIndex: number) => {
    return programBuilder.days[dayIndex]?.sections.reduce(
      (acc, section) => acc + section.exercises.length,
      0
    ) || 0;
  };

  // Day selection screen
  if (isSelectingDays) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New Program</Text>
          <Text style={styles.subtitle}>How many days per week?</Text>
        </View>

        <View style={styles.daysContainer}>
          <View style={styles.daysSelector}>
            {[2, 3, 4, 5, 6].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.dayOption,
                  daysPerWeek === num && styles.dayOptionSelected,
                ]}
                onPress={() => setDaysPerWeek(num)}
              >
                <Text
                  style={[
                    styles.dayOptionText,
                    daysPerWeek === num && styles.dayOptionTextSelected,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.daysLabel}>
            {daysPerWeek} day{daysPerWeek !== 1 ? 's' : ''} per week
          </Text>

          <TouchableOpacity style={styles.continueButton} onPress={handleDaysSelected}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditingProgram ? 'Edit Program' : 'Build Program'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Program Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Program Name"
            placeholderTextColor="#666"
            value={programBuilder.name}
            onChangeText={setProgramName}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            placeholderTextColor="#666"
            value={programBuilder.description}
            onChangeText={setProgramDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Days */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Days</Text>
          {programBuilder.days.map((day, index) => {
            const exerciseCount = getTotalExercises(index);
            const sectionCount = day.sections.length;

            return (
              <TouchableOpacity
                key={day.id}
                style={styles.dayCard}
                onPress={() => onEditDay(index)}
              >
                <View style={styles.dayInfo}>
                  <Text style={styles.dayNumber}>Day {day.dayNumber}</Text>
                  <Text style={styles.dayName}>{day.name}</Text>
                  {day.focus && <Text style={styles.dayFocus}>{day.focus}</Text>}
                  <Text style={styles.dayStats}>
                    {sectionCount} section{sectionCount !== 1 ? 's' : ''} •{' '}
                    {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={styles.dayStatus}>
                  {exerciseCount > 0 ? (
                    <View style={styles.statusComplete}>
                      <Text style={styles.statusCompleteText}>✓</Text>
                    </View>
                  ) : (
                    <Text style={styles.setupText}>Set up →</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditingProgram ? 'Save Changes' : 'Create Program'}
          </Text>
        </TouchableOpacity>
      </View>
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
  daysContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dayOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dayOptionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#888',
  },
  dayOptionTextSelected: {
    color: '#fff',
  },
  daysLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  dayInfo: {
    flex: 1,
  },
  dayNumber: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  dayFocus: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  dayStats: {
    fontSize: 12,
    color: '#666',
  },
  dayStatus: {
    marginLeft: 12,
  },
  statusComplete: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCompleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  setupText: {
    color: colors.primary,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});
