import BottomBetSheet, {
  BET_BOTTOM_SHEET_NAME,
} from "@/components/bottomBetSheet";
import { useBottomSheet } from "@/components/Modal";
import { Text, View } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function Best() {
  let tabBarHeight = 0
  try {
    tabBarHeight = useBottomTabBarHeight();
    console.log(tabBarHeight)
  } catch (error) {
    console.warn("Unable to get bottom tab bar height:", error);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Bets</Text>
    </View>
  );
}
