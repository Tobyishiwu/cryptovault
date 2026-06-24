import { Response } from "express";
import { syncWalletBalance } from "../services/walletSync.service";
import Wallet from "../models/Wallet";
import {
  syncBlockchainTransactions,
} from "../services/blockchainSync.service";
import {
  AuthRequest,
} from "../middleware/auth.middleware";

export const getMyWallets = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const wallets = await Wallet.find(
      { userId: req.userId },
      {
        encryptedPrivateKey: 0,
        __v: 0,
      }
    );

    return res.json(wallets);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch wallets",
    });
  }
};

export const getPrimaryWallet =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const wallet =
        await Wallet.findOne(
          {
            userId: req.userId,
            chain: "ETH",
          },
          {
            encryptedPrivateKey: 0,
            __v: 0,
          }
        );

      if (!wallet) {
        return res.status(404).json({
          message:
            "Wallet not found",
        });
      }

      return res.json(wallet);
    } catch (error) {
      return res.status(500).json({
        message:
          "Failed to fetch wallet",
      });
    }
  };
export const syncWallet = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const wallet =
      await Wallet.findOne({
        userId: req.userId,
        chain: "ETH",
      });

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Sync Balance
    |--------------------------------------------------------------------------
    */

    const balance =
      await syncWalletBalance(
        wallet.address
      );

    wallet.balance = balance;

    wallet.lastSyncedAt =
      new Date();

    await wallet.save();

    /*
    |--------------------------------------------------------------------------
    | Sync Blockchain Transactions
    |--------------------------------------------------------------------------
    */

    const syncResult =
      await syncBlockchainTransactions(
        wallet._id.toString(),
        req.userId!,
        wallet.address
      );

    return res.json({
      success: true,

      balance,

      newTransactions:
        syncResult.createdCount,

      totalTransfersFound:
        syncResult.totalTransfers,

      lastSyncedAt:
        wallet.lastSyncedAt,
    });
  } catch (error) {
    console.error(
      "SYNC ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to sync wallet",
    });
  }
};
