import express from "express";

import {
  getEthPrice,
} from "../controllers/market.controller";

const router =
  express.Router();

router.get(
  "/eth",
  getEthPrice
);

export default router;