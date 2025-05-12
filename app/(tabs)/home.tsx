import { Image } from 'expo-image';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from '@/src/components/StatusBar';
import { useLoadStatusStore } from '@/src/store/loadStatusStore';

export default function HomeScreen() {
  const { startTracking, completeLoad } = useLoadStatusStore();

  return (
    <>
      <StatusBar />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <View style={styles.buttonContainer}>
          <Button title='Start Tracking' onPress={startTracking} />
          <Button title='Complete Load' onPress={completeLoad} color='green' />
        </View>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type='subtitle'>Load Status Demo</ThemedText>
          <ThemedText>
            Use the buttons above to control the load status tracking.
            The status bar should appear and update when tracking starts.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
    
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 10
  },
});
