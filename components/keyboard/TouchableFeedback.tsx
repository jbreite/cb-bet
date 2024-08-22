import React from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHaptics from "@/hooks/useHaptics";

type TouchableFeedbackProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const TouchableFeedback: React.FC<TouchableFeedbackProps> = ({
  children,
  onPress,
  style,
  disabled,
}) => {
  const isActive = useSharedValue(false);
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const rChildrenStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isActive.value ? 1.2 : 1, { duration: 100 }),
        },
      ],
    };
  }, []);

  const handlePressIn = () => {
    isActive.value = true;
    triggerImpact(ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    isActive.value = false;
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      style={[
        style,
        {
          overflow: "hidden",
        },
      ]}
    >
      <Animated.View style={rChildrenStyle}>{children}</Animated.View>
    </Pressable>
  );
};

export default TouchableFeedback;
