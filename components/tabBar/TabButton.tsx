import { AnimatedPressable } from "../animated/AnimatedPressable";
import { StyleSheet } from "react-native";
import House_01 from "../icons/House_01";
import Compass from "../icons/Compass";
import TicketVoucher from "../icons/TicketVoucher";
import { IconProps } from "../icons/DefaultIcon";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHaptics from "@/hooks/useHaptics";

const TabIconDictionary = {
  home: (props: IconProps) => <House_01 {...props} />,
  explore: (props: IconProps) => <Compass {...props} />,
  bets: (props: IconProps) => <TicketVoucher {...props} />,
};

export default function TabButton({
  label,
  isFocused,
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
}: {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityRole?: string;
  accessibilityState?: { selected?: boolean };
  accessibilityLabel?: string;
  testID?: string;
}) {
  const isActive = useSharedValue(false);
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isActive.value ? 0.96 : 1, { duration: 100 }),
        },
      ],
    };
  }, []);

  const handlePressIn = () => {
    isActive.value = true;
    triggerImpact(ImpactFeedbackStyle.Medium);
  };

  const handlePressOut = () => {
    isActive.value = false;
  };

  const handlePress = () => {
    onPress();
    triggerImpact(ImpactFeedbackStyle.Medium);
  };

  return (
    <AnimatedPressable
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, rButtonStyle]}
    >
      {TabIconDictionary[label.toLowerCase() as keyof typeof TabIconDictionary](
        {
          color: isFocused ? "#0073FB" : "#D3D3D3",
          size: 32,
        }
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
