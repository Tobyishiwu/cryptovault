import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./routes/wallet.routes";
import balanceRoutes from "./routes/balance.routes";
import transactionRoutes from "./routes/transaction.routes";
import syncRoutes from "./routes/sync.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import withdrawalRoutes from "./routes/withdrawal.routes";
import securityRoutes from "./routes/security.routes";
import authRoutes from "./routes/auth.routes";
import signerRoutes from "./routes/signer.routes";
import marketRoutes from "./routes/market.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "CryptoVault API Running",
  });
});
app.use("/api/wallets", walletRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/balance",
  balanceRoutes
);
app.use(
  "/api/transactions",
  transactionRoutes
);
app.use(
  "/api/sync",
  syncRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use("/api/withdrawals", withdrawalRoutes);
app.use(
  "/api/security",
  securityRoutes
);
app.use(
  "/api/signer",
  signerRoutes
);
app.use(
  "/api/market",
  marketRoutes
);
export default app;