import { useLoadStatusStore } from '@/src/store/loadStatusStore';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StatusBar } from './StatusBar';

interface ScreenWrapperProps {
  children: React.ReactNode
}

export function ScreenWrapper ({ children }: ScreenWrapperProps) {
  const { startTracking, completeLoad, isTracking } = useLoadStatusStore()

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <View style={[styles.buttonContainer]}>
        {!isTracking && (
            <Button title='Start Tracking' onPress={startTracking} />
        )}
        {isTracking && (
            <Button title='Complete Load' onPress={completeLoad} color='green' />
        )}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // Allow content to determine alignment, remove alignItems/justifyContent
    backgroundColor: '#f0f0f0' // Keep consistent background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15
  },
  content: {
    flex: 1,
    padding: 20
  }
}) 