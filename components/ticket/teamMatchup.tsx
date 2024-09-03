import { ImageSourcePropType, View, Image } from "react-native";
import { SfText } from "../SfThemedText";

export default function TeamMatchup({
  teamName,
  teamImage,
}: {
  teamName: string;
  teamImage: ImageSourcePropType;
}) {
  let teamNameString = teamName;

    if (teamName.length > 16) {
      teamNameString = teamName
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
    }
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
      <Image
        source={teamImage}
        style={{ height: 24, aspectRatio: 1, objectFit: "contain" }}
      />
      <SfText
        familyType="semibold"
        style={{ fontSize: 16, flex: 1, textAlign: "center" }}
      >
        {teamName}
      </SfText>
    </View>
  );
}
