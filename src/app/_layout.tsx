import "../global.css";

import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@/lib/clerk";
import { useLanguageStore } from "@/store/languageStore";

SplashScreen.preventAutoHideAsync();

function AuthGate() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();

  useEffect(() => {
    if (!isLoaded || !_hasHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isOnboarding = segments[0] === "onboarding";
    const isLanguageSelection = segments[0] === "language-selection";

    if (!isSignedIn && !inAuthGroup && !isOnboarding) {
      router.replace("/onboarding");
    } else if (isSignedIn && (inAuthGroup || isOnboarding)) {
      if (selectedLanguage) {
        router.replace("/");
      } else {
        router.replace("/language-selection");
      }
    } else if (isSignedIn && !selectedLanguage && !isLanguageSelection) {
      router.replace("/language-selection");
    }
  }, [isSignedIn, isLoaded, segments, router, selectedLanguage, _hasHydrated]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!clerkPublishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. Please set it in your Expo environment."
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <AuthGate />
    </ClerkProvider>
  );
}
