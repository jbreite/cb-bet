import { useAtom } from "jotai";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getQuote } from "@/utils/overtime/queries/getQuote";
import { usePlaceBet } from "@/hooks/bets/usePlaceBet";
import Button from "../Button";
import { ButtonGrid, KeyboardButtonItemType } from "../keyboard";
import BetInput from "./BetInput";

const REFETCH_INTERVAL = 50000;

export default function BetTab() {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const [betAmount, setBetAmount] = useState("$");
  const betAmountForFirstQuote = "10";
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const numberBets = userBetsAtomData.length;

  const tradeDataArray = userBetsAtomData.map((bet) => bet.tradeData);

  const {
    data: quoteObject,
    isLoading: quoteLoading,
    isError: quoteError,
  } = useQuery({
    queryKey: ["quoteData", betAmount, numberBets],
    queryFn: () =>
      getQuote({
        buyInAmount:
          betAmount === "$"
            ? parseFloat(betAmountForFirstQuote)
            : parseFloat(betAmount),
        tradeData: tradeDataArray,
      }),
    refetchInterval: REFETCH_INTERVAL,
    enabled: tradeDataArray.length !== 0,
  });

  if (quoteObject) {
    console.log(quoteObject);
  } else if (quoteLoading) {
    console.log("loading");
  } else if (quoteError) {
    console.log("Couldn't fetch quotre");
  }

  const getOutcomeText = (bet: any) => {
    switch (bet.tradeData.position) {
      case 0:
        return bet.sportMarket.homeTeam;
      case 1:
        return bet.sportMarket.awayTeam;
      case 2:
        return "Draw";
      default:
        return "Unknown";
    }
  };
  const firstBet = userBetsAtomData[0];
  const outcomeText = firstBet ? getOutcomeText(firstBet) : "";

  const handleKeyboardButtonPress = (value: KeyboardButtonItemType) => {
    setBetAmount((prev) => {
      if (value === "backspace") {
        if (prev === "$") {
          return prev;
        }
        return prev.slice(0, -1);
      }
      if (value === "." && prev.includes(".")) {
        return prev;
      }

      return prev + value;
    });
  };

  const {
    placeBet,
    writeError,
    writePending,
    waitLoading,
    transactionSuccess,
  } = usePlaceBet({
    quoteObject: quoteObject,
    tradeData: tradeDataArray,
  });

  const handleBet = async () => {
    if (!quoteObject) {
      Alert.alert("Error", "Quote data is not available");
      return;
    }

    try {
      await placeBet();
    } catch (error) {
      console.error("Error placing bet:", error);
      Alert.alert("Error", "Failed to place bet. Please try again.");
    }
  };

  const clearBets = () => {
    setUserBetsAtom([]);
    setBetAmount("");
    setIsKeyboardVisible(false);
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 16,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopColor: "#D3D3D3",
          borderLeftColor: "#D3D3D3",
          borderRightColor: "#D3D3D3",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderCurve: "continuous",
        }}
      >
        <Pressable onPress={clearBets}>
          <Text>Clear Bets</Text>
        </Pressable>
        <View style={styles.heading}>
          <Text>{numberBets} Betslip</Text>
          <Text>$10</Text>
        </View>

        <View>
          <Text>{outcomeText}</Text>
          <Text>
            {numberBets > 1 ? "Parlay" : userBetsAtomData[0].sportMarket.type}
          </Text>
        </View>
        <BetInput
          buttonLabel={`To Win: $` }
          betAmount={betAmount ?? "$"}
          setBetAmount={setBetAmount}
          onInputPress={() => setIsKeyboardVisible(!isKeyboardVisible)}
          onButtonPress={handleBet}
          isLoading={writePending}
          isDisabled={writePending || quoteLoading || betAmount == "$"}
        />
      </View>
      {isKeyboardVisible && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ButtonGrid onButtonPressed={handleKeyboardButtonPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 24,
  },
  pressableInput: {
    flex: 1,
    padding: 8,
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "center",
  },
  betButton: {
    flex: 1,
  },
});
