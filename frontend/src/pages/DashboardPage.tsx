import { useEffect, useState } from "react";
import api from "../api/axios";

import Sidebar from "../components/layout/Sidebar";
import MobileNav from "../components/layout/MobileNav";
import Header from "../components/layout/Header";

import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import WalletOverview from "../components/dashboard/WalletOverview";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<any>(null);

  const [wallets, setWallets] =
    useState<any[]>([]);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [ethPrice, setEthPrice] =
    useState<number>(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      try {
        setLoading(true);

        const [
          dashboardRes,
          walletRes,
          txRes,
          marketRes,
        ] = await Promise.all([
          api.get("/dashboard"),
          api.get("/wallets"),
          api.get("/transactions"),
          api.get("/market/eth"),
        ]);

        setDashboard(
          dashboardRes.data
        );

        setWallets(
          walletRes.data
        );

        setTransactions(
          txRes.data
        );

        setEthPrice(
          marketRes.data.price
        );
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-white mt-4">
            Loading CryptoVault...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">

        {/* Header */}
        <Header />

        {/* Portfolio */}
        <BalanceCard
          balance={
            dashboard?.totalBalance || 0
          }
          ethPrice={ethPrice}
        />

        {/* Quick Actions */}
        <div className="mt-8">
<QuickActions
  onSyncComplete={loadDashboard}
/>        </div>

        {/* Wallet + Transactions */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <WalletOverview
            address={
              wallets[0]?.address ||
              "No wallet found"
            }
            balance={
              dashboard?.totalBalance || 0
            }
          />

          <RecentTransactions
            transactions={
              transactions
            }
          />

        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <p className="text-slate-400">
              Wallet Count
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {
                dashboard?.walletCount || 0
              }
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <p className="text-slate-400">
              Transactions
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {
                dashboard?.transactionCount || 0
              }
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <p className="text-slate-400">
              ETH Price
            </p>

            <h2 className="text-4xl font-bold text-green-500 mt-2">
              $
              {ethPrice.toLocaleString()}
            </h2>

          </div>

        </div>

        {/* Last Sync */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h3 className="text-white text-lg font-semibold">
                Wallet Status
              </h3>

              <p className="text-slate-400 mt-1">
                Your wallet is connected to
                Ethereum Sepolia
              </p>

            </div>

            <div className="text-right">

              <p className="text-green-500 font-medium">
                ● Connected
              </p>

              <p className="text-slate-500 text-sm">
                Live Market Data Enabled
              </p>

            </div>

          </div>

        </div>

      </main>

      {/* Mobile Navigation */}
      <MobileNav />

    </div>
  );
}
