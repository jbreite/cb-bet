import { ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import { useCallback, useEffect, useMemo, useState } from "react";
import CoinbaseWalletSDK from "@mobile-wallet-protocol/client";
import Section from "@/components/coinbaseComponents/section";
import { useQuery } from "@tanstack/react-query";
import { getSports } from "@/utils/overtime/queries/getSports";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";

// exp://x.x.x.x:8000/--/
const PREFIX_URL = Linking.createURL("/");

// 3. Initialize SDK
const sdk = new CoinbaseWalletSDK({
  appDeeplinkUrl: PREFIX_URL,
  appName: "SCW Expo Example",
  appChainIds: [8453],
});

// 4. Create EIP-1193 provider
const provider = sdk.makeWeb3Provider();

export default function Index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {
        leagueId: LeagueEnum.EPL,
      }),
  });

  if (data) {
    console.log(data);
  } else if (isLoading) {
    console.log("Loading...");
  } else if (error) {
    console.log("Error:", error);
  }

  const [addresses, setAddresses] = useState<string[]>([]);

  const isConnected = addresses.length > 0;

  // 5. Use provider

  useEffect(() => {
    provider.addListener("accountsChanged", (accounts) => {
      if (accounts && Array.isArray(accounts)) setAddresses(accounts);
    });

    provider.addListener("disconnect", () => {
      setAddresses([]);
    });

    () => {
      provider.removeListener("accountsChanged");
      provider.removeListener("disconnect");
    };
  }, []);

  const handleConnect = useCallback(async () => {
    const result = await provider.request({ method: "eth_requestAccounts" });
    if (result && Array.isArray(result)) {
      setAddresses(result as string[]);
    }
    return stringify(result);
  }, []);

  const handleAccounts = useCallback(async () => {
    const result = await provider.request({ method: "eth_accounts" });
    return stringify(result);
  }, []);

  const handlePersonalSign = useCallback(async () => {
    const result = await provider.request({
      method: "personal_sign",
      params: ["0x48656c6c6f2c20776f726c6421", addresses[0]],
    });
    return stringify(result);
  }, [addresses]);

  const handleWalletGetCapabilities = useCallback(async () => {
    const result = await provider.request({ method: "wallet_getCapabilities" });
    return stringify(result);
  }, []);

  const handleDisconnect = useCallback(async () => {
    await provider.disconnect();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Section
          key="connect"
          title="eth_requestAccounts"
          buttonLabel="Connect"
          onPress={handleConnect}
        />

        {isConnected && (
          <>
            <Section
              key="disconnect"
              title="@disconnect"
              buttonLabel="Disconnect"
              onPress={handleDisconnect}
            />
            <Section
              key="accounts"
              title="eth_accounts"
              onPress={handleAccounts}
            />
            <Section
              key="personal_sign"
              title="personal_sign"
              onPress={handlePersonalSign}
            />
            <Section
              key="wallet_getCapabilities"
              title="wallet_getCapabilities"
              onPress={handleWalletGetCapabilities}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

function stringify(result: unknown): string {
  if (typeof result === "string") {
    return result;
  }
  return JSON.stringify(result, null, 2);
}
