import BottomBetSheet, {
  BET_BOTTOM_SHEET_NAME,
} from "@/components/bottomBetSheet";
import { useBottomSheet } from "@/components/Modal";
import { Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";

export default function Bets() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 24,
        alignItems: "center",
      }}
    >
      <Text>Bets</Text>
      <Link href="/(bottom-sheet)/" style={{ fontSize: 24 }}>
        Open BottomSheet Tab
      </Link>
    </View>
  );
}
