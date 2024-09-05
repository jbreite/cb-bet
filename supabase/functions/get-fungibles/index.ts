import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ZERION_API_BASE_URL = "https://api.zerion.io/v1";

serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");
    if (!address) {
      throw new Error("Address is required");
    }

    const queryParams = new URLSearchParams();

    // Add all possible query parameters
    const params = [
      "currency",
      "sort",
      "filter[positions]",
      "filter[trash]",
      "filter[position_types]",
      "filter[chain_ids]",
      "filter[fungible_ids]",
      "filter[dapp_ids]",
    ];

    params.forEach((param) => {
      const value = url.searchParams.get(param);
      if (value) queryParams.append(param, value);
    });

    // Set defaults if not provided
    if (!queryParams.has("currency")) queryParams.set("currency", "usd");
    if (!queryParams.has("sort")) queryParams.set("sort", "value");
    if (!queryParams.has("filter[positions]"))
      queryParams.set("filter[positions]", "only_simple");
    if (!queryParams.has("filter[trash]"))
      queryParams.set("filter[trash]", "only_non_trash");

    const API_KEY = Deno.env.get("ZERION_API_KEY");
    if (!API_KEY) {
      throw new Error("ZERION_API_KEY is not set");
    }

    const apiUrl = `${ZERION_API_BASE_URL}/wallets/${address}/positions/?${queryParams}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Response status:", response.status);
      console.error("Response text:", await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
