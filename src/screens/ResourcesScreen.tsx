import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  comingSoon?: boolean;
}

interface ResourcesScreenProps {
  onOpenExerciseLibrary: () => void;
  onOpenCoaching: () => void;
  onOpenSupplements: () => void;
  onOpenStore: () => void;
}

export const ResourcesScreen: React.FC<ResourcesScreenProps> = ({
  onOpenExerciseLibrary,
  onOpenCoaching,
  onOpenSupplements,
  onOpenStore,
}) => {
  const resources: ResourceItem[] = [
    {
      id: 'exercises',
      title: 'Exercise Library',
      description: 'Browse all exercises with video demos and coaching cues',
      icon: 'barbell',
      onPress: onOpenExerciseLibrary,
    },
    {
      id: 'coaching',
      title: 'Coaching',
      description: 'Connect with coaches and get personalized guidance',
      icon: 'people',
      onPress: onOpenCoaching,
    },
    {
      id: 'supplements',
      title: 'Supplements',
      description: 'Recommended supplements for paintball athletes',
      icon: 'flask',
      onPress: onOpenSupplements,
      comingSoon: true,
    },
    {
      id: 'store',
      title: 'Store',
      description: 'Gear, apparel, and training equipment',
      icon: 'cart',
      onPress: onOpenStore,
      comingSoon: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Tools to level up your game</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              style={[styles.card, resource.comingSoon && styles.cardDisabled]}
              onPress={resource.onPress}
              disabled={resource.comingSoon}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, resource.comingSoon && styles.iconContainerDisabled]}>
                <Ionicons
                  name={resource.icon}
                  size={28}
                  color={resource.comingSoon ? '#666' : colors.primary}
                />
              </View>
              <Text style={[styles.cardTitle, resource.comingSoon && styles.cardTitleDisabled]}>
                {resource.title}
              </Text>
              <Text style={styles.cardDescription}>{resource.description}</Text>
              {resource.comingSoon && (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>COMING SOON</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardDisabled: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerDisabled: {
    backgroundColor: '#333',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  cardTitleDisabled: {
    color: '#888',
  },
  cardDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  comingSoonBadge: {
    marginTop: 12,
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 100,
  },
});
