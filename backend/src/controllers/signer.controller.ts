import { Request, Response } from "express";
import { ethers } from "ethers";

import Wallet from "../models/Wallet";
import { decrypt } from "../services/encryption.service";

export const testSigner = async (
  req: Request,
  res: Response
) => {
  try {
    const wallet =
      await Wallet.findOne({
        address:
          "0xb6f092F49699b117b7149c8a5C2767BB940d611E",
      });

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    const privateKey =
      decrypt(
        wallet.encryptedPrivateKey
      );

    const signer =
      new ethers.Wallet(
        privateKey
      );

    return res.json({
      success: true,
      address:
        signer.address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Signer creation failed",
    });
  }
};