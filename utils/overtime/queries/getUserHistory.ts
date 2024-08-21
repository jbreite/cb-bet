import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/constants/Constants";
import { Ticket } from "../types/markets";

export type HistoryRepsone = {
  open: Ticket[];
  claimable: Ticket[];
  closed: Ticket[];
};

export const getUserHistory = async (
  network: number = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM,
  walletAddress: `0x${string}` | undefined
): Promise<HistoryRepsone> => {
  const networkToString = network.toString();

  const url = `${OVERTIME_API_BASE_URL}/networks/${networkToString}/users/${walletAddress}/history`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.statusText}`);
  }

  return response.json();
};
