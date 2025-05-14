import { useLoadStatusStore } from '@/store/loadStatusStore';
import React from 'react';
import { Button, StyleSheet, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from './StatusBar';

interface ScreenWrapperProps {
  children: React.ReactNode
}

export function ScreenWrapper ({ children }: ScreenWrapperProps) {
  const { startTracking, completeLoad, isTracking } = useLoadStatusStore();
  const insets = useSafeAreaInsets();
  
  // Calculate bottom padding to account for tab bar height + safe area
  const bottomPadding = Platform.OS === 'ios' ? insets.bottom + 50 : 15;

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <View style={styles.content}>
        {children}
      </View>
      <View 
        style={[
          styles.buttonContainer,
          { paddingBottom: bottomPadding }
        ]}
      >
        {!isTracking && (
            <Button title='Start Tracking' onPress={startTracking} />
        )}
        {isTracking && (
            <Button title='Complete Load' onPress={completeLoad} color='green' />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0' // Keep consistent background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
  },
  content: {
    flex: 1,
  }
})