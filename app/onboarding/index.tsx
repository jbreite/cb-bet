import Button from "@/components/Button";
import OnboardingHeader from "@/components/onboarding/onboardingHeader";
import OnboardingIntro from "@/components/onboarding/intro/onboardingIntro";
import PickColor from "@/components/onboarding/pickColor";
import PickEmoji from "@/components/onboarding/pickEmoji";
import TopText from "@/components/onboarding/topText";
import { walletProfileAtom } from "@/lib/atom/atoms";
import {
  addOrUpdateWalletProfile,
  WalletProfile,
} from "@/utils/local/localStoreProfile";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount } from "wagmi";
import { useUSDCBal } from "@/hooks/tokens/useUSDCBal";
import OnboardingFunds from "@/components/onboarding/onboardinFunds";
import { formatCurrency } from "@/utils/overtime/ui/beyTabHelpers";
import { ONBOARDING_ROUTES } from "@/constants/onboarding";

export default function Page() {
  const { address } = useAccount();
  const {
    balance: usdcBalance,
    isLoading: usdcBalLoading,
    isError: usdcBalError,
  } = useUSDCBal();

  const setWalletProfile = useSetAtom(walletProfileAtom);
  const { bottom, top } = useSafeAreaInsets();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [index, setIndex] = useState(0);

  const route = ONBOARDING_ROUTES[index];

  const bottomMarginForPlatform =
    Platform.OS === "android" ? bottom + 24 : bottom;

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSetProfile = async (profile: WalletProfile) => {
    await addOrUpdateWalletProfile(profile);
    setWalletProfile(profile);
    // ... navigate to next screen or home
  };

  const handleForward = () => {
    const onboardingRouteLength = ONBOARDING_ROUTES.length;

    if (index === onboardingRouteLength - 1) {
      if (address) {
        handleSetProfile({
          address: address,
          emoji: selectedEmoji,
          emojiBackground: selectedColor,
        });
      }
      router.replace("/(auth)/(tabs)/home");
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    setIndex(index - 1);
  };

  const isButtonDisabled =
    (route.path === "emoji-bg" && selectedColor === "") ||
    (route.path === "emoji" && selectedEmoji === "");

  if (usdcBalance) {
    console.log(usdcBalance);
  }

  const formattedFundsText = usdcBalLoading
    ? "Loading..."
    : usdcBalance === null || usdcBalError
    ? "$0.00"
    : formatCurrency({ amount: usdcBalance.value });
  return (
    <Animated.View
      style={{ flex: 1, marginTop: top, marginBottom: bottomMarginForPlatform }}
    >
      <OnboardingHeader backShown={index !== 0} backPress={handleBack} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 48,
        }}
      >
        <TopText
          heading={route.text.heading}
          subHeading={route.text.subHeading}
        />
        <View
          style={{
            flex: 1,
            zIndex: 1, //This is hacky but works for now...
          }}
        >
          {route.path === "emoji-bg" && (
            <PickColor
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          )}

          {route.path === "emoji" && (
            <PickEmoji
              selectedEmoji={selectedEmoji}
              onEmojiSelect={handleEmojiSelect}
              backgroundColor={selectedColor}
            />
          )}
          {route.path === "intro" && <OnboardingIntro />}
          {route.path === "funding" && (
            <OnboardingFunds balance={formattedFundsText} />
          )}
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            label="Continue"
            disabled={isButtonDisabled}
            onPress={handleForward}
          />
        </View>
      </View>
    </Animated.View>
  );
}
