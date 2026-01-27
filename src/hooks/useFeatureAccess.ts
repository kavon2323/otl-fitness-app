import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { Feature, hasFeatureAccess, SubscriptionTier } from '../types';

interface UseFeatureAccessReturn {
  // Check if user has access to a feature
  canAccess: (feature: Feature) => boolean;
  // The user's current subscription tier
  currentTier: SubscriptionTier;
  // State for upgrade modal
  upgradeModalVisible: boolean;
  upgradeFeature: Feature | null;
  // Show upgrade modal for a specific feature
  showUpgradeModal: (feature: Feature) => void;
  // Hide upgrade modal
  hideUpgradeModal: () => void;
  // Check access and show modal if needed (returns true if has access)
  checkAccessOrPrompt: (feature: Feature) => boolean;
}

export const useFeatureAccess = (): UseFeatureAccessReturn => {
  const { user } = useAuthStore();
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<Feature | null>(null);

  // Default to 'free' - subscriptionTier would come from UserProfile, not Supabase User
  // Will be populated from user profile in production
  const currentTier: SubscriptionTier = 'free';

  const canAccess = useCallback(
    (feature: Feature): boolean => {
      return hasFeatureAccess(currentTier, feature);
    },
    [currentTier]
  );

  const showUpgradeModal = useCallback((feature: Feature) => {
    setUpgradeFeature(feature);
    setUpgradeModalVisible(true);
  }, []);

  const hideUpgradeModal = useCallback(() => {
    setUpgradeModalVisible(false);
    setUpgradeFeature(null);
  }, []);

  const checkAccessOrPrompt = useCallback(
    (feature: Feature): boolean => {
      if (canAccess(feature)) {
        return true;
      }
      showUpgradeModal(feature);
      return false;
    },
    [canAccess, showUpgradeModal]
  );

  return {
    canAccess,
    currentTier,
    upgradeModalVisible,
    upgradeFeature,
    showUpgradeModal,
    hideUpgradeModal,
    checkAccessOrPrompt,
  };
};

export default useFeatureAccess;
