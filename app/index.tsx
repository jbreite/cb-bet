import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { router, useRouter, useSegments } from "expo-router";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useCapabilities } from "wagmi/experimental";
import Section from "@/components/coinbaseComponents/section";

export default function Index() {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  const { connect, connectors } = useConnect();

  const { disconnect } = useDisconnect();
  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
    reset,
  } = useSignMessage();

  const { data: capabilities, error: capabilitiesError } = useCapabilities();

  //TODO: Hook doesn't update on the tap so need a function
  const segments = useSegments();

  const handleConnect = () => {
    console.log("Current path before connect:", segments.join("/"));
    connect({ connector: connectors[0] });
  };

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
          Connected ✅ {address}
        </Text>
      )}
      <Pressable onPress={() => router.push("/(auth)")}>
        <Text>Sitempa</Text>
      </Pressable>
      <Section
        key={`connect`}
        title="useConnect"
        result={address}
        buttonLabel="Connect"
        onPress={handleConnect}
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

// {
//   onSuccess() {
//     console.log("Connected");
//     router.replace("/(auth)/");
//   },
