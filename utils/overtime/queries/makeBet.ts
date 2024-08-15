import { ethers } from "ethers";
import { provider as coinbaseProvider } from "@/cbConfig";
import sportsAMMV2Contract from "@/constants/overtimeContracts";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/constants/Constants";

// Create an ethers.js provider from the Coinbase Wallet SDK provider
const provider = new ethers.BrowserProvider(coinbaseProvider);

async function setupContract() {
  const network = await provider.getNetwork();
  const contractAddress =
    sportsAMMV2Contract.addresses[CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM];
  return new ethers.Contract(
    contractAddress,
    sportsAMMV2Contract.abi,
    provider
  );
}

export async function executeBet(quoteData: any, buyInAmount: string) {
  try {
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log("signer", signer);
    const sportsAMM = await setupContract();

    const parsedBuyInAmount = ethers.parseUnits(buyInAmount, 18);
    const parsedTotalQuote = ethers.parseEther(
      quoteData.quoteData.totalQuote.normalizedImplied.toString()
    );
    const parsedSlippage = ethers.parseEther("0.02");

    const REFERRAL_ADDRESS = "0x0000000000000000000000000000000000000000";
    const COLLATERAL_ADDRESS = "0x217D47011b23BB961eB6D93cA9945B7501a5BB11";

    const tradeData = getTradeData(quoteData.quoteTradeData);

    // Get the current gas price
    const feeData = await provider.getFeeData();

    // Use a small increment over the current maxPriorityFeePerGas
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas
      ? feeData.maxPriorityFeePerGas + ethers.parseUnits("1", "gwei")
      : ethers.parseUnits("1", "gwei");

    const tx = await sportsAMM
      .connect(signer)
      .trade(
        tradeData,
        parsedBuyInAmount,
        parsedTotalQuote,
        parsedSlippage,
        REFERRAL_ADDRESS,
        COLLATERAL_ADDRESS,
        false,
        {
          type: 2,
          maxPriorityFeePerGas,
        }
      );

    console.log("Transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Failed to execute bet:", error);
    throw error;
  }
}

function getTradeData(quoteTradeData: any[]) {
  return quoteTradeData.map((data) => ({
    ...data,
    line: data.line * 100,
    odds: data.odds.map((odd: string) => ethers.parseEther(odd).toString()),
    combinedPositions: data.combinedPositions.map((combinedPositions: any[]) =>
      combinedPositions.map((combinedPosition) => ({
        typeId: combinedPosition.typeId,
        position: combinedPosition.position,
        line: combinedPosition.line * 100,
      }))
    ),
  }));
}
