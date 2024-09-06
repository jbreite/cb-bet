import { createPublicClient, http } from "npm:viem";
import { optimism } from "npm:viem/chains";

export const client = createPublicClient({
  chain: optimism,
  transport: http(),
});
