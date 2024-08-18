import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/constants/Constants";
import { TradeData } from "../types/markets";
import { QuoteData } from "@/app/(auth)/betModal";

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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const responseData = await response.json();
      console.log("Response data:", JSON.stringify(responseData, null, 2));

      if (!response.ok) {
        throw new QuoteError(
          `HTTP error! status: ${response.status}`,
          responseData,
          response.status
        );
      }

      if (responseData.quoteData && responseData.quoteData.error) {
        throw new QuoteError(
          responseData.quoteData.error,
          responseData,
          response.status
        );
      }

      return responseData;
    } else {
      // If not JSON, read as text
      const textResponse = await response.text();
      console.error("Unexpected response format. Content-Type:", contentType);
      console.error("Response text:", textResponse);
      throw new QuoteError(
        `Unexpected response format. Status: ${response.status}, Content-Type: ${contentType}`,
        textResponse,
        response.status
      );
    }
  } catch (error) {
    if (error instanceof QuoteError) {
      throw error;
    } else if (error instanceof Error) {
      console.error("Fetch error:", error.message);
      throw new QuoteError(`Failed to fetch quote: ${error.message}`);
    } else {
      console.error("Unknown error:", error);
      throw new QuoteError(
        "An unknown error occurred while fetching the quote"
      );
    }
  }
};
