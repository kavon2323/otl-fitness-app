import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors } from '../../theme';
import { usePlayerProfileStore } from '../../store/playerProfileStore';
import {
  formatPosition,
  formatSideBias,
  formatPhase,
  DIVISION_CONFIGS,
  getExperienceLevel,
} from '../../types/paintball';

interface ReviewScreenProps {
  onComplete: () => void;
  onBack: () => void;
  onEditPosition: () => void;
  onEditSideBias: () => void;
  onEditExperience: () => void;
  onEditPhase: () => void;
  onEditDaysPerWeek: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  onComplete,
  onBack,
  onEditPosition,
  onEditSideBias,
  onEditExperience,
  onEditPhase,
  onEditDaysPerWeek,
}) => {
  const { onboardingDraft, createProfile, isLoading } = usePlayerProfileStore();
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setError(null);

    // Validate all fields are present
    if (
      !onboardingDraft.primaryPosition ||
      !onboardingDraft.fieldSideBias ||
      !onboardingDraft.currentDivision ||
      onboardingDraft.yearsExperience === undefined ||
      !onboardingDraft.currentPhase ||
      !onboardingDraft.trainingDaysPerWeek
    ) {
      Alert.alert('Incomplete Profile', 'Please fill in all fields before continuing.');
      return;
    }

    const result = await createProfile(onboardingDraft);

    if (result.error) {
      setError(result.error);
      Alert.alert('Error', result.error);
    } else {
      onComplete();
    }
  };

  const experienceLevel = onboardingDraft.yearsExperience !== undefined
    ? getExperienceLevel(onboardingDraft.yearsExperience)
    : 'beginner';

  const formatTournamentDate = () => {
    if (!onboardingDraft.nextTournamentDate) return 'Not set';
    const date = new Date(onboardingDraft.nextTournamentDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDaysPerWeek = () => {
    if (!onboardingDraft.trainingDaysPerWeek) return 'Not set';
    return `${onboardingDraft.trainingDaysPerWeek} days`;
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
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Review your profile</Text>
        <Text style={styles.subtitle}>
          Make sure everything looks correct. You can change this later in settings.
        </Text>

        <View style={styles.reviewCard}>
          <ReviewItem
            label="Position"
            value={onboardingDraft.primaryPosition ? formatPosition(onboardingDraft.primaryPosition) : 'Not set'}
            onEdit={onEditPosition}
          />

          <View style={styles.divider} />

          <ReviewItem
            label="Field Side"
            value={onboardingDraft.fieldSideBias ? formatSideBias(onboardingDraft.fieldSideBias) : 'Not set'}
            onEdit={onEditSideBias}
          />

          <View style={styles.divider} />

          <ReviewItem
            label="Division"
            value={onboardingDraft.currentDivision ? DIVISION_CONFIGS[onboardingDraft.currentDivision].label : 'Not set'}
            onEdit={onEditExperience}
          />

          <View style={styles.divider} />

          <ReviewItem
            label="Experience"
            value={
              onboardingDraft.yearsExperience !== undefined
                ? `${onboardingDraft.yearsExperience} years (${experienceLevel})`
                : 'Not set'
            }
            onEdit={onEditExperience}
          />

          <View style={styles.divider} />

          <ReviewItem
            label="Training Phase"
            value={onboardingDraft.currentPhase ? formatPhase(onboardingDraft.currentPhase) : 'Not set'}
            onEdit={onEditPhase}
          />

          {onboardingDraft.currentPhase === 'pre_tournament' && onboardingDraft.nextTournamentDate && (
            <>
              <View style={styles.divider} />
              <ReviewItem
                label="Tournament Date"
                value={formatTournamentDate()}
                onEdit={onEditPhase}
              />
            </>
          )}

          <View style={styles.divider} />

          <ReviewItem
            label="Training Days"
            value={formatDaysPerWeek()}
            onEdit={onEditDaysPerWeek}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Training Plan</Text>
          <Text style={styles.summaryText}>
            Based on your profile, your workouts will emphasize:
          </Text>
          <View style={styles.summaryBullets}>
            {onboardingDraft.primaryPosition && (
              <Text style={styles.summaryBullet}>
                • Movement patterns for {formatPosition(onboardingDraft.primaryPosition).toLowerCase()}s
              </Text>
            )}
            {onboardingDraft.fieldSideBias && (
              <Text style={styles.summaryBullet}>
                • Mobility work for {formatSideBias(onboardingDraft.fieldSideBias).toLowerCase()} play
              </Text>
            )}
            {onboardingDraft.currentPhase && (
              <Text style={styles.summaryBullet}>
                • {onboardingDraft.currentPhase === 'off_season'
                  ? 'Higher volume for building strength'
                  : onboardingDraft.currentPhase === 'pre_tournament'
                  ? 'Peaking protocols with auto-taper'
                  : 'Maintenance with optimal recovery'}
              </Text>
            )}
            {onboardingDraft.trainingDaysPerWeek && (
              <Text style={styles.summaryBullet}>
                • {onboardingDraft.trainingDaysPerWeek}-day program structure
              </Text>
            )}
          </View>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, isLoading && styles.nextButtonDisabled]}
          onPress={handleComplete}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.nextButtonText}>Start Training</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ReviewItemProps {
  label: string;
  value: string;
  onEdit: () => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ label, value, onEdit }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewItemContent}>
      <Text style={styles.reviewItemLabel}>{label}</Text>
      <Text style={styles.reviewItemValue}>{value}</Text>
    </View>
    <TouchableOpacity onPress={onEdit} style={styles.editButton}>
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

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
  reviewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  reviewItemContent: {
    flex: 1,
  },
  reviewItemLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  reviewItemValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.3)',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
  },
  summaryBullets: {
    gap: 8,
  },
  summaryBullet: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
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
    opacity: 0.7,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
