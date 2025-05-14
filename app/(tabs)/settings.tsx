import { ScreenWrapper } from '@/components/ScreenWrapper'
import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { Button, Pressable, Text, View } from 'react-native'

export default function SettingsScreen () {
  const { logout } = useAuthStore()

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">Settings Screen</Text>
        <Text className="text-base text-gray-600 dark:text-gray-300 text-center mb-2.5">Application settings will appear here</Text>
        <View className=" max-w-xs mx-auto">
        <Pressable
            onPress={logout}
            className="bg-red-500 px-6 py-3 rounded-full shadow-sm active:opacity-80"
          >
            <Text className="text-white font-semibold text-base">Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}
