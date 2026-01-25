// OTL Fitness App - Brand Theme
// Typography: Oswald, sans-serif
// Primary: Blue #0069d3

export const colors = {
  // Primary brand color
  primary: '#0069d3',
  primaryLight: '#3389de',
  primaryDark: '#0054a8',

  // Backgrounds (dark theme)
  background: '#1a1a1a',
  backgroundDark: '#0d0d0d',
  backgroundBlack: '#000000',
  backgroundOverlay: 'rgba(0, 0, 0, 0.95)',
  surface: '#2a2a2a',
  surfaceLight: '#333333',

  // Text colors
  text: '#ffffff',
  textSecondary: '#888888',
  textMuted: '#666666',

  // Gray scale
  gray: '#5a5a5a',
  grayLight: '#cccccc',
  grayDark: '#333333',

  // Semantic colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Borders
  border: '#333333',
  borderLight: '#5a5a5a',
} as const;

export const typography = {
  // Font family (requires expo-google-fonts/oswald)
  fontFamily: {
    regular: 'Oswald_400Regular',
    medium: 'Oswald_500Medium',
    bold: 'Oswald_700Bold',
  },

  // Font sizes (from brand guidelines)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 38,
  },

  // Line heights
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 30,
    '2xl': 44,
  },

  // Font weights (numeric for RN)
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 60,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Common style patterns
export const commonStyles = {
  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Buttons
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center' as const,
  },

  primaryButtonText: {
    color: colors.text,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },

  // Section titles
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },

  // Screen container
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  screenHeader: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.lg,
  },

  screenTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },

  screenSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
} as const;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  commonStyles,
};
