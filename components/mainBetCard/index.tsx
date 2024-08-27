import { SportMarket } from "@/utils/overtime/types/markets";
import { getGameOdds, spreadLineHelper } from "@/utils/overtime/ui/helpers";
import { getImage } from "@/utils/overtime/ui/images";
import { View, StyleSheet, Text, Pressable } from "react-native";
import OddsButton from "./oddsButton";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import TeamInfo from "./teamInfo";
import TeamDivider from "./teamDivider";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { SfText } from "../SfThemedText";
import { getMarketTypeName } from "@/utils/overtime/ui/markets";

const ODDS_GRID_GAP = 4;

export default function MainBetCard({
  sportMarket,
  onPress,
  onPressOddsButton,
}: {
  sportMarket: SportMarket;
  onPress: () => void;
  onPressOddsButton: (index: number, marketType: MarketTypeEnum) => void;
}) {
  const [userBets] = useAtom(userBetsAtom);

  const homeTeamImage = getImage(sportMarket.homeTeam);
  const awayTeamImage = getImage(sportMarket.awayTeam);

  const isLeagueDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const gameOdds = getGameOdds(sportMarket);

  const winnerGameOdds = gameOdds[MarketTypeEnum.WINNER];
  console.log("winnerGameOdds", winnerGameOdds);
  const spreadGameOdds = gameOdds[MarketTypeEnum.SPREAD];
  console.log("spreadGameOdds", spreadGameOdds);
  const totalGameOdds = gameOdds[MarketTypeEnum.TOTAL];

  const isSelected = (index: number, marketType: MarketTypeEnum) => {
    return userBets.some(
      (bet) =>
        bet.sportMarket.gameId === sportMarket.gameId &&
        bet.tradeData.position === index &&
        bet.tradeData.typeId === marketType
    );
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginVertical: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 4,
        }}
      >
        <View style={{ flex: 1, maxWidth: "35%" }}>
          <TeamInfo teamImage={awayTeamImage} teamName={sportMarket.awayTeam} />
          <TeamDivider />
          <TeamInfo teamImage={homeTeamImage} teamName={sportMarket.homeTeam} />
        </View>

        {isLeagueDrawAvailable ? (
          <View style={styles.oddsGridContainer}>
            <View style={styles.oddsCol}>
              <SfText style={styles.oddsColText}>Home</SfText>
              <OddsButton
                line={winnerGameOdds.homeOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.homeOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                selected={isSelected(
                  winnerGameOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )}
              />
            </View>
            <View style={styles.oddsCol}>
              <SfText style={styles.oddsColText}>Away</SfText>

              <OddsButton
                line={winnerGameOdds.awayOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.awayOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                selected={isSelected(
                  winnerGameOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )}
              />
            </View>
            {winnerGameOdds.drawOdds && (
              <View style={styles.oddsCol}>
                <SfText style={styles.oddsColText}>Draw</SfText>
                <OddsButton
                  line={winnerGameOdds.drawOdds?.odds}
                  onPress={() =>
                    onPressOddsButton(
                      winnerGameOdds.drawOdds?.index ?? 2,
                      MarketTypeEnum.WINNER
                    )
                  }
                  selected={isSelected(
                    winnerGameOdds.drawOdds.index,
                    MarketTypeEnum.WINNER
                  )}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.oddsGridContainer}>
            <View style={styles.oddsCol}>
              <SfText style={styles.oddsColText}>
                {getMarketTypeName(MarketTypeEnum.WINNER)}
              </SfText>
              <OddsButton
                line={winnerGameOdds.awayOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.awayOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                selected={isSelected(
                  winnerGameOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )}
              />
              <OddsButton
                line={winnerGameOdds.homeOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerGameOdds.homeOdds.index,
                    MarketTypeEnum.WINNER
                  )
                }
                selected={isSelected(
                  winnerGameOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )}
              />
            </View>

            {spreadGameOdds && (
              <View style={styles.oddsCol}>
                <SfText style={styles.oddsColText}>
                  {getMarketTypeName(MarketTypeEnum.SPREAD)}
                </SfText>
                <OddsButton
                  line={spreadGameOdds.awayOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      spreadGameOdds.awayOdds.index,
                      MarketTypeEnum.SPREAD
                    )
                  }
                  selected={isSelected(
                    spreadGameOdds.awayOdds.index,
                    MarketTypeEnum.SPREAD
                  )}
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
                  selected={isSelected(
                    spreadGameOdds.homeOdds.index,
                    MarketTypeEnum.SPREAD
                  )}
                />
              </View>
            )}

            {totalGameOdds && (
              <View style={styles.oddsCol}>
                <SfText style={styles.oddsColText}>
                  {getMarketTypeName(MarketTypeEnum.TOTAL)}
                </SfText>
                <OddsButton
                  line={totalGameOdds.overOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      totalGameOdds.overOdds.index,
                      MarketTypeEnum.TOTAL
                    )
                  }
                  label={`O${totalGameOdds.line}`}
                  selected={isSelected(
                    totalGameOdds.overOdds.index,
                    MarketTypeEnum.TOTAL
                  )}
                />
                <OddsButton
                  line={totalGameOdds.underOdds.odds}
                  onPress={() =>
                    onPressOddsButton(
                      totalGameOdds.underOdds.index,
                      MarketTypeEnum.TOTAL
                    )
                  }
                  label={`U${totalGameOdds.line}`}
                  selected={isSelected(
                    totalGameOdds.underOdds.index,
                    MarketTypeEnum.TOTAL
                  )}
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
  oddsCol: {
    flex: 1,
    gap: ODDS_GRID_GAP,
  },
  oddsColText: {
    textAlign: "center",
  },
  oddsGridContainer: {
    flex: 1,
    flexDirection: "row",
    gap: ODDS_GRID_GAP,
  },
});
