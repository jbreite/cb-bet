import React from "react";
import { GameOdds } from "@/utils/overtime/types/odds";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { View, Text, StyleSheet } from "react-native";
import { spreadLineHelper } from "@/utils/overtime/ui/helpers";
import OddsButton from "./oddsButton";

export default function OddsGrid({
  isLeagueDrawAvailable,
  gameOdds,
  onPressOddsButton,
  isSelected,
}: {
  isLeagueDrawAvailable: boolean;
  gameOdds: GameOdds;
  onPressOddsButton: (index: number, marketType: MarketTypeEnum) => void;
  isSelected: (index: number, marketType: MarketTypeEnum) => boolean;
}) {
  const winnerOdds = gameOdds[MarketTypeEnum.WINNER];
  const spreadOdds = gameOdds[MarketTypeEnum.SPREAD];
  const totalOdds = gameOdds[MarketTypeEnum.TOTAL];

  return (
    <View style={styles.container}>
      {isLeagueDrawAvailable ? (
        <View style={styles.drawAvailableContainer}>
          <View style={styles.oddsRow}>
            <OddsButton
              line={winnerOdds.homeOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              selected={isSelected(
                winnerOdds.homeOdds.index,
                MarketTypeEnum.WINNER
              )}
            />
            {winnerOdds.drawOdds && (
              <OddsButton
                line={winnerOdds.drawOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    winnerOdds.drawOdds?.index ?? 2,
                    MarketTypeEnum.WINNER
                  )
                }
                selected={isSelected(
                  winnerOdds.drawOdds.index,
                  MarketTypeEnum.WINNER
                )}
              />
            )}
            <OddsButton
              line={winnerOdds.awayOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              selected={isSelected(
                winnerOdds.awayOdds.index,
                MarketTypeEnum.WINNER
              )}
            />
          </View>
        </View>
      ) : (
        <View style={styles.drawUnavailableContainer}>
          <View style={styles.oddsColumn}>
            <Text style={styles.label}>Winner</Text>
            <OddsButton
              line={winnerOdds.awayOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerOdds.awayOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              selected={isSelected(
                winnerOdds.awayOdds.index,
                MarketTypeEnum.WINNER
              )}
            />
            <OddsButton
              line={winnerOdds.homeOdds.odds}
              onPress={() =>
                onPressOddsButton(
                  winnerOdds.homeOdds.index,
                  MarketTypeEnum.WINNER
                )
              }
              selected={isSelected(
                winnerOdds.homeOdds.index,
                MarketTypeEnum.WINNER
              )}
            />
          </View>

          {spreadOdds && (
            <View style={styles.oddsColumn}>
              <Text style={styles.label}>Spread</Text>
              <OddsButton
                line={spreadOdds.awayOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    spreadOdds.awayOdds.index,
                    MarketTypeEnum.SPREAD
                  )
                }
                selected={isSelected(
                  spreadOdds.awayOdds.index,
                  MarketTypeEnum.SPREAD
                )}
                label={spreadLineHelper(-1 * spreadOdds.line)}
              />
              <OddsButton
                line={spreadOdds.homeOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    spreadOdds.homeOdds.index,
                    MarketTypeEnum.SPREAD
                  )
                }
                selected={isSelected(
                  spreadOdds.homeOdds.index,
                  MarketTypeEnum.SPREAD
                )}
                label={spreadLineHelper(spreadOdds.line)}
              />
            </View>
          )}

          {totalOdds && (
            <View style={styles.oddsColumn}>
              <Text style={styles.label}>Total</Text>
              <OddsButton
                line={totalOdds.overOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    totalOdds.overOdds.index,
                    MarketTypeEnum.TOTAL
                  )
                }
                selected={isSelected(
                  totalOdds.overOdds.index,
                  MarketTypeEnum.TOTAL
                )}
                label={`O ${totalOdds.line}`}
              />
              <OddsButton
                line={totalOdds.underOdds.odds}
                onPress={() =>
                  onPressOddsButton(
                    totalOdds.underOdds.index,
                    MarketTypeEnum.TOTAL
                  )
                }
                selected={isSelected(
                  totalOdds.underOdds.index,
                  MarketTypeEnum.TOTAL
                )}
                label={`U ${totalOdds.line}`}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawAvailableContainer: {
    flex: 1,
  },
  drawUnavailableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  oddsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  oddsColumn: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
