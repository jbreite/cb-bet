import IconPressable from "@/components/IconPressable";
import Close_MD from "@/components/icons/Close_MD";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        // headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="accountModal"
        options={{
          animation: "slide_from_bottom",
          headerTitle: "",

          headerLeft: () => (
            <View style={{ alignSelf: "flex-end" }}>
              <IconPressable onPress={() => router.back()}>
                <Close_MD color="#949595" strokeWidth={2.5} />
              </IconPressable>
            </View>
          ),
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
}
