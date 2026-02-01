import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from './src/navigation';
import { SplashVideo } from './src/components/SplashVideo';
import { useAuthStore } from './src/store/authStore';
import { colors } from './src/theme';
import { exercisesStore } from './src/data/exercisesStore';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);
  const { isInitialized, initialize } = useAuthStore();
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
  });

  // Initialize auth early so it's ready when video ends
  useEffect(() => {
    initialize();
  }, []);

  // Load exercises in background
  useEffect(() => {
    exercisesStore.initialize().then(() => {
      console.log('✅ Exercises ready');
    }).catch(err => {
      console.error('⚠️ Exercises load failed, using local data:', err);
    });
  }, []);

  // Hide native splash screen once fonts are loaded so video can be seen
  useEffect(() => {
    if (fontsLoaded && !nativeSplashHidden) {
      SplashScreen.hideAsync().then(() => {
        console.log('🎬 Native splash hidden, showing video');
        setNativeSplashHidden(true);
      });
    }
  }, [fontsLoaded, nativeSplashHidden]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Keep video playing until BOTH video finishes AND auth is ready
  // Video continues to show on screen even after it finishes if auth isn't ready
  const showSplash = !videoFinished || !isInitialized;

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <SplashVideo onFinish={() => setVideoFinished(true)} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
