import { parseEther } from "viem";
import { OddsType } from "../enums/markets";
import { MarketTypeEnum } from "../enums/marketTypes";
import { SportMarket, SportMarketOdds, TradeData } from "../types/markets";

export function getSpecificMarket(
  market: SportMarket,
  marketTypeId: MarketTypeEnum
): SportMarket | undefined {
  return market.childMarkets.find(
    (childMarket) => childMarket.typeId === marketTypeId
  );
}

export function formatAmericanOdds(odds: number) {
  if (odds > 0) {
    return `+${odds.toFixed(0)}`;
  } else {
    return `${odds.toFixed(0)}`;
  }
}

function convertOddsToStrings(odds: SportMarketOdds[]): string[] {
  return odds.map((odd) => odd.normalizedImplied.toString());
}

export function getTradeDataFromSportMarket(
  sportMarket: SportMarket,
  pickedPosition: number,
  marketType: MarketTypeEnum
): TradeData | null {
  let targetMarket: SportMarket = sportMarket;

  // If it's not the main WINNER market, find the corresponding child market
  if (marketType !== MarketTypeEnum.WINNER) {
    const childMarket = sportMarket.childMarkets.find(
      (market) => market.typeId === marketType
    );
    if (!childMarket) {
      console.error(`Child market with typeId ${marketType} not found`);
      return null;
    }
    targetMarket = childMarket;
  }

  return {
    gameId: sportMarket.gameId,
    sportId: sportMarket.subLeagueId,
    typeId: targetMarket.typeId,
    maturity: sportMarket.maturity,
    status: targetMarket.status,
    line: targetMarket.line,
    playerId: sportMarket.playerProps.playerId,
    odds: convertOddsToStrings(targetMarket.odds),
    merkleProof: targetMarket.proof,
    position: pickedPosition,
    combinedPositions: targetMarket.combinedPositions,
    live: false,
  };
}

export function getTradeData(quoteTradeData: any[]) {
  return quoteTradeData.map((data) => ({
    ...data,
    line: Math.round(data.line * 100), // Keep as number, multiply by 100 and round
    odds: data.odds.map((odd: string) => parseEther(odd.toString())),
    combinedPositions: data.combinedPositions.map((combinedPositions: any[]) =>
      combinedPositions.map((combinedPosition) => ({
        typeId: combinedPosition.typeId,
        position: combinedPosition.position,
        line: Math.round(combinedPosition.line * 100), // Keep as number, multiply by 100 and round
      }))
    ),
  }));
}
