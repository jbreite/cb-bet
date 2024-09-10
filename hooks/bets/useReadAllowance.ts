import sportsAMMV2Contract, {
  DEFAULT_USDC_OPTIMISM,
} from "@/constants/overtimeContracts";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ERC_20_ABI } from "@/utils/overtime/abi/ERC20_ABI";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";

export const useReadAllowance = () => {
  const { address } = useAccount();

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

  console.log("Allowance:", allowance?.toString())

  const allowanceBigInt = allowance as bigint;
  // console.log("allowanceBigInt", allowanceBigInt);

  return {
    allowance: allowanceBigInt,
    refetch,
    allowanceError,
  };
};
