import mongoose from "mongoose";

const TransactionSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true,
      },

      chain: {
        type: String,
        enum: ["ETH"],
        default: "ETH",
      },

      txHash: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "deposit",
          "withdrawal",
        ],
        required: true,
      },

      amount: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "failed",
        ],
        default: "pending",
      },

      fromAddress: {
        type: String,
        default: "",
      },

      toAddress: {
        type: String,
        default: "",
      },

      blockNumber: {
        type: Number,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

TransactionSchema.index({
  userId: 1,
  createdAt: -1,
});

TransactionSchema.index({
  walletId: 1,
  createdAt: -1,
});

TransactionSchema.index({
  txHash: 1,
});

export default mongoose.model(
  "Transaction",
  TransactionSchema
);
