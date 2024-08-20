import { OVERTIME_API_BASE_URL } from "@/constants/Constants";

export const getGamesInfo = async (gameId?: string) => {
  const url = `${OVERTIME_API_BASE_URL}/games-info/${gameId ? gameId : ""}`;
  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.statusText}`);
  }

  return response.json();
};
