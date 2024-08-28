import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import sportsAMMV2Contract, {
  DEFAULT_USDC_OPTIMISM,
  REFERRAL_ADDRESS,
  DEFAULT_SLIPPAGE,
} from "@/constants/overtimeContracts";
import { QuoteData } from "@/utils/overtime/queries/getQuote";
import { TradeData } from "@/utils/overtime/types/markets";
import { getTradeData } from "@/utils/overtime/ui/helpers";
import { parseEther, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const usePlaceBet = ({
  quoteObject,
  tradeData,
}: {
  quoteObject: QuoteData | undefined;
  tradeData: TradeData[];
}) => {
  const {
    writeContract,
    data: transactionData,
    error: writeError,
    isPending: writePending,
    failureReason: writeFailureReason,
  } = useWriteContract();

  const { isLoading: waitLoading, isSuccess: transactionSuccess } =
    useWaitForTransactionReceipt({
      hash: transactionData,
    });

  const placeBet = async () => {
    if (!quoteObject) {
      throw new Error("Quote data is not available");
    }

    if ("error" in quoteObject.quoteData) {
      throw new Error("Got an error quote Object");
    }

    const parsedTotalQuote = parseEther(
      quoteObject.quoteData.totalQuote.normalizedImplied.toString()
    );
    const parsedSlippage = DEFAULT_SLIPPAGE;
    const preparedTradeData = getTradeData(tradeData);

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
        DEFAULT_USDC_OPTIMISM,
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
    writeFailureReason,
  };
};
