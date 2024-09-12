import { supabase } from "../supabase";
import { useAccount } from "wagmi";

export const createOrUpdateUser = async (
  backgroundColor: string,
  emoji: string
) => {
  const { address } = useAccount();

  if (!address) {
    throw new Error("No wallet address found");
  }

  const { data, error } = await supabase
    .from("wallets")
    .upsert(
      {
        wallet_address: address,
        emoji_background_color: backgroundColor,
        emoji: emoji,
      },
      {
        onConflict: "wallet_address",
      }
    )
    .select();

  if (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }

  return data;
};
