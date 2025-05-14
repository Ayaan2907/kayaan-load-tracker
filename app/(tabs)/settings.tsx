import { ScreenWrapper } from '@/components/ScreenWrapper'
import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function SettingsScreen () {
  const { logout } = useAuthStore()

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Settings Screen</Text>
        <Text style={styles.content}>App settings will go here.</Text>
        <View>
          <Button title="Logout" onPress={logout} color="#ff6347" />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333'
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30
  }
}) 