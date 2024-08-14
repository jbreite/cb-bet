import {
  ScoringTypeEnum,
  ProviderEnum,
  PeriodTypeEnum,
  SportEnum,
  MatchResolveTypeEnum,
  LeagueEnum,
} from "@/utils/overtime/enums/sport";

export interface LeagueInfo {
  sport: SportEnum;
  id: LeagueEnum;
  label: string;
  logo?: string;
  logoClass?: string;
  scoringType: ScoringTypeEnum;
  matchResolveType: MatchResolveTypeEnum;
  periodType: PeriodTypeEnum;
  isDrawAvailable: boolean;
  hidden: boolean;
  priority: number;
  tooltipKey?: string;
}
