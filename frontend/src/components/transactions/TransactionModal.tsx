import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  ExternalLink,
  Download,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import toast from "react-hot-toast";

import { generateReceipt } from "../../utils/generateReceipt";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  transaction: any | null;
};

export default function TransactionModal({
  isOpen,
  onClose,
  transaction,
}: Props) {
  if (!transaction) return null;

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(
        transaction.txHash
      );

      toast.success(
        "Transaction hash copied"
      );
    } catch {
      toast.error(
        "Failed to copy hash"
      );
    }
  };

  const openExplorer = () => {
    window.open(
      `https://sepolia.etherscan.io/tx/${transaction.txHash}`,
      "_blank"
    );
  };

  const downloadReceipt = () => {
    generateReceipt(transaction);

    toast.success(
      "Receipt downloaded"
    );
  };

  const shortAddress = (
    address: string
  ) => {
    if (!address)
      return "N/A";

    return `${address.slice(
      0,
      8
    )}...${address.slice(-6)}`;
  };

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >

          <motion.div
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
          >

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

              <div>

                <h2 className="text-white text-xl font-bold">
                  Transaction Details
                </h2>

                <p className="text-slate-400 text-sm">
                  Receipt & blockchain info
                </p>

              </div>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X size={22} />
              </button>

            </div>

            {/* Body */}

            <div className="p-6 space-y-6">

              {/* Status */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  {transaction.type ===
                  "deposit" ? (
                    <ArrowDownLeft
                      className="text-green-500"
                    />
                  ) : (
                    <ArrowUpRight
                      className="text-red-500"
                    />
                  )}

                  <div>

                    <p className="text-white capitalize font-semibold">
                      {transaction.type}
                    </p>

                    <p className="text-slate-400 text-sm">
                      Transaction Type
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-2 rounded-xl">

                  <CheckCircle
                    size={16}
                  />

                  <span>
                    {
                      transaction.status
                    }
                  </span>

                </div>

              </div>

              {/* Amount */}

              <div className="bg-slate-800 rounded-2xl p-5">

                <p className="text-slate-400 text-sm">
                  Amount
                </p>

                <h3 className="text-3xl font-bold text-white mt-2">
                  {transaction.type ===
                  "deposit"
                    ? "+"
                    : "-"}
                  {transaction.amount}
                  ETH
                </h3>

              </div>

              {/* Details */}

              <div className="grid md:grid-cols-2 gap-4">

                <InfoCard
                  label="Network"
                  value="Ethereum Sepolia"
                />

                <InfoCard
                  label="Block Number"
                  value={
                    transaction.blockNumber?.toString() ||
                    "N/A"
                  }
                />

                <InfoCard
                  label="From"
                  value={shortAddress(
                    transaction.fromAddress
                  )}
                />

                <InfoCard
                  label="To"
                  value={shortAddress(
                    transaction.toAddress
                  )}
                />

              </div>

              {/* Hash */}

              <div>

                <p className="text-slate-400 text-sm mb-2">
                  Transaction Hash
                </p>

                <div className="bg-slate-800 rounded-2xl p-4">

                  <p className="text-white break-all text-sm">
                    {
                      transaction.txHash
                    }
                  </p>

                </div>

              </div>

              {/* Date */}

              <div>

                <p className="text-slate-400 text-sm">
                  Date
                </p>

                <p className="text-white mt-1">
                  {new Date(
                    transaction.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 p-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <button
                  onClick={copyHash}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl"
                >
                  <Copy size={18} />
                  Copy Hash
                </button>

                <button
                  onClick={openExplorer}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                >
                  <ExternalLink
                    size={18}
                  />
                  Explorer
                </button>

                <button
                  onClick={
                    downloadReceipt
                  }
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                >
                  <Download
                    size={18}
                  />
                  Receipt
                </button>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function InfoCard({
  label,
  value,
}: InfoProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4">

      <p className="text-slate-400 text-sm">
        {label}
      </p>

      <p className="text-white mt-1 break-all">
        {value}
      </p>

    </div>
  );
}
