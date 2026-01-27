import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';
import { TrainingPhase, PHASE_MODIFIERS } from '../../types/paintball';

interface PhaseScreenProps {
  onNext: () => void;
  onBack: () => void;
}

type PhaseOption = TrainingPhase | 'just_improving';

const PHASES: { id: PhaseOption; label: string; icon: string; description: string }[] = [
  {
    id: 'just_improving',
    label: 'Just Getting Better',
    icon: '💪',
    description: "I'm not playing tournaments yet. Just want to get fitter for paintball.",
  },
  {
    id: 'off_season',
    label: 'Off-Season',
    icon: '🔨',
    description: 'No tournaments coming up. Time to build strength and fix weaknesses.',
  },
  {
    id: 'in_season',
    label: 'In-Season',
    icon: '⚡',
    description: 'Regular events throughout. Maintain fitness while staying fresh.',
  },
  {
    id: 'pre_tournament',
    label: 'Tournament Coming Up',
    icon: '🎯',
    description: 'Big event approaching. Time to peak performance.',
  },
];

export const PhaseScreen: React.FC<PhaseScreenProps> = ({ onNext, onBack }) => {
  const { onboardingDraft, updateOnboardingDraft } = usePlayerProfileStore();
  const [phase, setPhase] = useState<PhaseOption | null>(
    onboardingDraft.currentPhase || null
  );
  const [tournamentDate, setTournamentDate] = useState<Date | null>(
    onboardingDraft.nextTournamentDate ? new Date(onboardingDraft.nextTournamentDate) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelectPhase = (selectedPhase: PhaseOption) => {
    setPhase(selectedPhase);
    if (selectedPhase !== 'pre_tournament') {
      setTournamentDate(null);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setTournamentDate(selectedDate);
    }
  };

  const handleNext = () => {
    if (phase) {
      // Map 'just_improving' to 'off_season' for storage but track the intent
      const actualPhase: TrainingPhase = phase === 'just_improving' ? 'off_season' : phase;
      updateOnboardingDraft({
        currentPhase: actualPhase,
        nextTournamentDate: tournamentDate?.toISOString().split('T')[0],
      });
      onNext();
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.stepLabel}>Step 4 of 5</Text>
        <Text style={styles.title}>Where are you in your season?</Text>
        <Text style={styles.subtitle}>
          This helps us adjust training volume and intensity
        </Text>

        <View style={styles.options}>
          {PHASES.map((phaseOption) => {
            const isSelected = phase === phaseOption.id;

            return (
              <TouchableOpacity
                key={phaseOption.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleSelectPhase(phaseOption.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                  <Text style={styles.optionIconText}>{phaseOption.icon}</Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {phaseOption.label}
                  </Text>
                  <Text style={styles.optionDescription}>{phaseOption.description}</Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tournament Date Picker (only for pre_tournament) */}
        {phase === 'pre_tournament' && (
          <View style={styles.dateSection}>
            <Text style={styles.dateSectionTitle}>When is your next tournament?</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonIcon}>📅</Text>
              <Text style={styles.dateButtonText}>
                {tournamentDate ? formatDate(tournamentDate) : 'Select date'}
              </Text>
            </TouchableOpacity>

            {tournamentDate && (
              <View style={styles.taperInfo}>
                <Text style={styles.taperTitle}>Auto-Taper Enabled</Text>
                <Text style={styles.taperText}>
                  Your training will automatically reduce volume as the tournament approaches to ensure you peak on game day.
                </Text>
              </View>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={tournamentDate || minDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={minDate}
                themeVariant="dark"
              />
            )}

            {Platform.OS === 'ios' && showDatePicker && (
              <TouchableOpacity
                style={styles.dateConfirmButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.dateConfirmText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !phase && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!phase}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  progressDotCompleted: {
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  placeholder: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  stepLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    lineHeight: 24,
    marginBottom: 32,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  optionSelected: {
    borderColor: colors.primary,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIconSelected: {
    backgroundColor: 'rgba(231, 167, 0, 0.2)',
  },
  optionIconText: {
    fontSize: 22,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  dateSection: {
    marginTop: 24,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  dateButtonIcon: {
    fontSize: 18,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  taperInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.3)',
  },
  taperTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  taperText: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 18,
  },
  dateConfirmButton: {
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  dateConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
