import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';

export type TabName = 'home' | 'exercises' | 'programs' | 'coaching' | 'logs';

interface TabItem {
  name: TabName;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

const tabs: TabItem[] = [
  { name: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'exercises', label: 'Exercises', icon: 'barbell-outline', iconActive: 'barbell' },
  { name: 'programs', label: 'Programs', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'coaching', label: 'Coaching', icon: 'people-outline', iconActive: 'people' },
  { name: 'logs', label: 'Logs', icon: 'stats-chart-outline', iconActive: 'stats-chart' },
];

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  isWorkoutActive?: boolean;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
  isWorkoutActive = false,
}) => {
  return (
    <View style={styles.container}>
      {isWorkoutActive && (
        <TouchableOpacity
          style={styles.returnToWorkout}
          onPress={() => onTabPress('home')}
        >
          <Ionicons name="arrow-back" size={16} color={colors.text} style={styles.returnIcon} />
          <Text style={styles.returnToWorkoutText}>Return to Workout</Text>
        </TouchableOpacity>
      )}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => onTabPress(tab.name)}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={isActive ? colors.primary : colors.textMuted}
                style={styles.icon}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  returnToWorkout: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  returnIcon: {
    marginRight: 8,
  },
  returnToWorkoutText: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: colors.primary,
  },
});
