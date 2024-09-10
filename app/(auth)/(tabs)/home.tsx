import React, { useCallback, useEffect, useState } from "react";
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
import {
  getTradeDataFromSportMarket,
  updateBetWithNewMarketData,
} from "@/utils/overtime/ui/helpers";
import { getGamesInfo } from "@/utils/overtime/queries/getGamesInfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LeagueMap } from "@/constants/sports";
import StickyHeaderMainBetCard from "@/components/mainBetCard/stickeyHeader";

//TODO: Add Refetching and refreshing the data
//TODO: Add in game data with getGamesInfo()

const REFETCH_INTERVAL = 60000 * 3;
export const PADDING_HORIZONTAL_HOME = 24;
type FlashListItem = LeagueEnum | SportMarket;

export default function AuthenticatedIndex() {
  const [userBets, setUserBets] = useAtom(userBetsAtom);
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPadding = userBets.length > 0 ? 240 : 32; //TODO: Make this dynamic. Shouold be a hook
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
    refetch,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
    refetchInterval: REFETCH_INTERVAL,
  });

  //Not sure there is a better way to do this, but somwething for now
  useEffect(() => {
    if (marketsData && userBets.length !== 0) {
      console.log("Refreshing userBets Atom Data");
      setUserBets((prevBets) => {
        const allNewMarkets = Object.values(marketsData).flatMap(
          (sportMarkets) => Object.values(sportMarkets).flat()
        );
        return prevBets.map((bet) =>
          updateBetWithNewMarketData(bet, allNewMarkets)
        );
      });
    }
  }, [marketsData, setUserBets]);

  const handleManualRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    await refetch();
    setIsManualRefreshing(false);
  }, [refetch]);

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
    const flashListData: FlashListItem[] = SUPPORTED_LEAGUES.reduce(
      (acc, leagueId) => {
        const sport = LeagueMap[leagueId].sport;
        const leagueData = marketsData[sport]?.[leagueId] || [];

        if (leagueData.length > 0) {
          acc.push(leagueId);
          acc.push(...leagueData);
        }

        return acc;
      },
      [] as FlashListItem[]
    );

    const stickyHeaderIndices = flashListData
      .map((item, index) => (typeof item === "number" ? index : null))
      .filter((item): item is number => item !== null);

    SportView = (
      <View style={{ flex: 1 }}>
        <FlashList
          data={flashListData}
          renderItem={({ item }) => {
            if (typeof item === "number") {
              return <StickyHeaderMainBetCard leagueId={item} />;
            } else {
              return (
                <MainBetCard
                  key={item.gameId}
                  sportMarket={item}
                  onPress={() => console.log(JSON.stringify(item))}
                  onPressOddsButton={(index, marketType) => {
                    const tradeDataWithPosition = getTradeDataFromSportMarket(
                      item,
                      index,
                      marketType
                    );

                    if (tradeDataWithPosition) {
                      handleMarketPress(item, tradeDataWithPosition);
                    }
                  }}
                />
              );
            }
          }}
          getItemType={(item) => {
            return typeof item === "number" ? "sectionHeader" : "row";
          }}
          estimatedItemSize={161}
          stickyHeaderIndices={stickyHeaderIndices}
          refreshing={isManualRefreshing}
          onRefresh={handleManualRefresh}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + bottomPadding,
            //Padding Taken care of on the elemetns itself
          }}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{SportView}</View>;
}
