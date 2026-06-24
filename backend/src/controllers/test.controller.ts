import Wallet from "../models/Wallet";
import { decrypt } from "../services/encryption.service";

export const testDecryption =
  async (req, res) => {
    const wallet =
      await Wallet.findOne({
        chain: "ETH",
      });

    const privateKey =
      decrypt(
        wallet.encryptedPrivateKey
      );

    return res.json({
      startsWith:
        privateKey.slice(0, 10),
    });
  };