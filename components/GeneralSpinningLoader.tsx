import { ActivityIndicator, View } from "react-native";

export default function GeneralSpinningLoader() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1A88F8" />
    </View>
  );
}
