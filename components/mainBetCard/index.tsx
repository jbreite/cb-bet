import { SportMarket } from "@/utils/overtime/types/markets";
import { getGameOdds, spreadLineHelper } from "@/utils/overtime/ui/helpers";
import { getImage } from "@/utils/overtime/ui/images";
import { View, StyleSheet, Text, Pressable } from "react-native";
import OddsButton from "./oddsButton";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import TeamInfo from "./teamInfo";
import TeamDivider from "./teamDivider";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";

export default function MainBetCard({
  sportMarket,
  onPress,
  onPressOddsButton,
}: {
  sportMarket: SportMarket;
  onPress: () => void;
  onPressOddsButton: (index: number, marketType: MarketTypeEnum) => void;
}) {
  const homeTeamImage = getImage(sportMarket.homeTeam);
  const awayTeamImage = getImage(sportMarket.awayTeam);

  const isLeagueDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const gameOdds = getGameOdds(sportMarket);

  const winnerGameOdds = gameOdds[MarketTypeEnum.WINNER];
  console.log("winnerGameOdds", winnerGameOdds);
  const spreadGameOdds = gameOdds[MarketTypeEnum.SPREAD];
  console.log("spreadGameOdds", spreadGameOdds);
  const totalGameOdds = gameOdds[MarketTypeEnum.TOTAL];

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginVertical: 12,
        gap: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 / 3, gap: 8 }}>
          <TeamInfo teamImage={awayTeamImage} teamName={sportMarket.awayTeam} />
          <TeamDivider />
          <TeamInfo teamImage={homeTeamImage} teamName={sportMarket.homeTeam} />
        </View>

        {isLeagueDrawAvailable ? (
          <View style={{ flex: 1 / 2, flexDirection: "row" }}>
            <OddsButton
              line={winnerGameOdds.homeOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerGameOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
            />
            <OddsButton
              line={winnerGameOdds.awayOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerGameOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
            />
            {winnerGameOdds.drawOdds && (
              <OddsButton
                line={winnerGameOdds.drawOdds?.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.drawOdds?.index ?? 2,
                    MarketTypeEnum.WINNER
                  )
                }
              />
            )}
          </View>
        ) : (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View>
              <Text>winner</Text>
              <OddsButton
                line={winnerGameOdds.awayOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.awayOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
              />
              <OddsButton
                line={winnerGameOdds.homeOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.homeOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
              />
            </View>

            {spreadGameOdds && (
              <View>
                <Text>spread</Text>
                <OddsButton
                  line={spreadGameOdds.awayOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      spreadGameOdds.awayOdds.index,
                      MarketTypeEnum.SPREAD
                    )
                  }
                  label={spreadLineHelper(-1 * spreadGameOdds.line)}
                />
                <OddsButton
                  line={spreadGameOdds.homeOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      spreadGameOdds.homeOdds.index,
                      MarketTypeEnum.SPREAD
                    )
                  }
                  label={spreadLineHelper(spreadGameOdds.line)}
                />
              </View>
            )}

            {totalGameOdds && (
              <View>
                <Text>Over/Under</Text>
                <OddsButton
                  line={totalGameOdds.overOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      totalGameOdds.overOdds.index,
                      MarketTypeEnum.TOTAL
                    )
                  }
                  label={totalGameOdds.line.toString()}
                />
                <OddsButton
                  line={totalGameOdds.underOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      totalGameOdds.underOdds.index,
                      MarketTypeEnum.TOTAL
                    )
                  }
                  label={totalGameOdds.line.toString()}
                />
              </View>
            )}
          </View>
        )}
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
