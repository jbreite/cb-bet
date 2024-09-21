import { View } from "react-native";
import { SfText } from "../SfThemedText";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function OnboardingFunds({ balance }: { balance: string }) {
  return (
    <Animated.View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View style={{ width: "100%", gap: 8 }}>
        <SfText familyType="bold" fontSize={80}>
          {balance}
        </SfText>
        <SfText familyType="semibold" fontSize={16}>
          Current USDC on Optimism in your wallet
        </SfText>
      </View>
    </Animated.View>
  );
}
