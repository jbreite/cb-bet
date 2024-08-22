import "../polyfills";

import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { defaultStore } from "@/lib/atom/store";
import { config } from "@/config";
import { useAccount, WagmiProvider } from "wagmi";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    "SF-Pro-Rounded-Black": require("../assets/fonts/SF-Pro-Rounded-Black.otf"),
    "SF-Pro-Rounded-Bold": require("../assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "SF-Pro-Rounded-Heavy": require("../assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "SF-Pro-Rounded-Light": require("../assets/fonts/SF-Pro-Rounded-Light.otf"),
    "SF-Pro-Rounded-Medium": require("../assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SF-Pro-Rounded-Regular": require("../assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "SF-Pro-Rounded-Semibold": require("../assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "SF-Pro-Rounded-Thin": require("../assets/fonts/SF-Pro-Rounded-Thin.otf"),
    "SF-Pro-Rounded-Ultralight": require("../assets/fonts/SF-Pro-Rounded-Ultralight.otf"),
  });

  const { isConnected, status } = useAccount();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  //For some reason still goes to login first adn not just loggedd in
  useEffect(() => {
    if (status === "connecting" || status === "reconnecting") return;

    const inAuthGroup = segments[0] === "(auth)";
    console.log("🪨 ~ useEffect ~ inAuthGroup", inAuthGroup);
    console.log("🪨 ~ useEffect ~ isConnected", isConnected);

    if (isConnected && !inAuthGroup) {
      // Bring the user inside the auth group
      router.replace("/(auth)/(tabs)/home");
    } else if (!isConnected && inAuthGroup) {
      // Kick the user out of the auth group
      router.replace("/");
    }
  }, [isConnected, status]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("incoming deeplink:", url);
      try {
        handleResponse(url);
        router.back();
      } catch (err) {
        console.error(err);
      }
    });

    return () => subscription.remove();
  }, []);

  if (!loaded || status === "connecting" || status === "reconnecting") {
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <JotaiProvider store={defaultStore}>
            <InitialLayout />
          </JotaiProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </GestureHandlerRootView>
  );
}
