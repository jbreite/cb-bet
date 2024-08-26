import { MarketTypeMap } from "@/constants/marketTypes";
import { MarketTypeEnum } from "../enums/marketTypes";
import { SportMarket, TradeData } from "../types/markets";
import { spreadLineHelper } from "./helpers";

export const getMarketTypeName = (marketType: MarketTypeEnum) => {
  const marketTypeInfo = MarketTypeMap[marketType];
  return marketTypeInfo ? marketTypeInfo.name : marketType;
};

export const getMarketOutcomeText = (
  sportMarket: SportMarket,
  tradeData: TradeData
) => {
  if (MarketTypeEnum.WINNER === tradeData.typeId) {
    if (tradeData.position === 0) {
      return sportMarket.homeTeam;
    }
    if (tradeData.position === 1) {
      return sportMarket.awayTeam;
    }
    if (tradeData.position === 2) {
      return "Draw";
    }
  } else if (MarketTypeEnum.SPREAD === tradeData.typeId) {
    if (tradeData.position === 0) {
      return `${sportMarket.homeTeam} ${spreadLineHelper(tradeData.line)}`;
    }
    if (tradeData.position === 1) {
      return `${sportMarket.awayTeam} ${spreadLineHelper(tradeData.line * -1)}`;
    }
  } else if (MarketTypeEnum.TOTAL === tradeData.typeId) {
    if (tradeData.position === 0) {
      return `Over ${tradeData.line}`;
    }
    if (tradeData.position === 1) {
      return `Under ${tradeData.line}`;
    }
  }
};
