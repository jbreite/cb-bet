import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import { StyleSheet, View } from "react-native";
import { SfText } from "../SfThemedText";
import { LeagueMap } from "@/constants/sports";

//TODO: If font is too big for one line than scale down font for that one

export default function StickyHeaderMainBetCard({
  leagueId,
}: {
  leagueId: LeagueEnum;
}) {
  const isLeagueDrawAvailable = getLeagueIsDrawAvailable(leagueId);

  let leagueLabel = LeagueMap[leagueId].label;
  if (LeagueMap[leagueId].label === "NCAA Football") {
    leagueLabel = "NCAAF";
  }

  return (
    <View style={styles.container}>
      <SfText familyType="semibold" style={styles.leageTitleText} fontSize={24}>
        {leagueLabel}
      </SfText>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SfText style={styles.betTypeText} familyType="semibold">
          {"Winner"}
        </SfText>
        <SfText style={styles.betTypeText} familyType="semibold">
          {"Spread"}
        </SfText>
        <SfText style={styles.betTypeText} familyType="semibold">
          {"Total"}
        </SfText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  leageTitleText: {
    flex: 2 / 3,
  },
  betTypeText: {
    flex: 1,
    textAlign: "center",
  },
});
