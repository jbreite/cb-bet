import { ScrollView, View, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getUserHistory } from "@/utils/overtime/queries/getUserHistory";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import TicketView from "@/components/ticket";
import { Ticket } from "@/utils/overtime/types/markets";
import { SfText } from "@/components/SfThemedText";

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
      <ScrollView contentContainerStyle={{ gap: 16, paddingHorizontal: 24 }}>
        {userHistoryData.claimable.length !== 0 && (
          <View>
            <SfText style={styles.titleText} familyType="semibold">
              Claimable
            </SfText>
            {userHistoryData.claimable.map((ticket) => (
              <TicketView key={ticket.id} ticket={ticket} />
            ))}
          </View>
        )}

        {userHistoryData.open.length !== 0 && (
          <View>
            <SfText style={styles.titleText} familyType="semibold">
              Open
            </SfText>
            {userHistoryData.open.map((ticket) => (
              <TicketView key={ticket.id} ticket={ticket} />
            ))}
          </View>
        )}

        {userHistoryData.closed.length !== 0 && (
          <View>
            <SfText style={styles.titleText} familyType="semibold">
              Closed
            </SfText>
            {userHistoryData.closed.map((ticket) => (
              <TicketView key={ticket.id} ticket={ticket} />
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {userHistoryView}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
  },
});
