import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";

export interface GameOdds {
  [MarketTypeEnum.WINNER]: WinnerMarketOdds;
  [MarketTypeEnum.SPREAD]?: SpreadMarketOdds;
  [MarketTypeEnum.TOTAL]?: TotalMarketOdds;
}

interface OddsItem {
  odds: string;
  index: number;
}

interface SpreadMarketOdds {
  homeOdds: OddsItem;
  awayOdds: OddsItem;
  line: number; // Positive for home team advantage, negative for away team advantage
}

interface WinnerMarketOdds {
  homeOdds: OddsItem;
  awayOdds: OddsItem;
  drawOdds?: OddsItem;
}

interface TotalMarketOdds {
  overOdds: OddsItem;
  underOdds: OddsItem;
  line: number;
}
