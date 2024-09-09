import { View } from "react-native";
import { AnimatedPressable } from "../animated/AnimatedPressable";
import { SfText } from "../SfThemedText";
import { isAddress } from "viem";
import { router } from "expo-router";
import useHaptics from "@/hooks/useHaptics";

//TODO: Add custom emoji for people
//TODO: Add copy address and toast on address
//TODO: Resolve to ENS, basename, or Farcaster

const EMOJI_SIZE = 20;
const EMOJI_PADDING = 12;

export default function AddressEmoji({
  address,
}: {
  address: `0x${string}` | undefined;
}) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const formattedAddress = address ? shortenEthereumAddress(address) : "";

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <AnimatedPressable
        style={{
          width: EMOJI_SIZE + EMOJI_PADDING,
          height: EMOJI_SIZE + EMOJI_PADDING,
          backgroundColor: "red",
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
          style={{
            fontSize: EMOJI_SIZE,
            textAlign: "center",
          }}
        >
          😀
        </SfText>
      </AnimatedPressable>

      <AnimatedPressable>
        <SfText familyType="bold" style={{ fontSize: 20 }}>
          {formattedAddress}
        </SfText>
      </AnimatedPressable>
    </View>
  );
}

function shortenEthereumAddress(address: `0x${string}`): string {
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }

  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`.toUpperCase();
}
