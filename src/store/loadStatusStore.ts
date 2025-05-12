import { create } from 'zustand'
import { LOAD_STATUSES, STATUS_UPDATE_INTERVAL } from '../utils/constants'

interface LoadStatusState {
  statuses: readonly string[] // Use readonly tuple from constants
  currentStatusIndex: number  // Index of the current status
  isTracking: boolean 
  intervalId: number | null 
  startTracking: () => void
  completeLoad: () => void 
  _nextStatus: () => void //zustand function to increment status index
}

export const useLoadStatusStore = create<LoadStatusState>((set, get) => ({
  statuses: LOAD_STATUSES,
  currentStatusIndex: -1,
  isTracking: false,
  intervalId: null,

  startTracking: () => {
    const currentIntervalId = get().intervalId
    // Clear any existing interval first
    if (typeof currentIntervalId === 'number') { // Ensure it's a number before clearing
      clearInterval(currentIntervalId)
    }
    // Set initial state and start new interval
    set({ isTracking: true, currentStatusIndex: 0 }) // Start from the first status
    const newIntervalId = setInterval(get()._nextStatus, STATUS_UPDATE_INTERVAL) // get()._nextStatus to ensure fresh reference
    set({ intervalId: newIntervalId as number }) // Store as number
    console.log('Tracking started, interval ID:', newIntervalId)
  },

  _nextStatus: () => {
      set((state) => {
        //  Check if we are already at the last status
      if (state.currentStatusIndex === state.statuses.length - 1) {
        console.log('Reached end of statuses. Auto-completing.')
        if (typeof state.intervalId === 'number') { // Ensure it's a number
          clearInterval(state.intervalId)
        }
        return {
          isTracking: false,
          currentStatusIndex: -1,
          intervalId: null
        }
      }
      if (state.currentStatusIndex === null || state.currentStatusIndex === -1) {
          console.warn('_nextStatus called with invalid index:', state.currentStatusIndex);
          return state; // Should not proceed if index is invalid
      }
      const nextIndex = state.currentStatusIndex + 1
      console.log(`Updating status index: ${state.currentStatusIndex} -> ${nextIndex}`)
      return { currentStatusIndex: nextIndex }
    })
  },

  completeLoad: () => { 
    const currentIntervalId = get().intervalId
    if (typeof currentIntervalId === 'number') { 
      clearInterval(currentIntervalId)
      console.log('Manual completion. Tracking interval cleared:', currentIntervalId)
    }
    console.log('Load completed manually, hiding status bar.')
    set({ isTracking: false, currentStatusIndex: -1, intervalId: null })
  }
}))


// // Cleanup interval on store destruction
// useLoadStatusStore.subscribe((state, prevState) => {
//   // Clean up interval if it exists when store is destroyed
//   if (state.intervalId) {
//     clearInterval(state.intervalId)
//   }
// })