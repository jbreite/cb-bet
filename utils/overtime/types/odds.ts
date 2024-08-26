import { SportMarket } from "@/utils/overtime/types/markets";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { formatAmericanOdds } from "@/utils/overtime/ui/helpers";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";

export interface GameOdds {
  [MarketTypeEnum.WINNER]: WinnerMarketOdds;
  [MarketTypeEnum.SPREAD]?: SpreadMarketOdds;
  [MarketTypeEnum.TOTAL]?: TotalMarketOdds;
}

interface OddsItem {
  odds: string;
  index: number;
}

interface WinnerMarketOdds {
  homeOdds: OddsItem;
  awayOdds: OddsItem;
  drawOdds?: OddsItem;
}

interface SpreadMarketOdds {
  homeOdds: OddsItem;
  awayOdds: OddsItem;
  line: number;
}

interface TotalMarketOdds {
  overOdds: OddsItem;
  underOdds: OddsItem;
  line: number;
}
