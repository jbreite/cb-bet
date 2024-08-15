import { Pressable, ScrollView, View, Text } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import Section from "@/components/coinbaseComponents/section";
import { useRouter } from "expo-router";
import { provider } from "@/cbConfig";
import { useConnect } from "@/hooks/cbHooks/useConnect";

export default function Index() {
  const handleConnect = useConnect();

  const router = useRouter();

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.push("/sports")}>
          <Text>Sports</Text>
        </Pressable>
        <Section
          key="connect"
          title="Connect with handle connect"
          buttonLabel="Connect"
          onPress={handleConnect}
        />
      </View>
    </ScrollView>
  );
}
