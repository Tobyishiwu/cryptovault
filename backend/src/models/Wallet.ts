import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    chain: {
      type: String,
      required: true,
      enum: ["ETH", "TRON", "BTC"],
    },

    network: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
      unique: true,
    },

    publicKey: {
      type: String,
      default: "",
    },

    encryptedPrivateKey: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    nonce: {
      type: Number,
      default: 0,
    },

    lastSyncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Wallet",
  WalletSchema
);