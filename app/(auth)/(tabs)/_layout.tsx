import { router, Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "@/components/tabBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
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
    />
  );
}
