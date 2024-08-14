import {
  ScoringTypeEnum,
  ProviderEnum,
  PeriodType,
  SportEnum,
  MatchResolveTypeEnum,
  LeagueEnum,
} from "@/utils/overtime/enums/sport";

export interface LeagueInfo {
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
