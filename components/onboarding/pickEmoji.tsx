import { View, StyleSheet } from "react-native";
import { SfText } from "../SfThemedText";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHaptics from "@/hooks/useHaptics";
import { AnimatedPressable } from "../animated/AnimatedPressable";

const EMOJIS = [
  "🏈",
  "🏌️",
  "🏟️",
  "🏅",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏉",
  "🎾",
  "🏒",
  "🥊",
  "🥅",
  "⛳",
  "🏄‍♂️",
];

export default function PickEmoji({
  selectedEmoji,
  onEmojiSelect,
  backgroundColor,
}: {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  backgroundColor: string;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();
  const isColorLightBool = isColorLight(backgroundColor);

  const createEmojiButton = (emoji: string) => {
    const isColorButtonActive = useSharedValue(false);

    const rEmojiButtonStyle = useAnimatedStyle(() => {
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
      const isSelected = selectedEmoji === emoji;
      return {
        opacity: withTiming(isSelected ? 1 : 0, { duration: 150 }),
        transform: [
          { scale: withTiming(isSelected ? 1 : 0, { duration: 150 }) },
        ],
      };
    }, [selectedEmoji]);

    const handlePressIn = () => {
      isColorButtonActive.value = true;
      triggerImpact(ImpactFeedbackStyle.Medium);
    };

    const handlePressOut = () => {
      isColorButtonActive.value = false;
    };

    const handlePress = () => {
      runOnJS(onEmojiSelect)(emoji);
    };

    return (
      <View style={{ width: "25%", aspectRatio: 1 }} key={emoji}>
        <AnimatedPressable
          style={[
            styles.colorItem,
            { backgroundColor: backgroundColor },
            rEmojiButtonStyle,
          ]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[
              styles.selectedIndicator,
              rSelectedIndicatorStyle,
              {
                borderColor: isColorLightBool
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.3)",
              },
            ]}
          />
          <SfText
            style={{
              fontSize: 32,
              textAlign: "center",
              position: "absolute",
            }}
          >
            {emoji}
          </SfText>
        </AnimatedPressable>
      </View>
    );
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      {EMOJIS.map(createEmojiButton)}
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
    width: "85%",
    aspectRatio: 1,
    borderRadius: 1000,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicator: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    borderCurve: "continuous",
    borderWidth: 5,
  },
});

const isColorLight = (hexColor: string) => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 2), 16);
  const b = parseInt(hex.slice(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};
