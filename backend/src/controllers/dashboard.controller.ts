import { Response } from "express";
import { ethers } from "ethers";

import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

const provider =
  new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );

export const getDashboard =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const wallets =
        await Wallet.find({
          userId: req.userId,
        });

      const transactions =
        await Transaction.find({
          userId: req.userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      let totalBalance = 0;

      for (const wallet of wallets) {
        if (
          wallet.chain === "ETH"
        ) {
          try {
            const balanceWei =
              await provider.getBalance(
                wallet.address
              );

            const liveBalance =
              Number(
                ethers.formatEther(
                  balanceWei
                )
              );

            totalBalance +=
              liveBalance;

            wallet.balance =
              liveBalance;

            await wallet.save();
          } catch (
            balanceError
          ) {
            console.error(
              "Balance sync error:",
              wallet.address,
              balanceError
            );
          }
        }
      }

      return res.json({
        totalBalance,

        walletCount:
          wallets.length,

        transactionCount:
          await Transaction.countDocuments(
            {
              userId:
                req.userId,
            }
          ),

        recentTransactions:
          transactions,
      });
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load dashboard",
      });
    }
  };