import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import CustomButton from "@/components/coinbaseComponents/button";
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
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export default function AuthenticatedIndex() {
  const [, setUserBetsAtom] = useAtom(userBetsAtom);

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data, isLoading, error } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {
        leagueId: LeagueEnum.EPL,
      }),
  });

  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
    reset,
  } = useSignMessage();

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBetsAtom((prevMarkets) => [
      // ...prevMarkets,
      //COMNMENT FOR NOW WHEN ONLY DOING SINGLE QUOTE
      { tradeData: tradeData, sportMarket: market },
    ]);
    router.push("/(auth)/betModal");
  }

  let SportView;
  if (isLoading) {
    SportView = <GeneralSpinningLoader />;
  } else if (error) {
    SportView = <GeneralErrorMessage errorMessage={error.message} />;
  } else if (data) {
    const flattenedData = Object.values(data)
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
                onPress={() => console.log("pressed")}
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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 24,
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ flex: 1 }}>Address: {address}</Text>
        <CustomButton
          title="Disconnect Wallet"
          onPress={() => disconnect()}
        />
      </View>

      {SportView}
    </View>
  );
}
