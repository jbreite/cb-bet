import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getUserHistory } from "@/utils/overtime/queries/getUserHistory";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";

export default function Bets() {
  const { address } = useAccount();

  const {
    data: userHistoryData,
    isLoading: userHistoryIsLoading,
    isError: userHistoryIsError,
  } = useQuery({
    queryKey: ["userHistory", address?.toString()],
    queryFn: () =>
      getUserHistory(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, address),
  });

  let userHistoryView;

  if (userHistoryIsLoading) {
    userHistoryView = <GeneralSpinningLoader />;
  } else if (userHistoryIsError) {
    userHistoryView = <GeneralErrorMessage errorMessage={"Error"} />;
  } else if (userHistoryData) {
    console.log(JSON.stringify(userHistoryData));
    userHistoryView = (
      <View>
        <Text>Look at the console</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 24,
        alignItems: "center",
      }}
    >
      <Text>Bets</Text>
      {userHistoryView}
    </View>
  );
}
