import { MarketTypeEnum } from "../enums/marketTypes";

export type MarketTypeInfo = {
  id: MarketTypeEnum;
  key: string;
  name: string;
  description?: string;
  tooltipKey?: string;
};
