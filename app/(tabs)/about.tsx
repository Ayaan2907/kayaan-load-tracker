import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AboutScreen () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>
      <Text style={styles.content}>Information about the app goes here.</Text>
      <Text style={styles.content}>Version: 1.0.0</Text>
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
  }
}) 