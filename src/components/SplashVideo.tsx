import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { colors } from '../theme';

interface SplashVideoProps {
  onFinish: () => void;
}

export function SplashVideo({ onFinish }: SplashVideoProps) {
  const [hasFinished, setHasFinished] = useState(false);
  const videoRef = useRef<Video>(null);

  // Fallback timeout in case video fails
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasFinished) {
        console.log('⏱️ Splash timeout reached, continuing...');
        setHasFinished(true);
        onFinish();
      }
    }, 8000); // Allow video to fully play

    return () => clearTimeout(timeout);
  }, [onFinish, hasFinished]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error('❌ Video error:', status.error);
        if (!hasFinished) {
          setHasFinished(true);
          onFinish();
        }
      }
      return;
    }

    // Video finished playing - transition to next screen
    if (status.didJustFinish && !hasFinished) {
      console.log('✅ Video finished, transitioning...');
      setHasFinished(true);
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/splash.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping={false}
        isMuted={false}
        useNativeControls={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={(error) => {
          console.error('❌ Video error:', error);
          if (!hasFinished) {
            setHasFinished(true);
            onFinish();
          }
        }}
        videoStyle={styles.videoInner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
