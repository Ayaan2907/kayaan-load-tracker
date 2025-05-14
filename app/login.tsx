import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '@/store/authStore';

// temporary login screen
// TODO: improve the whole UI 
export default function LoginScreen () {
  const { login } = useAuthStore()

  const handleLogin = () => {
    console.log('Login button pressed')
    login()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title='Login' onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
}) 