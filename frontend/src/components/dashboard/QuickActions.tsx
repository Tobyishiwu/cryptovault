import {
  Send,
  Download,
  RefreshCw,
  History,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../../api/axios";

type Props = {
  onSyncComplete: () => Promise<void>;
};

export default function QuickActions({
  onSyncComplete,
}: Props) {

  const navigate =
    useNavigate();

  const [syncing, setSyncing] =
    useState(false);

  const syncWallet =
    async () => {

      try {

        setSyncing(true);

        const response =
          await api.post(
            "/wallets/sync"
          );

        const {
          newTransactions,
          balance,
        } = response.data;

        await onSyncComplete();

        if (
          newTransactions > 0
        ) {

          toast.success(
            `Wallet synced. ${newTransactions} new transaction(s) discovered.`
          );

        } else {

          toast.success(
            "Wallet is already up to date."
          );

        }

        console.log(
          "Synced balance:",
          balance
        );

      } catch (error) {

        console.error(
          "Sync error:",
          error
        );

        toast.error(
          "Failed to sync wallet"
        );

      } finally {

        setSyncing(false);

      }
    };

  const actions = [
    {
      name: "Send",
      icon: Send,
      action: () =>
        navigate("/send"),
    },

    {
      name: "Receive",
      icon: Download,
      action: () =>
        navigate("/wallet"),
    },

    {
      name: "History",
      icon: History,
      action: () =>
        navigate(
          "/transactions"
        ),
    },

    {
      name: syncing
        ? "Syncing..."
        : "Sync",
      icon: RefreshCw,
      action: syncWallet,
    },
  ];

  return (
    <div>

      <h2 className="text-white text-xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {actions.map(
          (action) => {

            const Icon =
              action.icon;

            return (

              <button
                key={
                  action.name
                }
                onClick={
                  action.action
                }
                disabled={
                  syncing &&
                  action.name.includes(
                    "Sync"
                  )
                }
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-5
                  hover:border-blue-500
                  hover:bg-slate-800
                  transition
                  disabled:opacity-50
                "
              >

                <Icon
                  size={28}
                  className={`mx-auto ${
                    syncing &&
                    action.name.includes(
                      "Sync"
                    )
                      ? "animate-spin text-green-500"
                      : "text-blue-500"
                  }`}
                />

                <p className="text-white mt-3">
                  {action.name}
                </p>

              </button>

            );
          }
        )}

      </div>

    </div>
  );
}
