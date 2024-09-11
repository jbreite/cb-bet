import { Pressable, View } from "react-native";
import { SfText } from "../SfThemedText";
import useHaptics from "@/hooks/useHaptics";

const PADDING = 16;
const MARGIN = 8;

export function AccountRow({
  icon,
  label,
  rightValue,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  rightValue: string | React.ReactNode;
  onPress?: () => void;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const handlePress = () => {
    if (onPress) {
      triggerImpact(ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          paddingVertical: PADDING,
          marginHorizontal: -MARGIN,
          borderRadius: 16,
          borderCurve: "continuous",
        },
        {
          backgroundColor: pressed ? "#F0EFF7" : "transparent",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: MARGIN,
        }}
      >
        <View
          style={{
            gap: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {icon}
          <SfText familyType="semibold" style={{ fontSize: 16 }}>
            {label}
          </SfText>
        </View>
        {typeof rightValue === "string" ? (
          <SfText
            familyType="medium"
            style={{ fontSize: 16, color: "#949595" }}
          >
            {rightValue}
          </SfText>
        ) : (
          rightValue
        )}
      </View>
    </Pressable>
  );
}
