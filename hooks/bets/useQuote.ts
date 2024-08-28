import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/utils/overtime/queries/getQuote";
import { TradeData } from "@/utils/overtime/types/markets";

export const useQuote = (betAmount: string, tradeDataArray: TradeData[]) => {
  const numberBetAmount = parseFloat(betAmount.slice(1));

  return useQuery({
    queryKey: ["quoteData", betAmount, tradeDataArray],
    queryFn: () =>
      getQuote({
        buyInAmount: numberBetAmount,
        tradeData: tradeDataArray,
      }),

    enabled:
      !isNaN(numberBetAmount) &&
      numberBetAmount > 0 &&
      tradeDataArray.length > 0,
  });
};
