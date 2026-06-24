import TronWeb from "tronweb";

export const createTronWallet = async () => {
  const tronWeb = new TronWeb({
    fullHost: "https://api.nileex.io",
  });

  const account = await tronWeb.createAccount();

  return {
    address: account.address.base58,
    privateKey: account.privateKey,
  };
};