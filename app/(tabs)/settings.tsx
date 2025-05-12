import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useAuthStore } from '@/src/store/authStore'
import { ThemedView } from '@/components/ThemedView'
export default function SettingsScreen () {
  const { logout } = useAuthStore()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
          <Text style={styles.content}>App settings will go here.</Text>
          <ThemedView style={styles.logoutContainer}>
        <Button title="Logout" onPress={logout} color="#ff6347" />
      </ThemedView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
    },
  logoutContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
}) 