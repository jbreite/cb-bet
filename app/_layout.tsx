import "../polyfills"

import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider, useAuth } from "@/components/AuthContext";
import { Provider as JotaiProvider } from "jotai";
import { defaultStore } from "@/lib/atom/store";
import { config } from "@/config";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  // const { isAuthenticated } = useAuth(); // Use your auth context
  // const segments = useSegments();

  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === "(auth)";

  //   if (isAuthenticated && !inAuthGroup) {
  //     router.replace("/(auth)");
  //   } else if (!isAuthenticated && inAuthGroup) {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, segments]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("Deeplink received:", url);
      const handled = handleResponse(url);
      console.log("Deeplink handled:", handled);
      if (handled) {
        // router.back();
      } else {
        console.log("Deeplink not handled by handleResponse");
      }
    });

    return () => {
      console.log("Cleaning up deeplink listener");
      subscription.remove();
    };
  }, []);

  if (!loaded) {
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={defaultStore}>
          <InitialLayout />
        </JotaiProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

