import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="betModal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
