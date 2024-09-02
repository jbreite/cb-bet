import React from "react";
import { View } from "react-native";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  SUPPORTED_LEAGUES,
} from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import MainBetCard from "@/components/mainBetCard";
import { getTradeDataFromSportMarket } from "@/utils/overtime/ui/helpers";
import { getGamesInfo } from "@/utils/overtime/queries/getGamesInfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LeagueMap } from "@/constants/sports";
import { SfText } from "@/components/SfThemedText";

//TODO: Add Refetching and refreshing the data
//TODO: Add in game data with getGamesInfo()



export default function AuthenticatedIndex() {
  const [userBets, setUserBets] = useAtom(userBetsAtom);
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPadding = userBets.length > 0 ? 240 : 32; //TODO: Make this dynamic. Shouold be a hook

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
  });

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBets((prevBets) => {
      // Remove any existing bets for this game
      const filteredBets = prevBets.filter(
        (bet) => bet.sportMarket.gameId !== market.gameId
      );

      // Check if the new bet is already selected
      const isNewBetSelected = prevBets.some(
        (bet) =>
          bet.sportMarket.gameId === market.gameId &&
          bet.tradeData.typeId === tradeData.typeId &&
          bet.tradeData.position === tradeData.position
      );

      if (isNewBetSelected) {
        // If the new bet is already selected, just return the filtered bets (removing it)
        return filteredBets;
      } else {
        // If the new bet is not selected, add it to the filtered bets
        return [...filteredBets, { tradeData, sportMarket: market }];
      }
    });
  }
  let SportView;
  if (marketsIsLoading) {
    SportView = <GeneralSpinningLoader />;
  } else if (marketsIsError) {
    SportView = <GeneralErrorMessage errorMessage={marketsIsError.message} />;
  } else if (marketsData) {
    // Transform data into a structure with league IDs as keys and markets as values
    const transformedData = SUPPORTED_LEAGUES.reduce((acc, league) => {
      const sport = LeagueMap[league].sport;
      const leagueData = marketsData[sport]?.[league] || [];

      if (leagueData.length > 0) {
        acc[league] = leagueData;
      }

      return acc;
    }, {} as Record<LeagueEnum, SportMarket[]>);

    // Filter out leagues with no data
    const leaguesWithData = SUPPORTED_LEAGUES.filter(
      (league) => transformedData[league]?.length > 0
    );

    SportView = (
      <View style={{ flex: 1 }}>
        <FlashList
          data={leaguesWithData}
          renderItem={({ item: leagueId }) => (
            <View>
              <SfText familyType="semibold" style={{ fontSize: 24 }}>
                {LeagueMap[leagueId].label}
              </SfText>
              {transformedData[leagueId].map((market) => (
                <MainBetCard
                  key={market.gameId}
                  sportMarket={market}
                  onPress={() => console.log(JSON.stringify(market))}
                  onPressOddsButton={(index, marketType) => {
                    const tradeDataWithPosition = getTradeDataFromSportMarket(
                      market,
                      index,
                      marketType
                    );
                    // console.log("tradeDataWithPosition", tradeDataWithPosition);
                    if (tradeDataWithPosition) {
                      handleMarketPress(market, tradeDataWithPosition);
                    }
                  }}
                />
              ))}
            </View>
          )}
          estimatedItemSize={200}
          keyExtractor={(leagueId) => leagueId.toString()}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + bottomPadding,
            paddingHorizontal: 24,
          }}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{SportView}</View>;
}
