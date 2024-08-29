import { QuoteData } from "@/utils/overtime/queries/getQuote";
import { useReadAllowance } from "./useReadAllowance";
import { TradeData } from "@/utils/overtime/types/markets";
import { parseEther, parseUnits } from "viem";
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

//Ecample Parlay Transaction - https://optimistic.etherscan.io/tx/0x1d70dd8b569ca187661dcf60c5b4b1fc129b81093990611aaf6e70a048784327

export const usePlaceBetBetter = () => {
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
  } = useWriteContracts();

  const { data: callsStatus } = useCallsStatus({
    id: writeContractsData as string,
    query: {
      enabled: !!writeContractsData,
      refetchInterval: (data) =>
        data.state.data?.status === "CONFIRMED" ? false : 1000,
    },
  });

  const placeBet = (
    quoteObject: QuoteData,
    tradeData: TradeData[],
    onSuccess?: () => void
  ) => {
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

    const approvalContractInput = {
      abi: ERC_20_ABI,
      address: DEFAULT_USDC_OPTIMISM,
      functionName: "approve",
      args: [
        sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM],
        buyInAmount,
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
    console.log("writeContracts payload:", JSON.stringify(betContractInput, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    if (!allowance) {
      console.log("No allowance... could just be undefined");
    }

    let contracts = [];
    if (buyInAmount > allowance) {
      contracts = [approvalContractInput, betContractInput];
    } else {
      contracts = [betContractInput];
    }

    writeContracts({
      //TODO: Clean up these types
      contracts: contracts,
      onSuccess: () => {
        if (onSuccess) {
          console.log("Calling provided onSuccess callback");
          onSuccess();
        }
      },
      onError: (error: any) => {
        console.error("writeContracts error:", error);
      },
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
