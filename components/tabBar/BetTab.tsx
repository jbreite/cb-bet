import React, { useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
  SharedValue,
} from "react-native-reanimated";
import { useAtom } from "jotai";
import { userBetsAtom } from "@/lib/atom/atoms";
import { QuoteData } from "@/utils/overtime/queries/getQuote";
import BetInput from "./BetInput";
import {
  calculateBetOutcome,
  extractAmericanOddsFromBets,
  extractFailureReason,
  formatAmericanOdds,
  formatCurrency,
  isSuccessfulQuoteObject,
} from "@/utils/overtime/ui/beyTabHelpers";
import { SfText } from "../SfThemedText";
import {
  getMarketOutcomeText,
  getMarketTypeName,
} from "@/utils/overtime/ui/markets";
import { router } from "expo-router";
import { useUSDCBal } from "@/hooks/tokens/useUSDCBal";
import { useQuote } from "@/hooks/bets/useQuote";
import { usePlaceBet } from "@/hooks/bets/usePlaceBet";
import { INITIAL_BET_AMOUNT } from "@/constants/Constants";
import Chevron_Down from "../icons/Chevron_Down";
import IconPressable from "../IconPressable";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { renderRightActions, STICKING_THRESHOLD } from "./betTabSwipeable";
import useHaptics from "@/hooks/useHaptics";
import { RightActionSwipeable } from "./betTabSwipeable";
import { queryClient } from "@/app/_layout";

interface BetTabProps {
  isKeyboardVisible: SharedValue<boolean>;
  setIsKeyboardVisible: (visible: boolean) => void;
  betAmount: string;
  setBetAmount: (amount: string) => void;
  isCollapsed: SharedValue<boolean>;
  toggleCollapse: () => void;
  onLayout: (height: number) => void;
  disableCollapse?: boolean;
}

const PADDING = 16;

export default function BetTab({
  isKeyboardVisible,
  setIsKeyboardVisible,
  betAmount,
  setBetAmount,
  isCollapsed,
  toggleCollapse,
  onLayout,
  disableCollapse,
}: BetTabProps) {
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const numberBets = userBetsAtomData.length;
  const tradeData = userBetsAtomData.map((bet) => bet.tradeData);
  const swipeableRef = useRef<SwipeableMethods>(null);

  const numberBetAmount = parseFloat(betAmount.replace("$", ""));

  const {
    data: quoteObject,
    isLoading: quoteLoading,
    isError: isQuoteError,
    refetch: refetchQuote,
  } = useQuote(betAmount, tradeData);

  const onBetSuccess = () => {
    console.log("Bet placed successfully!");
    setUserBetsAtom([]);
    isKeyboardVisible.value = false;
    setIsKeyboardVisible(false);
    setBetAmount(INITIAL_BET_AMOUNT);
    queryClient.invalidateQueries({ queryKey: ["userHistory"] });
    router.push("/bets");
  };

  const { placeBet, writeContractsIsPending, writeContractsIsError } =
    usePlaceBet(onBetSuccess);

  const { balance: usdcBalance } = useUSDCBal();

  const firstBet = userBetsAtomData[0];
  const isParlay = numberBets > 1;

  const betTypeName = isParlay
    ? userBetsAtomData
        .map((bet) =>
          getMarketOutcomeText(
            bet.sportMarket,
            bet.tradeData.position,
            bet.tradeData.typeId,
            bet.tradeData.line
          )
        )
        .join(", ")
    : getMarketTypeName(firstBet.tradeData.typeId);

  const marketOutcomeText = isParlay
    ? `${numberBets} Game Parlay`
    : getMarketOutcomeText(
        firstBet.sportMarket,
        firstBet.tradeData.position,
        firstBet.tradeData.typeId,
        firstBet.tradeData.line
      );

  const handlePlaceBet = () => {
    if (!quoteObject || isQuoteError) {
      Alert.alert("Error", "Quote data is not available");
      return;
    }

    placeBet(quoteObject, tradeData);
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

  const enoughUSDC = usdcBalance && numberBetAmount > usdcBalance.value;

  const buttonText = enoughUSDC ? "Not enough Funds" : getWinText(quoteObject);

  const buttonLoadingText = getWinText(quoteObject);

  let quoteText = "";
  if (quoteObject && !isSuccessfulQuoteObject(quoteObject.quoteData)) {
    if (quoteObject.quoteData.error.includes("Proof is not valid")) {
      console.log("Received 'Proof is not valid' error. Refetching...");
      console.log("invalidating..");
      quoteText =
        "Markets are old and are refreshing. If it doesn't work, then reset manually.";
      queryClient.invalidateQueries({ queryKey: ["markets"] });
    } else {
      quoteText = quoteObject.quoteData.error;
    }
  }

  const rChevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isCollapsed.value ? "180deg" : "0deg"),
      },
    ],
  }));

  const handleToggleKeyboard = () => {
    runOnJS(setIsKeyboardVisible)(!isKeyboardVisible.value);
  };
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

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <SfText familyType="medium" style={{ fontSize: 16 }}>
            $10 to win{" "}
            {formatCurrency({
              amount: tenDollarBetOutcome.profit,
              omitDecimalsForWholeNumbers: true,
            })}
          </SfText>
          <IconPressable
            onPress={() => {
              if (isKeyboardVisible.value) {
                handleToggleKeyboard();
              } else {
                toggleCollapse();
              }
            }}
            disabled={disableCollapse}
          >
            <Animated.View style={rChevronStyle}>
              <Chevron_Down color={"#949595"} strokeWidth={2.5} />
            </Animated.View>
          </IconPressable>
        </View>
      </View>

      <Swipeable
        ref={swipeableRef}
        friction={1}
        rightThreshold={STICKING_THRESHOLD}
        renderRightActions={renderRightActions}
        containerStyle={{ marginHorizontal: -PADDING }}
        onSwipeableWillOpen={(direction) => {
          if (direction === "right") {
            triggerImpact(ImpactFeedbackStyle.Medium);
            if (isKeyboardVisible.value) {
              handleToggleKeyboard();
            }
            setUserBetsAtom([]);
          }
        }}
      >
        <View
          style={{
            gap: 16,
            paddingHorizontal: PADDING,
            backgroundColor: "white",
          }}
          onLayout={(event) => {
            onLayout(event.nativeEvent.layout.height);
          }}
        >
          {/*Bet Info*/}
          <View style={{ gap: 4 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <SfText familyType="semibold" style={{ fontSize: 18 }}>
                {marketOutcomeText}
              </SfText>
              <SfText familyType="semibold" style={{ fontSize: 18 }}>
                {formattedAmericanOdds}
              </SfText>
            </View>
            <Text>{betTypeName}</Text>
          </View>

          {/*Input*/}
          <View style={{ gap: 8 }}>
            <BetInput
              buttonLabel={buttonText}
              isLoadingText={buttonLoadingText}
              betAmount={betAmount ?? "$"}
              setBetAmount={setBetAmount}
              onInputPress={handleToggleKeyboard}
              onButtonPress={handlePlaceBet}
              isLoading={
                writeContractsIsPending || (quoteLoading && !enoughUSDC)
              }
              isDisabled={
                writeContractsIsPending ||
                quoteLoading ||
                numberBetAmount === 0 ||
                enoughUSDC
              }
            />
            {quoteObject && !isSuccessfulQuoteObject(quoteObject.quoteData) && (
              <SfText familyType="medium" style={{ fontSize: 14 }}>
                {quoteText}
              </SfText>
            )}

            {/* {writeContractsIsError && (
              <SfText familyType="medium" style={{ fontSize: 16 }}>
                {extractFailureReason(writeContractsIsError.toString())}
              </SfText>
            )} */}
          </View>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: PADDING,
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
