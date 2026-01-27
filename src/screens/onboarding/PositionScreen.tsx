import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';
import { PaintballPosition, POSITION_BIAS_CONFIGS } from '../../types/paintball';

interface PositionScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const POSITIONS: { id: PaintballPosition; label: string; icon: string; traits: string[] }[] = [
  {
    id: 'front',
    label: 'Front Player',
    icon: 'F',
    traits: ['First off the break', 'Close-range eliminations', 'Quick reflexes', 'High mobility'],
  },
  {
    id: 'mid',
    label: 'Mid Player',
    icon: 'M',
    traits: ['Supports both ends', 'Transitions field', 'Fills gaps', 'Versatile role'],
  },
  {
    id: 'back',
    label: 'Back Player',
    icon: 'B',
    traits: ['Lane control', 'Communications', 'Zone shooting', 'Anchors the team'],
  },
];

export const PositionScreen: React.FC<PositionScreenProps> = ({ onNext, onBack }) => {
  const { onboardingDraft, updateOnboardingDraft } = usePlayerProfileStore();
  const [selected, setSelected] = useState<PaintballPosition | null>(
    onboardingDraft.primaryPosition || null
  );

  const handleSelect = (position: PaintballPosition) => {
    setSelected(position);
  };

  const handleNext = () => {
    if (selected) {
      updateOnboardingDraft({ primaryPosition: selected });
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
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.stepLabel}>Step 2 of 6</Text>
        <Text style={styles.title}>What's your primary position?</Text>
        <Text style={styles.subtitle}>
          This shapes your activation, conditioning, and movement patterns
        </Text>

        <View style={styles.options}>
          {POSITIONS.map((position) => {
            const isSelected = selected === position.id;
            const config = POSITION_BIAS_CONFIGS[position.id];

            return (
              <TouchableOpacity
                key={position.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleSelect(position.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                  <Text style={[styles.optionIconText, isSelected && styles.optionIconTextSelected]}>
                    {position.icon}
                  </Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {position.label}
                  </Text>
                  <View style={styles.traits}>
                    {position.traits.map((trait, index) => (
                      <Text key={index} style={styles.trait}>
                        {trait}
                      </Text>
                    ))}
                  </View>
                  {isSelected && (
                    <View style={styles.trainingFocus}>
                      <Text style={styles.trainingFocusLabel}>Training Focus:</Text>
                      <Text style={styles.trainingFocusText}>{config.description}</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selected}
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
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#2a2a2a',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionIconSelected: {
    backgroundColor: colors.primary,
  },
  optionIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
  optionIconTextSelected: {
    color: '#fff',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trait: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trainingFocus: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  trainingFocusLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  trainingFocusText: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 18,
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
