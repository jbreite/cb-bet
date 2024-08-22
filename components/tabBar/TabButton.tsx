import { AnimatedPressable } from "../animated/AnimatedPressable";
import { Text, StyleSheet } from "react-native";
import House_01 from "../icons/House_01";
import Compass from "../icons/Compass";
import TicketVoucher from "../icons/TicketVoucher";
import { IconProps } from "../icons/DefaultIcon";

const TabIconDictionary = {
  markets: (props: IconProps) => <House_01 {...props} />,
  explore: (props: IconProps) => <Compass {...props} />,
  bets: (props: IconProps) => <TicketVoucher {...props} />,
};

export default function TabButton({
  label,
  isFocused,
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
}: {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityRole?: string;
  accessibilityState?: { selected?: boolean };
  accessibilityLabel?: string;
  testID?: string;
}) {
  return (
    <AnimatedPressable
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.button}
    >
      {TabIconDictionary[label.toLowerCase() as keyof typeof TabIconDictionary](
        {
          color: isFocused ? "#0073FB" : "#D3D3D3",
          size: 32,
          fill: isFocused ? "#0073FB" : "transparent",
        }
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "red",
    paddingHorizontal: 32,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#222",
  },
  labelFocused: {
    color: "#673ab7",
  },
});
