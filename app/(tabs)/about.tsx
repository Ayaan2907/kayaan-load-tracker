import { ScreenWrapper } from '@/components/ScreenWrapper'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AboutScreen () {
  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>About Screen</Text>
        <Text style={styles.content}>Information about the app goes here.</Text>
        <Text style={styles.content}>Version: 1.0.0</Text>
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
    color: '#333'
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10
  }
}) 