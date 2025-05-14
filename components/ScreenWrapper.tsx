import { useLoadStatusStore } from '@/store/loadStatusStore';
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from './StatusBar';

interface ScreenWrapperProps {
  children: React.ReactNode
}

export function ScreenWrapper ({ children }: ScreenWrapperProps) {
  const { startTracking, completeLoad, isTracking } = useLoadStatusStore();
  const insets = useSafeAreaInsets();
  

  const bottomPadding = Platform.OS === 'ios' ? insets.bottom  : 15;

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
          <Pressable
            onPress={startTracking}
            className="bg-blue-500  px-6 py-3 rounded-full shadow-sm active:opacity-80"
          >
            <Text className="text-white font-semibold text-base">Start Tracking</Text>
          </Pressable>
        )}
        {isTracking && (
          <Pressable
            onPress={completeLoad}
            className="bg-green-500  px-6 py-3 rounded-full shadow-sm active:opacity-80"
          >
            <Text className="text-white font-semibold text-base">Complete Load</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}