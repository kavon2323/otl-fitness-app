import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { useWorkoutStore } from '../store/workoutStore';
import { colors } from '../theme';

interface RestTimerProps {
  onDismiss?: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({ onDismiss }) => {
  const {
    restTimer,
    pauseRestTimer,
    resumeRestTimer,
    resetRestTimer,
    tickRestTimer,
    startRestTimer,
  } = useWorkoutStore();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (restTimer.isRunning && restTimer.timeRemaining > 0) {
      interval = setInterval(() => {
        tickRestTimer();
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [restTimer.isRunning, restTimer.timeRemaining]);

  // Vibrate when timer ends
  useEffect(() => {
    if (restTimer.timeRemaining === 0 && restTimer.totalTime > 0) {
      Vibration.vibrate([0, 500, 200, 500]);
    }
  }, [restTimer.timeRemaining, restTimer.totalTime]);

  // Pulse animation when timer is low
  useEffect(() => {
    if (restTimer.timeRemaining <= 5 && restTimer.timeRemaining > 0 && restTimer.isRunning) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [restTimer.timeRemaining]);

  // Progress animation
  useEffect(() => {
    if (restTimer.totalTime > 0) {
      const progress = 1 - restTimer.timeRemaining / restTimer.totalTime;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [restTimer.timeRemaining, restTimer.totalTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuickAdd = (seconds: number) => {
    const newTime = restTimer.timeRemaining + seconds;
    startRestTimer(newTime);
  };

  if (restTimer.totalTime === 0) {
    return null;
  }

  const isComplete = restTimer.timeRemaining === 0;
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: progressWidth },
            isComplete && styles.progressComplete,
          ]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.timerSection}>
          <Text style={styles.label}>{isComplete ? 'REST COMPLETE' : 'REST'}</Text>
          <Animated.Text
            style={[
              styles.time,
              { transform: [{ scale: pulseAnim }] },
              isComplete && styles.timeComplete,
            ]}
          >
            {formatTime(restTimer.timeRemaining)}
          </Animated.Text>
        </View>

        <View style={styles.controls}>
          {!isComplete && (
            <>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleQuickAdd(15)}
              >
                <Text style={styles.controlButtonText}>+15s</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.primaryButton]}
                onPress={restTimer.isRunning ? pauseRestTimer : resumeRestTimer}
              >
                <Text style={styles.primaryButtonText}>
                  {restTimer.isRunning ? 'Pause' : 'Resume'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={[styles.controlButton, isComplete && styles.primaryButton]}
            onPress={() => {
              resetRestTimer();
              onDismiss?.();
            }}
          >
            <Text style={[styles.controlButtonText, isComplete && styles.primaryButtonText]}>
              {isComplete ? 'Continue' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressComplete: {
    backgroundColor: '#FF9800',
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerSection: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  time: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  timeComplete: {
    color: '#FF9800',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#fff',
  },
});
