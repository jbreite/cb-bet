import useHaptics from "@/hooks/useHaptics";
import { Pressable } from "react-native";

export default function IconPressable({
  backgroundColor = "#F7F8F9",
  onPress,
  disabled,
  children,
}: {
  backgroundColor?: string;
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const handlePress = () => {
    triggerImpact(ImpactFeedbackStyle.Light);
    onPress();
  };
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
        padding: 2,
        borderRadius: 1000,
        borderCurve: "continuous",
      }}
    >
      {children}
    </Pressable>
  );
}
