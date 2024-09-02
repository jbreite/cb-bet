import { View } from "react-native";
import { SfText } from "../SfThemedText";

export default function TeamDivider() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: "42.5%",
      }}
    >
      <SfText familyType="bold" style={{ fontSize: 14, color: "#E3E3E3" }}>
        @
      </SfText>
      <View
        style={{
          flex: 2 / 3,
          maxWidth: "40%",
          height: 2,
          borderRadius: 100,
          backgroundColor: "#E3E3E3",
        }}
      />
    </View>
  );
}
