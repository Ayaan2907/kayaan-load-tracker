import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { Button, Text, View } from 'react-native';

// temporary login screen
// TODO: improve the whole UI 
export default function LoginScreen () {
  const { login } = useAuthStore()

  const handleLogin = () => {
    console.log('Login button pressed')
    login()
  }

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-100 dark:bg-neutral-900">
      <Text className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">Login Screen</Text>
      <Button title='Login' onPress={handleLogin} />
    </View>
  )
} 