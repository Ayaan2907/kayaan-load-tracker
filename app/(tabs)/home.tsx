import { ScreenWrapper } from '@/components/ScreenWrapper';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen () {
  return (
    <ScreenWrapper>
      {/* Content specific to Home screen */}
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.content}>Welcome to the Load Tracker!</Text>
      </View>
    </ScreenWrapper>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  content: {
    fontSize: 16
  }
})
