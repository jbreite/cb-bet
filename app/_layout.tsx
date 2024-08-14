import "../polyfills";

import { Stack, useRouter, usePathname, useSegments } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { handleResponse } from "@mobile-wallet-protocol/client/dist/core/communicator/handleResponse.native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();

  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Current segments:", segments);
  }, [pathname, segments]);

  useEffect(() => {
    if (pathname === "/coinbase-wallet-sdk") {
      // Redirect to home or handle the Coinbase Wallet SDK response
      router.back();
    }
  }, [pathname, router]);

  useEffect(() => {
    console.log("Setting up deeplink listener");

    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("Incoming deeplink:", url);
      try {
        console.log("Calling handleResponse with URL:", url);
        const result = handleResponse(url);
        console.log("handleResponse result:", result);
      } catch (err) {
        console.error("Error in handleResponse:", err);
      }
    });

    return () => {
      console.log("Cleaning up deeplink listener");
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
