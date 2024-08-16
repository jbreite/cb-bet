import { Text, Pressable } from "react-native";

export default function OddsButton({
  index,
  number,
  onPress,
  label,
}: {
  index: number;
  number: string;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#E6E6E6",
        borderCurve: "continuous",
      }}
    >
      <Text>{label}</Text>
      <Text>{number}</Text>
      <Text>{index}</Text>
    </Pressable>
  );
}
