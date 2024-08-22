import { View, Text, Pressable, StyleSheet } from "react-native";
import Button from "../Button";

export default function BetInput({
  betAmount,
  onInputPress,
  onButtonPress,
  isLoading,
  isDisabled,
  buttonLabel,
}: {
  betAmount: string;
  setBetAmount: (betAmount: string) => void;
  onInputPress: () => void;
  onButtonPress: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  buttonLabel: string;
}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.input} onPress={onInputPress}>
        <Text style={styles.inputText}>{betAmount}</Text>
      </Pressable>
      <Button
        label={buttonLabel}
        onPress={onButtonPress}
        isLoading={isLoading}
        disabled={isDisabled}
        style={{ flex: 1 / 2, padding: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 24,
    paddingVertical: 8,
    paddingRight: 8,
    paddingLeft: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E3E3E3",
  },
  input: {
    flex: 1,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
