import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Exercise } from '../types';
import { colors } from '../theme';

interface ExerciseDetailScreenProps {
  exercise: Exercise;
  onBack: () => void;
  showReturnToWorkout?: boolean;
  onReturnToWorkout?: () => void;
}

// Extract YouTube video ID from URL
const getYoutubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({
  exercise,
  onBack,
  showReturnToWorkout = false,
  onReturnToWorkout,
}) => {
  const videoId = getYoutubeVideoId(exercise.videoUrl);
  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth - 40) * (9 / 16);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          {showReturnToWorkout && onReturnToWorkout && (
            <TouchableOpacity onPress={onReturnToWorkout} style={styles.returnButton}>
              <Text style={styles.returnText}>Return to Workout →</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{exercise.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{exercise.category}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {videoId && (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={videoHeight}
              videoId={videoId}
              play={false}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {exercise.musclesTargeted && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Muscles Targeted</Text>
            <View style={styles.muscleGroup}>
              <Text style={styles.muscleLabel}>Primary:</Text>
              <View style={styles.muscleList}>
                {exercise.musclesTargeted.primary.map((muscle) => (
                  <View key={muscle} style={styles.musclePill}>
                    <Text style={styles.musclePillText}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>
            {exercise.musclesTargeted.secondary && exercise.musclesTargeted.secondary.length > 0 && (
              <View style={styles.muscleGroup}>
                <Text style={styles.muscleLabel}>Secondary:</Text>
                <View style={styles.muscleList}>
                  {exercise.musclesTargeted.secondary.map((muscle) => (
                    <View key={muscle} style={[styles.musclePill, styles.secondaryPill]}>
                      <Text style={styles.musclePillText}>{muscle}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {exercise.equipment && exercise.equipment.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment Needed</Text>
            <View style={styles.equipmentList}>
              {exercise.equipment.map((item) => (
                <View key={item} style={styles.equipmentPill}>
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {exercise.tips && exercise.tips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips</Text>
            {exercise.tips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
  },
  returnButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  returnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  muscleGroup: {
    marginBottom: 12,
  },
  muscleLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  muscleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  musclePill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  secondaryPill: {
    backgroundColor: '#2a5a2a',
  },
  musclePillText: {
    color: '#fff',
    fontSize: 14,
  },
  equipmentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipmentPill: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  equipmentText: {
    color: '#fff',
    fontSize: 14,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    color: colors.primary,
    fontSize: 16,
    marginRight: 8,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});
