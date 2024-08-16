import { ScrollView, View, Text, StyleSheet } from "react-native";
import Section from "@/components/coinbaseComponents/section";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  createConnectorFromWallet,
  Wallets,
} from "@mobile-wallet-protocol/wagmi-connectors";
import * as Linking from "expo-linking";
import {
  http,
  createConfig,
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
} from "wagmi";
import { base } from "wagmi/chains";
import { useCapabilities } from "wagmi/experimental";
import CustomButton from "@/components/coinbaseComponents/button";

export default function Index() {
  const { address } = useAccount();
  console.log(address);

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
    reset,
  } = useSignMessage();

  const { data: capabilities, error: capabilitiesError } = useCapabilities();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ flex: 1, padding: 16 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
        {"Smart Wallet Wagmi Demo"}
      </Text>
      {address && (
        <Text style={{ fontSize: 16, fontWeight: "600", textAlign: "center" }}>
          Connected ✅
        </Text>
      )}
      <Section
        key={`connect`}
        title="useConnect"
        result={address}
        buttonLabel="Connect"
        onPress={() => connect({ connector: connectors[0] })}
      />
      {address && (
        <>
          <Section
            key="useDisconnect"
            title="useDisconnect"
            buttonLabel="Disconnect"
            onPress={() => {
              disconnect({ connector: connectors[0] });
              reset();
            }}
          />
          <Section
            key="useSignMessage"
            title="useSignMessage"
            result={signMessageHash ?? signMessageError}
            onPress={() => signMessage({ message: "hello world" })}
          />
          <Section
            key="useCapabilities"
            title="useCapabilities"
            result={JSON.stringify(capabilities ?? capabilitiesError, null, 2)}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
  },
});
