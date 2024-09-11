import Button from "@/components/Button";
import OnboardingHeader from "@/components/onboarding/onboardingHeader";
import PickColor from "@/components/onboarding/pickColor";
import PickEmoji from "@/components/onboarding/pickEmoji";
import TopText from "@/components/onboarding/topText";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { bottom, top } = useSafeAreaInsets();
  const [selectedColor, setSelectedColor] = useState("");
  const [index, setIndex] = useState(0);

  const route = ONBOARDING_ROUTES[index];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleForward = () => {
    const onboardingRouteLength = ONBOARDING_ROUTES.length;

    if (index === onboardingRouteLength - 1) {
      router.replace("/(auth)/(tabs)/home");
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    setIndex(index - 1);
  };

  return (
    <Animated.View style={{ flex: 1, marginTop: top, marginBottom: bottom }}>
      <OnboardingHeader backShown={index !== 0} backPress={handleBack} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 48,
          paddingTop: 48,
        }}
      >
        <TopText
          heading={route.text.heading}
          subHeading={route.text.subHeading}
        />
        <View style={{ flex: 1 }}>
          {route.path === "emoji-bg" && (
            <PickColor
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          )}

          {route.path === "emoji" && <PickEmoji />}
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            label="Continue"
            disabled={selectedColor === ""}
            onPress={handleForward}
          />
        </View>
      </View>
    </Animated.View>
  );
}
