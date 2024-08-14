import { View, Text } from "react-native";

export default function GeneralErrorMessage({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error Message: {errorMessage}</Text>
    </View>
  );
}
