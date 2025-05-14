import AsyncStorageMock from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../authStore';

const AUTH_STATUS_KEY = '@LoadTrackerApp:isAuthenticated';

describe('useAuthStore', () => {
  const initialStoreState = useAuthStore.getState();

  beforeEach(() => {
    useAuthStore.setState(initialStoreState, true);
    jest.clearAllMocks();
    AsyncStorageMock.clear(); 
  });

  it('should initialize with isAuthenticated as false and isLoading as true', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  describe('login action', () => {
    it('should set isAuthenticated to true and persist to AsyncStorage', async () => {
      // Get the login action from the store
      const { login } = useAuthStore.getState();
      
      await login();
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
        
      // Check if AsyncStorage.setItem was called correctly
      expect(AsyncStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorageMock.setItem).toHaveBeenCalledWith(AUTH_STATUS_KEY, 'true');
    });

    it('should handle errors when AsyncStorage.setItem fails during login', async () => {
      // Mock AsyncStorage.setItem to throw an error
      const errorMessage = 'Failed to save';
      (AsyncStorageMock.setItem as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { login } = useAuthStore.getState();
      await login();

      // State should ideally remain false if the async storage operation fails
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to save auth status during login:', new Error(errorMessage));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('logout action', () => {
    it('should set isAuthenticated to false and remove from AsyncStorage', async () => {
      // First, simulate a logged-in state
      useAuthStore.setState({ isAuthenticated: true, isLoading: false });
      await AsyncStorageMock.setItem(AUTH_STATUS_KEY, 'true');

      const { logout } = useAuthStore.getState();
      await logout();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(AsyncStorageMock.removeItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorageMock.removeItem).toHaveBeenCalledWith(AUTH_STATUS_KEY);
    });

    it('should handle errors when AsyncStorage.removeItem fails during logout', async () => {
      useAuthStore.setState({ isAuthenticated: true, isLoading: false });
      const errorMessage = 'Failed to remove';
      (AsyncStorageMock.removeItem as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { logout } = useAuthStore.getState();
      await logout();

      // If AsyncStorage.removeItem fails, set({ isAuthenticated: false }) is skipped.
      // So, isAuthenticated should remain what it was before the call.
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to remove auth status during logout:', new Error(errorMessage));
      consoleErrorSpy.mockRestore();
    });

    it('[FAILING TEST] should incorrectly expect isAuthenticated to be true after logout', async () => {
      useAuthStore.setState({ isAuthenticated: true, isLoading: false });
      const { logout } = useAuthStore.getState();
      await logout();
      expect(useAuthStore.getState().isAuthenticated).toBe(true); // This will fail
    });
  });

  describe('checkAuthStatus action', () => {
    it('should set isAuthenticated to true and isLoading to false if token is found', async () => {
      await AsyncStorageMock.setItem(AUTH_STATUS_KEY, 'true');
      const { checkAuthStatus } = useAuthStore.getState();
      await checkAuthStatus();

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(AsyncStorageMock.getItem).toHaveBeenCalledWith(AUTH_STATUS_KEY);
    });

    it('should set isAuthenticated to false and isLoading to false if token is not found', async () => {
      await AsyncStorageMock.setItem(AUTH_STATUS_KEY, 'false'); // or null
      const { checkAuthStatus } = useAuthStore.getState();
      await checkAuthStatus();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
    
    it('should set isAuthenticated to false and isLoading to false if token is null', async () => {
      // AsyncStorageMock.getItem will return null by default if not set
      const { checkAuthStatus } = useAuthStore.getState();
      await checkAuthStatus();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });

    it('should handle errors when AsyncStorage.getItem fails during checkAuthStatus', async () => {
      const errorMessage = 'Failed to get item';
      (AsyncStorageMock.getItem as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { checkAuthStatus } = useAuthStore.getState();
      await checkAuthStatus();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load auth status:', new Error(errorMessage));
      consoleErrorSpy.mockRestore();
    });

    it('[FAILING TEST] should incorrectly expect isLoading to be true after successful auth check', async () => {
      await AsyncStorageMock.setItem(AUTH_STATUS_KEY, 'true');
      const { checkAuthStatus } = useAuthStore.getState();
      await checkAuthStatus();
      expect(useAuthStore.getState().isLoading).toBe(true); // This will fail
    });
  });
}); 