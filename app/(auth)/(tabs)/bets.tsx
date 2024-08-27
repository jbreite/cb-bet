import { ScrollView, View, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getUserHistory } from "@/utils/overtime/queries/getUserHistory";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import TicketView from "@/components/ticket";
import { SfText } from "@/components/SfThemedText";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Bets() {
  const { address } = useAccount();
  const [userBets] = useAtom(userBetsAtom);

  const tabBarHeight = useBottomTabBarHeight();
  const bottomPadding = userBets.length > 0 ? 240 : 32; //TODO: Make this dynamic. Shouold be a hook

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
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 24,
            paddingBottom: tabBarHeight + bottomPadding,
          }}
        >
          {userHistoryData.claimable.length !== 0 && (
            <View style={styles.listContainer}>
              <SfText style={styles.titleText} familyType="semibold">
                Claimable
              </SfText>
              {userHistoryData.claimable.map((ticket) => (
                <TicketView key={ticket.id} ticket={ticket} />
              ))}
            </View>
          )}

          {userHistoryData.open.length !== 0 && (
            <View style={styles.listContainer}>
              <SfText style={styles.titleText} familyType="semibold">
                Open
              </SfText>
              {userHistoryData.open.map((ticket) => (
                <TicketView key={ticket.id} ticket={ticket} />
              ))}
            </View>
          )}

          {userHistoryData.closed.length !== 0 && (
            <View style={styles.listContainer}>
              <SfText style={styles.titleText} familyType="semibold">
                Closed
              </SfText>
              {userHistoryData.closed.map((ticket) => (
                <TicketView key={ticket.id} ticket={ticket} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
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
  listContainer: {
    flex: 1,
    gap: 16,
  },
  titleText: {
    fontSize: 24,
  },
});
