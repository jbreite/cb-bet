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
import {
  calculateBetOutcome,
  extractAmericanOddsFromBets,
  formatAmericanOdds,
  formatCurrency,
} from "@/utils/overtime/ui/beyTabHelpers";
import { SfText } from "../SfThemedText";

const REFETCH_INTERVAL = 50000;

export default function BetTab() {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const [betAmount, setBetAmount] = useState("$");
  // const betAmountForFirstQuote = "10";
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const numberBets = userBetsAtomData.length;

  const tradeDataArray = userBetsAtomData.map((bet) => bet.tradeData);

  const numberBetAmount = parseFloat(betAmount.slice(1));
  console.log(numberBetAmount);

  const {
    data: quoteObject,
    isLoading: quoteLoading,
    isError: quoteError,
  } = useQuery({
    queryKey: ["quoteData", betAmount, tradeDataArray],
    queryFn: () =>
      getQuote({
        buyInAmount: numberBetAmount,
        tradeData: tradeDataArray,
      }),
    refetchInterval: REFETCH_INTERVAL,
    enabled: tradeDataArray.length !== 0 && !isNaN(numberBetAmount),
  });

  if (quoteObject) {
    console.log("quoteObject:", quoteObject);
  } else if (quoteLoading) {
    console.log("loading quote");
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

  const isSuccessfulQuoteObject =
    quoteObject &&
    !quoteLoading &&
    quoteObject.quoteData &&
    "totalQuote" in quoteObject.quoteData;

  const americanOdds = isSuccessfulQuoteObject
    ? quoteObject.quoteData.totalQuote.american
    : extractAmericanOddsFromBets(userBetsAtomData);
  console.log(americanOdds);

  const formattedAmericanOdds = formatAmericanOdds(americanOdds);
  const tenDollarBetOutcome = calculateBetOutcome(americanOdds, 10);
  const betOutcome = calculateBetOutcome(
    americanOdds,
    betAmount === "$" ? 10 : numberBetAmount
  );

  const buttonText = isSuccessfulQuoteObject
    ? `To Win: ${formatCurrency({
        amount: parseFloat(quoteObject.quoteData.payout.usd),
        omitDecimalsForWholeNumbers: true,
      })}`
    : "To Win";

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <View style={[styles.betslipNumber]}>
              <SfText
                familyType={"bold"}
                style={{
                  fontSize: 16,
                  color: "white",
                }}
              >
                {numberBets}
              </SfText>
            </View>
            <SfText
              familyType={"bold"}
              style={{
                fontSize: 16,
                color: "#1A88F8",
              }}
            >
              Bet Slip
            </SfText>
          </View>

          <SfText familyType="medium" style={{ fontSize: 16 }}>
            $10 to win{" "}
            {formatCurrency({
              amount: tenDollarBetOutcome.profit,
              omitDecimalsForWholeNumbers: true,
            })}
          </SfText>
        </View>

        <View style={{ gap: 4 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SfText familyType="semibold" style={{ fontSize: 18 }}>
              {outcomeText}
            </SfText>
            <SfText familyType="semibold" style={{ fontSize: 18 }}>
              {formattedAmericanOdds}
            </SfText>
          </View>
          <Text>
            {numberBets > 1
              ? "Parlay".toUpperCase()
              : userBetsAtomData[0].sportMarket.type.toUpperCase()}
          </Text>
        </View>
        <BetInput
          buttonLabel={buttonText}
          isLoadingText={buttonText}
          betAmount={betAmount ?? "$"}
          setBetAmount={setBetAmount}
          onInputPress={() => setIsKeyboardVisible(!isKeyboardVisible)}
          onButtonPress={handleBet}
          isLoading={writePending || quoteLoading}
          isDisabled={writePending || quoteLoading || betAmount == "$"}
        />
      </View>
      {isKeyboardVisible && (
        <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 16 }}>
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
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: "#D3D3D3",
    borderLeftColor: "#D3D3D3",
    borderRightColor: "#D3D3D3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderCurve: "continuous",
    gap: 24,
  },
  heading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  betslipNumber: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    height: "150%",
    aspectRatio: 1,
    backgroundColor: "#1A88F8",
  },
});

{
  /* <Pressable onPress={clearBets}>
<Text style={{ textAlign: "right" }}>Clear Bets</Text>
</Pressable> */
}
