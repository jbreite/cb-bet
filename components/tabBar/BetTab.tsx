import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAtom } from "jotai";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useQuery } from "@tanstack/react-query";
import {
  ErrorQuoteData,
  getQuote,
  SuccessfulQuoteData,
} from "@/utils/overtime/queries/getQuote";
import { usePlaceBet } from "@/hooks/bets/usePlaceBet";
import BetInput from "./BetInput";
import {
  calculateBetOutcome,
  extractAmericanOddsFromBets,
  extractFailureReason,
  formatAmericanOdds,
  formatCurrency,
} from "@/utils/overtime/ui/beyTabHelpers";
import { SfText } from "../SfThemedText";
import { SharedValue } from "react-native-reanimated";
import {
  getMarketOutcomeText,
  getMarketTypeName,
} from "@/utils/overtime/ui/markets";

//TODO: Need a failure reason and show the error message.
//TODO: When refetching quote or changing input needs to clear the error.
//TODO: Need to BetTab have two states
//TODO: Need a success state.
//TODO: Need to clean up error messages after another fetch.

const REFETCH_INTERVAL = 50000;

interface BetTabProps {
  isKeyboardVisible: SharedValue<boolean>;
  setIsKeyboardVisible: (visible: boolean) => void;
  betAmount: string;
  setBetAmount: (amount: string) => void;
}

export default function BetTab({
  isKeyboardVisible,
  setIsKeyboardVisible,
  betAmount,
  setBetAmount,
}: BetTabProps) {
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const numberBets = userBetsAtomData.length;
  const tradeDataArray = userBetsAtomData.map((bet) => bet.tradeData);
  const numberBetAmount = parseFloat(betAmount.slice(1));
  console.log("numberBetAmount", numberBetAmount);

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
    enabled:
      (tradeDataArray.length !== 0 && !isNaN(numberBetAmount)) ||
      numberBetAmount !== 0,
  });

  //TODO: Need to handle the case where there are an array of bets.
  const firstBet = userBetsAtomData[0];

  const betTypeName = firstBet
    ? getMarketTypeName(firstBet.tradeData.typeId)
    : "";

  const marketOutcomeText = firstBet
    ? getMarketOutcomeText(firstBet.sportMarket, firstBet.tradeData)
    : "";

  const {
    placeBet,
    writeError,
    writePending,
    writeFailureReason,
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
    setBetAmount("$");
    setIsKeyboardVisible(false);
  };

  const isSuccessfulQuoteObject = (
    quoteData: SuccessfulQuoteData | ErrorQuoteData
  ): quoteData is SuccessfulQuoteData => {
    return "totalQuote" in quoteData;
  };

  const americanOdds =
    quoteObject && isSuccessfulQuoteObject(quoteObject.quoteData)
      ? quoteObject.quoteData.totalQuote.american
      : extractAmericanOddsFromBets(userBetsAtomData);

  const formattedAmericanOdds = formatAmericanOdds(americanOdds);
  const tenDollarBetOutcome = calculateBetOutcome(americanOdds, 10);

  const buttonText =
    quoteObject && isSuccessfulQuoteObject(quoteObject.quoteData)
      ? `To Win: ${formatCurrency({
          amount: quoteObject.quoteData.potentialProfit.usd,
          omitDecimalsForWholeNumbers: true,
        })}`
      : "To Win";

  if (writeError) {
    console.log("writeError", writeError);
    console.log("writeFailureReason", writeFailureReason);
  }

  return (
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
          <View style={styles.betslipNumber}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <SfText familyType="semibold" style={{ fontSize: 18 }}>
            {marketOutcomeText}
          </SfText>
          <SfText familyType="semibold" style={{ fontSize: 18 }}>
            {formattedAmericanOdds}
          </SfText>
        </View>
        <Text>{numberBets > 1 ? "Parlay".toUpperCase() : betTypeName}</Text>
      </View>

      <View style={{ gap: 8 }}>
        <BetInput
          buttonLabel={buttonText}
          isLoadingText={buttonText}
          betAmount={betAmount ?? "$"}
          setBetAmount={setBetAmount}
          onInputPress={() => setIsKeyboardVisible(!isKeyboardVisible.value)}
          onButtonPress={handleBet}
          isLoading={writePending || quoteLoading}
          isDisabled={writePending || quoteLoading || betAmount == "$"}
        />
        {quoteObject && !isSuccessfulQuoteObject(quoteObject.quoteData) && (
          <SfText>{quoteObject.quoteData.error}</SfText>
        )}

        {writeFailureReason && (
          <SfText>{extractFailureReason(writeFailureReason.toString())}</SfText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  betslipNumber: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    height: 24,
    width: 24,
    backgroundColor: "#1A88F8",
  },
});
