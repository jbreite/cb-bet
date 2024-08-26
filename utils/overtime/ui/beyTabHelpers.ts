import { UserBet } from "@/lib/atom/atoms";

function convertNormalizedImpliedToAmerican(
  normalizedImpliedOdds: number
): number {
  // Step 1: Convert normalized implied odds to probability
  const probability = normalizedImpliedOdds;

  // Step 2: Convert probability to decimal odds
  const decimalOdds = 1 / probability;

  // Step 3: Convert decimal odds to American odds
  let americanOdds: number;
  if (decimalOdds >= 2) {
    americanOdds = (decimalOdds - 1) * 100;
  } else {
    americanOdds = -100 / (decimalOdds - 1);
  }

  // Round to nearest whole number
  return Math.round(americanOdds);
}

export function extractAmericanOddsFromBets(bets: UserBet[]): number {
  if (bets.length === 1) {
    // Single bet
    const position = bets[0].tradeData.position;
    const normalizedImpliedOdds = parseFloat(bets[0].tradeData.odds[position]);
    return convertNormalizedImpliedToAmerican(normalizedImpliedOdds);
  } else {
    // Parlay
    let totalProbability = 1;
    for (const bet of bets) {
      const normalizedImpliedOdds = parseFloat(
        bet.tradeData.odds[bet.tradeData.position]
      );
      totalProbability *= normalizedImpliedOdds;
    }
    // Convert combined probability to American odds
    return convertNormalizedImpliedToAmerican(totalProbability);
  }
}

export function calculateBetOutcome(americanOdds: number, betAmount: number) {
  let totalReturn: number;

  if (americanOdds > 0) {
    // For positive odds (e.g., +150)
    totalReturn = betAmount + (betAmount * americanOdds) / 100;
  } else {
    // For negative odds (e.g., -200)
    totalReturn = betAmount + (betAmount * 100) / Math.abs(americanOdds);
  }

  const profit = totalReturn - betAmount;

  // Round to two decimal places
  totalReturn = Math.round(totalReturn * 100) / 100;
  const roundedProfit = Math.round(profit * 100) / 100;

  return {
    totalReturn: totalReturn,
    profit: roundedProfit,
  };
}

export function formatAmericanOdds(americanOdds: number) {
  const roundedOdds = americanOdds.toFixed(0);
  return americanOdds > 0 ? `+${roundedOdds}` : `${roundedOdds}`;
}

export function formatCurrency({
  amount,
  decimalPlaces = 2,
  omitDecimalsForWholeNumbers = false,
}: {
  amount: number;
  decimalPlaces?: number;
  omitDecimalsForWholeNumbers?: boolean;
}): string {
  // Check if the number is whole and the flag is set
  const isWholeNumber = Number.isInteger(amount) && omitDecimalsForWholeNumbers;

  const formattedValue = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWholeNumber ? 0 : decimalPlaces,
    maximumFractionDigits: isWholeNumber ? 0 : decimalPlaces,
  });

  return formattedValue;
}

export function extractFailureReason(logText: string): string {
  const startPhrase = "reason:";
  const endPhrase = "Contract Call:";

  const startIndex = logText.indexOf(startPhrase);
  if (startIndex === -1) {
    return "Reason not found in the log.";
  }

  const reasonStartIndex = startIndex + startPhrase.length;
  const endIndex = logText.indexOf(endPhrase, reasonStartIndex);

  if (endIndex === -1) {
    return logText.slice(reasonStartIndex).trim();
  }

  return logText.slice(reasonStartIndex, endIndex).trim();
}
