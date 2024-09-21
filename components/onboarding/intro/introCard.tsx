import { SfText } from "@/components/SfThemedText";
import { View, StyleSheet } from "react-native";

const EMOJI_SIZE = 60;

export default function IntroCard({
  emoji,
  emojiBGColor,
  heading,
  subheading,
}: {
  emoji: string;
  emojiBGColor: string;
  heading: string;
  subheading: string;
}) {
  return (
    <View style={styles.conatiner}>
      <View style={[styles.emojiContainer, { backgroundColor: emojiBGColor }]}>
        <SfText style={styles.emojiText}>{emoji}</SfText>
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <SfText familyType="bold" fontSize={18}>
          {heading}
        </SfText>
        <SfText familyType="medium" style={{ color: "#999999" }} fontSize={14}>
          {subheading}
        </SfText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },
  emojiContainer: {
    width: EMOJI_SIZE,
    aspectRatio: 1,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 100,
    borderCurve: "continuous",
  },
  emojiText: {
    textAlign: "center",
    lineHeight: EMOJI_SIZE,
    fontSize: EMOJI_SIZE - 30,
  },
});
