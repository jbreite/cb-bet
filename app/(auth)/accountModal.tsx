import CopyAddress from "@/components/account/CopyAddress";
import Button from "@/components/Button";
import { View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

export default function AccountModal() {
  const { address } = useAccount();

  const { disconnect } = useDisconnect();

  return (
    <View style={{ flex: 1, padding: 16, gap: 48 }}>
      {address && <CopyAddress address={address} />}
      <Button label="Disconnect Wallet" onPress={() => disconnect()} />
    </View>
  );
}
