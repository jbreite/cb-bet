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
    <View
      style={{
        flex: 2 / 3,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Image source={teamImage} style={styles.imageStyle} />
      <SfText
        familyType="medium"
        fontSize={14}
        style={{ flex: 1 }}
        numberOfLines={2}
      >
        {teamName}
      </SfText>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 32,
    aspectRatio: 1,
    objectFit: "contain",
  },
});
