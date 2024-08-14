import { OVERTIME_API_BASE_URL } from "@/constants/Constants";
import { Sport } from "../overtimeTypes";

type SportsResponse = Record<string, Sport>;

export const getSports = async (): Promise<SportsResponse> => {
  const response = await fetch(`${OVERTIME_API_BASE_URL}/sports`);

  if (!response.ok) {
    throw new Error("Failed to fetch sports");
  }

  return response.json();
};
