import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export type sfTextProps = TextProps & {
  familyType?:
    | "black"
    | "bold"
    | "heavy"
    | "light"
    | "medium"
    | "regular"
    | "semibold"
    | "thin"
    | "ultralight";
};

export function SfText({
  style,
  familyType = "regular",
  ...rest
}: sfTextProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        // { color },
        familyType === "black" ? styles.black : undefined,
        familyType === "bold" ? styles.bold : undefined,
        familyType === "heavy" ? styles.heavy : undefined,
        familyType === "light" ? styles.light : undefined,
        familyType === "medium" ? styles.medium : undefined,
        familyType === "regular" ? styles.regular : undefined,
        familyType === "semibold" ? styles.semibold : undefined,
        familyType === "thin" ? styles.thin : undefined,
        familyType === "ultralight" ? styles.ultralight : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  black: {
    fontFamily: "SF-Pro-Rounded-Black",
  },
  bold: {
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  heavy: {
    fontFamily: "SF-Pro-Rounded-Heavy",
  },
  light: {
    fontFamily: "SF-Pro-Rounded-Light",
  },
  medium: {
    fontFamily: "SF-Pro-Rounded-Medium",
  },
  regular: {
    fontFamily: "SF-Pro-Rounded-Regular",
  },
  semibold: {
    fontFamily: "SF-Pro-Rounded-Semibold",
  },
  thin: {
    fontFamily: "SF-Pro-Rounded-Thin",
  },
  ultralight: {
    fontFamily: "SF-Pro-Rounded-Ultralight",
  },
});
