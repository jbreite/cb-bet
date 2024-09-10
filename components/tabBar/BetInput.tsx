import { View, Text, Pressable, StyleSheet } from "react-native";
import Button from "../Button";
import useHaptics from "@/hooks/useHaptics";

export default function BetInput({
  betAmount,
  onInputPress,
  onButtonPress,
  isLoading,
  isDisabled,
  buttonLabel,
  isLoadingText,
}: {
  betAmount: string;
  setBetAmount: (betAmount: string) => void;
  onInputPress: () => void;
  onButtonPress: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  buttonLabel: string;
  isLoadingText: string;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const handlePress = () => {
    triggerImpact(ImpactFeedbackStyle.Light);
    onInputPress();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.input} onPress={handlePress}>
        <Text style={styles.inputText}>{betAmount}</Text>
      </Pressable>
      <Button
        label={buttonLabel}
        isLoadingText={isLoadingText}
        onPress={onButtonPress}
        isLoading={isLoading}
        disabled={isDisabled}
        style={{ flex: 3 / 2, padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 24,
    paddingVertical: 4,
    paddingRight: 4,
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
    fontSize: 18,
    fontWeight: "bold",
  },
});
