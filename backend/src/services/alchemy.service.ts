import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

/*
|--------------------------------------------------------------------------
| Environment Validation
|--------------------------------------------------------------------------
*/

const apiKey =
  process.env.ALCHEMY_API_KEY;

if (!apiKey) {
  console.error(
    "❌ ALCHEMY_API_KEY is missing from .env"
  );
}

console.log(
  "ALCHEMY API KEY:",
  apiKey
);

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

const rpcUrl =
  `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;

console.log(
  "RPC URL:",
  rpcUrl
);

export const provider =
  new ethers.JsonRpcProvider(
    rpcUrl
  );

/*
|--------------------------------------------------------------------------
| Get ETH Balance
|--------------------------------------------------------------------------
*/

export const getEthBalance =
  async (
    address: string
  ): Promise<string> => {
    try {
      const network =
        await provider.getNetwork();

      console.log(
        "Connected Network:",
        network.name
      );

      const balanceWei =
        await provider.getBalance(
          address
        );

      return ethers.formatEther(
        balanceWei
      );
    } catch (error) {

      console.error(
        "ALCHEMY BALANCE ERROR:",
        error
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Get Wallet Nonce
|--------------------------------------------------------------------------
*/

export const getWalletNonce =
  async (
    address: string
  ): Promise<number> => {
    try {
      return await provider.getTransactionCount(
        address
      );
    } catch (error) {

      console.error(
        "NONCE ERROR:",
        error
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Get Latest Block
|--------------------------------------------------------------------------
*/

export const getLatestBlock =
  async () => {
    try {
      return await provider.getBlockNumber();
    } catch (error) {

      console.error(
        "BLOCK ERROR:",
        error
      );

      throw error;
    }
  };
