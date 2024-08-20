import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { LeagueEnum, SportEnum } from "@/utils/overtime/enums/sport";
import { GameStatusEnum } from "@/utils/overtime/enums/markets";

type PlayerProps = {
  playerId: number;
  playerName: string;
};

export type CombinedPosition = {
  typeId: number;
  position: number;
  line: number;
};

type CombinedPositions = CombinedPosition[];

export enum SportMarketStatusEnum {
  OPEN = 0,
  PAUSED = 1,
  RESOLVED = 10,
  CANCELLED = 255,
}

export type SportMarketOdds = {
  american: number;
  decimal: number;
  normalizedImplied: number;
};

export type OddsTypeKey = keyof SportMarketOdds;

export type SportMarketScore = {
  isGameFinished?: boolean;
  period?: number;
  gameStatus?: GameStatusEnum;
  displayClock?: string;
  homeScore: number;
  awayScore: number;
  homeScoreByPeriod: number[];
  awayScoreByPeriod: number[];
};

export type SportMarket = {
  gameId: string;
  sport: SportEnum;
  leagueId: LeagueEnum;
  leagueName: string;
  subLeagueId: number;
  typeId: MarketTypeEnum;
  type: string;
  maturity: number;
  maturityDate: Date;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | string;
  awayScore?: number | string;
  homeScoreByPeriod: number[];
  awayScoreByPeriod: number[];
  winningPositions: number[];
  status: SportMarketStatusEnum;
  isResolved: boolean;
  isOpen: boolean;
  isCancelled: boolean;
  isPaused: boolean;
  line: number;
  isOneSideMarket: boolean;
  isPlayerPropsMarket: boolean;
  isOneSidePlayerPropsMarket: boolean;
  isYesNoPlayerPropsMarket: boolean;
  playerProps: PlayerProps;
  odds: SportMarketOdds[];
  proof: string[];
  childMarkets: SportMarket[];
  combinedPositions: CombinedPositions[];
  selectedCombinedPositions?: CombinedPositions;
  live?: boolean;
  gameClock?: number;
  gamePeriod?: string;
  tournamentName?: string;
  tournamentRound?: string;
  isGameFinished?: boolean;
  gameStatus?: GameStatusEnum;
  liveScore?: SportMarketScore;
  positionNames?: string[];
};

export type TradeData = {
  gameId: string;
  sportId: number;
  typeId: number;
  maturity: number;
  status: number;
  line: number;
  playerId: number;
  odds: string[];
  merkleProof: string[];
  position?: number; //Need this to be defined for getting a quote...
  combinedPositions: CombinedPositions[];
  live?: boolean;
};
