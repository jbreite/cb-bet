import CoinbaseWalletSDK from "@mobile-wallet-protocol/client";
import * as Linking from "expo-linking";

// exp://x.x.x.x:8000/--/
export const PREFIX_URL = Linking.createURL("/");

// 3. Initialize SDK
const sdk = new CoinbaseWalletSDK({
  appDeeplinkUrl: PREFIX_URL,
  appName: "SCW Expo Example",
  appChainIds: [8453],
});

// 4. Create EIP-1193 provider
export const provider = sdk.makeWeb3Provider();
