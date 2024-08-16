import { SportMarket } from "@/utils/overtime/types/markets";
import { formatAmericanOdds, getOddsOfGame } from "@/utils/overtime/ui/helpers";
import { getImage } from "@/utils/overtime/ui/images";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import OddsButton from "./oddsButton";

//TODO: Add in if there is a tie based on the leage
export default function MainBetCard({
  sportMarket,
  onPress,
  onPressOddsButton,
}: {
  sportMarket: SportMarket;
  onPress: () => void;
  onPressOddsButton: (index: number) => void;
}) {
  const homeTeamImage = getImage(sportMarket.homeTeam);
  const awayTeamImage = getImage(sportMarket.awayTeam);

  const { homeOdds, awayOdds, drawOdds } = getOddsOfGame(
    "american",
    sportMarket.odds
  );

  const formattedHomeOdds = formatAmericanOdds(homeOdds);
  const formattedAwayOdds = formatAmericanOdds(awayOdds);
  const formattedDrawOdds = formatAmericanOdds(drawOdds);

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: "#E6E6E6",
        padding: 16,
        borderRadius: 12,
        borderCurve: "continuous",
        marginHorizontal: 24,
        marginVertical: 12,
        gap: 16,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center" }}>
          <Image source={homeTeamImage} style={styles.imageStyle} />
          <Text>{sportMarket.homeTeam}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image source={awayTeamImage} style={styles.imageStyle} />
          <Text>{sportMarket.awayTeam}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <OddsButton
          index={0}
          number={formattedHomeOdds}
          onPress={() => onPressOddsButton(0)}
          label="Home"
        />
        <OddsButton
          index={2}
          number={formattedDrawOdds}
          onPress={() => onPressOddsButton(2)}
          label="Draw"
        />
        <OddsButton
          index={1}
          number={formattedAwayOdds}
          onPress={() => onPressOddsButton(1)}
          label="Away"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
});
