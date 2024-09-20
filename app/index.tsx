import { Platform, View } from "react-native";
import { useConnect } from "wagmi";
import Button from "@/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SfText } from "@/components/SfThemedText";
import { StyleSheet } from "react-native";
import GridBackground, { GRID_SIZE } from "@/components/lander/gridBackground";
import BSquaredLogo from "@/components/lander/bSquaresLogo";
import { addOrUpdateWalletProfile } from "@/utils/local/localStoreProfile";

export default function Index() {
  const { connect, connectors, isPending } = useConnect({
    mutation: {
      onSuccess: (data) => {
        //Create wallet profile in local storage
        //TODO: Check if works of multiple accounts.
        addOrUpdateWalletProfile({ address: data.accounts[0] });
      },
    },
  });
  const { bottom } = useSafeAreaInsets();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  const bottomMarginForPlatform =
    Platform.OS === "android" ? bottom + 24 : bottom;

  return (
    <View style={styles.container}>
      <GridBackground />
      <View />
      <View />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: GRID_SIZE,
        }}
      >
        <BSquaredLogo fontSize={GRID_SIZE * 4} />
        <SfText
          fontSize={24}
          style={{
            textAlign: "center",

            lineHeight: GRID_SIZE,
            color: "#1A88F8",
          }}
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
        style={{ width: "90%", marginBottom: bottomMarginForPlatform }}
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
