import { SfText } from "@/components/SfThemedText";
import { View, Text } from "react-native";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 24,
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <SfText familyType="bold" style={{ fontSize: 24 }}>
          👀
        </SfText>
        <SfText familyType="bold" style={{ fontSize: 24 }}>
          Coming Soon
        </SfText>
      </View>
    </View>
  );
}
