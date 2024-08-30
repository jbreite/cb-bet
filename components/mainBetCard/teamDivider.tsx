import { View } from "react-native";
import { SfText } from "../SfThemedText";

export default function TeamDivider() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SfText familyType="medium" style={{ fontSize: 14 }}>
        @
      </SfText>
      <View
        style={{
          flex: 1,
          maxWidth: "25%",
          height: 2,
          borderRadius: 100,
          backgroundColor: "grey",
        }}
      />
    </View>
  );
}
