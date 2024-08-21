import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import sportsAMMV2Contract from "@/constants/overtimeContracts";
import { QuoteData } from "@/utils/overtime/queries/getQuote";
import { TradeData } from "@/utils/overtime/types/markets";
import { getTradeData } from "@/utils/overtime/ui/helpers";
import { parseEther, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const USDC_ADDRESS = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85";
const REFERRAL_ADDRESS = "0x57B02589d6e24203FC43e442ce9A4803E290293b";
const DEFAULT_SLIPPAGE = parseEther("0.02");

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

//DETAILED LOGS IF NEEDED
// const detailedLog = (obj) => {
//   const seen = new WeakSet();
//   return JSON.stringify(
//     obj,
//     (key, value) => {
//       if (typeof value === "bigint") {
//         return value.toString();
//       }
//       if (typeof value === "object" && value !== null) {
//         if (seen.has(value)) {
//           return "[Circular]";
//         }
//         seen.add(value);
//       }
//       return value;
//     },
//     2
//   );
// };

// console.log(
//   "Detailed Payload for placeBet:",
//   detailedLog({
//     contractAddress:
//       sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
//     functionName: "trade",
//     args: [
//       preparedTradeData,
//       buyInAmount,
//       parsedTotalQuote,
//       parsedSlippage,
//       REFERRAL_ADDRESS,
//       USDC_ADDRESS,
//       false,
//     ],
//   })
// );
