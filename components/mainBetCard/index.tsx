import { SportMarket } from "@/utils/overtime/types/markets";
import { getGameOdds, negativePlusHelper } from "@/utils/overtime/ui/helpers";
import { getImage } from "@/utils/overtime/ui/images";
import { View, StyleSheet, Pressable } from "react-native";
import OddsButton from "./oddsButton";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import TeamInfo from "./teamInfo";
import TeamDivider from "./teamDivider";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { SfText } from "../SfThemedText";
import { getMarketTypeName } from "@/utils/overtime/ui/markets";
import { convertUnixToFormattedDate } from "@/utils/overtime/ui/date";
import OddsRow, { MAIN_CARD_MARKETS } from "./oddsRow";
import { PositionEnum } from "@/utils/overtime/enums/markets";

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
  const homeTeamImage = getImage(sportMarket.homeTeam, sportMarket.leagueId);
  const awayTeamImage = getImage(sportMarket.awayTeam, sportMarket.leagueId);

  const formattedDate = convertUnixToFormattedDate(sportMarket.maturity);

  // const isLeagueDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingBottom: 16,
        gap: 8,
        paddingHorizontal: 24,
      }}
    >
      <View style={{ flex: 1, gap: ODDS_GRID_GAP }}>
        <View style={styles.oddsRow}>
          <TeamInfo teamImage={awayTeamImage} teamName={sportMarket.awayTeam} />
          <OddsRow
            sportMarket={sportMarket}
            marketTypes={MAIN_CARD_MARKETS}
            position={PositionEnum.AWAY}
            onPressOddsButton={onPressOddsButton}
          />
        </View>
        <TeamDivider />
        <View style={styles.oddsRow}>
          <TeamInfo teamImage={homeTeamImage} teamName={sportMarket.homeTeam} />
          <OddsRow
            sportMarket={sportMarket}
            marketTypes={MAIN_CARD_MARKETS}
            position={PositionEnum.HOME}
            onPressOddsButton={onPressOddsButton}
          />
        </View>
      </View>

      <SfText familyType="medium">{formattedDate}</SfText>
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
  oddsRow: {
    flexDirection: "row",
    gap: ODDS_GRID_GAP,
  },
});

// {isLeagueDrawAvailable && (
//   <View style={styles.oddsGridContainer}>
//     <View style={styles.oddsCol}>
//       <SfText style={styles.oddsColText}>Home</SfText>
//       <OddsButton
//         line={winnerGameOdds.homeOdds.odds}
//         onPress={() =>
//           onPressOddsButton(
//             winnerGameOdds.homeOdds.index,
//             MarketTypeEnum.WINNER
//           )
//         }
//         selected={isSelected(
//           winnerGameOdds.homeOdds.index,
//           MarketTypeEnum.WINNER
//         )}
//       />
//     </View>
//     <View style={styles.oddsCol}>
//       <SfText style={styles.oddsColText}>Away</SfText>

//       <OddsButton
//         line={winnerGameOdds.awayOdds.odds}
//         onPress={() =>
//           onPressOddsButton(
//             winnerGameOdds.awayOdds.index,
//             MarketTypeEnum.WINNER
//           )
//         }
//         selected={isSelected(
//           winnerGameOdds.awayOdds.index,
//           MarketTypeEnum.WINNER
//         )}
//       />
//     </View>
//     {winnerGameOdds.drawOdds && (
//       <View style={styles.oddsCol}>
//         <SfText style={styles.oddsColText}>Draw</SfText>
//         <OddsButton
//           line={winnerGameOdds.drawOdds?.odds}
//           onPress={() =>
//             onPressOddsButton(
//               winnerGameOdds.drawOdds?.index ?? 2,
//               MarketTypeEnum.WINNER
//             )
//           }
//           selected={isSelected(
//             winnerGameOdds.drawOdds.index,
//             MarketTypeEnum.WINNER
//           )}
//         />
//       </View>
//     )}
