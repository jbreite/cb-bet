import useHaptics from "@/hooks/useHaptics";
import { Pressable } from "react-native";

export default function IconPressable({
  backgroundColor = "#F7F8F9",
  onPress,
  children,
}: {
  backgroundColor?: string;
  onPress: () => void;
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
