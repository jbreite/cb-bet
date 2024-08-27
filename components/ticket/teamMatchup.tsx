import { ImageSourcePropType, View, Image } from "react-native";
import { SfText } from "../SfThemedText";

export default function TeamMatchup({
  teamName,
  teamImage,
}: {
  teamName: string;
  teamImage: ImageSourcePropType;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Image source={teamImage} style={{ width: 16, height: 16 }} />
      <SfText familyType="medium" style={{ fontSize: 14 }} numberOfLines={1}>
        {teamName}
      </SfText>
    </View>
  );
}
