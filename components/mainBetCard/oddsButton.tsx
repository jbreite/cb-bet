import { Pressable } from "react-native";
import { SfText } from "../SfThemedText";

export default function OddsButton({
  line,
  onPress,
  label,
}: {
  line: string;
  onPress: () => void;
  label?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#E6E6E6",
        borderCurve: "continuous",
      }}
    >
      {label && (
        <SfText familyType="semibold" style={{ fontSize: 14 }}>
          {label}
        </SfText>
      )}
      <SfText familyType="semibold" style={{ fontSize: 14 }}>
        {line}
      </SfText>
    </Pressable>
  );
}
