polyfillForWagmi();

import {
  createConnectorFromWallet,
  Wallets,
} from "@mobile-wallet-protocol/wagmi-connectors";
import { http, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import * as Linking from "expo-linking";

const PREFIX_URL = Linking.createURL("/");

export const config = createConfig({
  chains: [optimism],
  connectors: [
    createConnectorFromWallet({
      metadata: {
        appName: "B Squared",
        appDeeplinkUrl: PREFIX_URL,
        appLogoUrl: "https://www.bsquared.world/backupBookIcon.png",
      },
      wallet: Wallets.CoinbaseSmartWallet,
    }),
  ],
  transports: {
    [optimism.id]: http(),
  },
});

function polyfillForWagmi() {
  const noop = (() => {}) as any;

  window.addEventListener = noop;
  window.dispatchEvent = noop;
  window.removeEventListener = noop;
  window.CustomEvent = function CustomEvent() {
    return {};
  } as any;
}
