import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { MarketTypeInfo } from "@/utils/overtime/types/marketTypes";

export const MarketTypeMap: Record<MarketTypeEnum, MarketTypeInfo> = {
  // Winner
  [MarketTypeEnum.WINNER]: {
    id: MarketTypeEnum.WINNER,
    key: "winner",
    name: "Winner",
  },
  // Winner without draw
  [MarketTypeEnum.DRAW_NO_BET]: {
    id: MarketTypeEnum.DRAW_NO_BET,
    key: "drawNoBet",
    name: "Draw no bet",
  },
  // Winner with draw - for hockey
  [MarketTypeEnum.WINNER2]: {
    id: MarketTypeEnum.WINNER2,
    key: "winner2",
    name: "Winner",
  },
  // Winner (placeholder)
  [MarketTypeEnum.WINNER3]: {
    id: MarketTypeEnum.WINNER3,
    key: "winner3",
    name: "Winner",
  },
  // Winner period - half for soccer, quarter for basketball
  [MarketTypeEnum.FIRST_PERIOD_WINNER]: {
    id: MarketTypeEnum.FIRST_PERIOD_WINNER,
    key: "firstPeriodWinner",
    name: "Winner 1st",
  },
  // Who will score first
  [MarketTypeEnum.FIRST_SCORE]: {
    id: MarketTypeEnum.FIRST_SCORE,
    key: "firstScore",
    name: "First",
  },
  // Who will score last
  [MarketTypeEnum.LAST_SCORE]: {
    id: MarketTypeEnum.LAST_SCORE,
    key: "lastScore",
    name: "Last",
  },
  // Clean sheet per team
  [MarketTypeEnum.CLEAN_SHEET_HOME_TEAM]: {
    id: MarketTypeEnum.CLEAN_SHEET_HOME_TEAM,
    key: "cleanSheetHomeTeam",
    name: "Clean sheet",
  },
  [MarketTypeEnum.CLEAN_SHEET_AWAY_TEAM]: {
    id: MarketTypeEnum.CLEAN_SHEET_AWAY_TEAM,
    key: "cleanSheetAwayTeam",
    name: "Clean sheet",
  },
  [MarketTypeEnum.SECOND_PERIOD_WINNER]: {
    id: MarketTypeEnum.SECOND_PERIOD_WINNER,
    key: "secondPeriodWinner",
    name: "Winner 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_WINNER]: {
    id: MarketTypeEnum.THIRD_PERIOD_WINNER,
    key: "thirdPeriodWinner",
    name: "Winner 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.FOURTH_PERIOD_WINNER,
    key: "fourthPeriodWinner",
    name: "Winner 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.FIFTH_PERIOD_WINNER,
    key: "fifthPeriodWinner",
    name: "Winner 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.SIXTH_PERIOD_WINNER,
    key: "sixthPeriodWinner",
    name: "Winner 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_WINNER,
    key: "seventhPeriodWinner",
    name: "Winner 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_WINNER,
    key: "eightPeriodWinner",
    name: "Winner 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_WINNER]: {
    id: MarketTypeEnum.NINTH_PERIOD_WINNER,
    key: "ninthPeriodWinner",
    name: "Winner 9th",
  },
  // Winner period - half for basketball
  [MarketTypeEnum.FIRST_PERIOD_WINNER2]: {
    id: MarketTypeEnum.FIRST_PERIOD_WINNER2,
    key: "firstPeriodWinner2",
    name: "Winner 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_WINNER2]: {
    id: MarketTypeEnum.SECOND_PERIOD_WINNER2,
    key: "secondPeriodWinner2",
    name: "Winner 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_WINNER2]: {
    id: MarketTypeEnum.THIRD_PERIOD_WINNER2,
    key: "thirdPeriodWinner2",
    name: "Winner 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.FOURTH_PERIOD_WINNER2,
    key: "fourthPeriodWinner2",
    name: "Winner 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.FIFTH_PERIOD_WINNER2,
    key: "fifthPeriodWinner2",
    name: "Winner 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.SIXTH_PERIOD_WINNER2,
    key: "sixthPeriodWinner2",
    name: "Winner 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_WINNER2,
    key: "seventhPeriodWinner2",
    name: "Winner 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_WINNER2,
    key: "eightPeriodWinner2",
    name: "Winner 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_WINNER2]: {
    id: MarketTypeEnum.NINTH_PERIOD_WINNER2,
    key: "ninthPeriodWinner2",
    name: "Winner 9th",
  },
  // Winner without draw period - half for soccer, quarter for basketball
  [MarketTypeEnum.FIRST_PERIOD_DRAW_NO_BET]: {
    id: MarketTypeEnum.FIRST_PERIOD_DRAW_NO_BET,
    key: "firstPeriodDrawNoBet",
    name: "Draw no bet 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_DRAW_NO_BET]: {
    id: MarketTypeEnum.SECOND_PERIOD_DRAW_NO_BET,
    key: "secondPeriodDrawNoBet",
    name: "Draw no bet 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_DRAW_NO_BET]: {
    id: MarketTypeEnum.THIRD_PERIOD_DRAW_NO_BET,
    key: "thirdPeriodDrawNoBet",
    name: "Draw no bet 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_DRAW_NO_BET]: {
    id: MarketTypeEnum.FOURTH_PERIOD_DRAW_NO_BET,
    key: "fourthPeriodDrawNoBet",
    name: "Draw no bet 4th",
  },

  // Spread (handicap)
  [MarketTypeEnum.SPREAD]: {
    id: MarketTypeEnum.SPREAD,
    key: "spread",
    name: "Handicap",
  },

  // Spread (handicap) - sets for tennis
  [MarketTypeEnum.SPREAD2]: {
    id: MarketTypeEnum.SPREAD2,
    key: "spread2",
    name: "Handicap",
  },
  // Spread period - half for soccer, quarter for basketball
  [MarketTypeEnum.FIRST_PERIOD_SPREAD]: {
    id: MarketTypeEnum.FIRST_PERIOD_SPREAD,
    key: "firstPeriodSpread",
    name: "Handicap 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_SPREAD]: {
    id: MarketTypeEnum.SECOND_PERIOD_SPREAD,
    key: "secondPeriodSpread",
    name: "Handicap 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_SPREAD]: {
    id: MarketTypeEnum.THIRD_PERIOD_SPREAD,
    key: "thirdPeriodSpread",
    name: "Handicap 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.FOURTH_PERIOD_SPREAD,
    key: "fourthPeriodSpread",
    name: "Handicap 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.FIFTH_PERIOD_SPREAD,
    key: "fifthPeriodSpread",
    name: "Handicap 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.SIXTH_PERIOD_SPREAD,
    key: "sixthPeriodSpread",
    name: "Handicap 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_SPREAD,
    key: "seventhPeriodSpread",
    name: "Handicap 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_SPREAD,
    key: "eightPeriodSpread",
    name: "Handicap 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_SPREAD]: {
    id: MarketTypeEnum.NINTH_PERIOD_SPREAD,
    key: "ninthPeriodSpread",
    name: "Handicap 9th",
  },
  // Spread period - half for basketball
  [MarketTypeEnum.FIRST_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.FIRST_PERIOD_SPREAD2,
    key: "firstPeriodSpread2",
    name: "Handicap 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.SECOND_PERIOD_SPREAD2,
    key: "secondPeriodSpread2",
    name: "Handicap 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.THIRD_PERIOD_SPREAD2,
    key: "thirdPeriodSpread2",
    name: "Handicap 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.FOURTH_PERIOD_SPREAD2,
    key: "fourthPeriodSpread2",
    name: "Handicap 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.FIFTH_PERIOD_SPREAD2,
    key: "fifthPeriodSpread2",
    name: "Handicap 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.SIXTH_PERIOD_SPREAD2,
    key: "sixthPeriodSpread2",
    name: "Handicap 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_SPREAD2,
    key: "seventhPeriodSpread2",
    name: "Handicap 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_SPREAD2,
    key: "eightPeriodSpread2",
    name: "Handicap 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_SPREAD2]: {
    id: MarketTypeEnum.NINTH_PERIOD_SPREAD2,
    key: "ninthPeriodSpread2",
    name: "Handicap 9th",
  },

  // Total
  [MarketTypeEnum.TOTAL]: {
    id: MarketTypeEnum.TOTAL,
    key: "total",
    name: "Total",
  },
  // Total - sets for tennis
  [MarketTypeEnum.TOTAL2]: {
    id: MarketTypeEnum.TOTAL2,
    key: "total2",
    name: "Total",
  },
  // Total period - half for soccer, quarter for basketball
  [MarketTypeEnum.FIRST_PERIOD_TOTAL]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL,
    key: "firstPeriodTotal",
    name: "Total 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL,
    key: "secondPeriodTotal",
    name: "Total 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_TOTAL]: {
    id: MarketTypeEnum.THIRD_PERIOD_TOTAL,
    key: "thirdPeriodTotal",
    name: "Total 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.FOURTH_PERIOD_TOTAL,
    key: "fourthPeriodTotal",
    name: "Total 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.FIFTH_PERIOD_TOTAL,
    key: "fifthPeriodTotal",
    name: "Total 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.SIXTH_PERIOD_TOTAL,
    key: "sixthPeriodTotal",
    name: "Total 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_TOTAL,
    key: "seventhPeriodTotal",
    name: "Total 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_TOTAL,
    key: "eightPeriodTotal",
    name: "Total 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_TOTAL]: {
    id: MarketTypeEnum.NINTH_PERIOD_TOTAL,
    key: "ninthPeriodTotal",
    name: "Total 9th",
  },
  // Total period - half for basketball
  [MarketTypeEnum.FIRST_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL2,
    key: "firstPeriodTotal2",
    name: "Total 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL2,
    key: "secondPeriodTotal",
    name: "Total 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.THIRD_PERIOD_TOTAL2,
    key: "thirdPeriodTotal2",
    name: "Total 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.FOURTH_PERIOD_TOTAL2,
    key: "fourthPeriodTotal2",
    name: "Total 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.FIFTH_PERIOD_TOTAL2,
    key: "fifthPeriodTotal2",
    name: "Total 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.SIXTH_PERIOD_TOTAL2,
    key: "sixthPeriodTotal2",
    name: "Total 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_TOTAL2,
    key: "seventhPeriodTotal2",
    name: "Total 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_TOTAL2,
    key: "eightPeriodTotal2",
    name: "Total 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_TOTAL2]: {
    id: MarketTypeEnum.NINTH_PERIOD_TOTAL2,
    key: "ninthPeriodTotal2",
    name: "Total 9th",
  },
  // Total per team
  [MarketTypeEnum.TOTAL_HOME_TEAM]: {
    id: MarketTypeEnum.TOTAL_HOME_TEAM,
    key: "totalHomeTeam",
    name: "Total",
  },
  [MarketTypeEnum.TOTAL_AWAY_TEAM]: {
    id: MarketTypeEnum.TOTAL_AWAY_TEAM,
    key: "totalAwayTeam",
    name: "Total",
  },
  // Total per team period - half for soccer
  [MarketTypeEnum.FIRST_PERIOD_TOTAL_HOME_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL_HOME_TEAM,
    key: "firstPeriodTotalHomeTeam",
    name: "Total 1st",
  },
  [MarketTypeEnum.FIRST_PERIOD_TOTAL_AWAY_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL_AWAY_TEAM,
    key: "firstPeriodTotalAwayTeam",
    name: "Total 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL_HOME_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL_HOME_TEAM,
    key: "secondPeriodTotalHomeTeam",
    name: "Total 2nd",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL_AWAY_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL_AWAY_TEAM,
    key: "secondPeriodTotalAwayTeam",
    name: "Total 2nd",
  },
  // Total per team period - half for basketball
  [MarketTypeEnum.FIRST_PERIOD_TOTAL2_HOME_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL2_HOME_TEAM,
    key: "firstPeriodTotal2HomeTeam",
    name: "Total 1st",
  },
  [MarketTypeEnum.FIRST_PERIOD_TOTAL2_AWAY_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL2_AWAY_TEAM,
    key: "firstPeriodTotal2AwayTeam",
    name: "Total 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL2_HOME_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL2_HOME_TEAM,
    key: "secondPeriodTotal2HomeTeam",
    name: "Total 2nd",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL2_AWAY_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL2_AWAY_TEAM,
    key: "secondPeriodTotal2AwayTeam",
    name: "Total 2nd",
  },

  // Total odd/even
  [MarketTypeEnum.TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.TOTAL_ODD_EVEN,
    key: "totalOddEven",
    name: "Total odd/even",
  },
  // Total odd/even period - half for soccer, quarter for basketball
  [MarketTypeEnum.FIRST_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL_ODD_EVEN,
    key: "firstPeriodTotalOddEven",
    name: "Total odd/even 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL_ODD_EVEN,
    key: "secondPeriodTotalOddEven",
    name: "Total odd/even 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.THIRD_PERIOD_TOTAL_ODD_EVEN,
    key: "thirdPeriodTotalOddEven",
    name: "Total odd/even 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.FOURTH_PERIOD_TOTAL_ODD_EVEN,
    key: "fourthPeriodTotalOddEven",
    name: "Total odd/even 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.FIFTH_PERIOD_TOTAL_ODD_EVEN,
    key: "fifthPeriodTotalOddEven",
    name: "Total odd/even 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.SIXTH_PERIOD_TOTAL_ODD_EVEN,
    key: "sixthPeriodTotalOddEven",
    name: "Total odd/even 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_TOTAL_ODD_EVEN,
    key: "seventhPeriodTotalOddEven",
    name: "Total odd/even 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_TOTAL_ODD_EVEN,
    key: "eightPeriodTotalOddEven",
    name: "Total odd/even 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_TOTAL_ODD_EVEN]: {
    id: MarketTypeEnum.NINTH_PERIOD_TOTAL_ODD_EVEN,
    key: "ninthPeriodTotalOddEven",
    name: "Total odd/even 9th",
  },
  // Total odd/even period - half for basketball
  [MarketTypeEnum.FIRST_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL2_ODD_EVEN,
    key: "firstPeriodTotal2OddEven",
    name: "Total odd/even 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL2_ODD_EVEN,
    key: "secondPeriodTotal2OddEven",
    name: "Total odd/even 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.THIRD_PERIOD_TOTAL2_ODD_EVEN,
    key: "thirdPeriodTotal2OddEven",
    name: "Total odd/even 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.FOURTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "fourthPeriodTotal2OddEven",
    name: "Total odd/even 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.FIFTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "fifthPeriodTotal2OddEven",
    name: "Total odd/even 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.SIXTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "sixthPeriodTotal2OddEven",
    name: "Total odd/even 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "seventhPeriodTotal2OddEven",
    name: "Total odd/even 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "eightPeriodTotal2OddEven",
    name: "Total odd/even 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_TOTAL2_ODD_EVEN]: {
    id: MarketTypeEnum.NINTH_PERIOD_TOTAL2_ODD_EVEN,
    key: "ninthPeriodTotal2OddEven",
    name: "Total odd/even 9th",
  },

  // Double chance
  [MarketTypeEnum.DOUBLE_CHANCE]: {
    id: MarketTypeEnum.DOUBLE_CHANCE,
    key: "doubleChance",
    name: "Double chance",
  },
  // Double chance period - half for soccer
  [MarketTypeEnum.FIRST_PERIOD_DOUBLE_CHANCE]: {
    id: MarketTypeEnum.FIRST_PERIOD_DOUBLE_CHANCE,
    key: "firstPeriodDoubleChance",
    name: "Double chance 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_DOUBLE_CHANCE]: {
    id: MarketTypeEnum.SECOND_PERIOD_DOUBLE_CHANCE,
    key: "secondPeriodDoubleChance",
    name: "Double chance 2nd",
  },

  // Both teams to score
  [MarketTypeEnum.BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.BOTH_TEAMS_TO_SCORE,
    key: "bothTeamsToScore",
    name: "Both teams to score",
  },
  // Both teams to score period - half for soccer
  [MarketTypeEnum.FIRST_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.FIRST_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "firstPeriodBothTeamsToScore",
    name: "Both teams to score 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.SECOND_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "secondPeriodBothTeamsToScore",
    name: "Both teams to score 2nd",
  },
  [MarketTypeEnum.THIRD_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.THIRD_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "thirdPeriodBothTeamsToScore",
    name: "Both teams to score 3rd",
  },
  [MarketTypeEnum.FOURTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.FOURTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "fourthPeriodBothTeamsToScore",
    name: "Both teams to score 4th",
  },
  [MarketTypeEnum.FIFTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.FIFTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "fifthPeriodBothTeamsToScore",
    name: "Both teams to score 5th",
  },
  [MarketTypeEnum.SIXTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.SIXTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "sixthPeriodBothTeamsToScore",
    name: "Both teams to score 6th",
  },
  [MarketTypeEnum.SEVENTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.SEVENTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "seventhPeriodBothTeamsToScore",
    name: "Both teams to score 7th",
  },
  [MarketTypeEnum.EIGHTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.EIGHTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "eightPeriodBothTeamsToScore",
    name: "Both teams to score 8th",
  },
  [MarketTypeEnum.NINTH_PERIOD_BOTH_TEAMS_TO_SCORE]: {
    id: MarketTypeEnum.NINTH_PERIOD_BOTH_TEAMS_TO_SCORE,
    key: "ninthPeriodBothTeamsToScore",
    name: "Both teams to score 9th",
  },

  // Combined positions
  [MarketTypeEnum.WINNER_TOTAL]: {
    id: MarketTypeEnum.WINNER_TOTAL,
    key: "winnerTotal",
    name: "Winner + Total",
  },
  [MarketTypeEnum.HALFTIME_FULLTIME]: {
    id: MarketTypeEnum.HALFTIME_FULLTIME,
    key: "halftimeFulltime",
    name: "Half-time/Full-time",
  },
  [MarketTypeEnum.GOALS]: {
    id: MarketTypeEnum.GOALS,
    key: "goals",
    name: "Goals",
  },
  [MarketTypeEnum.HALFTIME_FULLTIME_GOALS]: {
    id: MarketTypeEnum.HALFTIME_FULLTIME_GOALS,
    key: "halftimeFulltimeGoals",
    name: "Half-time/Full-time + Goals",
  },

  // Who will qualify for the next round
  [MarketTypeEnum.WHO_WILL_QUALIFY]: {
    id: MarketTypeEnum.WHO_WILL_QUALIFY,
    key: "whoWillQualify",
    name: "Who will qualify for the next round",
  },
  // Will there be overtime in the game
  [MarketTypeEnum.WILL_THERE_BE_OVERTIME]: {
    id: MarketTypeEnum.WILL_THERE_BE_OVERTIME,
    key: "willThereBeOvertime",
    name: "Overtime",
    description: "Will there be overtime in the game",
  },
  // No runs in the first inning
  [MarketTypeEnum.FIRST_INNING_NO_RUNS]: {
    id: MarketTypeEnum.FIRST_INNING_NO_RUNS,
    key: "firstInningNoRuns",
    name: "No runs in the first inning",
  },

  // Player props
  [MarketTypeEnum.PLAYER_PROPS_STRIKEOUTS]: {
    id: MarketTypeEnum.PLAYER_PROPS_STRIKEOUTS,
    key: "strikeouts",
    name: "Strikeouts",
  },
  [MarketTypeEnum.PLAYER_PROPS_HOMERUNS]: {
    id: MarketTypeEnum.PLAYER_PROPS_HOMERUNS,
    key: "homeruns",
    name: "Home runs",
  },
  [MarketTypeEnum.PLAYER_PROPS_BASES]: {
    id: MarketTypeEnum.PLAYER_PROPS_BASES,
    key: "bases",
    name: "Bases",
  },
  [MarketTypeEnum.PLAYER_PROPS_PASSING_YARDS]: {
    id: MarketTypeEnum.PLAYER_PROPS_PASSING_YARDS,
    key: "passingYards",
    name: "Passing yards",
  },
  [MarketTypeEnum.PLAYER_PROPS_PASSING_TOUCHDOWNS]: {
    id: MarketTypeEnum.PLAYER_PROPS_PASSING_TOUCHDOWNS,
    key: "passingTouchdowns",
    name: "Passing touchdowns",
  },
  [MarketTypeEnum.PLAYER_PROPS_RUSHING_YARDS]: {
    id: MarketTypeEnum.PLAYER_PROPS_RUSHING_YARDS,
    key: "rushingYards",
    name: "Rushing yards",
  },
  [MarketTypeEnum.PLAYER_PROPS_RECEIVING_YARDS]: {
    id: MarketTypeEnum.PLAYER_PROPS_RECEIVING_YARDS,
    key: "receivingYards",
    name: "Receiving yards",
  },
  [MarketTypeEnum.PLAYER_PROPS_TOUCHDOWNS]: {
    id: MarketTypeEnum.PLAYER_PROPS_TOUCHDOWNS,
    key: "touchdowns",
    name: "Scoring touchdown",
    description: "Who will score a touchdown in the game?",
    tooltipKey: "touchdowns",
  },
  [MarketTypeEnum.PLAYER_PROPS_FIELD_GOALS_MADE]: {
    id: MarketTypeEnum.PLAYER_PROPS_FIELD_GOALS_MADE,
    key: "fieldGoalsMade",
    name: "Field goals made",
  },
  [MarketTypeEnum.PLAYER_PROPS_PITCHER_HITS_ALLOWED]: {
    id: MarketTypeEnum.PLAYER_PROPS_PITCHER_HITS_ALLOWED,
    key: "pitcherHitsAllowed",
    name: "Pitcher hits allowed",
  },
  [MarketTypeEnum.PLAYER_PROPS_POINTS]: {
    id: MarketTypeEnum.PLAYER_PROPS_POINTS,
    key: "points",
    name: "Points",
  },
  [MarketTypeEnum.PLAYER_PROPS_SHOTS]: {
    id: MarketTypeEnum.PLAYER_PROPS_SHOTS,
    key: "shots",
    name: "Shots",
  },
  [MarketTypeEnum.PLAYER_PROPS_GOALS]: {
    id: MarketTypeEnum.PLAYER_PROPS_GOALS,
    key: "goals",
    name: "Goals",
    description: "Who will score a goal in the game?",
  },
  [MarketTypeEnum.PLAYER_PROPS_HITS_RECORDED]: {
    id: MarketTypeEnum.PLAYER_PROPS_HITS_RECORDED,
    key: "hitsRecorded",
    name: "Hits recorded",
  },
  [MarketTypeEnum.PLAYER_PROPS_REBOUNDS]: {
    id: MarketTypeEnum.PLAYER_PROPS_REBOUNDS,
    key: "rebounds",
    name: "Rebounds",
  },
  [MarketTypeEnum.PLAYER_PROPS_ASSISTS]: {
    id: MarketTypeEnum.PLAYER_PROPS_ASSISTS,
    key: "assists",
    name: "Assists",
  },
  [MarketTypeEnum.PLAYER_PROPS_DOUBLE_DOUBLE]: {
    id: MarketTypeEnum.PLAYER_PROPS_DOUBLE_DOUBLE,
    key: "doubleDouble",
    name: "Double double",
  },
  [MarketTypeEnum.PLAYER_PROPS_TRIPLE_DOUBLE]: {
    id: MarketTypeEnum.PLAYER_PROPS_TRIPLE_DOUBLE,
    key: "tripleDouble",
    name: "Triple double",
  },
  [MarketTypeEnum.PLAYER_PROPS_RECEPTIONS]: {
    id: MarketTypeEnum.PLAYER_PROPS_RECEPTIONS,
    key: "receptions",
    name: "Receptions",
  },
  [MarketTypeEnum.PLAYER_PROPS_FIRST_TOUCHDOWN]: {
    id: MarketTypeEnum.PLAYER_PROPS_FIRST_TOUCHDOWN,
    key: "firstTouchdown",
    name: "First touchdown",
    description: "Who will score the first touchdown in the game? (incl. OT)",
  },
  [MarketTypeEnum.PLAYER_PROPS_LAST_TOUCHDOWN]: {
    id: MarketTypeEnum.PLAYER_PROPS_LAST_TOUCHDOWN,
    key: "lastTouchdown",
    name: "Last touchdown",
    description: "Who will score the last touchdown in the game?",
  },
  [MarketTypeEnum.PLAYER_PROPS_3PTS_MADE]: {
    id: MarketTypeEnum.PLAYER_PROPS_3PTS_MADE,
    key: "threePointsMade",
    name: "3-points made",
  },
  [MarketTypeEnum.PLAYER_PROPS_BLOCKS]: {
    id: MarketTypeEnum.PLAYER_PROPS_BLOCKS,
    key: "blocks",
    name: "Blocks",
  },

  // UFC market types
  [MarketTypeEnum.WINNING_ROUND]: {
    id: MarketTypeEnum.WINNING_ROUND,
    key: "winningRound",
    name: "Winning round",
  },
  [MarketTypeEnum.GO_THE_DISTANCE]: {
    id: MarketTypeEnum.GO_THE_DISTANCE,
    key: "goTheDistance",
    name: "Go the distance",
  },
  [MarketTypeEnum.WILL_FIGHT_END_IN_FIRST_MINUTE]: {
    id: MarketTypeEnum.WILL_FIGHT_END_IN_FIRST_MINUTE,
    key: "willFightEndInFirstMinute",
    name: "First minute finish",
    description: "Will the fight end in the first minute",
  },
  [MarketTypeEnum.WILL_POINT_BE_DEDUCTED]: {
    id: MarketTypeEnum.WILL_POINT_BE_DEDUCTED,
    key: "willPointBeDeducted",
    name: "Point to be deducted",
    description: "Will point be deducted",
  },
  [MarketTypeEnum.ENDING_METHOD]: {
    id: MarketTypeEnum.ENDING_METHOD,
    key: "endingMethod",
    name: "Ending method",
  },
  [MarketTypeEnum.METHOD_OF_VICTORY]: {
    id: MarketTypeEnum.METHOD_OF_VICTORY,
    key: "methodOfVictory",
    name: "Method of victory",
  },
  // UFC player props market types
  [MarketTypeEnum.PLAYER_PROPS_UFC_TAKEDOWNS_LANDED]: {
    id: MarketTypeEnum.PLAYER_PROPS_UFC_TAKEDOWNS_LANDED,
    key: "takedownsLanded",
    name: "Takedowns landed",
  },
  [MarketTypeEnum.PLAYER_PROPS_UFC_SIGNIFICANT_STRIKES_LANDED]: {
    id: MarketTypeEnum.PLAYER_PROPS_UFC_SIGNIFICANT_STRIKES_LANDED,
    key: "significantStrikesLanded",
    name: "Significant strikes landed",
  },

  // US election market types
  [MarketTypeEnum.US_ELECTION_POPULAR_VOTE_WINNER]: {
    id: MarketTypeEnum.US_ELECTION_POPULAR_VOTE_WINNER,
    key: "popularVoteWinner",
    name: "Popular vote winner",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY,
    key: "winningParty",
    name: "Winning party",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_ARIZONA]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_ARIZONA,
    key: "winningPartyArizona",
    name: "Winning party Arizona",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_GEORGIA]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_GEORGIA,
    key: "winningPartyGeorgia",
    name: "Winning party Georgia",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_MICHIGAN]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_MICHIGAN,
    key: "winningPartyMichigan",
    name: "Winning party Michigan",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_NEVADA]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_NEVADA,
    key: "winningPartyNevada",
    name: "Winning party Nevada",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_PENNSYLVANIA]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_PENNSYLVANIA,
    key: "winningPartyPennsylvania",
    name: "Winning party Pennsylvania",
  },
  [MarketTypeEnum.US_ELECTION_WINNING_PARTY_WINSCONSIN]: {
    id: MarketTypeEnum.US_ELECTION_WINNING_PARTY_WINSCONSIN,
    key: "winningPartyWinsconsin",
    name: "Winning party Winsconsin",
  },
  [MarketTypeEnum.CORRECT_SCORE]: {
    id: MarketTypeEnum.CORRECT_SCORE,
    key: "correctScore",
    name: "Correct score",
  },

  // Total exact per team
  [MarketTypeEnum.TOTAL_EXACT_HOME_TEAM]: {
    id: MarketTypeEnum.TOTAL_EXACT_HOME_TEAM,
    key: "exactTotalHomeTeam",
    name: "Exact total",
  },
  [MarketTypeEnum.TOTAL_EXACT_AWAY_TEAM]: {
    id: MarketTypeEnum.TOTAL_EXACT_AWAY_TEAM,
    key: "exactTotalAwayTeam",
    name: "Exact total",
  },

  // Total exact per team - half for soccer
  [MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM,
    key: "firstPeriodExactTotalHomeTeam",
    name: "Exact total 1st",
  },
  [MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_AWAY_TEAM]: {
    id: MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_AWAY_TEAM,
    key: "firstPeriodExactTotalAwayTeam",
    name: "Exact total 1st",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM,
    key: "secondPeriodExactTotalHomeTeam",
    name: "Exact total 2nd",
  },
  [MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_AWAY_TEAM]: {
    id: MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_AWAY_TEAM,
    key: "secondPeriodExactTotalAwayTeam",
    name: "Exact total 2nd",
  },
};

export const PLAYER_PROPS_MARKET_TYPES = [
  MarketTypeEnum.PLAYER_PROPS_HOMERUNS,
  MarketTypeEnum.PLAYER_PROPS_BASES,
  MarketTypeEnum.PLAYER_PROPS_STRIKEOUTS,
  MarketTypeEnum.PLAYER_PROPS_PASSING_YARDS,
  MarketTypeEnum.PLAYER_PROPS_PASSING_TOUCHDOWNS,
  MarketTypeEnum.PLAYER_PROPS_RUSHING_YARDS,
  MarketTypeEnum.PLAYER_PROPS_RECEIVING_YARDS,
  MarketTypeEnum.PLAYER_PROPS_TOUCHDOWNS,
  MarketTypeEnum.PLAYER_PROPS_FIELD_GOALS_MADE,
  MarketTypeEnum.PLAYER_PROPS_PITCHER_HITS_ALLOWED,
  MarketTypeEnum.PLAYER_PROPS_POINTS,
  MarketTypeEnum.PLAYER_PROPS_SHOTS,
  MarketTypeEnum.PLAYER_PROPS_GOALS,
  MarketTypeEnum.PLAYER_PROPS_HITS_RECORDED,
  MarketTypeEnum.PLAYER_PROPS_REBOUNDS,
  MarketTypeEnum.PLAYER_PROPS_ASSISTS,
  MarketTypeEnum.PLAYER_PROPS_DOUBLE_DOUBLE,
  MarketTypeEnum.PLAYER_PROPS_TRIPLE_DOUBLE,
  MarketTypeEnum.PLAYER_PROPS_RECEPTIONS,
  MarketTypeEnum.PLAYER_PROPS_FIRST_TOUCHDOWN,
  MarketTypeEnum.PLAYER_PROPS_LAST_TOUCHDOWN,
  MarketTypeEnum.PLAYER_PROPS_3PTS_MADE,
  MarketTypeEnum.PLAYER_PROPS_BLOCKS,
  MarketTypeEnum.PLAYER_PROPS_UFC_TAKEDOWNS_LANDED,
  MarketTypeEnum.PLAYER_PROPS_UFC_SIGNIFICANT_STRIKES_LANDED,
];

export const ONE_SIDE_PLAYER_PROPS_MARKET_TYPES = [
  MarketTypeEnum.PLAYER_PROPS_TOUCHDOWNS,
  MarketTypeEnum.PLAYER_PROPS_GOALS,
  MarketTypeEnum.PLAYER_PROPS_FIRST_TOUCHDOWN,
  MarketTypeEnum.PLAYER_PROPS_LAST_TOUCHDOWN,
];

export const YES_NO_PLAYER_PROPS_MARKET_TYPES = [
  MarketTypeEnum.PLAYER_PROPS_DOUBLE_DOUBLE,
  MarketTypeEnum.PLAYER_PROPS_TRIPLE_DOUBLE,
];

export const TOTAL_MARKET_TYPES = [
  MarketTypeEnum.TOTAL,
  MarketTypeEnum.TOTAL2,
  MarketTypeEnum.TOTAL_HOME_TEAM,
  MarketTypeEnum.TOTAL_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL,
  MarketTypeEnum.SECOND_PERIOD_TOTAL,
  MarketTypeEnum.THIRD_PERIOD_TOTAL,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL,
  MarketTypeEnum.NINTH_PERIOD_TOTAL,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2,
  MarketTypeEnum.THIRD_PERIOD_TOTAL2,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL2,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL2,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL2,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL2,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL2,
  MarketTypeEnum.NINTH_PERIOD_TOTAL2,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2_AWAY_TEAM,
];

export const TOTAL_ODD_EVEN_MARKET_TYPES = [
  MarketTypeEnum.TOTAL_ODD_EVEN,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.THIRD_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.NINTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.THIRD_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL2_ODD_EVEN,
  MarketTypeEnum.NINTH_PERIOD_TOTAL2_ODD_EVEN,
];

export const SPREAD_MARKET_TYPES = [
  MarketTypeEnum.SPREAD,
  MarketTypeEnum.SPREAD2,
  MarketTypeEnum.FIRST_PERIOD_SPREAD,
  MarketTypeEnum.SECOND_PERIOD_SPREAD,
  MarketTypeEnum.THIRD_PERIOD_SPREAD,
  MarketTypeEnum.FOURTH_PERIOD_SPREAD,
  MarketTypeEnum.FIFTH_PERIOD_SPREAD,
  MarketTypeEnum.SIXTH_PERIOD_SPREAD,
  MarketTypeEnum.SEVENTH_PERIOD_SPREAD,
  MarketTypeEnum.EIGHTH_PERIOD_SPREAD,
  MarketTypeEnum.NINTH_PERIOD_SPREAD,
  MarketTypeEnum.FIRST_PERIOD_SPREAD2,
  MarketTypeEnum.SECOND_PERIOD_SPREAD2,
  MarketTypeEnum.THIRD_PERIOD_SPREAD2,
  MarketTypeEnum.FOURTH_PERIOD_SPREAD2,
  MarketTypeEnum.FIFTH_PERIOD_SPREAD2,
  MarketTypeEnum.SIXTH_PERIOD_SPREAD2,
  MarketTypeEnum.SEVENTH_PERIOD_SPREAD2,
  MarketTypeEnum.EIGHTH_PERIOD_SPREAD2,
  MarketTypeEnum.NINTH_PERIOD_SPREAD2,
];

export const COMBINED_POSITIONS_MARKET_TYPES = [
  MarketTypeEnum.WINNER_TOTAL,
  MarketTypeEnum.HALFTIME_FULLTIME,
  MarketTypeEnum.GOALS,
  MarketTypeEnum.HALFTIME_FULLTIME_GOALS,
];

export const WINNER_MARKET_TYPES = [
  MarketTypeEnum.WINNER,
  MarketTypeEnum.DRAW_NO_BET,
  MarketTypeEnum.WINNER2,
  MarketTypeEnum.WINNER3,
  MarketTypeEnum.FIRST_PERIOD_WINNER,
  MarketTypeEnum.SECOND_PERIOD_WINNER,
  MarketTypeEnum.THIRD_PERIOD_WINNER,
  MarketTypeEnum.FOURTH_PERIOD_WINNER,
  MarketTypeEnum.FIFTH_PERIOD_WINNER,
  MarketTypeEnum.SIXTH_PERIOD_WINNER,
  MarketTypeEnum.SEVENTH_PERIOD_WINNER,
  MarketTypeEnum.EIGHTH_PERIOD_WINNER,
  MarketTypeEnum.NINTH_PERIOD_WINNER,
  MarketTypeEnum.FIRST_PERIOD_WINNER2,
  MarketTypeEnum.SECOND_PERIOD_WINNER2,
  MarketTypeEnum.THIRD_PERIOD_WINNER2,
  MarketTypeEnum.FOURTH_PERIOD_WINNER2,
  MarketTypeEnum.FIFTH_PERIOD_WINNER2,
  MarketTypeEnum.SIXTH_PERIOD_WINNER2,
  MarketTypeEnum.SEVENTH_PERIOD_WINNER2,
  MarketTypeEnum.EIGHTH_PERIOD_WINNER2,
  MarketTypeEnum.NINTH_PERIOD_WINNER2,
  MarketTypeEnum.FIRST_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.SECOND_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.THIRD_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.FOURTH_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.WHO_WILL_QUALIFY,
];

export const BOTH_TEAMS_TO_SCORE_MARKET_TYPES = [
  MarketTypeEnum.BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.FIRST_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.SECOND_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.THIRD_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.FOURTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.FIFTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.SIXTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.SEVENTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.EIGHTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.NINTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

export const DOUBLE_CHANCE_MARKET_TYPES = [
  MarketTypeEnum.DOUBLE_CHANCE,
  MarketTypeEnum.FIRST_PERIOD_DOUBLE_CHANCE,
  MarketTypeEnum.SECOND_PERIOD_DOUBLE_CHANCE,
];

const DRAW_NO_BET_MARKET_TYPES = [
  MarketTypeEnum.DRAW_NO_BET,
  MarketTypeEnum.FIRST_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.SECOND_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.THIRD_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.FOURTH_PERIOD_DRAW_NO_BET,
];

const FIRST_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.FIRST_PERIOD_WINNER,
  MarketTypeEnum.FIRST_PERIOD_TOTAL,
  MarketTypeEnum.FIRST_PERIOD_SPREAD,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FIRST_PERIOD_DOUBLE_CHANCE,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.FIRST_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM,
];

const SECOND_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.SECOND_PERIOD_WINNER,
  MarketTypeEnum.SECOND_PERIOD_TOTAL,
  MarketTypeEnum.SECOND_PERIOD_SPREAD,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SECOND_PERIOD_DOUBLE_CHANCE,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.SECOND_PERIOD_DRAW_NO_BET,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM,
];

const THIRD_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.THIRD_PERIOD_WINNER,
  MarketTypeEnum.THIRD_PERIOD_TOTAL,
  MarketTypeEnum.THIRD_PERIOD_SPREAD,
  MarketTypeEnum.THIRD_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.THIRD_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.THIRD_PERIOD_DRAW_NO_BET,
];

const FOURTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.FOURTH_PERIOD_WINNER,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL,
  MarketTypeEnum.FOURTH_PERIOD_SPREAD,
  MarketTypeEnum.FOURTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FOURTH_PERIOD_BOTH_TEAMS_TO_SCORE,
  MarketTypeEnum.FOURTH_PERIOD_DRAW_NO_BET,
];

const FIFTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.FIFTH_PERIOD_WINNER,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL,
  MarketTypeEnum.FIFTH_PERIOD_SPREAD,
  MarketTypeEnum.FIFTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.FIFTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

const SIXTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.SIXTH_PERIOD_WINNER,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL,
  MarketTypeEnum.SIXTH_PERIOD_SPREAD,
  MarketTypeEnum.SIXTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SIXTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

const SEVENTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.SEVENTH_PERIOD_WINNER,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL,
  MarketTypeEnum.SEVENTH_PERIOD_SPREAD,
  MarketTypeEnum.SEVENTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.SEVENTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

const EIGHTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.EIGHTH_PERIOD_WINNER,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL,
  MarketTypeEnum.EIGHTH_PERIOD_SPREAD,
  MarketTypeEnum.EIGHTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.EIGHTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

const NINTH_PERIOD_MARKET_TYPES = [
  MarketTypeEnum.NINTH_PERIOD_WINNER,
  MarketTypeEnum.NINTH_PERIOD_TOTAL,
  MarketTypeEnum.NINTH_PERIOD_SPREAD,
  MarketTypeEnum.NINTH_PERIOD_TOTAL_ODD_EVEN,
  MarketTypeEnum.NINTH_PERIOD_BOTH_TEAMS_TO_SCORE,
];

const FIRST_PERIOD_MARKET_TYPES2 = [
  MarketTypeEnum.FIRST_PERIOD_WINNER2,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2,
  MarketTypeEnum.FIRST_PERIOD_SPREAD2,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_ODD_EVEN,
];

export const HOME_TEAM_MARKET_TYPES = [
  MarketTypeEnum.TOTAL_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2_HOME_TEAM,
  MarketTypeEnum.CLEAN_SHEET_HOME_TEAM,
  MarketTypeEnum.TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM,
];

export const AWAY_TEAM_MARKET_TYPES = [
  MarketTypeEnum.TOTAL_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL2_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL2_AWAY_TEAM,
  MarketTypeEnum.CLEAN_SHEET_AWAY_TEAM,
  MarketTypeEnum.TOTAL_EXACT_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_AWAY_TEAM,
];

export const SCORE_MARKET_TYPES = [
  MarketTypeEnum.FIRST_SCORE,
  MarketTypeEnum.LAST_SCORE,
];

export const TOTAL_EXACT_MARKET_TYPES = [
  MarketTypeEnum.TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.TOTAL_EXACT_AWAY_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.FIRST_PERIOD_TOTAL_EXACT_AWAY_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_HOME_TEAM,
  MarketTypeEnum.SECOND_PERIOD_TOTAL_EXACT_AWAY_TEAM,
];

export const OTHER_YES_NO_MARKET_TYPES = [
  MarketTypeEnum.CLEAN_SHEET_HOME_TEAM,
  MarketTypeEnum.CLEAN_SHEET_AWAY_TEAM,
  MarketTypeEnum.WILL_THERE_BE_OVERTIME,
  MarketTypeEnum.FIRST_INNING_NO_RUNS,
  MarketTypeEnum.GO_THE_DISTANCE,
  MarketTypeEnum.WILL_FIGHT_END_IN_FIRST_MINUTE,
  MarketTypeEnum.WILL_POINT_BE_DEDUCTED,
];

export const UFC_SPECIFIC_MARKET_TYPES = [
  MarketTypeEnum.WINNING_ROUND,
  MarketTypeEnum.ENDING_METHOD,
  MarketTypeEnum.METHOD_OF_VICTORY,
];
