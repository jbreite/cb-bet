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
import { usePostHog, PostHogProvider } from "posthog-react-native";

const queryClient = new QueryClient();
const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY!;

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const posthog = usePostHog();

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

  const { isConnected, status, address } = useAccount();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && (status === "connected" || status === "disconnected")) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loaded, status]);

  //For some reason still goes to login first adn not just loggedd in
  useEffect(() => {
    if (status === "connecting" || status === "reconnecting") return;

    const inAuthGroup = segments[0] === "(auth)";
    console.log("🪨 ~ useEffect ~ inAuthGroup", inAuthGroup);
    console.log("🪨 ~ useEffect ~ isConnected", isConnected);

    if (isConnected && !inAuthGroup) {
      // Bring the user inside the auth group
      router.replace("/(auth)/(tabs)/home");

      // Identify the user with PostHog
      if (address) {
        posthog?.identify(address, {
          wallet_address: address,
        });
      }
    } else if (!isConnected && inAuthGroup) {
      // Kick the user out of the auth group
      router.replace("/");

      //Reset Posthog instance
      posthog.reset();
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
      <Stack.Screen name="index" options={{ headerShown: false }} />
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
        <PostHogProvider
          apiKey={POSTHOG_API_KEY}
          autocapture={{
            captureTouches: true,
            captureLifecycleEvents: true,
            captureScreens: true,
            ignoreLabels: [], // Any labels here will be ignored from the stack in touch events
            customLabelProp: "ph-label",
            noCaptureProp: "ph-no-capture",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <JotaiProvider store={defaultStore}>
              <InitialLayout />
            </JotaiProvider>
          </QueryClientProvider>
        </PostHogProvider>
      </WagmiProvider>
    </GestureHandlerRootView>
  );
}
