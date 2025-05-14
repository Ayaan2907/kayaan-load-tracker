import { ScreenWrapper } from '@/components/ScreenWrapper'
import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function SettingsScreen () {
  const { logout } = useAuthStore()

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">Home Screen</Text>
        <Text className="text-base text-gray-600 dark:text-gray-300 text-center mb-2.5">Welcome to Our Load Tracker</Text>
        <View className=" max-w-xs mx-auto">
          <Button title="Logout" onPress={logout} color="#ff6347" />
        </View>
      </View>
    </ScreenWrapper>
  )
}
