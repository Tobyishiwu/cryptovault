import { useEffect, useMemo, useState } from "react";

import api from "../api/axios";

import Sidebar from "../components/layout/Sidebar";
import MobileNav from "../components/layout/MobileNav";
import Header from "../components/layout/Header";

import TransactionCard from "../components/transactions/TransactionCard";
import TransactionModal from "../components/transactions/TransactionModal";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState<any>(null);

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.get(
            "/transactions"
          );

        setTransactions(
          res.data
        );
      } catch (error) {
        console.error(
          "Failed to load transactions",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const openTransaction = (
    transaction: any
  ) => {
    setSelectedTransaction(
      transaction
    );

    setIsModalOpen(true);
  };

  const closeTransaction =
    () => {
      setIsModalOpen(false);

      setTimeout(() => {
        setSelectedTransaction(
          null
        );
      }, 200);
    };

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (tx) => {
          const matchesSearch =
            tx.txHash
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            tx.type
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesFilter =
            filter === "all"
              ? true
              : tx.type ===
                filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      transactions,
      search,
      filter,
    ]);

  const totalDeposits =
    transactions.filter(
      (tx) =>
        tx.type ===
        "deposit"
    ).length;

  const totalWithdrawals =
    transactions.filter(
      (tx) =>
        tx.type ===
        "withdrawal"
    ).length;

  return (
    <>
      <div className="min-h-screen bg-slate-950 flex">

        <Sidebar />

        <main className="flex-1 p-4 lg:p-8 pb-24">

          <Header />

          {/* Page Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-white">
                Transactions
              </h1>

              <p className="text-slate-400 mt-1">
                View all wallet
                activity and
                receipts
              </p>

            </div>

            <button
              onClick={
                loadTransactions
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
                transition
              "
            >
              Refresh
            </button>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">

              <p className="text-slate-400 text-sm">
                Total Transactions
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {
                  transactions.length
                }
              </h2>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">

              <p className="text-slate-400 text-sm">
                Deposits
              </p>

              <h2 className="text-green-500 text-3xl font-bold mt-2">
                {
                  totalDeposits
                }
              </h2>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">

              <p className="text-slate-400 text-sm">
                Withdrawals
              </p>

              <h2 className="text-red-500 text-3xl font-bold mt-2">
                {
                  totalWithdrawals
                }
              </h2>

            </div>

          </div>

          {/* Filters */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8">

            <div className="grid lg:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Search transaction hash..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                "
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value
                  )
                }
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  rounded-xl
                  px-4
                  py-3
                "
              >
                <option value="all">
                  All Transactions
                </option>

                <option value="deposit">
                  Deposits
                </option>

                <option value="withdrawal">
                  Withdrawals
                </option>

              </select>

            </div>

          </div>

          {/* Transactions */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Transaction History
            </h2>

            {loading ? (

              <div className="text-center py-12 text-slate-400">
                Loading...
              </div>

            ) : filteredTransactions.length ===
              0 ? (

              <div className="text-center py-12 text-slate-400">
                No transactions found
              </div>

            ) : (

              <div className="space-y-4">

                {filteredTransactions.map(
                  (tx) => (
                    <TransactionCard
                      key={tx._id}
                      transaction={
                        tx
                      }
                      onClick={() =>
                        openTransaction(
                          tx
                        )
                      }
                    />
                  )
                )}

              </div>

            )}

          </div>

        </main>

        <MobileNav />

      </div>

      <TransactionModal
        isOpen={
          isModalOpen
        }
        onClose={
          closeTransaction
        }
        transaction={
          selectedTransaction
        }
      />
    </>
  );
}
