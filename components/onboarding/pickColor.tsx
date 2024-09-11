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

const EMOJI_BG_COLORS = [
  "#FF2C5F",
  "#FF339B",
  "#EC33F7",
  "#9F4FFF",
  "#5946F9",
  "#0082FF",
  "#00A8EF",
  "#00B2FF",
  "#00BEC9",
  "#00BC7C",
  "#00CA47",
  "#6BCE00",
  "#F4B000",
  "#FF9900",
  "#FF6700",
  "#FF2A39",
  "#D2B24E",
  "#CE8949",
  "#003468",
  "#1A1A1A",
];

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
    <Animated.View style={styles.container}
    entering={FadeIn}
    exiting={FadeOut}
    >
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
    width: "80%", // This ensures 5 items per row
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
