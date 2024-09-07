import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Trash_Full from "../icons/Trash_Full";

export function RightActionSwipeable({
  progress,
}: {
  progress: SharedValue<number>;
}) {
  //   const animatedStyle = useAnimatedStyle(() => {
  //     const translateX = interpolate(
  //       progress.value,
  //       [0, 100],
  //       [-100, 0], // Adjust these values as needed
  //       Extrapolation.CLAMP
  //     );

  //     return {
  //       transform: [{ translateX }],
  //     };
  //   });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer]}>
        <Trash_Full size={32} color="white" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end", // Align to the right side
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
});

export const renderRightActions = (progress: SharedValue<number>) => {
  return (
    <Animated.View style={[{ flex: 1 }]}>
      <RightActionSwipeable progress={progress} />
    </Animated.View>
  );
};
