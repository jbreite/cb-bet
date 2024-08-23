import { KeyboardButtonItemType } from ".";

export function handleBetAmountChange(
  currentAmount: string,
  action: KeyboardButtonItemType
): string {
  // Ensure the amount always starts with a '$'
  let amount = currentAmount.startsWith("$")
    ? currentAmount
    : "$" + currentAmount;

  if (typeof action === "number" || action === ".") {
    // Handle number or decimal input
    // Prevent more than 2 decimal places
    if (amount.includes(".") && amount.split(".")[1].length >= 2) {
      return amount;
    }
    // Prevent multiple decimal points
    if (action === "." && amount.includes(".")) {
      return amount;
    }
    // Limit to a reasonable maximum length (e.g., 10 characters including $)
    if (amount.length >= 10) {
      return amount;
    }
    // If it's just '$0', replace the 0 with the new number
    if (amount === "$0" && typeof action === "number") {
      return "$" + action;
    }
    return amount + action;
  } else if (action === "backspace") {
    // Handle backspace
    // If there's only '$' or '$0' left, return '$0'
    if (amount.length <= 2) {
      return "$0";
    }
    return amount.slice(0, -1);
  }

  // If action is not recognized, return the current amount unchanged
  return amount;
}
