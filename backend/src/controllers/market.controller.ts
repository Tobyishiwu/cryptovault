import { Request, Response } from "express";

import {
  getEthereumPrice,
} from "../services/market.service";

export const getEthPrice =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const price =
        await getEthereumPrice();

      return res.json({
        success: true,
        symbol: "ETH",
        currency: "USD",
        price,
      });
    } catch (error) {
      console.error(
        "MARKET ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch ETH price",
      });
    }
  };