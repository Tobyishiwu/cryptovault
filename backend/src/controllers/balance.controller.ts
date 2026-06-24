import { Request, Response } from "express";
import { getEthBalance } from "../services/alchemy.service";

export const getWalletBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const { address } = req.params;

    const balance =
      await getEthBalance(address);

    return res.json({
      address,
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