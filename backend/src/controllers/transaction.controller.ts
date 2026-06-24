import { Response } from "express";

import Transaction from "../models/Transaction";

import { AuthRequest } from "../middleware/auth.middleware";

export const getTransactions =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const transactions =
        await Transaction.find({
          userId: req.userId,
        })
          .sort({
            createdAt: -1,
          });

      return res.json(
        transactions
      );
    } catch (error) {
      return res.status(500).json({
        message:
          "Failed to fetch transactions",
      });
    }
  };