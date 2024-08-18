// import { parseEther } from "viem";
// import { TradeData } from "./types/markets";
// import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
// import sportsAMMV2Contract from "@/constants/overtimeContracts";
// import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
// import { Alert } from "react-native";

// export interface QuoteData {
//   quoteData: {
//     totalQuote: {
//       normalizedImplied: number;
//       american: number;
//     };
//     buyInAmountInUsd: number;
//     payout: {
//       usd: number;
//     };
//     potentialProfit: {
//       usd: number;
//       percentage: number;
//     };
//   };
//   liquidityData?: {
//     ticketLiquidityInUsd: number;
//   };
// }

// function getTradeData(quoteTradeData: any[]) {
//   return quoteTradeData.map((data) => ({
//     ...data,
//     line: Math.round(data.line * 100), // Keep as number, multiply by 100 and round
//     odds: data.odds.map((odd: string) => parseEther(odd.toString())),
//     combinedPositions: data.combinedPositions.map((combinedPositions: any[]) =>
//       combinedPositions.map((combinedPosition) => ({
//         typeId: combinedPosition.typeId,
//         position: combinedPosition.position,
//         line: Math.round(combinedPosition.line * 100), // Keep as number, multiply by 100 and round
//       }))
//     ),
//   }));
// }

// export const handleBet = async (
//   quoteObject: QuoteData,
//   tradeData: TradeData
// ) => {
//   const {
//     writeContract,
//     data: hash,
//     error: writeError,
//     isPending: writePending,
//   } = useWriteContract();

//   const { isLoading: waitLoading, isSuccess: transactionSuccess } =
//     useWaitForTransactionReceipt({ hash });

//   const handleBet = async (quoteObject: QuoteData, tradeData: TradeData) => {
//     const buyInAmount = parseEther("10"); // 10 THALES
//     const parsedTotalQuote = parseEther(
//       quoteObject.quoteData.totalQuote.normalizedImplied.toString()
//     );
//     const parsedSlippage = parseEther("0.02");
//     const REFERRAL_ADDRESS = "0x0000000000000000000000000000000000000000";
//     const COLLATERAL_ADDRESS = "0x217D47011b23BB961eB6D93cA9945B7501a5BB11";

//     const preparedTradeData = getTradeData([tradeData]);

//     try {
//       await writeContract({
//         abi: sportsAMMV2Contract.abi,
//         address: sportsAMMV2Contract.addresses[
//           CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
//         ] as `0x${string}`,
//         functionName: "trade",
//         args: [
//           preparedTradeData,
//           buyInAmount,
//           parsedTotalQuote,
//           parsedSlippage,
//           REFERRAL_ADDRESS,
//           COLLATERAL_ADDRESS,
//           false,
//         ],
//       });
//     } catch (error) {
//       console.error("Failed to execute bet:", error);
//       throw error; // Re-throw the error to be handled by the component
//     }
//   };

//   return {
//     handleBet,
//     writeError,
//     writePending,
//     waitLoading,
//     transactionSuccess,
//   };
// };
