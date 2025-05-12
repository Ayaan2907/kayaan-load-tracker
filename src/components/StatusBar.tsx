import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLoadStatusStore } from '@/src/store/loadStatusStore';

export function StatusBar () {
  const { statuses, currentStatusIndex, isTracking } = useLoadStatusStore()

  // Don't render anything if tracking is not active
  if (!isTracking || currentStatusIndex < 0) {
      return null
  }
    
  return (
      <View style={styles.container}>
      {statuses.map((status, index) => (
        <View key={status} style={styles.statusItem}>
          <Text
            style={[
              styles.statusText,
              index === currentStatusIndex ? styles.activeStatusText : styles.inactiveStatusText
            ]}
          >
            {status}
          </Text>
          {index === currentStatusIndex && <View style={styles.activeIndicator} />}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 50,
    paddingHorizontal: 5,
    backgroundColor: '#e0e0e0', 
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10 
  },
  statusItem: {
    alignItems: 'center',
    paddingHorizontal: 5 
  },
  statusText: {
    fontSize: 12, 
    textAlign: 'center'
  },
  activeStatusText: {
    fontWeight: 'bold',
    color: '#007bff'
  },
  inactiveStatusText: {
    color: '#6c757d'
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007bff',
    marginTop: 4
  }
}) 