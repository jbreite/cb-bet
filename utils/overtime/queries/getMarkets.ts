import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/constants/Constants";
import { StatusFilterEnum } from "../enums/markets";
import { SportMarket, SportMarketStatusEnum } from "../types/markets";
import { LeagueEnum, SportEnum } from "../enums/sport";
import { MarketTypeEnum } from "../enums/marketTypes";

//Check this
interface MarketResponse {
  [sport: string]: {
    [leagueId: string]: SportMarket[];
  };
}

interface MarketFilters {
  sport?: SportEnum;
  leagueId?: LeagueEnum;
  status?: SportMarketStatusEnum;
  type?: MarketTypeEnum;
  ungroup?: boolean;
}

// Fetch function
export const getMarkets = async (
  network: number = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM,
  filters: MarketFilters = {}
): Promise<MarketResponse> => {
  const params = new URLSearchParams();
  const networkToString = network.toString();

  if (filters.sport) params.append("sport", filters.sport);
  if (filters.leagueId) params.append("leagueId", filters.leagueId.toString());
  if (filters.status) params.append("status", filters.status.toString());
  if (filters.type) params.append("type", filters.type.toString());
  if (filters.ungroup !== undefined)
    params.append("ungroup", filters.ungroup.toString());

  const url = `${OVERTIME_API_BASE_URL}/networks/${networkToString}/markets?${params.toString()}`;
  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.statusText}`);
  }

  return response.json();
};

// // React Query hook
// export const useMarkets = (network: number, filters: MarketFilters = {}) => {
//   return useQuery<MarketResponse, Error>({
//     queryKey: ["markets", network, filters],
//     queryFn: () => getMarkets(network, filters),
//   });
// };
