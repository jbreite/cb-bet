import "../polyfills";

import { Stack, useRouter, usePathname, useSegments } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { handleResponse } from "@mobile-wallet-protocol/client/dist/core/communicator/handleResponse.native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const handled = handleResponse(url);
      if (handled) {
        router.back();
      } else {
        console.log("Deeplink not handled by handleResponse");
        // Handle other deeplinks here if needed
      }
    });

    return () => {
      console.log("Cleaning up deeplink listener");
      subscription.remove();
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="sports" />
      </Stack>
    </QueryClientProvider>
  );
}
