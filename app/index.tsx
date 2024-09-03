import { View, Text, Image } from "react-native";
import { useAccount, useConnect } from "wagmi";
import Button from "@/components/Button";
import { CoinbaseWalletLogo } from "@/components/coinbaseComponents/coinbaseWalletLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SfText } from "@/components/SfThemedText";

export default function Index() {
  const { connect, connectors, isPending } = useConnect();
  const { bottom, top } = useSafeAreaInsets();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
    
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: bottom,
        marginTop: top,
      }}
    >
      <View />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SfText
          familyType="bold"
          style={{ textAlign: "center", fontSize: 40, color: "#1A88F8" }}
        >
          Based Bets
        </SfText>

        <Image
          source={require("@/assets/images/tempOnboardingImage.png")}
          style={{ aspectRatio: 1, height: 147 }}
        />
      </View>
      <Button
        label="Connect Wallet"
        isLoading={isPending}
        isLoadingText="Connecting..."
        onPress={handleConnect}
        disabled={isPending}
        style={{ width: "80%" }}
      />
    </View>
  );
}
