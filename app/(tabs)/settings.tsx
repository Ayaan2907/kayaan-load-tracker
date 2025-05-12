import { StatusBar } from '@/src/components/StatusBar'
import { useAuthStore } from '@/src/store/authStore'
import { useLoadStatusStore } from '@/src/store/loadStatusStore'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function SettingsScreen () {
  const { startTracking, completeLoad } = useLoadStatusStore()
  const { logout } = useAuthStore()

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Settings Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title='Start Tracking' onPress={startTracking} />
        <Button title='Complete Load' onPress={completeLoad} color='green' />
      </View>
      <Text style={styles.content}>App settings will go here.</Text>
        <Button title="Logout" onPress={logout} color="#ff6347" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%'
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30
  }
}) 