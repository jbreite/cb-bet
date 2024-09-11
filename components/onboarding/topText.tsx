import { View } from "react-native";
import { SfText } from "../SfThemedText";

export default function TopText({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <SfText familyType="bold" style={{ fontSize: 24 }}>
        {heading}
      </SfText>
      <SfText familyType="semibold" style={{ fontSize: 18, color: "#999999" }}>
        {subHeading}
      </SfText>
    </View>
  );
}
