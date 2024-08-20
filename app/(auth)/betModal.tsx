import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAtom } from "jotai";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/utils/overtime/queries/getQuote";
import { parseEther, parseUnits, WriteContractErrorType } from "viem";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import sportsAMMV2Contract from "@/constants/overtimeContracts";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";
import { ERC_20_ABI } from "@/utils/overtime/abi/ERC20_ABI";
import { usePlaceBet } from "@/hooks/bets/usePlaceBet";
import { TextInput } from "react-native-gesture-handler";

const REFETCH_INTERVAL = 10000;

export default function BetModal() {
  const [userBetsAtomInfo] = useAtom(userBetsAtom);
  const [betAmount, setBetAmount] = useState("");
  const { address } = useAccount();

  console.log("address", address);
  const tradeData = userBetsAtomInfo[0].tradeData;

  const hasTradePosition = tradeData.position !== undefined;
  const hasBetAmount = betAmount !== "";

  //Need to add debouncing to this
  const {
    data: quoteObject,
    isLoading: quoteLoading,
    isError: quoteError,
  } = useQuery({
    queryKey: ["quoteData", tradeData.position, betAmount],
    queryFn: () =>
      getQuote({
        buyInAmount: parseFloat(betAmount),
        tradeData: [tradeData],
      }),
    enabled: hasTradePosition && hasBetAmount,
    refetchInterval: REFETCH_INTERVAL,
  });

  const {
    placeBet,
    writeError,
    writePending,
    waitLoading,
    transactionSuccess,
  } = usePlaceBet({
    quoteObject: quoteObject,
    tradeData,
  });

  const {
    writeContract,
    data: transactionData,
    error: writeErrorApproval,
    isPending: writePendingApproval,
  } = useWriteContract();

  const handleApproval = async () => {
    writeContract({
      abi: ERC_20_ABI,
      address: USDC_ADDRESS,
      functionName: "approve",
      args: [
        sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
        betAmount,
      ],
    });
  };

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
  if (quoteLoading || writePending || waitLoading) {
    return <Text>Loading...</Text>;
  }

  if (quoteError) {
    return <Text>{quoteObject?.quoteData.error}</Text>;
  }

  if (writeError) {
    logErrorDetails(writeError);

    const errorMessage = getErrorMessage(writeError);
    return (
      <View>
        <Text>Error occurred while placing bet:</Text>
        <Text>{errorMessage}</Text>
        <Text>Please try again or contact support if the issue persists.</Text>
      </View>
    );
  }

  if (transactionSuccess) {
    return <Text>Bet placed successfully!</Text>;
  }

  return (
    <View>
      <Text>BetModal</Text>
      <TextInput
        value={betAmount}
        onChangeText={(text) => setBetAmount(text.replace(/[^0-9.]/g, ""))}
        placeholder="Enter bet amount"
        keyboardType="numeric"
      />

      {quoteObject &&
        quoteObject.quoteData &&
        ("totalQuote" in quoteObject.quoteData ? (
          <View>
            <Text>
              Bet Amount: ${quoteObject.quoteData.buyInAmountInUsd.toFixed(2)}
            </Text>
            <Text>
              Potential Payout: ${quoteObject.quoteData.payout.usd.toFixed(2)}
            </Text>
            <Text>
              Potential Profit: $
              {quoteObject.quoteData.potentialProfit.usd.toFixed(2)} (
              {quoteObject.quoteData.potentialProfit.percentage.toFixed(2)}%)
            </Text>
            <Text>
              Odds: {quoteObject.quoteData.totalQuote.american > 0 ? "+" : ""}
              {quoteObject.quoteData.totalQuote.american.toFixed(0)} (
              {(
                quoteObject.quoteData.totalQuote.normalizedImplied * 100
              ).toFixed(2)}
              %)
            </Text>
            <Text>
              Available Liquidity: $
              {quoteObject.liquidityData?.ticketLiquidityInUsd.toFixed(2) ??
                "N/A"}
            </Text>
            <Button
              title="Handle Approval"
              onPress={handleApproval}
              disabled={writePending}
            />
            <Button
              title="Place Bet"
              onPress={handleBet}
              disabled={writePending}
            />
          </View>
        ) : (
          <View>
            <Text>{quoteObject.quoteData.error}</Text>
          </View>
        ))}
    </View>
  );
}

function getErrorMessage(error: WriteContractErrorType): string {
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if ("shortMessage" in error) {
    return error.shortMessage || "An unknown error occurred";
  }
  if ("message" in error) {
    return error.message || "An unknown error occurred";
  }
  return "An unknown error occurred";
}

function logErrorDetails(error: any): void {
  console.error("Contract write error occurred:");

  if (error instanceof Error) {
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
  } else if (typeof error === "object" && error !== null) {
    Object.entries(error).forEach(([key, value]) => {
      console.error(`${key}:`, safeStringify(value));
    });
  } else {
    console.error("Unexpected error type:", typeof error);
    console.error("Error value:", error);
  }

  // Log additional context if available

  console.error("Full error object:", safeStringify(error));
}

function safeStringify(obj: any): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return `[Circular or Non-Serializable Object]: ${Object.keys(obj).join(
      ", "
    )}`;
  }
}
