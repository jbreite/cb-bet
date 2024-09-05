import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, http } from "npm:viem";
import { optimism } from "npm:viem/chains";
import { entryPoint06Address as ENTRYPOINT_ADDRESS_V06 } from "npm:viem/account-abstraction";
import { paymasterActionsEip7677 } from "npm:permissionless/experimental";

import { willSponsor } from "./_utils/utils.ts";

console.log("Hello from Functions!");

const PIMLICO_API_KEY = Deno.env.get("PIMLICO_API_KEY");

const paymasterService = `https://api.pimlico.io/v2/10/rpc?apikey=${PIMLICO_API_KEY}`;

const paymasterClient = createClient({
  chain: optimism,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));

serve(async (req: Request) => {
  try {
    const { method, params } = await req.json();
    const [userOp, entrypoint, chainId] = params;

    const sponsorable = await willSponsor({ chainId, entrypoint, userOp });
    if (!sponsorable) {
      return new Response(
        JSON.stringify({ error: "Not a sponsorable operation" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let result;
    if (method === "pm_getPaymasterStubData") {
      result = await paymasterClient.getPaymasterStubData({
        userOperation: userOp,
      });
    } else if (method === "pm_getPaymasterData") {
      result = await paymasterClient.getPaymasterData({
        userOperation: userOp,
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
