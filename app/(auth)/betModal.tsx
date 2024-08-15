import { View, Text } from "react-native";
import { useAtom } from "jotai";
import { sportMarketAtom } from "@/lib/atom/atoms";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/utils/overtime/queries/getQuote";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { SportMarketOdds, TradeData } from "@/utils/overtime/types/markets";

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
    position: 1, //Don't know waht this is... I think which in odds array
    combinedPositions: firstSportMarket.combinedPositions,
    live: false, // Always false
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

  if (data) {
    console.log("DATALOG: ", JSON.stringify(data));
  } else if (quoteLoading) {
    console.log("Loading");
  } else if (isError) {
    console.log("Error");
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
        </View>
      )}
    </View>
  );
}
