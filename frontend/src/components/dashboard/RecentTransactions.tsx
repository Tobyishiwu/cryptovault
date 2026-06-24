import { useState } from "react";

import TransactionCard from "../transactions/TransactionCard";
import TransactionModal from "../transactions/TransactionModal";

type Props = {
  transactions: any[];
};

export default function RecentTransactions({
  transactions,
}: Props) {
  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState<any>(null);

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const openTransaction = (
    transaction: any
  ) => {
    setSelectedTransaction(
      transaction
    );

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setSelectedTransaction(
        null
      );
    }, 200);
  };

  return (
    <>
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-white text-xl font-semibold">
            Recent Transactions
          </h2>

          <span className="text-slate-400 text-sm">
            {transactions.length}
            {" "}
            Total
          </span>

        </div>

        <div className="space-y-4">

          {transactions.length === 0 ? (

            <div className="py-10 text-center">

              <p className="text-slate-400">
                No transactions yet
              </p>

            </div>

          ) : (

            transactions
              .slice(0, 5)
              .map((tx) => (

                <TransactionCard
                  key={tx._id}
                  transaction={tx}
                  onClick={() =>
                    openTransaction(
                      tx
                    )
                  }
                />

              ))

          )}

        </div>

      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={
          selectedTransaction
        }
      />
    </>
  );
}
