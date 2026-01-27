import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { usePlayerProfileStore } from '../store/playerProfileStore';
import { useProgramStore } from '../store/programStore';
import { colors, typography, spacing, borderRadius } from '../theme';
import {
  PaintballPosition,
  FieldSideBias,
  TrainingPhase,
  Division,
  UpcomingTournament,
  formatPosition,
  formatSideBias,
  formatPhase,
  formatCyclePhase,
  calculateTrainingCycle,
  DIVISION_CONFIGS,
} from '../types/paintball';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { user, signOut } = useAuthStore();
  const { profile, updateProfile } = usePlayerProfileStore();
  const { resetProgram } = useProgramStore();

  // Edit mode states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempPosition, setTempPosition] = useState<PaintballPosition>(profile?.primaryPosition || 'mid');
  const [tempSideBias, setTempSideBias] = useState<FieldSideBias>(profile?.fieldSideBias || 'both');
  const [tempPhase, setTempPhase] = useState<TrainingPhase>(profile?.currentPhase || 'off_season');
  const [tempDivision, setTempDivision] = useState<Division>(profile?.currentDivision || 'recreational');
  const [tempDaysPerWeek, setTempDaysPerWeek] = useState<number>(profile?.trainingDaysPerWeek || 3);

  // Tournament management
  const [showAddTournament, setShowAddTournament] = useState(false);
  const [newTournamentName, setNewTournamentName] = useState('');
  const [newTournamentDate, setNewTournamentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculate training cycle
  const trainingCycle = profile?.programStartDate
    ? calculateTrainingCycle(profile.programStartDate)
    : null;

  const handleSaveSection = async (section: string) => {
    if (!profile) return;

    try {
      switch (section) {
        case 'position':
          await updateProfile({ primaryPosition: tempPosition });
          break;
        case 'sideBias':
          await updateProfile({ fieldSideBias: tempSideBias });
          break;
        case 'phase':
          await updateProfile({ currentPhase: tempPhase });
          break;
        case 'division':
          await updateProfile({ currentDivision: tempDivision });
          break;
        case 'daysPerWeek':
          await updateProfile({ trainingDaysPerWeek: tempDaysPerWeek });
          break;
      }
      setEditingSection(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleAddTournament = async () => {
    if (!newTournamentName.trim()) {
      Alert.alert('Error', 'Please enter a tournament name');
      return;
    }

    const newTournament: UpcomingTournament = {
      id: Date.now().toString(),
      name: newTournamentName.trim(),
      date: newTournamentDate.toISOString(),
    };

    const currentTournaments = profile?.upcomingTournaments || [];
    await updateProfile({
      upcomingTournaments: [...currentTournaments, newTournament],
      nextTournamentDate: newTournamentDate.toISOString(), // Update legacy field too
    });

    setNewTournamentName('');
    setNewTournamentDate(new Date());
    setShowAddTournament(false);
  };

  const handleRemoveTournament = async (tournamentId: string) => {
    const currentTournaments = profile?.upcomingTournaments || [];
    const updatedTournaments = currentTournaments.filter(t => t.id !== tournamentId);

    // Update next tournament date to the next upcoming one
    const nextTournament = updatedTournaments
      .filter(t => new Date(t.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    await updateProfile({
      upcomingTournaments: updatedTournaments,
      nextTournamentDate: nextTournament?.date || undefined,
    });
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const renderEditableRow = (
    label: string,
    value: string,
    section: string,
    children: React.ReactNode
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingHeader}>
        <Text style={styles.settingLabel}>{label}</Text>
        {editingSection === section ? (
          <View style={styles.editActions}>
            <TouchableOpacity onPress={() => setEditingSection(null)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSaveSection(section)}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setEditingSection(section)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {editingSection === section ? (
        <View style={styles.editContent}>{children}</View>
      ) : (
        <Text style={styles.settingValue}>{value}</Text>
      )}
    </View>
  );

  const renderOptionButton = (
    label: string,
    isSelected: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>{user?.email}</Text>
          </View>
        </View>

        {/* Training Profile Section */}
        <Text style={styles.sectionTitle}>TRAINING PROFILE</Text>
        <View style={styles.settingCard}>
          {renderEditableRow(
            'Position',
            formatPosition(profile?.primaryPosition || 'mid'),
            'position',
            <View style={styles.optionGrid}>
              {renderOptionButton('Front', tempPosition === 'front', () => setTempPosition('front'))}
              {renderOptionButton('Mid', tempPosition === 'mid', () => setTempPosition('mid'))}
              {renderOptionButton('Back', tempPosition === 'back', () => setTempPosition('back'))}
            </View>
          )}

          {renderEditableRow(
            'Field Side',
            formatSideBias(profile?.fieldSideBias || 'both'),
            'sideBias',
            <View style={styles.optionGrid}>
              {renderOptionButton('Snake', tempSideBias === 'snake', () => setTempSideBias('snake'))}
              {renderOptionButton('Dorito', tempSideBias === 'dorito', () => setTempSideBias('dorito'))}
              {renderOptionButton('Both', tempSideBias === 'both', () => setTempSideBias('both'))}
            </View>
          )}

          {renderEditableRow(
            'Training Phase',
            formatPhase(profile?.currentPhase || 'off_season'),
            'phase',
            <View style={styles.optionGrid}>
              {renderOptionButton('Off-Season', tempPhase === 'off_season', () => setTempPhase('off_season'))}
              {renderOptionButton('In-Season', tempPhase === 'in_season', () => setTempPhase('in_season'))}
              {renderOptionButton('Pre-Tournament', tempPhase === 'pre_tournament', () => setTempPhase('pre_tournament'))}
            </View>
          )}

          {renderEditableRow(
            'Division',
            DIVISION_CONFIGS[profile?.currentDivision || 'recreational'].label,
            'division',
            <View style={styles.optionGridWrap}>
              {Object.entries(DIVISION_CONFIGS).map(([key, config]) => (
                renderOptionButton(
                  config.label,
                  tempDivision === key,
                  () => setTempDivision(key as Division)
                )
              ))}
            </View>
          )}

          {renderEditableRow(
            'Gym Days Per Week',
            `${profile?.trainingDaysPerWeek || 3} days`,
            'daysPerWeek',
            <View style={styles.optionGrid}>
              {renderOptionButton('2 days', tempDaysPerWeek === 2, () => setTempDaysPerWeek(2))}
              {renderOptionButton('3 days', tempDaysPerWeek === 3, () => setTempDaysPerWeek(3))}
              {renderOptionButton('4 days', tempDaysPerWeek === 4, () => setTempDaysPerWeek(4))}
            </View>
          )}
        </View>

        {/* Training Cycle Section */}
        {trainingCycle && (
          <>
            <Text style={styles.sectionTitle}>CURRENT TRAINING CYCLE</Text>
            <View style={styles.settingCard}>
              <View style={styles.cycleInfo}>
                <View style={styles.cyclePhase}>
                  <Text style={styles.cyclePhaseLabel}>Current Phase</Text>
                  <Text style={styles.cyclePhaseValue}>
                    {formatCyclePhase(trainingCycle.currentPhase)}
                  </Text>
                </View>
                <View style={styles.cycleStats}>
                  <View style={styles.cycleStat}>
                    <Text style={styles.cycleStatValue}>{trainingCycle.weekInPhase}</Text>
                    <Text style={styles.cycleStatLabel}>Week</Text>
                  </View>
                  <View style={styles.cycleStat}>
                    <Text style={styles.cycleStatValue}>{trainingCycle.cycleNumber}</Text>
                    <Text style={styles.cycleStatLabel}>Cycle</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.cycleDescription}>
                {trainingCycle.currentPhase === 'eccentric' &&
                  'Focus on controlled lowering phase. 4-second eccentric on main lifts.'}
                {trainingCycle.currentPhase === 'isometric' &&
                  'Focus on holding at key positions. 3-second pause at bottom.'}
                {trainingCycle.currentPhase === 'concentric' &&
                  'Focus on explosive power. Maximum velocity on the lift.'}
              </Text>
            </View>
          </>
        )}

        {/* Upcoming Tournaments Section */}
        <Text style={styles.sectionTitle}>UPCOMING TOURNAMENTS</Text>
        <View style={styles.settingCard}>
          {(profile?.upcomingTournaments || []).length > 0 ? (
            (profile?.upcomingTournaments || []).map((tournament) => (
              <View key={tournament.id} style={styles.tournamentRow}>
                <View style={styles.tournamentInfo}>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <Text style={styles.tournamentDate}>
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveTournament(tournament.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noTournaments}>No upcoming tournaments</Text>
          )}

          <TouchableOpacity
            style={styles.addTournamentButton}
            onPress={() => setShowAddTournament(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.addTournamentText}>Add Tournament</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.settingCard}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add Tournament Modal */}
      <Modal
        visible={showAddTournament}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddTournament(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Tournament</Text>

            <Text style={styles.inputLabel}>Tournament Name</Text>
            <TextInput
              style={styles.textInput}
              value={newTournamentName}
              onChangeText={setNewTournamentName}
              placeholder="e.g., NXL World Cup"
              placeholderTextColor="#666"
            />

            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {newTournamentDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newTournamentDate}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setNewTournamentDate(date);
                }}
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowAddTournament(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleAddTournament}
              >
                <Text style={styles.modalSaveText}>Add Tournament</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  settingLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  settingValue: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  editText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cancelText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  saveText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  editContent: {
    marginTop: spacing.md,
  },
  optionGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(231, 167, 0, 0.2)',
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  cycleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cyclePhase: {},
  cyclePhaseLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cyclePhaseValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  cycleStats: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  cycleStat: {
    alignItems: 'center',
  },
  cycleStatValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  cycleStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  cycleDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tournamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  tournamentDate: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  removeButton: {
    padding: spacing.sm,
  },
  noTournaments: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  addTournamentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addTournamentText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  signOutText: {
    fontSize: typography.fontSize.base,
    color: '#ff6b6b',
    fontWeight: typography.fontWeight.medium,
  },
  bottomPadding: {
    height: 100,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  textInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    fontSize: typography.fontSize.base,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  modalSaveButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.bold,
  },
});
