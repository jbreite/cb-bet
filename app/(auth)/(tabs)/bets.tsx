import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useWriteContract } from "wagmi";
import { getUserHistory } from "@/utils/overtime/queries/getUserHistory";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import GeneralSpinningLoader from "@/components/GeneralSpinningLoader";
import GeneralErrorMessage from "@/components/GeneralErrorMessage";
import TicketView from "@/components/ticket";
import { SfText } from "@/components/SfThemedText";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import sportsAMMV2Contract from "@/constants/overtimeContracts";
import { useWriteContracts } from "wagmi/experimental";
import { usePaymaster } from "@/hooks/bets/usePaymaster";

//TODO: Group tickets by gameId
//Example claim transaction - https://optimistic.etherscan.io/tx/0xbc151726cc4b073815449bfe36a07ccc897beaf41878ff3aab964251ad5d6f48

//TODO: Claim All button

export default function Bets() {
  const { address } = useAccount();
  const [userBets] = useAtom(userBetsAtom);

  const tabBarHeight = useBottomTabBarHeight();
  const bottomPadding = userBets.length > 0 ? 240 : 32; //TODO: Make this dynamic. Shouold be a hook

  const capabilities = usePaymaster();

  const {
    data: userHistoryData,
    isLoading: userHistoryIsLoading,
    isError: userHistoryIsError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userHistory", address?.toString()],
    queryFn: () =>
      getUserHistory(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, address),
    // keepPreviousData: true,
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { writeContracts } = useWriteContracts({
    mutation: {
      onSuccess: (data) => {
        console.log("Claim successful", data);
        refetch();
      },
    },
  });

  const handleClaim = (ticketId: string) => {
    if (!address) {
      console.error("No wallet address found");
      return;
    }

    const claimTicketInput = {
      address: sportsAMMV2Contract.addresses[
        CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
      ] as `0x${string}`,
      abi: sportsAMMV2Contract.abi,
      functionName: "exerciseTicket",
      args: [ticketId],
    };

    writeContracts({
      contracts: [claimTicketInput],
      capabilities,
    });
  };

  let userHistoryView;

  if (userHistoryIsLoading) {
    userHistoryView = <GeneralSpinningLoader />;
  } else if (userHistoryIsError) {
    userHistoryView = <GeneralErrorMessage errorMessage={"Error"} />;
  } else if (userHistoryData) {
    // console.log(JSON.stringify(userHistoryData));
    userHistoryView = (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
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
                <TicketView
                  key={ticket.id}
                  ticket={ticket}
                  onPress={() => handleClaim(ticket.id)}
                />
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
    gap: 8,
  },
  titleText: {
    fontSize: 24,
  },
});
