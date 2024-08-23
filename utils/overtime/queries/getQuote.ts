import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/constants/Constants";
import { TradeData } from "../types/markets";

export class QuoteError extends Error {
  constructor(
    message: string,
    public responseData?: any,
    public statusCode?: number
  ) {
    super(message);
    this.name = "QuoteError";
  }
}
export interface SuccessfulQuoteData {
  totalQuote: {
    normalizedImplied: number;
    american: number;
  };
  buyInAmountInUsd: number;
  payout: {
    usd: number;
  };
  potentialProfit: {
    usd: number;
    percentage: number;
  };
}

// Define the structure for an error response
export interface ErrorQuoteData {
  error: string;
}

// Define the structure for liquidity data
interface LiquidityData {
  ticketLiquidityInUsd: number;
}

// Main QuoteData type using discriminated union
export type QuoteData = {
  quoteData: SuccessfulQuoteData | ErrorQuoteData;
  liquidityData: LiquidityData;
};
export const getQuote = async ({
  buyInAmount,
  tradeData,
  network = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM,
  collateral,
}: {
  buyInAmount: number;
  tradeData: TradeData[];
  network?: CB_BET_SUPPORTED_NETWORK_IDS;
  collateral?: string;
}): Promise<QuoteData> => {
  const url = `${OVERTIME_API_BASE_URL}/networks/${network}/quote`;

  const body = {
    buyInAmount,
    tradeData,
    ...(collateral && { collateral }),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.statusText}`);
  }

  return response.json();
};
