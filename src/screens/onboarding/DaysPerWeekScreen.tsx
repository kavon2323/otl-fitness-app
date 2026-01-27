import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';

interface DaysPerWeekScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const DAYS_OPTIONS = [
  { value: 2, label: '2 days', description: 'Minimal but effective' },
  { value: 3, label: '3 days', description: 'Balanced approach' },
  { value: 4, label: '4 days', description: 'Serious training' },
];

export const DaysPerWeekScreen: React.FC<DaysPerWeekScreenProps> = ({ onNext, onBack }) => {
  const { onboardingDraft, updateOnboardingDraft } = usePlayerProfileStore();
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(
    onboardingDraft.trainingDaysPerWeek || null
  );

  const handleSelect = (days: number) => {
    setDaysPerWeek(days);
  };

  const handleNext = () => {
    if (daysPerWeek) {
      updateOnboardingDraft({
        trainingDaysPerWeek: daysPerWeek,
      });
      onNext();
    }
  };

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
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stepLabel}>Step 5 of 5</Text>
        <Text style={styles.title}>How many days can you train?</Text>
        <Text style={styles.subtitle}>
          Outside of field time, how many days a week can you get to the gym?
        </Text>

        <View style={styles.options}>
          {DAYS_OPTIONS.map((option) => {
            const isSelected = daysPerWeek === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleSelect(option.value)}
                activeOpacity={0.8}
              >
                <View style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>
                  <Text style={[styles.dayNumberText, isSelected && styles.dayNumberTextSelected]}>
                    {option.value}
                  </Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {option.label}
                  </Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>We'll build your program</Text>
          <Text style={styles.infoText}>
            Based on your availability, we'll create a training schedule that maximizes your results without burning you out before game day.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !daysPerWeek && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!daysPerWeek}
        >
          <Text style={styles.nextButtonText}>Review My Profile</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  optionSelected: {
    borderColor: colors.primary,
  },
  dayNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  dayNumberSelected: {
    backgroundColor: colors.primary,
  },
  dayNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
  dayNumberTextSelected: {
    color: '#fff',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: '#888',
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
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.2)',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
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
