import { ScreenWrapper } from '@/components/ScreenWrapper'
import React from 'react'
import { Text, View } from 'react-native'

export default function AboutScreen () {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">About Screen</Text>
        <Text className="text-base text-gray-600 dark:text-gray-300 text-center mb-2.5">Information about the app goes here.</Text>
        <Text className="text-base text-gray-600 dark:text-gray-300 text-center mb-2.5">Version: 1.0.0</Text>
      </View>
    </ScreenWrapper>
  )
} 