import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAtom } from "jotai";
import { sportMarketAtom } from "@/lib/atom/atoms";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/utils/overtime/queries/getQuote";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { SportMarketOdds, TradeData } from "@/utils/overtime/types/markets";
import { ethers } from "ethers";
import { executeBet } from "@/utils/overtime/queries/makeBet";
function convertOddsToStrings(odds: SportMarketOdds[]): string[] {
  return odds.map((odd) => odd.normalizedImplied.toString());
}

export default function BetModal() {
  const [sportMarketAtomInfo] = useAtom(sportMarketAtom);

  const firstSportMarket = sportMarketAtomInfo[0];

  const formattedTradeData: TradeData = {
    gameId: firstSportMarket.gameId,
    sportId: firstSportMarket.subLeagueId,
    typeId: firstSportMarket.typeId,
    maturity: firstSportMarket.maturity,
    status: firstSportMarket.status,
    line: firstSportMarket.line,
    playerId: firstSportMarket.playerProps.playerId,
    odds: convertOddsToStrings(firstSportMarket.odds),
    merkleProof: firstSportMarket.proof,
    position: 1,
    combinedPositions: firstSportMarket.combinedPositions,
    live: false,
  };

  const {
    data,
    isLoading: quoteLoading,
    isError,
  } = useQuery({
    queryKey: ["quoteData"],
    queryFn: () =>
      getQuote({
        buyInAmount: 100,
        tradeData: [formattedTradeData],
      }),
  });

  const handleBet = async () => {
    if (!data) {
      Alert.alert("Error", "Quote data is not available");
      return;
    }

    try {
      const quoteData = {
        quoteTradeData: [formattedTradeData],
        quoteData: data.quoteData,
      };
      const buyInAmount = ethers.parseUnits("100", 18).toString(); // 100 THALES

      const receipt = await executeBet(quoteData, buyInAmount);
      console.log("Bet executed successfully!", receipt);
      Alert.alert("Success", "Bet placed successfully!");
    } catch (error) {
      console.error("Failed to execute bet:", error);
      Alert.alert("Error", "Failed to place bet. Please try again.");
    }
  };

  if (quoteLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading quote data</Text>;
  }

  return (
    <View>
      <Text>BetModal</Text>
      {data && (
        <View>
          <Text>Bet Amount: ${data.quoteData.buyInAmountInUsd}</Text>
          <Text>Potential Payout: ${data.quoteData.payout.usd.toFixed(2)}</Text>
          <Text>
            Potential Profit: ${data.quoteData.potentialProfit.usd.toFixed(2)} (
            {data.quoteData.potentialProfit.percentage.toFixed(2)}%)
          </Text>
          <Text>
            Odds: {data.quoteData.totalQuote.american > 0 ? "+" : ""}
            {data.quoteData.totalQuote.american.toFixed(0)} (
            {(data.quoteData.totalQuote.normalizedImplied * 100).toFixed(2)}%)
          </Text>
          <Text>
            Available Liquidity: ${data.liquidityData.ticketLiquidityInUsd}
          </Text>
          <Button title="Place Bet" onPress={handleBet} />
        </View>
      )}
    </View>
  );
}
