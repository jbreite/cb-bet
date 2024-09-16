import {
  ENTRYPOINT_ADDRESS_V06,
  UserOperation,
} from "npm:permissionless@0.1.29";
import {
  Address,
  BlockTag,
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
} from "npm:viem";
import { optimism } from "npm:viem/chains";

import {
  coinbaseSmartWalletABI,
  coinbaseSmartWalletFactoryAddress,
  coinbaseSmartWalletProxyBytecode,
  coinbaseSmartWalletV1Implementation,
  erc1967ProxyImplementationSlot,
  magicSpendAddress,
} from "./paymasterConstants.ts";
import { client } from "./config.ts";
import sportsAMMV2Contract, {
  DEFAULT_USDC_OPTIMISM,
} from "./tempOvertimeConstants.ts";

export async function willSponsor({
  chainId,
  entrypoint,
  userOp,
}: {
  chainId: number;
  entrypoint: string;
  userOp: UserOperation<"0.6">;
}) {
  console.log(
    "willSponsor called with chainId:",
    chainId,
    "entrypoint:",
    entrypoint
  );

  // check chain id
  // if (chainId !== optimism.id) {
  //   console.log("Chain ID mismatch. Expected:", optimism.id, "Got:", chainId);
  //   return false;
  // }
  // check entrypoint
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase()) {
    console.log(
      "Entrypoint mismatch. Expected:",
      ENTRYPOINT_ADDRESS_V06.toLowerCase(),
      "Got:",
      entrypoint.toLowerCase()
    );
    return false;
  }

  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await client.getBytecode({ address: userOp.sender });
    console.log("Bytecode for sender:", code ? "Present" : "Not present");

    if (!code) {
      // no code at address, check that the initCode is deploying a Coinbase Smart Wallet
      if (!userOp.initCode) {
        console.log("No initCode provided");
        return false;
      }

      // factory address is first 20 bytes of initCode after '0x'
      const factoryAddress = userOp.initCode.slice(0, 42);
      console.log("Factory address:", factoryAddress);
      if (
        factoryAddress.toLowerCase() !==
        coinbaseSmartWalletFactoryAddress.toLowerCase()
      ) {
        console.log(
          "Factory address mismatch. Expected:",
          coinbaseSmartWalletFactoryAddress.toLowerCase(),
          "Got:",
          factoryAddress.toLowerCase()
        );
        return false;
      }
    } else {
      // code at address, check that it is a proxy to the expected implementation
      if (code != coinbaseSmartWalletProxyBytecode) {
        console.log("Proxy bytecode mismatch");
        return false;
      }

      // check that userOp.sender proxies to expected implementation
      const implementation = await client.request<{
        Parameters: [Address, Hex, BlockTag];
        ReturnType: Hex;
      }>({
        method: "eth_getStorageAt",
        params: [userOp.sender, erc1967ProxyImplementationSlot, "latest"],
      });
      const implementationAddress = decodeAbiParameters(
        [{ type: "address" }],
        implementation
      )[0];
      console.log("Implementation address:", implementationAddress);
      if (implementationAddress != coinbaseSmartWalletV1Implementation) {
        console.log(
          "Implementation address mismatch. Expected:",
          coinbaseSmartWalletV1Implementation,
          "Got:",
          implementationAddress
        );
        return false;
      }
    }

    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });
    console.log("Decoded calldata function name:", calldata.functionName);

    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== "executeBatch") {
      console.log("Function name is not executeBatch");
      return false;
    }
    if (!calldata.args || calldata.args.length == 0) {
      console.log("No args in calldata");
      return false;
    }

    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
      r;
    }[];
    console.log("Number of calls:", calls.length);

    // Allow batch calls of any length, but ensure there's at least one call
    if (calls.length === 0) {
      console.log("No calls in batch");
      return false;
    }

    let callToCheckIndex = 0;
    // if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
    //   if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase()) {
    //     console.log(
    //       "First call is not to magic spend address. Expected:",
    //       magicSpendAddress.toLowerCase(),
    //       "Got:",
    //       calls[0].target.toLowerCase()
    //     );
    //     return false;
    //   }
    //   callToCheckIndex = 1;
    // }
    for (const call of calls) {
      const isValidSportsAMMCall = call.target.toLowerCase() === sportsAMMV2Contract.addresses[10].toLowerCase();
      const isValidUSDCCall = call.target.toLowerCase() === DEFAULT_USDC_OPTIMISM.toLowerCase();
      
      if (!isValidSportsAMMCall && !isValidUSDCCall) {
        console.log("Invalid target address:", call.target.toLowerCase());
        return false;
      }

      if (isValidSportsAMMCall) {
        const innerCalldata = decodeFunctionData({
          abi: sportsAMMV2Contract.abi,
          data: call.data,
        });
        
        if (
          innerCalldata.functionName !== "trade" &&
          innerCalldata.functionName !== "exerciseTicket" &&
          innerCalldata.functionName !== "approve"
        ) {
          console.log("Invalid function name for SportsAMM:", innerCalldata.functionName);
          return false;
        }
      }
    }

    console.log("All calls in batch are valid");

    return true;
  } catch (e) {
    console.error(`willSponsor check failed: ${e}`);
    return false;
  }
}
