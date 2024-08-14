import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "@/utils/overtime/queries/getMarkets";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import { getSpecificMarket } from "@/utils/overtime/ui/helpers";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";

export default function Sports() {
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

            return (
              <View style={styles.item}>
                <Text>Type: {item.type}</Text>
                <Text>Game ID: {item.gameId}</Text>
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

  return <View style={styles.container}>{SportView}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
