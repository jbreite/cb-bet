import { router, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheetLayout from "./(bottom-sheet)/_layout";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        //    headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/accountModal")}
            style={{ paddingLeft: 20 }}
          >
            <Ionicons name="person-circle" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log("pressed")}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              style={{ paddingRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="markets"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bets"
        options={{
          title: "Bets",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="(bottom-sheet)" options={{ href: null, headerShown: false,  }} />
    </Tabs>
  );
}
