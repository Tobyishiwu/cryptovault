import { useState } from "react";

import {
  Copy,
  Wallet,
  CheckCircle,
  Shield,
  Globe,
} from "lucide-react";

import toast from "react-hot-toast";

type Props = {
  address: string;
  balance: number;
};

export default function WalletOverview({
  address,
  balance,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(
      address
    );

    setCopied(true);

    toast.success(
      "Wallet address copied"
    );

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shortAddress =
    address && address.length > 12
      ? `${address.slice(
          0,
          8
        )}...${address.slice(-6)}`
      : address;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">

            <Wallet
              size={22}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-white text-xl font-semibold">
              Wallet Overview
            </h2>

            <p className="text-slate-400 text-sm">
              Primary Wallet
            </p>

          </div>

        </div>

        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
          Active
        </span>

      </div>

      {/* Balance */}

      <div className="mb-8">

        <p className="text-slate-400 text-sm">
          Available Balance
        </p>

        <h1 className="text-white text-4xl font-bold mt-2">
          {Number(
            balance
          ).toFixed(6)} ETH
        </h1>

      </div>

      {/* Address */}

      <div className="mb-6">

        <p className="text-slate-400 text-sm mb-2">
          Wallet Address
        </p>

        <div className="bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center justify-between gap-3">

            <div>

              <p className="text-white font-medium">
                {shortAddress}
              </p>

              <p className="text-slate-500 text-xs mt-1 break-all">
                {address}
              </p>

            </div>

            <button
              onClick={
                copyAddress
              }
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-xl text-white"
            >
              {copied ? (
                <CheckCircle
                  size={18}
                />
              ) : (
                <Copy
                  size={18}
                />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Info Grid */}

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-2">

            <Globe
              size={16}
              className="text-blue-400"
            />

            <p className="text-slate-400 text-sm">
              Network
            </p>

          </div>

          <p className="text-white">
            Sepolia
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-2">

            <Shield
              size={16}
              className="text-green-400"
            />

            <p className="text-slate-400 text-sm">
              Security
            </p>

          </div>

          <p className="text-green-400">
            Protected
          </p>

        </div>

      </div>

    </div>
  );
}
