import { Pressable, View } from "react-native";
import { SfText } from "../SfThemedText";
import Lock from "../icons/Lock";
import useHaptics from "@/hooks/useHaptics";

export default function OddsButton({
  line,
  onPress,
  label,
  selected,
}: {
  line: string;
  onPress: () => void;
  label?: string;
  selected?: boolean;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const numberLine = parseFloat(line);
  const zeroLine = numberLine === 0;

  const handlePress = () => {
    triggerImpact(ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#E6E6E6",
        borderCurve: "continuous",
        backgroundColor: selected ? "#E6E6E6" : "transparent",
        minHeight: 54, //TODO prob better wayt to do this
      }}
      disabled={zeroLine}
    >
      {zeroLine ? (
        <Lock size={18} color={"black"} />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {label && (
            <SfText familyType="semibold" style={{ fontSize: 14 }}>
              {label}
            </SfText>
          )}
          <SfText familyType="semibold" style={{ fontSize: 14 }}>
            {line}
          </SfText>
        </View>
      )}
    </Pressable>
  );
}
