import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useLoadStatusStore } from '@/store/loadStatusStore';

export function StatusBar() {
  const { statuses, currentStatusIndex, isTracking } = useLoadStatusStore();
  
  if (!isTracking && currentStatusIndex < 0) {
    return null;
  }
  
  const isComplete = !isTracking && currentStatusIndex === statuses.length - 1;
  
  // Calculate progress percentage
  const progress = isComplete ? 1 : (currentStatusIndex + 1) / statuses.length;
  const screenWidth = Dimensions.get('window').width;
  const progressWidth = screenWidth * progress;
  
  return (
    <View style={[styles.container]}>
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
      
      {/* Status steps */}
      <View style={styles.stepsContainer}>
        {statuses.map((status, index) => {

          const isActive = index === currentStatusIndex;
          const isCompleted = index < currentStatusIndex || (isComplete && index === currentStatusIndex);
          
          return (
            <View key={status} style={styles.step}>
              <View style={[
                styles.stepCircle,
                isActive && styles.activeCircle,
                isCompleted && styles.completedCircle
              ]}>
                {isCompleted ? (
                  <Text style={styles.checkmarkText}>✓</Text>
                ) : (
                  <Text style={[
                    styles.stepNumber,
                    isActive && styles.activeText
                  ]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              
              <Text 
                style={[
                  styles.stepText,
                  isActive && styles.activeText,
                  isCompleted && styles.completedText
                ]}
                numberOfLines={1}
              >
                {status}
              </Text>
            </View>
          );
        })}
      </View>
      
      {/* Progress status */}
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {isComplete ? 'Complete' : `Step ${currentStatusIndex + 1} of ${statuses.length}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 12
  },
  step: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  activeCircle: {
    borderColor: '#4CAF50',
  },
  completedCircle: {
    backgroundColor: '#4CAF50',
    borderWidth: 0
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9E9E9E'
  },
  stepText: {
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 2,
    color: '#9E9E9E'
  },
  activeText: {
    fontWeight: '600',
    color: '#4CAF50'
  },
  completedText: {
    color: '#4CAF50'
  },
  checkmarkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  progressTextContainer: {
    alignItems: 'center',
    marginTop: 8
  },
  progressText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500'
  }
});