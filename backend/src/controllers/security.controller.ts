import { Request, Response } from "express";

import Wallet from "../models/Wallet";

import {
  decrypt,
} from "../services/encryption.service";

export const testWalletSecurity =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const wallet =
        await Wallet.findOne({
          chain: "ETH",
        });

      if (!wallet) {
        return res.status(404).json({
          message:
            "Wallet not found",
        });
      }

      const privateKey =
        decrypt(
          wallet.encryptedPrivateKey
        );

      return res.json({
        success: true,

        startsWith:
          privateKey.substring(
            0,
            10
          ),

        length:
          privateKey.length,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Decryption failed",
      });
    }
  };