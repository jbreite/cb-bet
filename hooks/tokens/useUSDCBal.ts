import { useQuery } from "@tanstack/react-query";
import { getFungibles } from "@/utils/zerion/queries/getFungibles";
import { useAccount } from "wagmi";

export const useUSDCBal = () => {
  const { address } = useAccount();

  if (!address) {
    return {
      data: null,
      isLoading: false,
      isError: true,
    };
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

  return { data, isLoading, isError };
};
