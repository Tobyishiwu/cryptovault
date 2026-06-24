import express from "express";

import { protect } from "../middleware/auth.middleware";

import {
  syncTransactions,
} from "../controllers/sync.controller";

const router =
  express.Router();

router.post(
  "/",
  protect,
  syncTransactions
);

export default router;