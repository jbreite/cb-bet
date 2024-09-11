import Button from "@/components/Button";
import PickColor from "@/components/onboarding/pickColor";
import TopText from "@/components/onboarding/topText";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: top,
        marginBottom: bottom,
        paddingHorizontal: 48,
        paddingTop: 72,
      }}
    >
      <TopText
        heading="Choose a Color"
        subHeading="Choose a color for your wallet - You can update this later."
      />
      <PickColor
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
      />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          label="Continue"
          disabled={selectedColor === ""}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
}
