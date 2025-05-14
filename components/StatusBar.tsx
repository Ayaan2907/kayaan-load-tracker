import { useLoadStatusStore } from '@/store/loadStatusStore';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export function StatusBar() {
  const { statuses, currentStatusIndex, isTracking } = useLoadStatusStore();
  
  if (!isTracking && currentStatusIndex < 0) {
    return null;
  }
  
  const isComplete = !isTracking && currentStatusIndex === statuses.length - 1;
  
  const progress = isComplete ? 1 : (currentStatusIndex + 1) / statuses.length;
  const screenWidth = Dimensions.get('window').width;
  const progressWidth = screenWidth * progress;
  
  return (
    <View className="bg-white dark:bg-neutral-800 border-b border-gray-100 dark:border-neutral-700 pb-3 shadow-sm mb-2.5">
      {/* Progress bar */}
      <View className="h-1 bg-gray-100 dark:bg-neutral-700 mx-4 rounded overflow-hidden">
        <View style={{ width: progressWidth }} className="h-full bg-green-500 rounded" />
      </View>
      
      {/* Status steps */}
      <View className="flex-row justify-around px-2.5 mt-3">
        {statuses.map((status: string, index: number) => {
          const isActive = index === currentStatusIndex;
          const isCompleted = index < currentStatusIndex || (isComplete && index === currentStatusIndex);
          
          return (
            <View key={status} className="flex-1 items-center px-1">
              <View className={`w-6 h-6 rounded-full items-center justify-center mb-1 border
                ${isCompleted 
                  ? 'bg-green-500 border-green-500' 
                  : 'bg-gray-100 dark:bg-neutral-600 border-gray-300 dark:border-neutral-500'}
                ${isActive && !isCompleted ? 'border-green-500 dark:border-green-400' : ''}
              `}>
                {isCompleted ? (
                  <Text className="text-white text-xs font-bold">✓</Text>
                ) : (
                  <Text className={`text-xs font-medium 
                    ${isActive ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}
                  `}>
                    {index + 1}
                  </Text>
                )}
              </View>
              
              <Text 
                className={`text-[11px] text-center px-0.5 
                  ${isActive ? 'font-semibold text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}
                  ${isCompleted ? 'text-green-500 dark:text-green-400' : ''}
                `}
                numberOfLines={1}
              >
                {status}
              </Text>
            </View>
          );
        })}
      </View>
      
      {/* Progress status */}
      <View className="items-center mt-2">
        <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {isComplete ? 'Complete' : `Step ${currentStatusIndex + 1} of ${statuses.length}`}
        </Text>
      </View>
    </View>
  );
}