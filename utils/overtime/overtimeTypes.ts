export interface Sport {
  sport: string;
  id: number;
  label: string;
  opticOddsName?: string;
  provider: string;
  scoringType: string;
  matchResolveType: string;
  periodType: string;
  isDrawAvailable: boolean;
  live: boolean;
  isLiveTestnet: boolean;
}
