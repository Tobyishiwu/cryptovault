import express from "express";

import {
  getMyWallets,
  getPrimaryWallet,
  syncWallet,
} from "../controllers/wallet.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/",
  protect,
  getMyWallets
);

router.get(
  "/primary",
  protect,
  getPrimaryWallet
);

router.post(
  "/sync",
  protect,
  syncWallet
);

export default router;