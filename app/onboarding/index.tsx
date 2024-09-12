import Button from "@/components/Button";
import OnboardingHeader from "@/components/onboarding/onboardingHeader";
import OnboardingIntro from "@/components/onboarding/onboardingIntro";
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
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount } from "wagmi";

const ONBOARDING_ROUTES = [
  {
    path: "emoji-bg",
    text: {
      heading: "Choose a Color",
      subHeading: "Choose a color for your wallet - You can update this later.",
    },
  },
  {
    path: "emoji",
    text: {
      heading: "Set a Display Image",
      subHeading: "Choose an avatar for your wallet - Only you can see this.",
    },
  },
  {
    path: "intro",
    text: {
      heading: "Set a Display Image",
      subHeading: "Choose an avatar for your wallet - Only you can see this.",
    },
  },
  {
    path: "funding",
    text: {
      heading: "Set a Display Image",
      subHeading: "Choose an avatar for your wallet - Only you can see this.",
    },
  },
];

export default function Page() {
  const { address } = useAccount();
  const setWalletProfile = useSetAtom(walletProfileAtom);
  const { bottom, top } = useSafeAreaInsets();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [index, setIndex] = useState(0);

  const route = ONBOARDING_ROUTES[index];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSetProfile = async (profile: WalletProfile) => {
    await addOrUpdateWalletProfile(profile);
    setWalletProfile(profile);
    console.log("PROFILE ON ONBOARDING AFTER:", profile);
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

  return (
    <Animated.View style={{ flex: 1, marginTop: top, marginBottom: bottom }}>
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
