import axios from "axios";

export const getTransfers = async (
  address: string
) => {
  const url =
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  const response =
    await axios.post(url, {
      id: 1,
      jsonrpc: "2.0",
      method:
        "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toAddress: address,
          category: [
            "external",
            "erc20",
          ],
          withMetadata: true,
        },
      ],
    });

  return response.data.result
    .transfers;
};