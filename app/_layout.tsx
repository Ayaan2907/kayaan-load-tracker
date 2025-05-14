import { useAuthStore } from '@/store/authStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// Preventing the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const router = useRouter();
  
  // Get colorScheme from NativeWind's hook. This will reflect the system theme.
  const { colorScheme: nativeWindColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

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
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return null;
  }

  // Determine the theme for React Navigation and ExpoStatusBar based on NativeWind's colorScheme
  const resolvedTheme = nativeWindColorScheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <ExpoStatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}