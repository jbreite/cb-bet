import { ZERION_API_BASE_URL } from "@/constants/Constants";

interface GetFungiblesParams {
  address: string;
  filter?: {
    positions?: "only_simple" | "only_complex" | "no_filter";
    position_types?: string[] | null;
    chain_ids?: string[];
    fungible_ids?: string[];
    dapp_ids?: string[];
    trash?: "only_non_trash" | "only_trash" | "all";
  };
  currency?: string;
  sort?: string;
}

const API_KEY = process.env.EXPO_PUBLIC_ZERION_API_KEY!;

export const getFungibles = async ({
  address,
  filter = { positions: "only_simple", trash: "only_non_trash" },
  currency = "usd",
  sort = "value",
}: GetFungiblesParams) => {
  const queryParams = new URLSearchParams();

  queryParams.append("currency", currency);
  queryParams.append("sort", sort);

  if (filter.positions)
    queryParams.append("filter[positions]", filter.positions);
  if (filter.position_types)
    queryParams.append(
      "filter[position_types]",
      filter.position_types.join(",")
    );
  if (filter.chain_ids)
    queryParams.append("filter[chain_ids]", filter.chain_ids.join(","));
  if (filter.fungible_ids)
    queryParams.append("filter[fungible_ids]", filter.fungible_ids.join(","));
  if (filter.dapp_ids)
    queryParams.append("filter[dapp_ids]", filter.dapp_ids.join(","));
  if (filter.trash) queryParams.append("filter[trash]", filter.trash);

  const url = `${ZERION_API_BASE_URL}/wallets/${address}/positions/?${queryParams.toString()}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${btoa(`${API_KEY}:`)}`,
    },
  };

  // Log headers without sensitive information
  console.log("Request headers:", {
    options,
  });
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    //Not typed right
    console.error("Error fetching fungibles:", error);
    throw new Error(`Failed to fetch fungibles: ${error.message}`);
  }
};
