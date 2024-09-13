import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import IntroCard from "./introCard";

export default function OnboardingIntro() {
  return (
    <Animated.View
      style={{ flex: 1, justifyContent: "space-between" }}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <IntroCard
        emoji="😀"
        emojiBGColor="#F24900"
        heading="Seamless UX"
        subheading="You transactions are conducted securely within the bsquared app."
      />
      <IntroCard
        emoji="🔌"
        emojiBGColor="#1F807B"
        heading="Overtime Markets"
        subheading="Markets are permiosionless smart contracts from Overtime"
      />
      <IntroCard
        emoji="🧠"
        emojiBGColor="#6BCEF5"
        heading="Smart wallet"
        subheading="All is controlled by your coinbase smart wallet."
      />
    </Animated.View>
  );
}
