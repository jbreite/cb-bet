import sportsAMMV2Contract, {
  DEFAULT_USDC_OPTIMISM,
} from "@/constants/overtimeContracts";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ERC_20_ABI } from "@/utils/overtime/abi/ERC20_ABI";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";

//1. Read that if there is approval to spend USDC.

//2. If there is not an approval then useWriteContracts to approve and send Bet

//3. If there is an approval then useWriteContract to send Bet

export const useReadAllowance = () => {
  const { address } = useAccount();

  console.log("address", address);

  //1. Read that if there is approval to spend USDC.
  const {
    data: allowance,
    refetch,
    error: allowanceError,
  } = useReadContract({
    address: DEFAULT_USDC_OPTIMISM,
    abi: ERC_20_ABI,
    functionName: "allowance",
    args: [
      address,
      sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
    ],
  });

  const allowanceBigInt = allowance as bigint;
  console.log("allowanceBigInt", allowanceBigInt);

  return {
    allowance: allowanceBigInt,
    refetch,
    allowanceError,
  };
};

//2. If there is not an approval then useWriteContracts to approve and send Bet

// const handleApproval = async () => {
//     const {
//       writeContract,
//       data: transactionData,
//       error: writeError,
//       isPending: writePending,
//     } = useWriteContract();

//     // Parse the buyInAmount from the quoteObject
//     const buyInAmount = parseUnits(
//       quoteObject.quoteData.buyInAmountInUsd.toString(),
//       6
//     );

//     writeContract({
//       abi: ERC_20_ABI,
//       address: USDC_ADDRESS,
//       functionName: "approve",
//       args: [
//         sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
//         BUY_IN_AMOUNT,
//       ],
//     });
//   };
