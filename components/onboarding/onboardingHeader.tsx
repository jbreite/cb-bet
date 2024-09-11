import { View } from "react-native";
import IconPressable from "../IconPressable";
import Chevron_Left from "../icons/Chevron_Left";
import MORE_HORIZONTAL from "../icons/More_Horizontal";
import { useDisconnect } from "wagmi";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function OnboardingHeader({
  backShown,
  backPress,
}: {
  backShown: boolean;
  backPress: () => void;
}) {
  const { disconnect } = useDisconnect();
  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 32 }}>
      {backShown ? (
        <Animated.View style={{ flex: 1 }} entering={FadeIn} exiting={FadeOut}>
          <IconPressable onPress={backPress} backgroundColor="white">
            <Chevron_Left color="black" />
          </IconPressable>
        </Animated.View>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      <IconPressable backgroundColor="white" onPress={disconnect}>
        <MORE_HORIZONTAL color={"black"} />
      </IconPressable>
    </View>
  );
}
