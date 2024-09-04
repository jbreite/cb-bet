import CopyAddress from "@/components/account/CopyAddress";
import Button from "@/components/Button";
import { useUSDCBal } from "@/hooks/tokens/useUSDCBal";
import { View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

export default function AccountModal() {
  const { address } = useAccount();

  const { disconnect } = useDisconnect();

  const {
    balance: usdcBalance,
    isLoading: usdcBalLoading,
    isError: usdcBalError,
  } = useUSDCBal();

  if (usdcBalance) {
    console.log(usdcBalance);
  } else if (usdcBalLoading) {
    console.log("Loading...");
  } else if (usdcBalError) {
    console.log("isError", usdcBalError);
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 48 }}>
      {address && <CopyAddress address={address} />}
      <Button label="Disconnect Wallet" onPress={() => disconnect()} />
    </View>
  );
}
