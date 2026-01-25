import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WorkoutTimerProps {
  startTime: string;
}

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ startTime }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>WORKOUT TIME</Text>
      <Text style={styles.time}>{formatTime(elapsed)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 2,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontVariant: ['tabular-nums'],
  },
});
