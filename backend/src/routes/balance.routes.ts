import express from "express";
import { getWalletBalance } from "../controllers/balance.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/:address",
  protect,
  getWalletBalance
);

export default router;