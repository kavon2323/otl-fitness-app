import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';
import { Logo } from '../../components';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size="large" showText />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Train Like a Paintball Athlete</Text>
          <Text style={styles.subtitle}>
            Let's personalize your training based on your position, play style, and competition schedule.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featurePill}>
            <Text style={styles.featurePillText}>Position-Based</Text>
          </View>
          <View style={styles.featurePill}>
            <Text style={styles.featurePillText}>Tournament-Ready</Text>
          </View>
          <View style={styles.featurePill}>
            <Text style={styles.featurePillText}>Side-Specific</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onNext} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  featurePill: {
    backgroundColor: 'rgba(231, 167, 0, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(231, 167, 0, 0.3)',
  },
  featurePillText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
