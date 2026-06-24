import Wallet from "../models/Wallet";
import { createEthWallet } from "./eth.service";
import { encrypt } from "./encryption.service";

export const createUserWallets = async (
  userId: string
) => {
  const ethWallet = createEthWallet();

  await Wallet.create({
    userId,
    chain: "ETH",
    network: "sepolia",
    address: ethWallet.address,
    publicKey: "",
    encryptedPrivateKey: encrypt(
      ethWallet.privateKey
    ),
    balance: 0,
    isActive: true,
  });
};