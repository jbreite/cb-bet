import { QuoteData } from "@/utils/overtime/queries/getQuote";
import { useReadAllowance } from "./useReadAllowance";
import { TradeData } from "@/utils/overtime/types/markets";
import { encodeFunctionData, parseEther, parseUnits } from "viem";
import sportsAMMV2Contract, {
  DEFAULT_SLIPPAGE,
  DEFAULT_USDC_OPTIMISM,
} from "@/constants/overtimeContracts";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  REFERRAL_ADDRESS,
} from "@/constants/Constants";
import { getTradeData } from "@/utils/overtime/ui/helpers";
import { ERC_20_ABI } from "@/utils/overtime/abi/ERC20_ABI";
import { useWriteContracts, useCallsStatus } from "wagmi/experimental";
import { usePaymaster } from "./usePaymaster";

export const usePlaceBet = (onSuccess?: () => void) => {
  const capabilities = usePaymaster();

  const {
    allowance,
    refetch: refetchAllowance,
    allowanceError,
  } = useReadAllowance();

  const {
    writeContracts,
    data: writeContractsData,
    isPending: writeContractsIsPending,
    isError: writeContractsIsError,
  } = useWriteContracts({
    mutation: {
      onSuccess: () => {
        console.log("Bet placed successfully!");
        if (onSuccess) {
          console.log("Calling provided onSuccess callback");
          onSuccess();
        }
        // ... other logic here for success or error
      },
    },
  });

  const { data: callsStatus } = useCallsStatus({
    id: writeContractsData as string,
    query: {
      enabled: !!writeContractsData,
      refetchInterval: (data) =>
        data.state.data?.status === "CONFIRMED" ? false : 1000,
    },
  });

  const placeBet = async (quoteObject: QuoteData, tradeData: TradeData[]) => {
    if ("error" in quoteObject.quoteData) {
      throw new Error("Got an error quote Object");
    }

    console.log("tradeData", tradeData);

    const parsedTotalQuote = parseEther(
      quoteObject.quoteData.totalQuote.normalizedImplied.toString()
    );
    const parsedSlippage = DEFAULT_SLIPPAGE;
    const preparedTradeData = getTradeData(tradeData);

    const buyInAmount = parseUnits(
      quoteObject.quoteData.buyInAmountInUsd.toString(),
      6
    );

    const approvalAmount = buyInAmount;
    //Just do actual amount since gets taken away anyway from contract

    const approvalContractInput = {
      abi: ERC_20_ABI,
      address: DEFAULT_USDC_OPTIMISM,
      functionName: "approve",
      args: [
        sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
        approvalAmount,
      ],
    };

    const betContractInput = {
      abi: sportsAMMV2Contract.abi,
      address: sportsAMMV2Contract.addresses[
        CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
      ] as `0x${string}`,
      functionName: "trade",
      args: [
        preparedTradeData,
        buyInAmount,
        parsedTotalQuote,
        parsedSlippage,
        REFERRAL_ADDRESS,
        DEFAULT_USDC_OPTIMISM,
        false,
      ],
    };

    const betCalldata = encodeFunctionData(betContractInput);
    console.log("Bet call Data", betCalldata);

    if (!allowance) {
      console.log("No allowance... could just be undefined");
    }

    let contracts = [];
    if (buyInAmount > allowance) {
      console.log("hello");
      contracts = [approvalContractInput, betContractInput];
    } else {
      contracts = [betContractInput];
    }

    writeContracts({
      contracts: contracts,
      capabilities,
    });
  };

  return {
    placeBet,
    allowance,
    refetchAllowance,
    allowanceError,
    callsStatus,
    writeContractsIsPending,
    writeContractsIsError,
  };
};
