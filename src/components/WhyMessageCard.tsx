import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { colors } from '../theme';
import { WhyMessage } from '../utils/whyMessageGenerator';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface WhyMessageCardProps {
  message: WhyMessage;
  taperStatus?: {
    status: string;
    severity: 'none' | 'light' | 'moderate' | 'heavy';
  } | null;
  initiallyExpanded?: boolean;
}

export const WhyMessageCard: React.FC<WhyMessageCardProps> = ({
  message,
  taperStatus,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getTaperColor = (severity: 'none' | 'light' | 'moderate' | 'heavy') => {
    switch (severity) {
      case 'heavy':
        return '#ff6b6b';
      case 'moderate':
        return colors.primary;
      case 'light':
        return '#4ecdc4';
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleExpanded}
      activeOpacity={0.8}
    >
      {/* Taper Badge */}
      {taperStatus && (
        <View
          style={[
            styles.taperBadge,
            { backgroundColor: getTaperColor(taperStatus.severity) + '20' },
          ]}
        >
          <Text
            style={[
              styles.taperText,
              { color: getTaperColor(taperStatus.severity) },
            ]}
          >
            {taperStatus.status}
          </Text>
        </View>
      )}

      {/* Headline */}
      <View style={styles.headlineRow}>
        <Text style={styles.headline} numberOfLines={expanded ? undefined : 1}>
          {message.headline}
        </Text>
        <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
      </View>

      {/* Focus Areas */}
      {message.focusAreas.length > 0 && (
        <View style={styles.focusRow}>
          {message.focusAreas.map((focus, index) => (
            <View key={index} style={styles.focusChip}>
              <Text style={styles.focusText}>{focus}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Expanded Content */}
      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.detail}>{message.detail}</Text>

          {message.phaseNote && (
            <View style={styles.phaseNoteContainer}>
              <Text style={styles.phaseNote}>{message.phaseNote}</Text>
            </View>
          )}
        </View>
      )}

      {/* Tap hint when collapsed */}
      {!expanded && (
        <Text style={styles.tapHint}>Tap to learn more</Text>
      )}
    </TouchableOpacity>
  );
};

// Compact version for workout cards/lists
interface WhyMessageBadgeProps {
  headline: string;
  onPress?: () => void;
}

export const WhyMessageBadge: React.FC<WhyMessageBadgeProps> = ({
  headline,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.badgeContainer}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.badgeIcon}>⚡</Text>
      <Text style={styles.badgeText} numberOfLines={1}>
        {headline}
      </Text>
    </TouchableOpacity>
  );
};

// Taper warning banner
interface TaperBannerProps {
  status: string;
  severity: 'none' | 'light' | 'moderate' | 'heavy';
}

export const TaperBanner: React.FC<TaperBannerProps> = ({ status, severity }) => {
  const getBackgroundColor = () => {
    switch (severity) {
      case 'heavy':
        return 'rgba(255, 107, 107, 0.15)';
      case 'moderate':
        return `rgba(231, 167, 0, 0.15)`;
      default:
        return 'rgba(78, 205, 196, 0.15)';
    }
  };

  const getBorderColor = () => {
    switch (severity) {
      case 'heavy':
        return 'rgba(255, 107, 107, 0.3)';
      case 'moderate':
        return `rgba(231, 167, 0, 0.3)`;
      default:
        return 'rgba(78, 205, 196, 0.3)';
    }
  };

  const getTextColor = () => {
    switch (severity) {
      case 'heavy':
        return '#ff6b6b';
      case 'moderate':
        return colors.primary;
      default:
        return '#4ecdc4';
    }
  };

  return (
    <View
      style={[
        styles.taperBannerContainer,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
    >
      <Text style={[styles.taperBannerText, { color: getTextColor() }]}>
        {severity === 'heavy' ? '🎯 ' : '📅 '}
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(231, 167, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.2)',
  },
  taperBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  taperText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headline: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 8,
  },
  expandIcon: {
    fontSize: 12,
    color: colors.primary,
    opacity: 0.7,
  },
  focusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  focusChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  focusText: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 12,
  },
  detail: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
  phaseNoteContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  phaseNote: {
    fontSize: 13,
    color: '#aaa',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tapHint: {
    fontSize: 11,
    color: 'rgba(231, 167, 0, 0.6)',
    marginTop: 8,
    textAlign: 'center',
  },
  // Badge styles
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  // Taper banner styles
  taperBannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  taperBannerText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
