import { OVERTIME_API_BASE_URL } from "@/constants/Constants";
import { LeagueInfo } from "../types/sports";

type SportsResponse = Record<string, LeagueInfo>;

export const getSports = async (): Promise<SportsResponse> => {
  const response = await fetch(`${OVERTIME_API_BASE_URL}/sports`);

  if (!response.ok) {
    throw new Error("Failed to fetch sports");
  }

  return response.json();
};
