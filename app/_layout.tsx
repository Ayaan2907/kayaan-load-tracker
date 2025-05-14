import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// Preventing the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Checking authentication status when the app loads
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); // Depend on the checkAuthStatus function instance

  useEffect(() => {
    if (!isLoading) {
      console.log('Auth check complete. isAuthenticated:', isAuthenticated); 
      if (isAuthenticated) {
        router.replace('/home'); // Use replace to avoid back button to login
      } else {
        router.replace('/login');
      }
      // Hiding the splash screen now that we are ready to render
      SplashScreen.hideAsync();
    }
  }, [isLoading, isAuthenticated, router]); // Re-run when loading state, auth state, font state or router changes

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}