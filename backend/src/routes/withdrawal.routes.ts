import express from "express";

import {
  estimateWithdrawal,
  sendWithdrawal,
} from "../controllers/withdrawal.controller";

import {
  protect,
} from "../middleware/auth.middleware";

const router =
  express.Router();

router.post(
  "/estimate",
  protect,
  estimateWithdrawal
);

router.post(
  "/send",
  protect,
  sendWithdrawal
);

export default router;