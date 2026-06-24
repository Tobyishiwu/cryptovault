import { ethers } from "ethers";

const provider =
  new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );

export const estimateGasFee =
  async (
    from: string,
    to: string,
    amount: string
  ) => {
    const gasEstimate =
      await provider.estimateGas({
        from,
        to,
        value:
          ethers.parseEther(
            amount
          ),
      });

    const feeData =
      await provider.getFeeData();

    const gasPrice =
      feeData.gasPrice ??
      BigInt(0);

    const feeWei =
      gasEstimate *
      gasPrice;

    return ethers.formatEther(
      feeWei
    );
  };