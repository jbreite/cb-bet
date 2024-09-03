import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import TabButton from "./TabButton";
import BetTab from "./BetTab";
import { ButtonGrid, KeyboardButtonItemType } from "../keyboard";
import { handleBetAmountChange } from "../keyboard/handleKeyboardInput";

//TODO: Need to make an interpoltation of the tab bar and keyboard so they move together...
// See - https://www.notion.so/Bet-Tab-Animations-ac77704a6dd44060a67f75fe8100e4e5?pvs=4

//TODO: Just make sure after placing bet everything is reset
//TODO: Clean up the animations

export const INITIAL_BET_AMOUNT = "$0";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [userBetsAtomData] = useAtom(userBetsAtom);
  const [betAmount, setBetAmount] = useState(INITIAL_BET_AMOUNT);
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);
  const [isKeyboardVisibleState, setIsKeyboardVisibleState] = useState(false);
  const isKeyboardVisible = useSharedValue(false);
  const { height: screenHeight } = useWindowDimensions();

  const numberOfBets = userBetsAtomData.length;

  const onTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    tabBarHeight.value = event.nativeEvent.layout.height;
  }, []);

  const onKeyboardLayout = useCallback((event: LayoutChangeEvent) => {
    keyboardHeight.value = event.nativeEvent.layout.height;
  }, []);

  const toggleKeyboardVisibility = () => {
    isKeyboardVisible.value = !isKeyboardVisible.value;
    setIsKeyboardVisibleState(!isKeyboardVisibleState);
  };

  const rBetTabStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            isKeyboardVisible.value
              ? -keyboardHeight.value
              : -tabBarHeight.value
          ),
        },
      ],
    };
  });

  const rKeyboardStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isKeyboardVisible.value ? 1 : 0),
      transform: [
        {
          translateY: withTiming(
            isKeyboardVisible.value ? 0 : keyboardHeight.value
          ),
        },
      ],
    };
  });

  const handleKeyboardButtonPress = useCallback(
    (value: KeyboardButtonItemType) => {
      setBetAmount((prev) => handleBetAmountChange(prev, value));
    },
    []
  );

  return (
    <View style={styles.container}>
      {isKeyboardVisibleState === true && (
        <Animated.View
          style={{
            height: screenHeight,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          onTouchEnd={toggleKeyboardVisibility}
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
        />
      )}
      {/* Might be a better way to do this for animation, but works... It doesn't match the animation of the keyboard */}
      {numberOfBets !== 0 && (
        <Animated.View
          style={[styles.betTabContainer, rBetTabStyle]}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <BetTab
            isKeyboardVisible={isKeyboardVisible}
            setIsKeyboardVisible={toggleKeyboardVisibility}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.keyboardContainer,
          { paddingBottom: bottom },
          rKeyboardStyle,
        ]}
        onLayout={onKeyboardLayout}
      >
        <ButtonGrid onButtonPressed={handleKeyboardButtonPress} />
      </Animated.View>

      <Animated.View style={[styles.tabBarContainer]} onLayout={onTabBarLayout}>
        <View
          style={[styles.lowerTabBarContainer, { paddingBottom: bottom + 20 }]}
        >
          {state.routes.map((route, index) => {
            if (["_sitemap", "+not-found"].includes(route.name)) return null;

            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TabButton
                key={route.name}
                label={label.toString()}
                isFocused={isFocused}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  betTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  keyboardContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    zIndex: 1,
  },
  tabBarContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
  },
  lowerTabBarContainer: {
    paddingHorizontal: 48,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
