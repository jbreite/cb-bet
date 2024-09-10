import { router, Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "@/components/tabBar";
import { useAccount } from "wagmi";
import AddressEmoji from "@/components/mainHeader/addressEmoji";
import MORE_HORIZONTAL from "@/components/icons/More_Horizontal";

//TODO: Update margin Verticarl fro the Header

export default function TabLayout() {
  const { address } = useAccount();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        headerTitle: "",
        headerLeft: () => (
          <View style={{ paddingLeft: 20 }}>
            <AddressEmoji address={address} />
          </View>
        ),
      }}
    />
  );
}
