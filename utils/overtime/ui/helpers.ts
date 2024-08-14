import { MarketTypeEnum } from "../enums/marketTypes";
import { SportMarket } from "../types/markets";

export function getSpecificMarket(
  market: SportMarket,
  marketTypeId: MarketTypeEnum
): SportMarket | undefined {
  return market.childMarkets.find(
    (childMarket) => childMarket.typeId === marketTypeId
  );
}
