import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import sportsAMMV2Contract from "@/constants/overtimeContracts";
import { TradeData } from "@/utils/overtime/types/markets";
import { getTradeData } from "@/utils/overtime/ui/helpers";
import { parseEther, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const USDC_ADDRESS = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85";
const REFERRAL_ADDRESS = "0x57B02589d6e24203FC43e442ce9A4803E290293b";
const DEFAULT_SLIPPAGE = parseEther("0.02");

export interface QuoteData {
  quoteData: {
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
  };
  liquidityData?: {
    ticketLiquidityInUsd: number;
  };
}

export const usePlaceBet = ({
  quoteObject,
  tradeData,
}: {
  quoteObject: QuoteData;
  tradeData: TradeData;
}) => {
  const {
    writeContract,
    data: transactionData,
    error: writeError,
    isPending: writePending,
  } = useWriteContract();

  const { isLoading: waitLoading, isSuccess: transactionSuccess } =
    useWaitForTransactionReceipt({
      hash: transactionData,
    });

  const placeBet = async () => {
    if (!quoteObject) {
      throw new Error("Quote data is not available");
    }

    const parsedTotalQuote = parseEther(
      quoteObject.quoteData.totalQuote.normalizedImplied.toString()
    );
    const parsedSlippage = DEFAULT_SLIPPAGE;
    const preparedTradeData = getTradeData([tradeData]);

    // Parse the buyInAmount from the quoteObject
    const buyInAmount = parseUnits(
      quoteObject.quoteData.buyInAmountInUsd.toString(),
      6
    );

    return writeContract({
      abi: sportsAMMV2Contract.abi,
      address: sportsAMMV2Contract.addresses[
        CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
      ] as `0x${string}`,
      functionName: "trade",
      args: [
        preparedTradeData,
        buyInAmount,
        parsedTotalQuote,
        parsedSlippage,
        REFERRAL_ADDRESS,
        USDC_ADDRESS,
        false,
      ],
    });
  };

  return {
    placeBet,
    writeError,
    writePending,
    waitLoading,
    transactionSuccess,
    transactionData,
  };
};
