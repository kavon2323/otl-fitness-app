import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { colors } from '../theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showText?: boolean;
  textLabel?: string;
  style?: ViewStyle;
}

// Logo dimensions based on size
const sizes = {
  small: { width: 40, height: 40, fontSize: 14 },
  medium: { width: 60, height: 60, fontSize: 20 },
  large: { width: 120, height: 120, fontSize: 32 },
  xlarge: { width: 180, height: 180, fontSize: 48 },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showText = false,
  textLabel = 'OTL FITNESS',
  style,
}) => {
  const dimensions = sizes[size];

  // Use the logo image (white logo for dark backgrounds)
  const logoImage = require('../../assets/logo_white.png');

  return (
    <View style={[styles.container, style]}>
      {logoImage ? (
        <Image
          source={logoImage}
          style={{ width: dimensions.width, height: dimensions.height }}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.logoContainer, { width: dimensions.width, height: dimensions.height }]}>
          <Text style={[styles.logoText, { fontSize: dimensions.fontSize }]}>OTL</Text>
        </View>
      )}
      {showText && (
        <Text style={[styles.brandName, size === 'xlarge' && styles.brandNameLarge]}>
          {textLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: colors.backgroundBlack,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.text,
    fontWeight: '900',
    letterSpacing: 2,
  },
  brandName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  brandNameLarge: {
    fontSize: 16,
    letterSpacing: 4,
    marginTop: 16,
  },
});

export default Logo;
