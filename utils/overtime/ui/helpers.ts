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

export function getOddsOfGame(oddsType: any, odds: SportMarketOdds[]) {
  const homeOdds = odds[0][oddsType];
  const awayOdds = odds[1][oddsType];
  const drawOdds = odds[2][oddsType];

  return {
    homeOdds,
    awayOdds,
    drawOdds,
  };
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
  pickedPosition?: number | undefined
): TradeData {
  return {
    gameId: sportMarket.gameId,
    sportId: sportMarket.subLeagueId,
    typeId: sportMarket.typeId,
    maturity: sportMarket.maturity,
    status: sportMarket.status,
    line: sportMarket.line,
    playerId: sportMarket.playerProps.playerId,
    odds: convertOddsToStrings(sportMarket.odds),
    merkleProof: sportMarket.proof,
    position: pickedPosition,
    combinedPositions: sportMarket.combinedPositions,
    live: false,
  };
}
