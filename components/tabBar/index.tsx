import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "./TabButton";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { bottom: bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

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
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    // padding: 16,
    // paddingVertical: 48,
    // paddingBottom: 40,
    // paddingTop: 16,
    backgroundColor: "red",
    justifyContent: "space-between",
  },
});
