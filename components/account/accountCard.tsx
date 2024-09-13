import { useState } from "react";
import { shortenEthereumAddress } from "../mainHeader/addressEmoji";
import useHaptics from "@/hooks/useHaptics";
import * as Clipboard from "expo-clipboard";
import * as Burnt from "burnt";
import { View, StyleSheet } from "react-native";
import { SfText } from "../SfThemedText";
import { AnimatedPressable } from "../animated/AnimatedPressable";
import { useAccount } from "wagmi";
import Copy from "../icons/Copy";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { isColorLight } from "../onboarding/pickEmoji";

export default function AccountCard({
  emoji,
  name,
  usdcValue,
  backgroundColor,
}: {
  emoji: string;
  name?: string;
  usdcValue: string;
  backgroundColor: string;
}) {
  const isCopyButtonActive = useSharedValue(false);
  const [, setCopied] = useState(false);
  const { address } = useAccount();
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const copyToClipboard = async () => {
    if (address) {
      triggerImpact(ImpactFeedbackStyle.Light);
      await Clipboard.setStringAsync(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);

      // Show toast using Burnt
      Burnt.toast({
        title: "Copied address!",
        preset: "none",
        duration: 1,
        from: "top",
      });
    }
  };

  const formattedName =
    name || (address && shortenEthereumAddress(address)) || "";

  const handleCopyPressIn = () => {
    isCopyButtonActive.value = true;
    triggerImpact(ImpactFeedbackStyle.Medium);
  };

  const handleCopyPressOut = () => {
    isCopyButtonActive.value = false;
  };

  const rCopyButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isCopyButtonActive.value ? 0.96 : 1, {
            duration: 100,
          }),
        },
      ],
    };
  });

  const isLightColorBool = isColorLight(backgroundColor);

  const secondaryTextColor = isLightColorBool
    ? "rgba(0, 0, 0, 0.2)"
    : "rgba(255, 255, 255, 0.3)";

  return (
    <View
      style={{
        flex: 1,
        maxHeight: 216,
        backgroundColor: backgroundColor,
        padding: 24,
        justifyContent: "space-between",
        borderRadius: 24,
        borderCurve: "continuous",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SfText style={{ fontSize: 40 }}>{emoji}</SfText>
        <AnimatedPressable
          onPress={copyToClipboard}
          onPressIn={handleCopyPressIn}
          onPressOut={handleCopyPressOut}
          style={[{ flexDirection: "row", gap: 8 }, rCopyButtonStyle]}
        >
          <SfText familyType="bold" style={[styles.baseText]}>
            Copy Address
          </SfText>
          <Copy color={secondaryTextColor} />
        </AnimatedPressable>
      </View>

      <View style={{ gap: 4 }}>
        <SfText style={styles.baseText} familyType="bold">
          {formattedName}
        </SfText>
        <SfText
          style={[styles.baseText, { color: secondaryTextColor }]}
          familyType="bold"
        >
          {usdcValue}
        </SfText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    color: "white",
    fontSize: 18,
  },
});
