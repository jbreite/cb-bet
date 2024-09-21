import { View } from "react-native";
import { SfText } from "../SfThemedText";

export default function BSquaredLogo({ textColor = "#1A88F8", fontSize = 80 }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <SfText
        familyType="bold"
        fontSize={fontSize}
        style={{ color: textColor }}
      >
        B
      </SfText>
      <SfText
        familyType="bold"
        fontSize={fontSize * 0.5}
        style={{
          color: textColor,

          lineHeight: fontSize * 0.5,
          marginTop: 8,
        }}
      >
        2
      </SfText>
    </View>
  );
}
