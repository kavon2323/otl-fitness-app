import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ExerciseSet } from '../types';
import { colors } from '../theme';

interface SetLoggerProps {
  setNumber: number;
  targetReps: string;
  isCompleted: boolean;
  previousWeight?: number;
  previousReps?: number;
  onComplete: (data: { weight?: number; reps?: number }) => void;
  onStartRest: () => void;
}

export const SetLogger: React.FC<SetLoggerProps> = ({
  setNumber,
  targetReps,
  isCompleted,
  previousWeight,
  previousReps,
  onComplete,
  onStartRest,
}) => {
  const [weight, setWeight] = useState(previousWeight?.toString() || '');
  const [reps, setReps] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if this is a timed set (contains "seconds" or "min")
  const isTimedSet = targetReps.toLowerCase().includes('second') ||
                     targetReps.toLowerCase().includes('min') ||
                     targetReps.toLowerCase().includes('cal');

  const handleComplete = () => {
    const data: { weight?: number; reps?: number } = {};

    if (weight) {
      data.weight = parseFloat(weight);
    }
    if (reps) {
      data.reps = parseInt(reps, 10);
    }

    onComplete(data);
    onStartRest();
    setIsExpanded(false);
  };

  if (isCompleted) {
    return (
      <View style={[styles.container, styles.completedContainer]}>
        <View style={styles.setInfo}>
          <View style={styles.setNumberBadge}>
            <Text style={styles.setNumberText}>{setNumber}</Text>
          </View>
          <Text style={styles.targetReps}>{targetReps}</Text>
        </View>
        <View style={styles.completedInfo}>
          {previousWeight && (
            <Text style={styles.completedText}>{previousWeight} lbs</Text>
          )}
          {previousReps && (
            <Text style={styles.completedText}>{previousReps} reps</Text>
          )}
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!isExpanded) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsExpanded(true)}
      >
        <View style={styles.setInfo}>
          <View style={[styles.setNumberBadge, styles.setNumberBadgeActive]}>
            <Text style={styles.setNumberText}>{setNumber}</Text>
          </View>
          <Text style={styles.targetReps}>{targetReps}</Text>
        </View>
        <Text style={styles.tapToLog}>Tap to log →</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, styles.expandedContainer]}>
      <View style={styles.setInfo}>
        <View style={[styles.setNumberBadge, styles.setNumberBadgeActive]}>
          <Text style={styles.setNumberText}>{setNumber}</Text>
        </View>
        <Text style={styles.targetReps}>{targetReps}</Text>
      </View>

      <View style={styles.inputRow}>
        {!isTimedSet && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (lbs)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder={previousWeight?.toString() || '0'}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
                placeholder={targetReps.split('-')[0] || '0'}
                placeholderTextColor="#666"
              />
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>
            {isTimedSet ? 'Done' : '✓'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setIsExpanded(false)}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedContainer: {
    backgroundColor: '#1a3a1a',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  expandedContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  setNumberBadgeActive: {
    backgroundColor: colors.primary,
  },
  setNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  targetReps: {
    fontSize: 16,
    color: '#fff',
  },
  tapToLog: {
    fontSize: 14,
    color: colors.primary,
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  completedText: {
    fontSize: 14,
    color: '#888',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 14,
  },
});
