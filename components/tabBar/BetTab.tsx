import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAtom } from "jotai";
import { userBetsAtom } from "@/lib/atom/atoms";
import {
  ErrorQuoteData,
  QuoteData,
  SuccessfulQuoteData,
} from "@/utils/overtime/queries/getQuote";
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
import { router } from "expo-router";
import { useUSDCBal } from "@/hooks/tokens/useUSDCBal";
import { useQuote } from "@/hooks/bets/useQuote";
import { usePlaceBetBetter } from "@/hooks/bets/usePlaceBetBetter";
import { useCapabilities } from "wagmi/experimental";
import { INITIAL_BET_AMOUNT } from "@/constants/Constants";

//TODO: Need a failure reason and show the error message.
//TODO: When refetching quote or changing input needs to clear the error.
//TODO: Need to BetTab have two states
//TODO: Need to clean up error messages after another fetch.

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
  const tradeData = userBetsAtomData.map((bet) => bet.tradeData);

  const { data: capabilities } = useCapabilities();

  console.log("capabilities", capabilities);

  const numberBetAmount = parseFloat(betAmount.replace("$", ""));
  console.log("numberBetAmount", numberBetAmount);

  const { data: quoteObject, isLoading: quoteLoading } = useQuote(
    betAmount,
    tradeData
  );

  //TODO: This is not working
  const onBetSuccess = () => {
    console.log("Bet placed successfully!");
    setUserBetsAtom([]);
    // Not sure this is right
    isKeyboardVisible.value = false;
    setIsKeyboardVisible(false);

    setBetAmount(INITIAL_BET_AMOUNT);
    router.push("/bets");
  };

  const {
    placeBet,
    allowanceError,
    callsStatus,
    writeContractsIsPending,
    writeContractsIsError,
  } = usePlaceBetBetter(onBetSuccess);

  const {
    balance: usdcBalance,
    isLoading: usdcBalLoading,
    isError: usdcBalError,
  } = useUSDCBal();

  const firstBet = userBetsAtomData[0];

  const betTypeName =
    numberBets > 1
      ? userBetsAtomData
          .map((bet) =>
            getMarketOutcomeText(
              bet.sportMarket,
              bet.tradeData.position,
              bet.tradeData.typeId,
              bet.tradeData.line
            )
          )
          .join(", ") //TODO this could be more detailed but fine fo now
      : getMarketTypeName(firstBet.tradeData.typeId);

  const marketOutcomeText =
    numberBets > 1
      ? `${numberBets} Game Parlay`
      : getMarketOutcomeText(
          firstBet.sportMarket,
          firstBet.tradeData.position,
          firstBet.tradeData.typeId,
          firstBet.tradeData.line
        );

  const handlePlaceBet = () => {
    if (!quoteObject) {
      Alert.alert("Error", "Quote data is not available");
      return;
    }

    placeBet(quoteObject, tradeData);
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

  const getWinText = (quoteObject: QuoteData | undefined) => {
    if (quoteObject && isSuccessfulQuoteObject(quoteObject.quoteData)) {
      return `To Win: ${formatCurrency({
        amount: quoteObject.quoteData.potentialProfit.usd,
        omitDecimalsForWholeNumbers: true,
      })}`;
    }
    return "To Win";
  };

  const buttonText =
    usdcBalance && numberBetAmount > usdcBalance.value
      ? "Not enough Funds"
      : getWinText(quoteObject);

  const buttonLoadingText = getWinText(quoteObject);

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
        <Text>{betTypeName}</Text>
      </View>

      <View style={{ gap: 8 }}>
        <BetInput
          buttonLabel={buttonText}
          isLoadingText={buttonLoadingText}
          betAmount={betAmount ?? "$"}
          setBetAmount={setBetAmount}
          onInputPress={() => setIsKeyboardVisible(!isKeyboardVisible.value)}
          onButtonPress={handlePlaceBet}
          isLoading={writeContractsIsPending || quoteLoading}
          isDisabled={
            writeContractsIsPending ||
            quoteLoading ||
            numberBetAmount === 0 ||
            numberBetAmount > usdcBalance.value
          }
        />
        {quoteObject && !isSuccessfulQuoteObject(quoteObject.quoteData) && (
          <SfText>{quoteObject.quoteData.error}</SfText>
        )}

        {writeContractsIsError && (
          <SfText>
            {extractFailureReason(writeContractsIsError.toString())}
          </SfText>
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
