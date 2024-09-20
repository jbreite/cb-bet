import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import TouchableFeedback from "./TouchableFeedback";
import { SfText } from "../SfThemedText";

const KeyboardButtonItems = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  ".",
  0,
  "backspace",
] as const;

//TODO: This is a fine layout of the keyboard, but think it would be better if
//You did a flex:1 for each column of the width or all took up as much space as it could
//for a row and then just manuver the text how needed... Not sure how that would be for animations though
export type KeyboardButtonItemType = (typeof KeyboardButtonItems)[number];

type ButtonGridProps = {
  onButtonPressed: (item: KeyboardButtonItemType) => void;
};
export const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPressed }) => {
  return (
    <View style={styles.container}>
      {KeyboardButtonItems.map((item) => {
        return (
          <View key={item} style={styles.buttonContainer}>
            <TouchableFeedback
              style={styles.buttonStyle}
              disabled={item === null}
              onPress={() => onButtonPressed(item)}
            >
              {(typeof item === "number" || item === ".") && (
                <SfText style={styles.text} fontSize={30} familyType="bold">
                  {item}
                </SfText>
              )}
              {item === "backspace" && (
                <FontAwesome5 name="backspace" size={24} color="#000" />
              )}
            </TouchableFeedback>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", flexWrap: "wrap" },
  buttonContainer: {
    width: "33.333%",
    height: "25%",
    padding: 8,
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
  },
  text: {
    color: "#000",
  },
});
