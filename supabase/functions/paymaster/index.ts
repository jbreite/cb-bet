import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, http } from "npm:viem";
import { optimism } from "npm:viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "npm:permissionless@0.1.29";
import { paymasterActionsEip7677 } from "npm:permissionless@0.1.29/experimental";

import { willSponsor } from "./_utils/utils.ts";

console.log("Hello from Paymaster!");

const PIMLICO_API_KEY = Deno.env.get("PIMLICO_API_KEY");

const paymasterService = `https://api.pimlico.io/v2/10/rpc?apikey=${PIMLICO_API_KEY}`;

const paymasterClient = createClient({
  chain: optimism,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));

serve(async (req: Request) => {
  try {
    console.log("Received request");
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));

    const { method, params } = body;
    console.log("Method:", method);
    console.log("Params:", JSON.stringify(params));

    const [userOp, entrypoint, chainId] = params;

    console.log("UserOp:", JSON.stringify(userOp));
    console.log("Entrypoint:", entrypoint);
    console.log("ChainId:", chainId);

    const sponsorable = await willSponsor({ chainId, entrypoint, userOp });
    console.log("Sponsorable:", sponsorable);

    if (!sponsorable) {
      console.log("Not a sponsorable operation");
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
      console.log("Method not found:", method);
      return new Response(JSON.stringify({ error: "Method not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Result:", JSON.stringify(result));
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in request:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
