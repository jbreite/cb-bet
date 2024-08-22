import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "./TabButton";
import BetTab from "./BetTab";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const { bottom } = useSafeAreaInsets();

  const numberOfBets = userBetsAtomData.length;

  return (
    <View style={[styles.tabBarContainer]}>
      {numberOfBets !== 0 && (
        <View>
          <BetTab />
        </View>
      )}
      <View style={[styles.lowerTabBarContainer]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  lowerTabBarContainer: {
    paddingHorizontal: 48,
    paddingBottom: 40,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
  },
});
