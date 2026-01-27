import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';
import { FieldSideBias, SIDE_BIAS_CONFIGS } from '../../types/paintball';

interface SideBiasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const SIDES: { id: FieldSideBias; label: string; icon: string; description: string }[] = [
  {
    id: 'snake',
    label: 'Snake Side',
    icon: 'S',
    description: 'Left side of field - tight bunkers, crawling, low positions',
  },
  {
    id: 'dorito',
    label: 'Dorito Side',
    icon: 'D',
    description: 'Right side of field - standing bunkers, lateral movement, vertical play',
  },
  {
    id: 'both',
    label: 'Both Sides',
    icon: 'B',
    description: 'Versatile - comfortable playing either side based on layout',
  },
];

export const SideBiasScreen: React.FC<SideBiasScreenProps> = ({ onNext, onBack }) => {
  const { onboardingDraft, updateOnboardingDraft } = usePlayerProfileStore();
  const [selected, setSelected] = useState<FieldSideBias | null>(
    onboardingDraft.fieldSideBias || null
  );

  const handleSelect = (side: FieldSideBias) => {
    setSelected(side);
  };

  const handleNext = () => {
    if (selected) {
      updateOnboardingDraft({ fieldSideBias: selected });
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
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.stepLabel}>Step 3 of 6</Text>
        <Text style={styles.title}>Which side do you prefer?</Text>
        <Text style={styles.subtitle}>
          Your hip mobility and movement prep will be tailored to your side
        </Text>

        {/* Field Diagram */}
        <View style={styles.fieldDiagram}>
          <View style={styles.field}>
            <View style={[styles.fieldSide, styles.snakeSide]}>
              <Text style={styles.fieldSideText}>Snake</Text>
              <View style={styles.bunkers}>
                <View style={styles.bunker} />
                <View style={styles.bunker} />
                <View style={styles.bunker} />
              </View>
            </View>
            <View style={styles.fieldCenter}>
              <View style={styles.centerLine} />
              <Text style={styles.centerText}>50</Text>
            </View>
            <View style={[styles.fieldSide, styles.doritoSide]}>
              <Text style={styles.fieldSideText}>Dorito</Text>
              <View style={styles.bunkers}>
                <View style={[styles.bunker, styles.doritoBunker]} />
                <View style={[styles.bunker, styles.doritoBunker]} />
                <View style={[styles.bunker, styles.doritoBunker]} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.options}>
          {SIDES.map((side) => {
            const isSelected = selected === side.id;
            const config = SIDE_BIAS_CONFIGS[side.id];

            return (
              <TouchableOpacity
                key={side.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleSelect(side.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                  <Text style={[styles.optionIconText, isSelected && styles.optionIconTextSelected]}>
                    {side.icon}
                  </Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {side.label}
                  </Text>
                  <Text style={styles.optionDescription}>{side.description}</Text>
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
    marginBottom: 24,
  },
  fieldDiagram: {
    marginBottom: 24,
    alignItems: 'center',
  },
  field: {
    width: '100%',
    height: 100,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  fieldSide: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  snakeSide: {
    backgroundColor: '#1e3a2a',
  },
  doritoSide: {
    backgroundColor: '#3a2a1e',
  },
  fieldSideText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  bunkers: {
    flexDirection: 'row',
    gap: 8,
  },
  bunker: {
    width: 16,
    height: 40,
    backgroundColor: '#444',
    borderRadius: 4,
  },
  doritoBunker: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
  },
  fieldCenter: {
    width: 2,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#555',
  },
  centerText: {
    color: '#666',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 4,
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
    backgroundColor: colors.primary,
  },
  optionIconText: {
    fontSize: 18,
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
