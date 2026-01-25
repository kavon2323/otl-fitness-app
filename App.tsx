import React, { useCallback, useState } from 'react';
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
import { colors } from './src/theme';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showSplashVideo, setShowSplashVideo] = useState(true);
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = () => {
    setShowSplashVideo(false);
  };

  // Show video splash first, then check fonts
  if (showSplashVideo) {
    return (
      <>
        <StatusBar style="light" />
        <SplashVideo onFinish={handleSplashFinish} />
      </>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <RootNavigator />
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
});
