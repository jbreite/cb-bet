import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useDisconnect } from "@/hooks/cbHooks/useDisconnect";
import CustomButton from "@/components/coinbaseComponents/button";
import { getImage } from "@/utils/overtime/ui/images";
import { getSpecificMarket } from "@/utils/overtime/ui/helpers";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

export default function AuthenticatedIndex() {
  const { addresses } = useAuth();
  const address = addresses[0];
  const handleDisconnect = useDisconnect();

  const { data, isLoading, error } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {
        leagueId: LeagueEnum.EPL,
      }),
  });

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
            const totalMarket = getSpecificMarket(item, MarketTypeEnum.TOTAL);
            const spreadMarket = getSpecificMarket(item, MarketTypeEnum.SPREAD);

            const homeTeamImage = getImage(item.homeTeam);
            const awayTeamImage = getImage(item.awayTeam);

            return (
              <View
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>Type: {item.type}</Text>
                <Text>Game ID: {item.gameId}</Text>
                <View style={{ flexDirection: "row", gap: 24 }}>
                  <Image
                    source={homeTeamImage}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                  <Image
                    source={awayTeamImage}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                </View>
                <Text>Home Team: {item.homeTeam}</Text>
                <Text>Away Team: {item.awayTeam}</Text>
                <Text>
                  Start Date: {new Date(item.maturityDate).toLocaleString()}
                </Text>
                <View>
                  {item.type === "winner" && (
                    <View>
                      <Text>{item.type}</Text>

                      <Text>Line: {item.line}</Text>
                      <Text>
                        {item.homeTeam}: {item.odds[0].american}{" "}
                      </Text>
                      <Text>
                        {item.awayTeam}: {item.odds[1].american}{" "}
                      </Text>
                      <Text>Draw: {item.odds[2].american} </Text>
                      <Text></Text>
                      <Text></Text>
                    </View>
                  )}
                </View>
              </View>
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
        <Text style={{ flex: 1 }}>Address:{address}</Text>
        <CustomButton title="Disconnect Wallet" onPress={handleDisconnect} />
      </View>
      {SportView}
    </View>
  );
}