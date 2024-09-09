import React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Trash_Full from "../icons/Trash_Full";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const STICKING_THRESHOLD = 100;

export function RightActionSwipeable({
  progress,
  dragX,
}: {
  progress: SharedValue<number>;
  dragX: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      dragX.value,
      [0, -SCREEN_WIDTH],
      [0, -STICKING_THRESHOLD],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            right: 16,
          },
          animatedStyle,
        ]}
      >
        <Trash_Full size={32} color="white" />
      </Animated.View>
    </View>
  );
}

//HOW TO LOG X VALUE
// const logDragX = (value: number) => {
//   console.log("[R] appliedTranslation:", value);
// };

// useAnimatedReaction(
//   () => dragX.value,
//   (value) => {
//     runOnJS(logDragX)(value);
//   },
//   [dragX]
// );

export const renderRightActions = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>
) => {
  return (
    <Animated.View style={{ flex: 1 }}>
      <RightActionSwipeable progress={progress} dragX={dragX} />
    </Animated.View>
  );
};
