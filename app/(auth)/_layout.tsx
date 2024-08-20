import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("/(auth)/accountModal")}>
            <Ionicons name="person-circle" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => <Ionicons name="ellipsis-horizontal" size={24} />,
      }}
    >
      <Stack.Screen name="markets" options={{ headerTitle: "" }} />
      <Stack.Screen name="betModal" options={{ presentation: "modal" }} />
      <Stack.Screen name="accountModal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
