import { Request, Response } from "express";
import { getEthBalance } from "../services/alchemy.service";

export const getWalletBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const addressParam = req.params.address;

    if (
      !addressParam ||
      Array.isArray(addressParam)
    ) {
      return res.status(400).json({
        message: "Invalid wallet address",
      });
    }

    const balance =
      await getEthBalance(addressParam);

    return res.json({
      address: addressParam,
      balance,
      network: "sepolia",
    });

  } catch (error) {

    console.error(
      "BALANCE CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch balance",
    });

  }
};