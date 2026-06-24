import { ethers } from "ethers";

import { provider } from "./alchemy.service";

export const syncWalletBalance =
  async (
    address: string
  ): Promise<number> => {

    const balanceWei =
      await provider.getBalance(
        address
      );

    return Number(
      ethers.formatEther(
        balanceWei
      )
    );
  };
