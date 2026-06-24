import express from "express";

import {
  getMyWallets,
  getPrimaryWallet,
} from "../controllers/wallet.controller";

import { protect } from "../middleware/auth.middleware";
import {
  getMyWallets,
  getPrimaryWallet,
  syncWallet,
} from "../controllers/wallet.controller";

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