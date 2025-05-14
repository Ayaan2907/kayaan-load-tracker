import { LOAD_STATUSES, STATUS_UPDATE_INTERVAL } from '@/constants/StatusConstants'
import { create } from 'zustand'

interface LoadStatusState {
  statuses: readonly string[] // Use readonly tuple from constants
  currentStatusIndex: number
  currentStatusProgress: number
  isTracking: boolean 
  intervalId: number | null 
  startTracking: () => void
  completeLoad: () => void 
  _nextStatus: () => void //zustand function to increment status index
}

export const useLoadStatusStore = create<LoadStatusState>((set, get) => ({
  statuses: LOAD_STATUSES,
  currentStatusIndex: -1,
  currentStatusProgress: 0,
  isTracking: false,
  intervalId: null,

  startTracking: () => {
    const currentIntervalId = get().intervalId
    // Clear any existing interval first
    if (typeof currentIntervalId === 'number') {
      clearInterval(currentIntervalId)
    }
    // Set initial state and start new interval
    set({ isTracking: true, currentStatusIndex: 0, currentStatusProgress: 0 })
    
    const newIntervalId = setInterval(() => {
      const state = get()
      if (!state.isTracking) return
      
      // Increment progress
      set((state) => {
        const progressStep = 1 / (STATUS_UPDATE_INTERVAL / 100) // Progress step size
        let newProgress = state.currentStatusProgress + progressStep
        
        // If progress completes for current status
        if (newProgress >= 1) {
          newProgress = 0
          get()._nextStatus() // Move to next status
        }
        
        return { currentStatusProgress: newProgress }
      })
    }, 100) 
    
    set({ intervalId: newIntervalId as number })
    console.log('Tracking started, interval ID:', newIntervalId)
  },

  _nextStatus: () => {
    set((state) => {
      // Check if we are already at the last status
      if (state.currentStatusIndex === state.statuses.length - 1) {
        console.log('Reached end of statuses. Auto-completing.')
        if (typeof state.intervalId === 'number') {
          clearInterval(state.intervalId)
        }
        return {
          isTracking: false,
          currentStatusIndex: -1,
          currentStatusProgress: 0,
          intervalId: null
        }
      }
      
      const nextIndex = state.currentStatusIndex + 1
      console.log(`Updating status index: ${state.currentStatusIndex} -> ${nextIndex}`)
      return { currentStatusIndex: nextIndex, currentStatusProgress: 0 }
    })
  },

  completeLoad: () => { 
    const currentIntervalId = get().intervalId
    if (typeof currentIntervalId === 'number') { 
      clearInterval(currentIntervalId)
      console.log('Manual completion. Tracking interval cleared:', currentIntervalId)
    }
    console.log('Load completed manually, hiding status bar.')
    set({ isTracking: false, currentStatusIndex: -1, currentStatusProgress: 0, intervalId: null })
  }
}))


// // Cleanup interval on store destruction
// useLoadStatusStore.subscribe((state, prevState) => {
//   // Clean up interval if it exists when store is destroyed
//   if (state.intervalId) {
//     clearInterval(state.intervalId)
//   }
// })