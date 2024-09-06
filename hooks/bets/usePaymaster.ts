import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const PAYMASTER_FUNCTION_URL = `${supabaseUrl}/functions/v1/paymaster`;

export const usePaymaster = () => {
  const account = useAccount();

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: PAYMASTER_FUNCTION_URL,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  return capabilities;
};
