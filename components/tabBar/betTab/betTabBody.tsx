import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SfText } from "../../SfThemedText";
import BetInput from "./betInput";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { isSuccessfulQuoteObject } from "@/utils/overtime/ui/beyTabHelpers";
import { QuoteData } from "@/utils/overtime/queries/getQuote";

interface BetTabBodyProps {
  marketOutcomeText: string | undefined;
  formattedAmericanOdds: string;
  betTypeName: string | MarketTypeEnum;
  buttonText: string;
  buttonLoadingText: string;
  betAmount: string;
  setBetAmount: (amount: string) => void;
  handleToggleKeyboard: () => void;
  handlePlaceBet: () => void;
  writeContractsIsPending: boolean;
  quoteLoading: boolean;
  enoughUSDC: boolean;
  numberBetAmount: number;
  quoteObject: QuoteData | undefined;
  quoteText: string;
  onLayout: (height: number) => void;
}

const BetTabBody: React.FC<BetTabBodyProps> = ({
  marketOutcomeText,
  formattedAmericanOdds,
  betTypeName,
  buttonText,
  buttonLoadingText,
  betAmount,
  setBetAmount,
  handleToggleKeyboard,
  handlePlaceBet,
  writeContractsIsPending,
  quoteLoading,
  enoughUSDC,
  numberBetAmount,
  quoteObject,
  quoteText,
  onLayout,
}) => {
  return (
    <View
      style={styles.conatiner}
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
          isLoading={writeContractsIsPending || (quoteLoading && !enoughUSDC)}
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
      </View>
    </View>
  );
};

export default BetTabBody;

const styles = StyleSheet.create({
  conatiner: {
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});
