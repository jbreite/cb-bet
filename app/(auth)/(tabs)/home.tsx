import React from "react";
import { View } from "react-native";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { BottomSheetMapAtom, userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import MainBetCard from "@/components/mainBetCard";
import { getTradeDataFromSportMarket } from "@/utils/overtime/ui/helpers";
import { getGamesInfo } from "@/utils/overtime/queries/getGamesInfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LeagueMap } from "@/constants/sports";
import { SfText } from "@/components/SfThemedText";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";

//TODO: Selected to show state if bet is selected
//TODO: Need to make sure that this is the correct way to filter the data
//TODO: Add Refetching and refreshing the data
const supportedLeagues = [LeagueEnum.NCAAF, LeagueEnum.NFL, LeagueEnum.EPL];

export default function AuthenticatedIndex() {
  const [, setUserBets] = useAtom(userBetsAtom);
  const [BottomSheetMapAtomData] = useAtom(BottomSheetMapAtom);
  console.log(BottomSheetMapAtomData);
  const tabBarHeight = useBottomTabBarHeight();
  console.log("tabBarHeight", tabBarHeight);

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
  });

  // const {
  //   data: gameInfoData,
  //   isLoading: gameInfoIsLoading,
  //   error: gameInfoIsError,
  // } = useQuery({
  //   queryKey: ["gameInfo"],
  //   queryFn: () => getGamesInfo(),
  // });

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBets((prevBets) => {
      const existingBetIndex = prevBets.findIndex(
        (bet) =>
          bet.sportMarket.gameId === market.gameId &&
          bet.tradeData.typeId === tradeData.typeId
      );

      if (existingBetIndex !== -1) {
        // If the bet already exists, remove it (toggle off)
        return prevBets.filter((_, index) => index !== existingBetIndex);
      } else {
        // If the bet doesn't exist, add it
        return [
          // ...prevBets,
          { tradeData, sportMarket: market },
        ];
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
    const transformedData = supportedLeagues.reduce((acc, league) => {
      const sport = LeagueMap[league].sport;
      const leagueData = marketsData[sport]?.[league] || [];

      if (leagueData.length > 0) {
        acc[league] = leagueData;
      }

      return acc;
    }, {} as Record<LeagueEnum, SportMarket[]>);

    // Filter out leagues with no data
    const leaguesWithData = supportedLeagues.filter(
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
                    console.log("index", index);
                    const tradeDataWithPosition = getTradeDataFromSportMarket(
                      market,
                      index,
                      marketType
                    );
                    console.log("tradeDataWithPosition", tradeDataWithPosition);
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
            paddingBottom: tabBarHeight + 32,
            paddingHorizontal: 24,
          }}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{SportView}</View>;
}
