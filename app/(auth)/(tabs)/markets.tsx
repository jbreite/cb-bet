import React from "react";
import { View } from "react-native";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";

import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import { router } from "expo-router";
import MainBetCard from "@/components/mainBetCard";
import { getTradeDataFromSportMarket } from "@/utils/overtime/ui/helpers";
import { getGamesInfo } from "@/utils/overtime/queries/getGamesInfo";
import BottomBetSheet from "@/components/bottomBetSheet";

export default function AuthenticatedIndex() {
  const [, setUserBetsAtom] = useAtom(userBetsAtom);

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {
        leagueId: LeagueEnum.EPL,
      }),
  });

  const {
    data: gameInfoData,
    isLoading: gameInfoIsLoading,
    error: gameInfoIsError,
  } = useQuery({
    queryKey: ["gameInfo"],
    queryFn: () => getGamesInfo(),
  });

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBetsAtom((prevMarkets) => [
      // ...prevMarkets,
      //COMNMENT FOR NOW WHEN ONLY DOING SINGLE QUOTE
      { tradeData: tradeData, sportMarket: market },
    ]);
    router.push("/(auth)/betModal");
  }

  let SportView;
  if (marketsIsLoading) {
    SportView = <GeneralSpinningLoader />;
  } else if (marketsIsError) {
    SportView = <GeneralErrorMessage errorMessage={marketsIsError.message} />;
  } else if (marketsData) {
    const flattenedData = Object.values(marketsData)
      .flatMap((league) => Object.values(league))
      .flat();

    SportView = (
      <View style={{ flex: 1 }}>
        <FlashList
          data={flattenedData}
          renderItem={({ item }) => {
            const tradeDataNoPosition = getTradeDataFromSportMarket(item);
            return (
              <MainBetCard
                sportMarket={item}
                onPress={() => console.log(item.gameId)}
                onPressOddsButton={(index) => {
                  console.log("index", index);
                  const tradeDataWithPosition = getTradeDataFromSportMarket(
                    item,
                    index
                  );
                  handleMarketPress(item, tradeDataWithPosition);
                }}
              />
            );
          }}
          estimatedItemSize={150}
          keyExtractor={(item) => item.gameId}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{SportView}</View>;
}
