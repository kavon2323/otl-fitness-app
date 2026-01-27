import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import { Feature, hasFeatureAccess, TIER_CONFIG, getRequiredTier } from '../types';
import { useAuthStore } from '../store/authStore';

interface LockedFeatureProps {
  feature: Feature;
  children: React.ReactNode;
  onLockedPress: (feature: Feature) => void;
  // Optional: show a small lock badge instead of full overlay
  badgeOnly?: boolean;
  // Optional: custom locked message
  lockedMessage?: string;
}

export const LockedFeature: React.FC<LockedFeatureProps> = ({
  feature,
  children,
  onLockedPress,
  badgeOnly = false,
  lockedMessage,
}) => {
  const { user } = useAuthStore();
  // Note: subscriptionTier would come from UserProfile, not Supabase User
  // For now, default to 'free' - will be populated from user profile in production
  const userTier = 'free';
  const hasAccess = hasFeatureAccess(userTier, feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  const requiredTier = getRequiredTier(feature);
  const tierInfo = TIER_CONFIG[requiredTier];

  if (badgeOnly) {
    return (
      <TouchableOpacity
        onPress={() => onLockedPress(feature)}
        activeOpacity={0.7}
      >
        <View style={styles.badgeContainer}>
          {children}
          <View style={styles.lockBadge}>
            <Text style={styles.lockBadgeIcon}>🔒</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onLockedPress(feature)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.contentWrapper}>
        {children}
        <View style={styles.overlay}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockedText}>
            {lockedMessage || `Upgrade to ${tierInfo.name}`}
          </Text>
          <Text style={styles.tapText}>Tap to learn more</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentWrapper: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  lockIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  lockedText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tapText: {
    color: colors.primary,
    fontSize: 12,
  },
  badgeContainer: {
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.surface,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockBadgeIcon: {
    fontSize: 10,
  },
});

export default LockedFeature;
