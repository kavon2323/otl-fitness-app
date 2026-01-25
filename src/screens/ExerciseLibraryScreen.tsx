import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { exercises } from '../data/exercises';
import { Exercise } from '../types';
import { colors } from '../theme';

interface ExerciseLibraryScreenProps {
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseLibraryScreen: React.FC<ExerciseLibraryScreenProps> = ({
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    exercises.forEach((ex) => cats.add(ex.category));
    return Array.from(cats).sort();
  }, []);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (selectedCategory) {
      filtered = filtered.filter((ex) => ex.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query) ||
          ex.category.toLowerCase().includes(query) ||
          ex.description?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  const formatCategoryName = (category: string): string => {
    return category
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Library</Text>
        <Text style={styles.subtitle}>{exercises.length} exercises</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryChipText,
              !selectedCategory && styles.categoryChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {formatCategoryName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
        {filteredExercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No exercises found</Text>
          </View>
        ) : (
          filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => onSelectExercise(exercise)}
            >
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                {exercise.videoUrl && (
                  <Text style={styles.videoIndicator}>▶</Text>
                )}
              </View>
              <Text style={styles.exerciseCategory}>
                {formatCategoryName(exercise.category)}
              </Text>
              {exercise.description && (
                <Text style={styles.exerciseDescription}>
                  {exercise.description}
                </Text>
              )}
              {exercise.musclesTargeted && (
                <View style={styles.musclesRow}>
                  <Text style={styles.musclesLabel}>Targets: </Text>
                  <Text style={styles.musclesText}>
                    {exercise.musclesTargeted.primary.join(', ')}
                  </Text>
                </View>
              )}
              {exercise.tips && exercise.tips.length > 0 && (
                <View style={styles.tipsPreview}>
                  <Text style={styles.tipsLabel}>Tips:</Text>
                  {exercise.tips.slice(0, 2).map((tip, index) => (
                    <Text key={index} style={styles.tipPreviewText}>
                      • {tip}
                    </Text>
                  ))}
                  {exercise.tips.length > 2 && (
                    <Text style={styles.moreTips}>
                      +{exercise.tips.length - 2} more tips
                    </Text>
                  )}
                </View>
              )}
              <Text style={styles.tapForDetails}>Tap for video & details →</Text>
            </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  videoIndicator: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
  },
  exerciseCategory: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
    lineHeight: 20,
  },
  musclesRow: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  musclesLabel: {
    fontSize: 12,
    color: '#666',
  },
  musclesText: {
    fontSize: 12,
    color: colors.primary,
    flex: 1,
  },
  tipsPreview: {
    marginTop: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 10,
  },
  tipsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  tipPreviewText: {
    fontSize: 12,
    color: '#ccc',
    lineHeight: 18,
    marginBottom: 4,
  },
  moreTips: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  tapForDetails: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 12,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  bottomPadding: {
    height: 100,
  },
});
