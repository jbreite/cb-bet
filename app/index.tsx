import { View, Text, Image } from "react-native";
import { useAccount, useConnect } from "wagmi";
import Button from "@/components/Button";
import { CoinbaseWalletLogo } from "@/components/coinbaseComponents/coinbaseWalletLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SfText } from "@/components/SfThemedText";
import { StyleSheet } from "react-native";
import GridBackground from "@/components/lander/gridBackground";
import BSquaredLogo from "@/components/lander/bSquaresLogo";

export default function Index() {
  const { connect, connectors, isPending } = useConnect();
  const { bottom, top } = useSafeAreaInsets();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <View style={styles.container}>
      <GridBackground />
      <View />
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 24 }}
      >
        <BSquaredLogo />
        <SfText
          style={{ textAlign: "center", fontSize: 24, color: "#1A88F8" }}
          familyType="semibold"
        >
          Onchain sports betting powered by Overtime and the Coinbase Smart
          Wallet
        </SfText>
      </View>
      <Button
        label="Login"
        isLoading={isPending}
        isLoadingText="Connecting..."
        onPress={handleConnect}
        disabled={isPending}
        style={{ width: "90%", marginBottom: bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    backgroundColor: "#e0e0e0",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
});
