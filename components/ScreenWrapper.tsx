import { useLoadStatusStore } from '@/store/loadStatusStore';
import React from 'react';
import { Button, Platform, View } from 'react-native';
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
    <View className="flex-1 bg-gray-100 dark:bg-neutral-800">
      <View className="flex-1 absolute top-0 left-0 right-0 z-10">
      <StatusBar />
      </View>
      <View className="flex-1">
        {children}
      </View>
      <View 
        style={{ paddingBottom: bottomPadding }}
        className="flex-row justify-center items-center min-h-[60px] dark:bg-neutral-800"
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