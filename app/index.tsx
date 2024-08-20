import { View, Text } from "react-native";
import { useAccount, useConnect } from "wagmi";
import Button from "@/components/Button";
import { CoinbaseWalletLogo } from "@/components/coinbaseComponents/coinbaseWalletLogo";

export default function Index() {
  const { address } = useAccount();

  const { connect, connectors, isPending } = useConnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
        {"Smart Wallet Wagmi Demo"}
      </Text> */}

      <CoinbaseWalletLogo fill="#000" />
      <Text> Smart Wallet</Text>
      <Text>Sports Betting</Text>
      <Button
        label="Connect Wallet"
        isLoading={isPending}
        isLoadingText="Connecting..."
        onPress={handleConnect}
        disabled={isPending}
      />
    </View>
  );
}
