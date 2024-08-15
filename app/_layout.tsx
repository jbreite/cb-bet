import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@mobile-wallet-protocol/client/dist/core/communicator/handleResponse.native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/components/AuthContext";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Use your auth context
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (!isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, segments]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const handled = handleResponse(url);
      if (handled) {
        router.back();
      } else {
        console.log("Deeplink not handled by handleResponse");
      }
    });

    return () => {
      console.log("Cleaning up deeplink listener");
      subscription.remove();
    };
  }, [router]);

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <InitialLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}
