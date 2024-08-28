import { useQuery } from "@tanstack/react-query";
import { getFungibles } from "@/utils/zerion/queries/getFungibles";
import { useAccount } from "wagmi";
import { DEFAULT_USDC_OPTIMISM } from "@/constants/overtimeContracts";
import { useMemo } from "react";

export const useUSDCBal = () => {
  const { address } = useAccount();

  if (!address) {
    return { balance: null, isLoading: false, isError: false };
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fungibles", address],
    queryFn: () =>
      getFungibles({
        address,
        filter: {},
      }),
    enabled: !!address,
  });

  const balance = useMemo(() => {
    return data?.data?.reduce((acc: any, position: any) => {
      const isOptimismUSDC =
        position.attributes.fungible_info.implementations.some(
          (implementation: any) =>
            implementation.chain_id === "optimism" &&
            implementation.address?.toLowerCase() ===
              DEFAULT_USDC_OPTIMISM.toLowerCase()
        );

      if (isOptimismUSDC) {
        return {
          quantity: position.attributes.quantity,
          value: position.attributes.value,
          price: position.attributes.price,
        };
      }
      return acc;
    }, null);
  }, [data]);

  return { balance, isLoading, isError };
};
