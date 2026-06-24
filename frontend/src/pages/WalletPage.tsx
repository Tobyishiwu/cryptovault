import { useEffect, useState } from "react";
import api from "../api/axios";

import Sidebar from "../components/layout/Sidebar";
import MobileNav from "../components/layout/MobileNav";
import Header from "../components/layout/Header";

import {
  Copy,
  Wallet,
  Share2,
  CheckCircle,
} from "lucide-react";

import QRCode from "react-qr-code";
import toast from "react-hot-toast";

export default function WalletPage() {
  const [wallet, setWallet] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const res =
        await api.get("/wallets");

      setWallet(
        res.data[0]
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(
      wallet.address
    );

    setCopied(true);

    toast.success(
      "Wallet address copied"
    );

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareAddress = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "My CryptoVault Wallet",
          text:
            wallet.address,
        });
      } else {
        copyAddress();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Wallet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">

      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 pb-24">

        <Header />

        {/* Hero */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-3 mb-4">

            <Wallet
              size={32}
              className="text-white"
            />

            <h1 className="text-3xl font-bold text-white">
              Receive Crypto
            </h1>

          </div>

          <p className="text-blue-100">
            Receive ETH securely on
            Ethereum Sepolia
          </p>

        </div>

        {/* Wallet Card */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* QR */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-white text-xl font-semibold mb-6">
              Scan QR Code
            </h2>

            <div className="bg-white p-4 rounded-3xl w-fit mx-auto">

              <QRCode
                value={
                  wallet.address
                }
                size={220}
              />

            </div>

            <p className="text-center text-slate-400 mt-6">
              Scan to send ETH
            </p>

          </div>

          {/* Details */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-white text-xl font-semibold mb-6">
              Wallet Details
            </h2>

            <div className="space-y-6">

              <div>

                <p className="text-slate-400 text-sm mb-2">
                  Network
                </p>

                <span className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  Ethereum Sepolia
                </span>

              </div>

              <div>

                <p className="text-slate-400 text-sm mb-2">
                  Wallet Address
                </p>

                <div className="bg-slate-800 rounded-2xl p-4 text-white break-all text-sm">
                  {wallet.address}
                </div>

              </div>

              <div>

                <p className="text-slate-400 text-sm">
                  Available Balance
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {wallet.balance}
                  {" "}ETH
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={
                    copyAddress
                  }
                  className="bg-blue-600 hover:bg-blue-700 rounded-2xl py-3 text-white flex items-center justify-center gap-2"
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

                  Copy
                </button>

                <button
                  onClick={
                    shareAddress
                  }
                  className="bg-slate-800 hover:bg-slate-700 rounded-2xl py-3 text-white flex items-center justify-center gap-2"
                >
                  <Share2
                    size={18}
                  />

                  Share
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Instructions */}

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h3 className="text-white text-lg font-semibold mb-4">
            Receiving Instructions
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>
              • Only send ETH on
              Ethereum Sepolia
            </li>

            <li>
              • Use the QR code or
              wallet address above
            </li>

            <li>
              • Funds will appear
              after blockchain
              confirmation
            </li>

            <li>
              • Use Wallet Sync if
              funds don't appear
              immediately
            </li>

          </ul>

        </div>

      </main>

      <MobileNav />

    </div>
  );
}
