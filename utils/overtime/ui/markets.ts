import { MarketTypeMap } from "@/constants/marketTypes";
import { MarketTypeEnum } from "../enums/marketTypes";
import { SportMarket, TradeData } from "../types/markets";
import { negativePlusHelper } from "./helpers";

export const getMarketTypeName = (marketType: MarketTypeEnum) => {
  const marketTypeInfo = MarketTypeMap[marketType];
  return marketTypeInfo ? marketTypeInfo.name : marketType;
};

export const getMarketOutcomeText = (
  sportMarket: SportMarket,
  position: number,
  typeId: MarketTypeEnum,
  line: number
) => {
  if (MarketTypeEnum.WINNER === typeId) {
    if (position === 0) {
      return sportMarket.homeTeam;
    }
    if (position === 1) {
      return sportMarket.awayTeam;
    }
    if (position === 2) {
      return "Draw";
    }
  } else if (MarketTypeEnum.SPREAD === typeId) {
    if (position === 0) {
      return `${sportMarket.homeTeam} ${negativePlusHelper(line)}`;
    }
    if (position === 1) {
      return `${sportMarket.awayTeam} ${negativePlusHelper(line * -1)}`;
    }
  } else if (MarketTypeEnum.TOTAL === typeId) {
    if (position === 0) {
      return `Over ${line}`;
    }
    if (position === 1) {
      return `Under ${line}`;
    }
  } else {
    return "";
  }
};
