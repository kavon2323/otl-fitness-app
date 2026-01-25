import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useWorkoutStore } from '../store/workoutStore';
import { WorkoutLog } from '../types';
import { allPrograms } from '../data/programs';
import { colors } from '../theme';

interface WorkoutLogsScreenProps {
  onSelectWorkout: (workout: WorkoutLog) => void;
}

export const WorkoutLogsScreen: React.FC<WorkoutLogsScreenProps> = ({
  onSelectWorkout,
}) => {
  const { workoutHistory } = useWorkoutStore();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDuration = (startTime: string, endTime?: string): string => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);

    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getProgramName = (programId: string): string => {
    const program = allPrograms.find((p) => p.id === programId);
    return program?.name || 'Unknown Program';
  };

  const getDayName = (programId: string, dayNumber: number): string => {
    const program = allPrograms.find((p) => p.id === programId);
    const day = program?.days.find((d) => d.dayNumber === dayNumber);
    return day?.name || `Day ${dayNumber}`;
  };

  const calculateStats = (workout: WorkoutLog) => {
    const totalSets = workout.exercises.reduce(
      (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
      0
    );
    const totalVolume = workout.exercises.reduce((acc, ex) => {
      return (
        acc +
        ex.sets.reduce((setAcc, set) => {
          if (set.weight && set.reps) {
            return setAcc + set.weight * set.reps;
          }
          return setAcc;
        }, 0)
      );
    }, 0);
    return { totalSets, totalVolume };
  };

  // Group workouts by date
  const groupedWorkouts = workoutHistory.reduce((groups, workout) => {
    const dateKey = new Date(workout.startTime).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(workout);
    return groups;
  }, {} as Record<string, WorkoutLog[]>);

  const sortedDates = Object.keys(groupedWorkouts).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Logs</Text>
        <Text style={styles.subtitle}>
          {workoutHistory.length} workout{workoutHistory.length !== 1 ? 's' : ''} logged
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {workoutHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No Workouts Yet</Text>
            <Text style={styles.emptySubtitle}>
              Complete a workout to see your history here
            </Text>
          </View>
        ) : (
          sortedDates.map((dateKey) => (
            <View key={dateKey} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>
                {formatDate(groupedWorkouts[dateKey][0].startTime)}
              </Text>
              {groupedWorkouts[dateKey].map((workout) => {
                const stats = calculateStats(workout);
                return (
                  <TouchableOpacity
                    key={workout.id}
                    style={styles.workoutCard}
                    onPress={() => onSelectWorkout(workout)}
                  >
                    <View style={styles.workoutHeader}>
                      <View>
                        <Text style={styles.workoutDay}>
                          {getDayName(workout.programId, workout.dayNumber)}
                        </Text>
                        <Text style={styles.workoutProgram}>
                          {getProgramName(workout.programId)} • Week {workout.weekNumber}
                        </Text>
                      </View>
                      <Text style={styles.workoutTime}>
                        {formatTime(workout.startTime)}
                      </Text>
                    </View>

                    <View style={styles.workoutStats}>
                      <View style={styles.workoutStat}>
                        <Text style={styles.workoutStatValue}>
                          {formatDuration(workout.startTime, workout.endTime)}
                        </Text>
                        <Text style={styles.workoutStatLabel}>Duration</Text>
                      </View>
                      <View style={styles.workoutStat}>
                        <Text style={styles.workoutStatValue}>{stats.totalSets}</Text>
                        <Text style={styles.workoutStatLabel}>Sets</Text>
                      </View>
                      <View style={styles.workoutStat}>
                        <Text style={styles.workoutStatValue}>
                          {stats.totalVolume > 0
                            ? `${Math.round(stats.totalVolume).toLocaleString()}`
                            : '-'}
                        </Text>
                        <Text style={styles.workoutStatLabel}>Volume (lbs)</Text>
                      </View>
                    </View>

                    <Text style={styles.viewMore}>View Details →</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  workoutCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutDay: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  workoutProgram: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  workoutTime: {
    fontSize: 14,
    color: '#666',
  },
  workoutStats: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  workoutStat: {
    flex: 1,
    alignItems: 'center',
  },
  workoutStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  workoutStatLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  viewMore: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});
