import { RectButton } from "react-native-gesture-handler";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export function RightActionSwipeable({
  dragX,
}: {
  dragX: SharedValue<number>;
}) {
  console.log(dragX.value);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(dragX.value, [0, 30], [1, 0], Extrapolation.CLAMP),
    transform: [
      {
        translateX: interpolate(
          dragX.value,
          [0, 50, 100, 101],
          [-20, 0, 0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: "#497AFC",
          justifyContent: "center",
        },
        // animatedStyle,
      ]}
    >
      <Animated.Text>Archive</Animated.Text>
    </Animated.View>
  );
}

export const renderRightActions = (
  _progress: any,
  translation: SharedValue<number>
) => {
  console.log(translation);

  const animatedStyle = useAnimatedStyle(() => ({
    // opacity: interpolate(_progress.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    opacity: _progress.value === 1 ? 0 : 1,
    transform: [
        {
          translateX: interpolate(
            translation.value,
            [-20, 0, 0, 1],
            [0, 50, 100, 101],
        
            Extrapolation.CLAMP
          ),
        },
      ],
  
  }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <RightActionSwipeable dragX={translation} />
    </Animated.View>
  );
};
