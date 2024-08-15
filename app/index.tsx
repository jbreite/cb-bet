import { ScrollView, View } from "react-native";
import Section from "@/components/coinbaseComponents/section";
import { useRouter } from "expo-router";
import { useConnect } from "@/hooks/cbHooks/useConnect";

export default function Index() {
  const handleConnect = useConnect();

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
