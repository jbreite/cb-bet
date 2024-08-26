import { SportMarket } from "@/utils/overtime/types/markets";
import { formatAmericanOdds } from "@/utils/overtime/ui/helpers";
import { getImage } from "@/utils/overtime/ui/images";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import OddsButton from "./oddsButton";
import { SfText } from "../SfThemedText";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import TeamInfo from "./teamInfo";
import TeamDivider from "./teamDivider";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { GameOdds } from "@/utils/overtime/types/odds";

//TODO: Add in if there is a tie based on the leage
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
  console.log("gameOdds", gameOdds);

  const winnerGameOdds = gameOdds[MarketTypeEnum.WINNER];
  const spreadGameOdds = gameOdds[MarketTypeEnum.SPREAD];
  const totalGameOdds = gameOdds[MarketTypeEnum.TOTAL];

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: "#E6E6E6",
        padding: 16,
        borderRadius: 12,
        borderCurve: "continuous",
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
          <View>
            <OddsButton
              number={winnerGameOdds.homeOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerGameOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              label="Home"
            />
            <OddsButton
              number={winnerGameOdds.awayOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerGameOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              label="Away"
            />
            {winnerGameOdds.drawOdds && (
              <OddsButton
                number={winnerGameOdds.drawOdds?.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.drawOdds?.index ?? 2,
                    MarketTypeEnum.WINNER
                  )
                }
                label="Draw"
              />
            )}
          </View>
        ) : (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View>
              <Text>winner</Text>
              <OddsButton
                number={winnerGameOdds.awayOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.awayOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                label="away"
              />
              <OddsButton
                number={winnerGameOdds.homeOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.homeOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                label="Home"
              />
            </View>

            {spreadGameOdds && (
              <View>
                <Text>spread</Text>
                <OddsButton
                  number={spreadGameOdds.awayOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      spreadGameOdds.awayOdds.index,
                      MarketTypeEnum.SPREAD
                    )
                  }
                  label={spreadGameOdds.line.toString()}
                />
                <OddsButton
                  number={spreadGameOdds.homeOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      spreadGameOdds.homeOdds.index,
                      MarketTypeEnum.SPREAD
                    )
                  }
                  label={spreadGameOdds.line.toString()}
                />
              </View>
            )}

            {totalGameOdds && (
              <View>
                <Text>Over/Under</Text>
                <OddsButton
                  number={totalGameOdds.overOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      totalGameOdds.overOdds.index,
                      MarketTypeEnum.TOTAL
                    )
                  }
                  label={totalGameOdds.line.toString()}
                />
                <OddsButton
                  number={totalGameOdds.underOdds.odds}
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

export function getGameOdds(sportMarket: SportMarket): GameOdds {
  const isDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const result: GameOdds = {
    [MarketTypeEnum.WINNER]: {
      homeOdds: {
        odds: formatAmericanOdds(sportMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(sportMarket.odds[1].american),
        index: 1,
      },
    },
  };

  if (isDrawAvailable && sportMarket.odds.length > 2) {
    result[MarketTypeEnum.WINNER].drawOdds = {
      odds: formatAmericanOdds(sportMarket.odds[2].american),
      index: 2,
    };
  }

  const spreadMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.SPREAD
  );

  if (spreadMarket) {
    result[MarketTypeEnum.SPREAD] = {
      homeOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[0].american),
        index: 0,
      },
      awayOdds: {
        odds: formatAmericanOdds(spreadMarket.odds[1].american),
        index: 1,
      },
      line: spreadMarket.line,
    };
  }

  const totalMarket = sportMarket.childMarkets.find(
    (market: SportMarket) => market.typeId === MarketTypeEnum.TOTAL
  );

  if (totalMarket) {
    result[MarketTypeEnum.TOTAL] = {
      overOdds: {
        odds: formatAmericanOdds(totalMarket.odds[0].american),
        index: 0,
      },
      underOdds: {
        odds: formatAmericanOdds(totalMarket.odds[1].american),
        index: 1,
      },
      line: totalMarket.line,
    };
  }

  return result;
}
