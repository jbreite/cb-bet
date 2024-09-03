import { LeagueEnum } from "@/utils/overtime/enums/sport";

export const OVERTIME_API_BASE_URL =
  "https://overtimemarketsv2.xyz/overtime-v2";

export const ZERION_API_BASE_URL = "https://api.zerion.io/v1";

export enum CB_BET_SUPPORTED_NETWORK_IDS {
  BASE = 8453,
  OPTIMISM = 10,
}

export const SLIPPAGE = 0.02;

export const REFERRAL_ADDRESS = "0x57B02589d6e24203FC43e442ce9A4803E290293b";

export const SUPPORTED_LEAGUES = [
  LeagueEnum.NCAAF,
  LeagueEnum.NFL,
  LeagueEnum.EPL,
];

export const INITIAL_BET_AMOUNT = "$0";
