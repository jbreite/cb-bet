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
    <View style={{ flex: 1, gap: 16, justifyContent: "center" }}>
      <SfText familyType="bold" fontSize={24}>
        {heading}
      </SfText>
      <SfText familyType="semibold" style={{ color: "#999999" }} fontSize={18}>
        {subHeading}
      </SfText>
    </View>
  );
}
