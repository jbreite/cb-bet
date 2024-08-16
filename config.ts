polyfillForWagmi();

import {
  createConnectorFromWallet,
  Wallets,
} from "@mobile-wallet-protocol/wagmi-connectors";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";

const metadata = {
  appDeeplinkUrl: "https://your-app.example.com", // required
  appName: "cb-bet",
  appChainIds: [8453],
  appLogoUrl: "https://example.com/logo.png",
};

export const config = createConfig({
  chains: [base],
  connectors: [
    createConnectorFromWallet({
      metadata,
      wallet: Wallets.CoinbaseSmartWallet,
    }),
  ],
  transports: {
    [base.id]: http(),
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
