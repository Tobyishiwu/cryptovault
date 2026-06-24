import { useEffect, useState } from "react";
import api from "../api/axios";

import Sidebar from "../components/layout/Sidebar";
import MobileNav from "../components/layout/MobileNav";

export default function SendPage() {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [gas, setGas] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        dashboardRes,
        txRes,
      ] = await Promise.all([
        api.get("/dashboard"),
        api.get("/transactions"),
      ]);

      setDashboard(
        dashboardRes.data
      );

      setTransactions(
        txRes.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const estimateGas = async () => {
    try {
      setMessage("");

      const res = await api.post(
        "/withdrawals/estimate",
        {
          fromAddress: "",
          toAddress,
          amount,
        }
      );

      setGas(
        res.data.estimatedGas
      );
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to estimate gas"
      );
    }
  };

  const sendCrypto = async () => {
    try {
      setLoading(true);

      setMessage("");
      setTxHash("");

      const res = await api.post(
        "/withdrawals/send",
        {
          toAddress,
          amount,
        }
      );

      setTxHash(
        res.data.hash
      );

      setMessage(
        "Transfer completed successfully"
      );

      setAmount("");
      setToAddress("");
      setGas("");

      await loadData();
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Transfer failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 pb-24">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Send Crypto
          </h1>

          <p className="text-slate-400 mt-2">
            Transfer ETH securely on Ethereum Sepolia
          </p>
        </div>

        {/* Balance Card */}

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-3xl p-6 mb-8">

          <p className="text-blue-100 text-sm">
            Available Balance
          </p>

          <h2 className="text-white text-4xl font-bold mt-2">
            {dashboard?.totalBalance || 0} ETH
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Send Form */}

          <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6">

            <div className="space-y-5">

              <div>
                <label className="block text-slate-400 mb-2">
                  Recipient Address
                </label>

                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) =>
                    setToAddress(
                      e.target.value
                    )
                  }
                  placeholder="0x..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-2">
                  Amount (ETH)
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  placeholder="0.01"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                />
              </div>

              {gas && (
                <div className="bg-slate-800 rounded-2xl p-4">

                  <p className="text-slate-400 text-sm">
                    Estimated Gas Fee
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {gas} ETH
                  </p>

                </div>
              )}

              {message && (
                <div className="bg-green-900/20 border border-green-700 rounded-2xl p-4">

                  <p className="text-green-400 font-semibold">
                    {message}
                  </p>

                </div>
              )}

              {txHash && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">

                  <p className="text-slate-400 text-sm mb-2">
                    Transaction Hash
                  </p>

                  <p className="text-green-400 break-all text-sm">
                    {txHash}
                  </p>

                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">

                <button
                  onClick={estimateGas}
                  disabled={
                    !toAddress ||
                    !amount
                  }
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white"
                >
                  Estimate Gas
                </button>

                <button
                  onClick={sendCrypto}
                  disabled={
                    loading ||
                    !toAddress ||
                    !amount
                  }
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-medium"
                >
                  {loading
                    ? "Sending..."
                    : "Send Crypto"}
                </button>

              </div>

            </div>

          </div>

          {/* Recent Transfers */}

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">

            <h2 className="text-xl font-semibold text-white mb-5">
              Recent Transfers
            </h2>

            <div className="space-y-4">

              {transactions.length === 0 ? (
                <p className="text-slate-400">
                  No transfers yet
                </p>
              ) : (
                transactions
                  .slice(0, 5)
                  .map((tx) => (
                    <div
                      key={tx._id}
                      className="border-b border-slate-800 pb-3"
                    >
                      <p className="text-white font-medium">
                        {tx.amount} ETH
                      </p>

                      <p className="text-slate-400 text-sm capitalize">
                        {tx.type}
                      </p>

                      <p className="text-slate-500 text-xs mt-1">
                        {tx.status}
                      </p>
                    </div>
                  ))
              )}

            </div>

          </div>

        </div>

      </main>

      <MobileNav />

    </div>
  );
}