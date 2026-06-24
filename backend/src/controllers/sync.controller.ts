import { Response } from "express";

import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";

import { AuthRequest } from "../middleware/auth.middleware";

import { getTransfers } from "../services/transfer.service";
import { getEthBalance } from "../services/alchemy.service";

export const syncTransactions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const wallet = await Wallet.findOne({
      userId: req.userId,
      chain: "ETH",
    });

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    const transfers = await getTransfers(
      wallet.address
    );

    const savedTransactions = [];

    for (const transfer of transfers) {
      const existingTransaction =
        await Transaction.findOne({
          txHash: transfer.hash,
        });

      if (!existingTransaction) {
        const transaction =
          await Transaction.create({
            userId: req.userId,

            walletId: wallet._id,

            chain: "ETH",

            txHash: transfer.hash,

            type: "deposit",

            amount:
              transfer.value?.toString() ||
              "0",

            status: "confirmed",

            fromAddress:
              transfer.from,

            toAddress:
              transfer.to,

            blockNumber: parseInt(
              transfer.blockNum,
              16
            ),
          });

        savedTransactions.push(
          transaction
        );
      }
    }

    // Update wallet balance from blockchain
    const liveBalance =
      await getEthBalance(
        wallet.address
      );

    wallet.balance =
      parseFloat(liveBalance);

    await wallet.save();

    return res.json({
      success: true,

      wallet: {
        address:
          wallet.address,
        balance:
          wallet.balance,
      },

      discovered:
        transfers.length,

      saved:
        savedTransactions.length,

      transactions:
        savedTransactions,
    });
  } catch (error) {
    console.error(
      "SYNC ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Transaction sync failed",
    });
  }
};