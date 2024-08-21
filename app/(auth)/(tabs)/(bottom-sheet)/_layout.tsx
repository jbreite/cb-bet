import { Slot } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  if (typeof window === "undefined") return <Slot />;
  const { BottomSheet } =
    require("../../../../layouts/bottom-sheet") as typeof import("../../../../layouts/bottom-sheet");

  return (
    // <View style={{ flex: 1 }}>
      <BottomSheet
        screenOptions={{
          // API Reference: https://github.com/th3rdwave/react-navigation-bottom-sheet#navigation-options
          // And: https://gorhom.github.io/react-native-bottom-sheet/modal/props/
          backgroundStyle: {
            backgroundColor: "red",
            borderBottomColor: "black",
          },
          // snapPoints: [200, "100%"], index: 1
        }}
      />
    // </View>
  );
}
