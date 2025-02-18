import { View } from "react-native";
import { AnimatedPressable } from "../animated/AnimatedPressable";
import { SfText } from "../SfThemedText";
import { isAddress } from "viem";
import { router } from "expo-router";
import useHaptics from "@/hooks/useHaptics";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import * as Burnt from "burnt";
import { walletProfileAtom } from "@/lib/atom/atoms";
import { useAtomValue } from "jotai";

//TODO: Add custom emoji for people
//TODO: Resolve to ENS, basename, or Farcaster

const EMOJI_SIZE = 20;
const EMOJI_PADDING = 12;

export const EMOJI_SYMBOL = "😀";
export const EMOJI_BACKGROUND_COLOR = "#FF8947";

export default function AddressEmoji({
  address,
}: {
  address: `0x${string}` | undefined;
}) {
  const [, setCopied] = useState(false);
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();
  const profile = useAtomValue(walletProfileAtom);

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

  const formattedAddress = address ? shortenEthereumAddress(address) : "";

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <AnimatedPressable
        style={{
          width: EMOJI_SIZE + EMOJI_PADDING,
          height: EMOJI_SIZE + EMOJI_PADDING,
          backgroundColor: profile?.emojiBackground || EMOJI_BACKGROUND_COLOR,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
          borderCurve: "continuous",
        }}
        onPress={() => {
          triggerImpact(ImpactFeedbackStyle.Light);
          router.push("/(auth)/accountModal");
        }}
      >
        <SfText
          fontSize={EMOJI_SIZE - 4}
          style={{
            textAlign: "center",
          }}
        >
          {profile?.emoji || EMOJI_SYMBOL}
        </SfText>
      </AnimatedPressable>

      <AnimatedPressable onPress={copyToClipboard}>
        <SfText familyType="bold" fontSize={20}>
          {formattedAddress}
        </SfText>
      </AnimatedPressable>
    </View>
  );
}

export function shortenEthereumAddress(address: `0x${string}`): string {
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }

  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`.toUpperCase();
}
