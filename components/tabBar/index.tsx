import React, { useCallback, useEffect, useState } from "react";
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
import BetTab from "./betTab";
import { ButtonGrid, KeyboardButtonItemType } from "../keyboard";
import { handleBetAmountChange } from "../keyboard/handleKeyboardInput";
import { INITIAL_BET_AMOUNT } from "@/constants/Constants";

//TODO: Need to make an interpoltation of the tab bar and keyboard so they move together...
// See - https://www.notion.so/Bet-Tab-Animations-ac77704a6dd44060a67f75fe8100e4e5?pvs=4

//TODO: Clean up the animations

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
  const isCollapsed = useSharedValue(false);
  const betTabHeight = useSharedValue(0);

  const numberOfBets = userBetsAtomData.length;

  useEffect(() => {
    if (numberOfBets === 0) {
      isCollapsed.value = false;
    }
  }, [numberOfBets]);

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
    let translateY;
    if (isKeyboardVisible.value) {
      // When keyboard is visible, move up by keyboard height
      translateY = -keyboardHeight.value;
    } else if (isCollapsed.value) {
      // When collapsed and keyboard not visible, move down
      translateY = betTabHeight.value + 24 - tabBarHeight.value;
    } else {
      // When not collapsed and keyboard not visible, align with tab bar
      translateY = -tabBarHeight.value;
    }

    return {
      transform: [{ translateY: withTiming(translateY) }],
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

  const toggleCollapse = useCallback(() => {
    isCollapsed.value = !isCollapsed.value;
  }, []);

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
          style={[styles.betTabContainer, rBetTabStyle, ,]}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <BetTab
            isKeyboardVisible={isKeyboardVisible}
            setIsKeyboardVisible={toggleKeyboardVisibility}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            onLayout={(height) => {
              betTabHeight.value = height;
            }}
            // disableCollapse={isKeyboardVisibleState === true}
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
    overflow: "hidden",
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
