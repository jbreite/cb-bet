import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { AnimatedPressable } from "../animated/AnimatedPressable";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHaptics from "@/hooks/useHaptics";
import { EMOJI_BG_COLORS } from "@/constants/onboarding";

export default function PickColor({
  selectedColor,
  onColorSelect,
}: {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const createColorButton = (hexColor: string) => {
    const isColorButtonActive = useSharedValue(false);

    const rColorButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(isColorButtonActive.value ? 0.96 : 1, {
              duration: 100,
            }),
          },
        ],
      };
    }, []);

    const rSelectedIndicatorStyle = useAnimatedStyle(() => {
      const isSelected = selectedColor === hexColor;
      return {
        opacity: withTiming(isSelected ? 1 : 0, { duration: 150 }),
        transform: [
          { scale: withTiming(isSelected ? 1 : 0, { duration: 150 }) },
        ],
      };
    }, [selectedColor]);

    const handlePressIn = () => {
      isColorButtonActive.value = true;
      triggerImpact(ImpactFeedbackStyle.Medium);
    };

    const handlePressOut = () => {
      isColorButtonActive.value = false;
    };

    const handlePress = () => {
      runOnJS(onColorSelect)(hexColor);
    };

    return (
      <View style={{ width: "20%", aspectRatio: 1 }} key={hexColor}>
        <AnimatedPressable
          style={[
            styles.colorItem,
            { backgroundColor: hexColor },
            rColorButtonStyle,
          ]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[styles.selectedIndicator, rSelectedIndicatorStyle]}
          />
        </AnimatedPressable>
      </View>
    );
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      {EMOJI_BG_COLORS.map(createColorButton)}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  colorItem: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 1000,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicator: {
    width: "75%",
    height: "75%",
    borderRadius: 1000,
    borderCurve: "continuous",
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: "white",
  },
});
