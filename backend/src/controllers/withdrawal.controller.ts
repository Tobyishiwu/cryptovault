
import { Request, Response } from "express";
import { ethers } from "ethers";

import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";

import { decrypt } from "../services/encryption.service";
import { estimateGasFee } from "../services/withdrawal.service";

import {
  isValidEthAddress,
  isValidAmount,
} from "../utils/validators";

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

export const estimateWithdrawal = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fromAddress,
      toAddress,
      amount,
    } = req.body;

    if (!isValidEthAddress(fromAddress)) {
      return res.status(400).json({
        message: "Invalid sender address",
      });
    }

    if (!isValidEthAddress(toAddress)) {
      return res.status(400).json({
        message: "Invalid destination address",
      });
    }

    if (!isValidAmount(amount)) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    if (
      fromAddress.toLowerCase() ===
      toAddress.toLowerCase()
    ) {
      return res.status(400).json({
        message:
          "Cannot send funds to the same wallet address",
      });
    }

    const estimatedGas =
      await estimateGasFee(
        fromAddress,
        toAddress,
        amount
      );

    return res.json({
      success: true,
      estimatedGas,
    });
  } catch (error) {
    console.error(
      "ESTIMATE ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to estimate gas",
    });
  }
};

export const sendWithdrawal = async (
  req: any,
  res: Response
) => {
  try {
    const {
      toAddress,
      amount,
    } = req.body;

    if (!isValidEthAddress(toAddress)) {
      return res.status(400).json({
        message:
          "Invalid destination address",
      });
    }

    if (!isValidAmount(amount)) {
      return res.status(400).json({
        message:
          "Invalid amount",
      });
    }

    const senderWallet =
      await Wallet.findOne({
        userId: req.userId,
        chain: "ETH",
      });

    if (!senderWallet) {
      return res.status(404).json({
        message:
          "Wallet not found",
      });
    }

    if (
      senderWallet.address.toLowerCase() ===
      toAddress.toLowerCase()
    ) {
      return res.status(400).json({
        message:
          "Cannot send funds to the same wallet address",
      });
    }

    const privateKey = decrypt(
      senderWallet.encryptedPrivateKey
    );

    const signer =
      new ethers.Wallet(
        privateKey,
        provider
      );

    const balanceWei =
      await provider.getBalance(
        senderWallet.address
      );

    const amountWei =
      ethers.parseEther(amount);

    const gasBuffer =
      ethers.parseEther("0.0001");

    if (
      balanceWei <
      amountWei + gasBuffer
    ) {
      return res.status(400).json({
        message:
          "Insufficient balance for amount and gas fees",
      });
    }

    const tx =
      await signer.sendTransaction({
        to: toAddress,
        value: amountWei,
      });

    const receipt =
      await tx.wait();

    const senderBalance =
      await provider.getBalance(
        senderWallet.address
      );

    senderWallet.balance = Number(
      ethers.formatEther(
        senderBalance
      )
    );

    await senderWallet.save();

    const withdrawalTransaction =
      await Transaction.create({
        userId: req.userId,
        walletId:
          senderWallet._id,

        chain: "ETH",

        txHash: tx.hash,

        type:
          "withdrawal",

        amount,

        status:
          "confirmed",

        fromAddress:
          senderWallet.address,

        toAddress,

        blockNumber:
          receipt?.blockNumber,
      });

    const receiverWallet =
      await Wallet.findOne({
        address: {
          $regex: new RegExp(
            `^${toAddress}$`,
            "i"
          ),
        },
        chain: "ETH",
      });

    if (receiverWallet) {
      const receiverBalance =
        await provider.getBalance(
          receiverWallet.address
        );

      receiverWallet.balance =
        Number(
          ethers.formatEther(
            receiverBalance
          )
        );

      await receiverWallet.save();

      await Transaction.create({
        userId:
          receiverWallet.userId,

        walletId:
          receiverWallet._id,

        chain: "ETH",

        txHash: tx.hash,

        type:
          "deposit",

        amount,

        status:
          "confirmed",

        fromAddress:
          senderWallet.address,

        toAddress:
          receiverWallet.address,

        blockNumber:
          receipt?.blockNumber,
      });
    }

    return res.json({
      success: true,

      hash: tx.hash,

      blockNumber:
        receipt?.blockNumber,

      balance:
        senderWallet.balance,

      transaction:
        withdrawalTransaction,
    });
  } catch (error) {
    console.error(
      "SEND ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Transfer failed",
    });
  }
};

