import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors } from '../theme';
import {
  Feature,
  FEATURE_NAMES,
  getUpgradeTierInfo,
  TIER_CONFIG,
  TierFeatures,
} from '../types';

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  feature: Feature;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  visible,
  onClose,
  feature,
}) => {
  const requiredTierInfo = getUpgradeTierInfo(feature);
  const featureName = FEATURE_NAMES[feature];

  const handleUpgrade = () => {
    // TODO: Link to subscription page or in-app purchase
    // For now, open a URL (update this with your actual upgrade URL)
    Linking.openURL('https://otlperformance.com/subscribe');
    onClose();
  };

  // Get all features included in the required tier
  const tierFeatures = requiredTierInfo.features.map(f => FEATURE_NAMES[f]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.title}>Upgrade Required</Text>
          </View>

          {/* Feature info */}
          <Text style={styles.featureText}>
            <Text style={styles.featureName}>{featureName}</Text> is available with{' '}
            <Text style={styles.tierName}>{requiredTierInfo.name}</Text>
          </Text>

          {/* Tier card */}
          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>{requiredTierInfo.name}</Text>
              <Text style={styles.tierPrice}>
                ${requiredTierInfo.price}
                <Text style={styles.tierPeriod}>/mo</Text>
              </Text>
            </View>

            <View style={styles.featuresList}>
              {tierFeatures.slice(0, 5).map((feat, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureItemText}>{feat}</Text>
                </View>
              ))}
              {tierFeatures.length > 5 && (
                <Text style={styles.moreFeatures}>
                  +{tierFeatures.length - 5} more features
                </Text>
              )}
            </View>

            {requiredTierInfo.storeDiscountPercent > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {requiredTierInfo.storeDiscountPercent}% off store purchases
                </Text>
              </View>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <Text style={styles.upgradeButtonText}>
                Upgrade to {requiredTierInfo.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lockIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  featureText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  featureName: {
    color: colors.text,
    fontWeight: '600',
  },
  tierName: {
    color: colors.primary,
    fontWeight: '700',
  },
  tierCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  tierPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  tierPeriod: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmark: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '700',
  },
  featureItemText: {
    fontSize: 14,
    color: colors.text,
  },
  moreFeatures: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  discountBadge: {
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  discountText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  buttons: {
    gap: 12,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default UpgradeModal;
