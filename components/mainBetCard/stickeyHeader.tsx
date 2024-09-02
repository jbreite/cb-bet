import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import { View } from "react-native";
import { SfText } from "../SfThemedText";
import { LeagueMap } from "@/constants/sports";

export default function StickyHeaderMainBetCard({
  leagueId,
}: {
  leagueId: LeagueEnum;
}) {
  const isLeagueDrawAvailable = getLeagueIsDrawAvailable(leagueId);

  return (
    <View>
      <SfText>{LeagueMap[leagueId].label}</SfText>
      <View>
        <SfText>{isLeagueDrawAvailable ? "Win" : "Winner"} </SfText>
        <SfText>{isLeagueDrawAvailable ? "Loss" : "Spread"} </SfText>
        <SfText>{isLeagueDrawAvailable ? "Draw" : "Total"} </SfText>
      </View>
    </View>
  );
}
