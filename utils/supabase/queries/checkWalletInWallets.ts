import { useAccount } from "wagmi";
import { supabase } from "../supabase";
import { useQuery } from "@tanstack/react-query";

export const useCheckWalletInDatabase = () => {
  const { address } = useAccount();

  const checkWalletInDatabase = async () => {
    if (!address) return false;

    const { data, error } = await supabase
      .from("wallets")
      .select("wallet_address")
      .eq("wallet_address", address);

    if (error) {
      console.error("Error checking wallet in database:", error);
      throw error;
    }

    return data.length > 0;
  };

  return useQuery({
    queryKey: ["walletInDatabase", address],
    queryFn: checkWalletInDatabase,
    enabled: !!address,
  });
};
