const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_FUNCTION_URL = `${supabaseUrl}/functions/v1/get-fungibles`;

export const fetchFungibles = async (address: string, filters = {}) => {
  const queryParams = new URLSearchParams({
    address,
    currency: "usd",
    sort: "value",
    "filter[positions]": "only_simple",
    "filter[trash]": "only_non_trash",
    ...filters,
  });

  const response = await fetch(`${SUPABASE_FUNCTION_URL}?${queryParams}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
