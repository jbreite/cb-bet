import { View } from "react-native";
import { SfText } from "../SfThemedText";

export default function BSquaredLogo({ textColor = "#1A88F8", fontSize = 80 }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <SfText
        familyType="bold"
        style={{ color: textColor, fontSize: fontSize }}
      >
        B
      </SfText>
      <SfText
        familyType="bold"
        style={{
          color: textColor,
          fontSize: fontSize * 0.5,
          lineHeight: fontSize * 0.5,
          marginTop: 8,
        }}
      >
        2
      </SfText>
    </View>
  );
}
