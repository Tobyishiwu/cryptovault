import express from "express";

import {
  testSigner,
} from "../controllers/signer.controller";

const router =
  express.Router();

router.get(
  "/test",
  testSigner
);

export default router;