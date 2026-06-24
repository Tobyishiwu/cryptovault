import {
  Alchemy,
  Network,
} from "alchemy-sdk";

import Transaction from "../models/Transaction";

const alchemy =
  new Alchemy({
    apiKey:
      process.env.ALCHEMY_API_KEY,
    network:
      Network.ETH_SEPOLIA,
  });

export const syncBlockchainTransactions =
  async (
    walletId: string,
    userId: string,
    walletAddress: string
  ) => {

    let createdCount = 0;

    try {

      const transfers =
        await alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          toAddress:
            walletAddress,
          category: [
            "erc20",
          ] as any,
          withMetadata: true,
        });

      for (
        const tx of transfers.transfers
      ) {

        const existing =
          await Transaction.findOne({
            txHash: tx.hash,
            userId,
          });

        if (existing) {
          continue;
        }

        await Transaction.create({
          userId,
          walletId,

          chain: "ETH",

          txHash:
            tx.hash,

          type:
            "deposit",

          amount:
            tx.value?.toString() ||
            "0",

          status:
            "confirmed",

          fromAddress:
            tx.from || "",

          toAddress:
            tx.to || "",

          blockNumber: 0,
        });

        createdCount++;
      }

      return {
        createdCount,
        totalTransfers:
          transfers.transfers.length,
      };

    } catch (error) {

      console.error(
        "BLOCKCHAIN SYNC ERROR:",
        error
      );

      return {
        createdCount: 0,
        totalTransfers: 0,
      };
    }
  };