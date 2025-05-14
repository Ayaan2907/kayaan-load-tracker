import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

// Key for storing auth status in AsyncStorage
const AUTH_STATUS_KEY = '@LoadTrackerApp:isAuthenticated'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean // To track if loading the initial status
  login: () => Promise<void> 
  logout: () => Promise<void> 
  checkAuthStatus: () => Promise<void> 
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,

  login: async () => {
    try {
      await AsyncStorage.setItem(AUTH_STATUS_KEY, 'true')
      set({ isAuthenticated: true })
    } catch (error) {
      console.error('Failed to save auth status during login:', error)
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STATUS_KEY)
      set({ isAuthenticated: false })
    } catch (error) {
      console.error('Failed to remove auth status during logout:', error)
    }
  },

  checkAuthStatus: async () => {
    try {
      const storedStatus = await AsyncStorage.getItem(AUTH_STATUS_KEY)
      set({ isAuthenticated: storedStatus === 'true', isLoading: false })
    } catch (error) {
      console.error('Failed to load auth status:', error)
      set({ isAuthenticated: false, isLoading: false })
    }
  }
})) 