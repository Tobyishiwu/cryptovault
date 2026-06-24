import { Alchemy, Network } from "alchemy-sdk";

import Transaction from "../models/Transaction";
import Wallet from "../models/Wallet";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

export const syncBlockchainTransactions =
  async (
    walletId: string,
    userId: string,
    walletAddress: string
  ) => {

    let createdCount = 0;

    /*
    |--------------------------------------------------------------------------
    | Incoming Transfers (Deposits)
    |--------------------------------------------------------------------------
    */

    const incoming =
      await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: walletAddress,
        category: [
          "external",
          "internal"
        ],
        withMetadata: true,
      });

    /*
    |--------------------------------------------------------------------------
    | Outgoing Transfers (Withdrawals)
    |--------------------------------------------------------------------------
    */

    const outgoing =
      await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: walletAddress,
        category: [
          "external",
          "internal"
        ],
        withMetadata: true,
      });

    const transfers = [
      ...incoming.transfers,
      ...outgoing.transfers,
    ];

    for (const tx of transfers) {

      const existing =
        await Transaction.findOne({
          txHash: tx.hash,
          userId,
        });

      if (existing) {
        continue;
      }

      const isDeposit =
        tx.to?.toLowerCase() ===
        walletAddress.toLowerCase();

      await Transaction.create({
        userId,
        walletId,

        chain: "ETH",

        txHash: tx.hash,

        type: isDeposit
          ? "deposit"
          : "withdrawal",

        amount:
          tx.value?.toString() ||
          "0",

        status: "confirmed",

        fromAddress:
          tx.from || "",

        toAddress:
          tx.to || "",

        blockNumber:
          tx.blockNum
            ? parseInt(
                tx.blockNum,
                16
              )
            : 0,
      });

      createdCount++;
    }

    return {
      createdCount,
      totalTransfers:
        transfers.length,
    };
  };