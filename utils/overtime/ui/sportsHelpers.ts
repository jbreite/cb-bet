import {
  LeagueMap,
  PLAYER_PROPS_COMBINING_ENABLED_LEAGUES,
} from "@/constants/sports";
import {
  LeagueEnum,
  MatchResolveTypeEnum,
  PeriodTypeEnum,
  ScoringTypeEnum,
  SportEnum,
} from "../enums/sport";

export const getLeagueLabel = (league: LeagueEnum) => {
  const leagueInfo = LeagueMap[league];
  return leagueInfo ? leagueInfo.label : "";
};

export const getLeagueScoringType = (league: LeagueEnum) => {
  const leagueInfo = LeagueMap[league];
  return leagueInfo ? leagueInfo.scoringType : ScoringTypeEnum.EMPTY;
};

export const getLeagueMatchResolveType = (league: LeagueEnum) => {
  const leagueInfo = LeagueMap[league];
  return leagueInfo ? leagueInfo.matchResolveType : MatchResolveTypeEnum.EMPTY;
};

export const getLeaguePeriodType = (league: LeagueEnum) => {
  const leagueInfo = LeagueMap[league];
  return leagueInfo ? leagueInfo.periodType : PeriodTypeEnum.EMPTY;
};

export const getLeagueIsDrawAvailable = (league: LeagueEnum) => {
  const leagueInfo = LeagueMap[league];
  return leagueInfo ? leagueInfo.isDrawAvailable : false;
};

export const getSportLeagueIds = (sport: SportEnum) => {
  const allLeagues = Object.values(LeagueMap);
  return allLeagues
    .filter((league) => league.sport === sport)
    .map((league) => league.id);
};

export const isPlayerPropsCombiningEnabled = (league: LeagueEnum) => {
  return PLAYER_PROPS_COMBINING_ENABLED_LEAGUES.includes(league);
};
