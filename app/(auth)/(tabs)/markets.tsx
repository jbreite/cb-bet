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
import { router } from "expo-router";
import MainBetCard from "@/components/mainBetCard";
import { getTradeDataFromSportMarket } from "@/utils/overtime/ui/helpers";
import { getGamesInfo } from "@/utils/overtime/queries/getGamesInfo";
import BottomBetSheet, {
  BET_BOTTOM_SHEET_NAME,
} from "@/components/bottomBetSheet";
import { useBottomSheet } from "@/components/Modal";

export default function AuthenticatedIndex() {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const [BottomSheetMapAtomData] = useAtom(BottomSheetMapAtom);
  console.log(BottomSheetMapAtomData);
  const { snapToIndex } = useBottomSheet(BET_BOTTOM_SHEET_NAME);

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

  // const {
  //   data: gameInfoData,
  //   isLoading: gameInfoIsLoading,
  //   error: gameInfoIsError,
  // } = useQuery({
  //   queryKey: ["gameInfo"],
  //   queryFn: () => getGamesInfo(),
  // });

  if (userBetsAtomData.length > 0) {
    snapToIndex(0);
  }

  // console.log("userBets", JSON.stringify(userBetsAtomData));

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBetsAtom((prevMarkets) => [
      // ...prevMarkets,
      { tradeData: tradeData, sportMarket: market },
    ]);
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
                  const { childMarkets, ...itemWithoutChildren } = item;
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

        <BottomBetSheet />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{SportView}</View>;
}
