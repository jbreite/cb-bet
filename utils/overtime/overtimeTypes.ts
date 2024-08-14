import {
  ScoringTypeEnum,
  ProviderEnum,
  PeriodType,
  SportEnum,
  MatchResolveTypeEnum,
  LeagueEnum,
} from "@/utils/enums/sport";

export interface Sport {
  sport: SportEnum;
  id: LeagueEnum;
  label: string;
  opticOddsName?: string;
  provider: ProviderEnum;
  scoringType: ScoringTypeEnum;
  matchResolveType: MatchResolveTypeEnum;
  periodType: PeriodType;
  isDrawAvailable: boolean;
  live: boolean;
  isLiveTestnet: boolean;
}

export interface Market {
  gameId: string;
  sport: string;
  leagueId: number;
  leagueName: string;
  subLeagueId?: number;
  typeId: number;
  type: string;
  line?: number;
  maturity: number;
  maturityDate: Date;
  homeTeam: string;
  awayTeam: string;
  status: StatusEnum;
  isOpen: boolean;
  isResolved: boolean;
  isCancelled: boolean;
  isPaused: boolean;
  isOneSideMarket: boolean;
  isPlayerPropsMarket: boolean;
  isOneSidePlayerPropsMarket: boolean;
  isYesNoPlayerPropsMarket: boolean;
  playerProps?: PlayerProps;
  combinedPositions?: CombinedPosition[][];
  odds?: Odds[];
  proof?: string[];
  childMarkets?: Market[];
  statusCode: StatusCodeEnum;
}

export enum StatusEnum {
  OPEN = 0,
  PAUSED = 1,
  RESOLVED = 10,
  CANCELLED = 255,
}

export enum StatusCodeEnum {
  OPEN = "open",
  PAUSED = "paused",
  RESOLVED = "resolved",
  CANCELLED = "cancelled",
  ONGOING = "ongoing",
}

export interface PlayerProps {
  playerId: number;
  playerName: string;
}

export interface CombinedPosition {
  typeId: number;
  position: number;
  line?: number;
}

export interface Odds {
  american: number;
  decimal: number;
  normalizedImplied: number;
}
