import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { SfText } from "../SfThemedText";

export default function TeamInfo({
  teamImage,
  teamName,
}: {
  teamImage: ImageSourcePropType;
  teamName: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Image source={teamImage} style={styles.imageStyle} />
      <SfText familyType="medium" style={{ fontSize: 14 }}>
        {teamName}
      </SfText>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
});
