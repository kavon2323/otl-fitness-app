import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';
import { Division, DIVISION_CONFIGS, getExperienceLevel } from '../../types/paintball';

interface ExperienceScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const DIVISIONS: Division[] = ['recreational', 'D5', 'D4', 'D3', 'D2', 'D1', 'Pro'];

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ onNext, onBack }) => {
  const { onboardingDraft, updateOnboardingDraft } = usePlayerProfileStore();
  const [division, setDivision] = useState<Division | null>(
    onboardingDraft.currentDivision || null
  );
  const [years, setYears] = useState(onboardingDraft.yearsExperience ?? 0);

  const experienceLevel = getExperienceLevel(years);

  const handleNext = () => {
    if (division !== null) {
      updateOnboardingDraft({
        currentDivision: division,
        yearsExperience: years,
      });
      onNext();
    }
  };

  const getExperienceLevelLabel = () => {
    switch (experienceLevel) {
      case 'beginner':
        return { label: 'Beginner', color: '#4CAF50', description: 'Building foundations' };
      case 'intermediate':
        return { label: 'Intermediate', color: '#FF9800', description: 'Developing skills' };
      case 'advanced':
        return { label: 'Advanced', color: '#F44336', description: 'Peak performance' };
    }
  };

  const levelInfo = getExperienceLevelLabel();

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
          <View style={styles.progressDot} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.stepLabel}>Step 4 of 6</Text>
        <Text style={styles.title}>Your experience level</Text>
        <Text style={styles.subtitle}>
          This helps us set appropriate volume and exercise complexity
        </Text>

        {/* Division Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Division</Text>
          <View style={styles.divisionGrid}>
            {DIVISIONS.map((div) => {
              const config = DIVISION_CONFIGS[div];
              const isSelected = division === div;

              return (
                <TouchableOpacity
                  key={div}
                  style={[styles.divisionOption, isSelected && styles.divisionOptionSelected]}
                  onPress={() => setDivision(div)}
                >
                  <Text
                    style={[styles.divisionLabel, isSelected && styles.divisionLabelSelected]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {division && (
            <Text style={styles.divisionDescription}>
              {DIVISION_CONFIGS[division].description}
            </Text>
          )}
        </View>

        {/* Years of Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Years Playing Competitively</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.yearsValue}>{years}</Text>
            <Text style={styles.yearsLabel}>
              {years === 1 ? 'year' : 'years'}
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20}
            step={1}
            value={years}
            onValueChange={setYears}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#333"
            thumbTintColor={colors.primary}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>New</Text>
            <Text style={styles.sliderLabel}>5</Text>
            <Text style={styles.sliderLabel}>10</Text>
            <Text style={styles.sliderLabel}>15</Text>
            <Text style={styles.sliderLabel}>20+</Text>
          </View>
        </View>

        {/* Experience Level Display */}
        <View style={styles.levelCard}>
          <View style={[styles.levelBadge, { backgroundColor: levelInfo.color }]}>
            <Text style={styles.levelBadgeText}>{levelInfo.label}</Text>
          </View>
          <Text style={styles.levelDescription}>{levelInfo.description}</Text>
          <View style={styles.levelDetails}>
            <View style={styles.levelDetail}>
              <Text style={styles.levelDetailLabel}>Volume</Text>
              <Text style={styles.levelDetailValue}>
                {experienceLevel === 'beginner' ? 'Lower' : experienceLevel === 'intermediate' ? 'Moderate' : 'Higher'}
              </Text>
            </View>
            <View style={styles.levelDetail}>
              <Text style={styles.levelDetailLabel}>Complexity</Text>
              <Text style={styles.levelDetailValue}>
                {experienceLevel === 'beginner' ? 'Basic' : experienceLevel === 'intermediate' ? 'Intermediate' : 'Advanced'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !division && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!division}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  divisionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  divisionOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  divisionOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
  },
  divisionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  divisionLabelSelected: {
    color: colors.primary,
  },
  divisionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  yearsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  yearsLabel: {
    fontSize: 18,
    color: '#888',
    marginLeft: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
  levelCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  levelBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  levelDescription: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
  },
  levelDetails: {
    flexDirection: 'row',
    gap: 24,
  },
  levelDetail: {},
  levelDetailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  levelDetailValue: {
    fontSize: 14,
    color: '#fff',
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
