import { parseEther } from "viem";
import { MarketTypeEnum } from "../enums/marketTypes";
import { SportMarket, SportMarketOdds, TradeData } from "../types/markets";
import { getLeagueIsDrawAvailable } from "./sportsHelpers";
import { GameOdds } from "../types/odds";

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

export function getTradeData(quoteTradeData: TradeData[]) {
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

export function getGameOdds(sportMarket: SportMarket): GameOdds {
  const isDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const result: GameOdds = {
    [MarketTypeEnum.WINNER]: {
      homeOdds: {
        odds: formatAmericanOdds(sportMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(sportMarket.odds[1].american),
        index: 1,
      },
    },
  };

  if (isDrawAvailable && sportMarket.odds.length > 2) {
    result[MarketTypeEnum.WINNER].drawOdds = {
      odds: formatAmericanOdds(sportMarket.odds[2].american),
      index: 2,
    };
  }

  const spreadMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.SPREAD
  );

  if (spreadMarket) {
    result[MarketTypeEnum.SPREAD] = {
      homeOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[1].american),
        index: 1,
      },
      line: spreadMarket.line, // This is already correct for the home team
    };
  }

  const totalMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.TOTAL
  );

  if (totalMarket) {
    result[MarketTypeEnum.TOTAL] = {
      overOdds: {
        odds: formatAmericanOdds(totalMarket.odds[0].american),
        index: 0,
      },
      underOdds: {
        odds: formatAmericanOdds(totalMarket.odds[1].american),
        index: 1,
      },
      line: totalMarket.line,
    };
  }

  return result;
}

export const negativePlusHelper = (line: number): string => {
  return line > 0 ? `+${line}` : `${line}`;
};

export function getGameOddsTwo(sportMarket: SportMarket): GameOdds {
  const isDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const result: GameOdds = {
    [MarketTypeEnum.WINNER]: {
      homeOdds: {
        odds: formatAmericanOdds(sportMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(sportMarket.odds[1].american),
        index: 1,
      },
    },
  };

  if (isDrawAvailable && sportMarket.odds.length > 2) {
    result[MarketTypeEnum.WINNER].drawOdds = {
      odds: formatAmericanOdds(sportMarket.odds[2].american),
      index: 2,
    };
  }

  const spreadMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.SPREAD
  );

  if (spreadMarket) {
    result[MarketTypeEnum.SPREAD] = {
      homeOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[1].american),
        index: 1,
      },
      line: spreadMarket.line, // This is already correct for the home team
    };
  }

  const totalMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.TOTAL
  );

  if (totalMarket) {
    result[MarketTypeEnum.TOTAL] = {
      overOdds: {
        odds: formatAmericanOdds(totalMarket.odds[0].american),
        index: 0,
      },
      underOdds: {
        odds: formatAmericanOdds(totalMarket.odds[1].american),
        index: 1,
      },
      line: totalMarket.line,
    };
  }

  return result;

  //Return
  //Line,
  //Odds, Index
  //
}

export function findSportMarket({
  sportMarket,
  marketType,
}: {
  sportMarket: SportMarket;
  marketType: MarketTypeEnum;
}) {
  if (sportMarket.typeId === marketType) {
    return sportMarket;
  } else {
    return sportMarket.childMarkets.find(
      (market: SportMarket) => market.typeId === marketType
    );
  }
}

export function findOddsForMarket(
  sportMarket: SportMarket,
  marketType: MarketTypeEnum
) {
  const targetMarkets = sportMarket.typeId === marketType
    ? [sportMarket]
    : sportMarket.childMarkets.filter((market: SportMarket) => market.typeId === marketType);

  const closestToMinus110 = targetMarkets.reduce((closest, market) => {
    const diffFromMinus110 = market.odds.map(odd => Math.abs(odd.american + 110));
    const minDiff = Math.min(...diffFromMinus110);
    if (!closest || minDiff < closest.minDiff) {
      return { market, minDiff };
    }
    return closest;
  }, null as { market: SportMarket, minDiff: number } | null);

  const targetMarket = closestToMinus110 ? closestToMinus110.market : null;

  if (targetMarket) {
    const line = targetMarket.line;
    const odds = targetMarket.odds;
    const typeId = targetMarket.typeId;
    const isDrawAvailable = getLeagueIsDrawAvailable(targetMarket.leagueId);

    return {
      line,
      odds,
      typeId,
      isDrawAvailable,
    };
  }

  return null; // Return null if no matching market is found
}
