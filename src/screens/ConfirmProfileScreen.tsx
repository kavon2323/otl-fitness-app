import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { usePlayerProfileStore } from '../store/playerProfileStore';
import {
  formatPosition,
  formatSideBias,
  formatPhase,
  PaintballPosition,
  FieldSideBias,
  TrainingPhase,
  POSITION_BIAS_CONFIGS,
  SIDE_BIAS_CONFIGS,
} from '../types/paintball';

interface ConfirmProfileScreenProps {
  onGenerateProgram: () => void;
  onBack: () => void;
}

type EditField = 'position' | 'sideBias' | 'phase' | 'daysPerWeek' | null;

export const ConfirmProfileScreen: React.FC<ConfirmProfileScreenProps> = ({
  onGenerateProgram,
  onBack,
}) => {
  const { profile, updateProfile, startNewProgramCycle, isLoading } = usePlayerProfileStore();
  const [editingField, setEditingField] = useState<EditField>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!profile || !profile.primaryPosition || !profile.fieldSideBias || !profile.currentPhase) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.errorText, { marginTop: 16 }]}>Loading profile...</Text>
      </View>
    );
  }

  // Safely get configs with fallbacks
  const positionConfig = POSITION_BIAS_CONFIGS[profile.primaryPosition] || POSITION_BIAS_CONFIGS.mid;
  const sideConfig = SIDE_BIAS_CONFIGS[profile.fieldSideBias] || SIDE_BIAS_CONFIGS.both;

  const handleGenerateProgram = async () => {
    setIsGenerating(true);

    // Navigate to program overview FIRST, before updating profile
    // This prevents the component from being unmounted during the profile update
    onGenerateProgram();

    // Start a new training cycle (sets programStartDate to today) - fire and forget
    startNewProgramCycle().then((result) => {
      if (result.error) {
        console.error('Error starting program cycle:', result.error);
      }
    });
  };

  const handleUpdatePosition = async (position: PaintballPosition) => {
    await updateProfile({ primaryPosition: position });
    setEditingField(null);
  };

  const handleUpdateSideBias = async (sideBias: FieldSideBias) => {
    await updateProfile({ fieldSideBias: sideBias });
    setEditingField(null);
  };

  const handleUpdatePhase = async (phase: TrainingPhase) => {
    await updateProfile({ currentPhase: phase });
    setEditingField(null);
  };

  const handleUpdateDaysPerWeek = async (days: number) => {
    await updateProfile({ trainingDaysPerWeek: days });
    setEditingField(null);
  };

  const formatTournamentDate = () => {
    if (!profile.nextTournamentDate) return null;
    const date = new Date(profile.nextTournamentDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const tournamentDate = formatTournamentDate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Training Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Review your settings below. These determine how your workout is personalized.
        </Text>

        {/* Profile Settings Card */}
        <View style={styles.settingsCard}>
          <ProfileRow
            label="Position"
            value={formatPosition(profile.primaryPosition)}
            hint={positionConfig.description}
            onEdit={() => setEditingField('position')}
          />

          <View style={styles.divider} />

          <ProfileRow
            label="Field Side"
            value={formatSideBias(profile.fieldSideBias)}
            hint={sideConfig.description}
            onEdit={() => setEditingField('sideBias')}
          />

          <View style={styles.divider} />

          <ProfileRow
            label="Training Phase"
            value={formatPhase(profile.currentPhase)}
            hint={
              profile.currentPhase === 'pre_tournament' && tournamentDate
                ? `Tournament: ${tournamentDate}`
                : profile.currentPhase === 'off_season'
                ? 'Higher volume for strength gains'
                : profile.currentPhase === 'in_season'
                ? 'Maintenance with optimal recovery'
                : 'Balanced training for overall improvement'
            }
            onEdit={() => setEditingField('phase')}
          />

          <View style={styles.divider} />

          <ProfileRow
            label="Training Days"
            value={`${profile.trainingDaysPerWeek} days per week`}
            hint={`${profile.trainingDaysPerWeek === 2 ? 'Full body' : profile.trainingDaysPerWeek === 3 ? 'Push/Pull/Legs' : 'Upper/Lower split'} program structure`}
            onEdit={() => setEditingField('daysPerWeek')}
          />
        </View>

        {/* What You'll Get Section */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>What You'll Get</Text>
          <View style={styles.summaryBullets}>
            <View style={styles.summaryItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.summaryText}>
                {profile.trainingDaysPerWeek}-day program tailored for {formatPosition(profile.primaryPosition).toLowerCase()}s
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.summaryText}>
                Mobility and strength exercises for {formatSideBias(profile.fieldSideBias).toLowerCase()} play
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.summaryText}>
                Volume and intensity adjusted for{' '}
                {profile.currentPhase === 'off_season'
                  ? 'off-season building'
                  : profile.currentPhase === 'pre_tournament'
                  ? 'tournament peaking'
                  : profile.currentPhase === 'in_season'
                  ? 'in-season maintenance'
                  : 'general improvement'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.summaryText}>
                12-week training cycle (Eccentric → Isometric → Concentric)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.generateButton, (isLoading || isGenerating) && styles.generateButtonDisabled]}
          onPress={handleGenerateProgram}
          disabled={isLoading || isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Ionicons name="flash" size={22} color="#000" style={styles.buttonIcon} />
              <Text style={styles.generateButtonText}>Generate My Program</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Position Picker Modal */}
      <EditModal
        visible={editingField === 'position'}
        title="Select Position"
        onClose={() => setEditingField(null)}
      >
        {(['front', 'mid', 'back'] as PaintballPosition[]).map((pos) => (
          <OptionButton
            key={pos}
            label={formatPosition(pos)}
            description={POSITION_BIAS_CONFIGS[pos].description}
            selected={profile.primaryPosition === pos}
            onPress={() => handleUpdatePosition(pos)}
          />
        ))}
      </EditModal>

      {/* Side Bias Picker Modal */}
      <EditModal
        visible={editingField === 'sideBias'}
        title="Select Field Side"
        onClose={() => setEditingField(null)}
      >
        {(['snake', 'dorito', 'both'] as FieldSideBias[]).map((side) => (
          <OptionButton
            key={side}
            label={formatSideBias(side)}
            description={SIDE_BIAS_CONFIGS[side].description}
            selected={profile.fieldSideBias === side}
            onPress={() => handleUpdateSideBias(side)}
          />
        ))}
      </EditModal>

      {/* Phase Picker Modal */}
      <EditModal
        visible={editingField === 'phase'}
        title="Select Training Phase"
        onClose={() => setEditingField(null)}
      >
        {(['off_season', 'pre_tournament', 'in_season', 'just_getting_better'] as TrainingPhase[]).map((phase) => (
          <OptionButton
            key={phase}
            label={formatPhase(phase)}
            description={
              phase === 'off_season'
                ? 'Higher volume to build strength and muscle'
                : phase === 'pre_tournament'
                ? 'Peaking protocols with auto-taper'
                : phase === 'in_season'
                ? 'Maintenance with focus on recovery'
                : 'Balanced training for overall improvement'
            }
            selected={profile.currentPhase === phase}
            onPress={() => handleUpdatePhase(phase)}
          />
        ))}
      </EditModal>

      {/* Days Per Week Picker Modal */}
      <EditModal
        visible={editingField === 'daysPerWeek'}
        title="Training Days Per Week"
        onClose={() => setEditingField(null)}
      >
        {[2, 3, 4].map((days) => (
          <OptionButton
            key={days}
            label={`${days} Days`}
            description={
              days === 2
                ? 'Full body workouts, ideal for busy schedules'
                : days === 3
                ? 'Push/Pull/Legs split, balanced approach'
                : 'Upper/Lower split, maximizes training frequency'
            }
            selected={profile.trainingDaysPerWeek === days}
            onPress={() => handleUpdateDaysPerWeek(days)}
          />
        ))}
      </EditModal>
    </View>
  );
};

// Profile Row Component
interface ProfileRowProps {
  label: string;
  value: string;
  hint?: string;
  onEdit: () => void;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ label, value, hint, onEdit }) => (
  <TouchableOpacity style={styles.profileRow} onPress={onEdit}>
    <View style={styles.profileRowContent}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
      {hint && <Text style={styles.profileHint}>{hint}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
  </TouchableOpacity>
);

// Edit Modal Component
interface EditModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({ visible, title, onClose, children }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalOptions}>{children}</ScrollView>
      </View>
    </View>
  </Modal>
);

// Option Button Component
interface OptionButtonProps {
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, description, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    <View style={styles.optionContent}>
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
    {selected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
    marginBottom: 24,
  },
  settingsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileRowContent: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileHint: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
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
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  summaryBullets: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  generateButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalOptions: {
    padding: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});
