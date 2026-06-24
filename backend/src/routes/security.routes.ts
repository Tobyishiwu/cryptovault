import express from "express";

import {
  testWalletSecurity,
} from "../controllers/security.controller";

const router =
  express.Router();

router.get(
  "/decrypt-test",
  testWalletSecurity
);

export default router;