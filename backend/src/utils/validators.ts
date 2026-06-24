import { ethers } from "ethers";

export const isValidEthAddress = (
  address: string
) => {
  return ethers.isAddress(address);
};

export const isValidAmount = (
  amount: string
) => {
  const value = Number(amount);

  return (
    !isNaN(value) &&
    value > 0
  );
};