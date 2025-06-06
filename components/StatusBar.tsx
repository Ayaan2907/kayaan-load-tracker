import { useLoadStatusStore } from '@/store/loadStatusStore';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

export function StatusBar() {
  const { statuses, currentStatusIndex, currentStatusProgress, isTracking } = useLoadStatusStore();
  // const screenWidth = Dimensions.get('window').width;
  
  const totalProgress = (currentStatusIndex + currentStatusProgress) / statuses.length;
  
  const isComplete = !isTracking && currentStatusIndex === statuses.length - 1;

  // Animation for the status text
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  }, [currentStatusIndex, isComplete, fadeAnim]);

  if (!isTracking && !isComplete) return null;

  return (
    <View className="bg-white dark:bg-neutral-800 border-b border-gray-100 dark:border-neutral-700 pb-3 shadow-sm mb-2.5">
      <View className="h-1 bg-gray-100 dark:bg-neutral-700 mx-4 rounded overflow-hidden">
        <View 
          style={{ width: `${totalProgress * 100}%` }} 
          className="h-full bg-green-500 rounded" 
        />
      </View>
      
      {/* Current status label */}
      <View className="items-center mt-3">
        <Animated.Text 
          style={{ opacity: fadeAnim }} 
          className="text-base font-medium text-green-600 dark:text-green-400"
        >
          {isComplete ? 'Complete' : statuses[currentStatusIndex]}
        </Animated.Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {isComplete ? 'All steps completed' : `Step ${currentStatusIndex + 1} of ${statuses.length}`}
        </Text>
      </View>
    </View>
  );
}