// import React from "react";
// import { View, Text, Button, Alert } from "react-native";
// import { useAtom } from "jotai";
// import { sportMarketAtom, userBetsAtom } from "@/lib/atom/atoms";
// import { useQuery } from "@tanstack/react-query";
// import { getQuote } from "@/utils/overtime/queries/getQuote";
// import { ethers } from "ethers";
// import { executeBet } from "@/utils/overtime/queries/makeBet";

// const REFETCH_INTERVAL = 10000;

// export default function BetModal() {
//   //TODO: NEED TO CLEAR THIS WHEN THE USER CLOSES OR PLACES THE BET   
//   const [userBetsAtomInfo] = useAtom(userBetsAtom);
//   const tradeData = userBetsAtomInfo[0].tradeData;
//   console.log("tradeData", tradeData);

//   const hasTradePosition = tradeData.position !== undefined;

//   const {
//     data,
//     isLoading: quoteLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["quoteData", tradeData.position],
//     queryFn: () =>
//       getQuote({
//         buyInAmount: 10,
//         tradeData: [tradeData],
//       }),
//     enabled: hasTradePosition,
//     refetchInterval: REFETCH_INTERVAL,
//   });

//   const handleBet = async () => {
//     if (!data) {
//       Alert.alert("Error", "Quote data is not available");
//       return;
//     }

//     try {
//       const quoteData = {
//         quoteTradeData: [tradeData],
//         quoteData: data.quoteData,
//       };
//       const buyInAmount = ethers.parseUnits("100", 18).toString(); // 100 THALES

//       const receipt = await executeBet(quoteData, buyInAmount);
//       console.log("Bet executed successfully!", receipt);
//       Alert.alert("Success", "Bet placed successfully!");
//     } catch (error) {
//       console.error("Failed to execute bet:", error);
//       Alert.alert("Error", "Failed to place bet. Please try again.");
//     }
//   };

//   if (quoteLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (isError) {
//     return <Text>Error loading quote data</Text>;
//   }

//   return (
//     <View>
//       <Text>BetModal</Text>
//       {data && (
//         <View>
//           <Text>Bet Amount: ${data.quoteData.buyInAmountInUsd}</Text>
//           <Text>Potential Payout: ${data.quoteData.payout.usd.toFixed(2)}</Text>
//           <Text>
//             Potential Profit: ${data.quoteData.potentialProfit.usd.toFixed(2)} (
//             {data.quoteData.potentialProfit.percentage.toFixed(2)}%)
//           </Text>
//           <Text>
//             Odds: {data.quoteData.totalQuote.american > 0 ? "+" : ""}
//             {data.quoteData.totalQuote.american.toFixed(0)} (
//             {(data.quoteData.totalQuote.normalizedImplied * 100).toFixed(2)}%)
//           </Text>
//           <Text>
//             Available Liquidity: ${data.liquidityData.ticketLiquidityInUsd}
//           </Text>
//           <Button title="Place Bet" onPress={handleBet} />
//         </View>
//       )}
//     </View>
//   );
// }
