import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";

type Props = {
  transaction: any;
  onClick: () => void;
};

export default function TransactionCard({
  transaction,
  onClick,
}: Props) {
  const isDeposit =
    transaction.type ===
    "deposit";

  const getStatusIcon = () => {
    switch (
      transaction.status
    ) {
      case "confirmed":
        return (
          <CheckCircle
            size={16}
            className="text-green-500"
          />
        );

      case "pending":
        return (
          <Clock3
            size={16}
            className="text-yellow-500"
          />
        );

      case "failed":
        return (
          <XCircle
            size={16}
            className="text-red-500"
          />
        );

      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="
        w-full
        text-left
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-4
        hover:border-blue-500
        hover:bg-slate-750
        transition-all
        duration-200
      "
    >
      <div className="flex items-center justify-between">

        {/* Left Side */}

        <div className="flex items-center gap-3">

          <div
            className={`
              h-12
              w-12
              rounded-xl
              flex
              items-center
              justify-center
              ${
                isDeposit
                  ? "bg-green-500/10"
                  : "bg-red-500/10"
              }
            `}
          >

            {isDeposit ? (
              <ArrowDownLeft
                className="text-green-500"
              />
            ) : (
              <ArrowUpRight
                className="text-red-500"
              />
            )}

          </div>

          <div>

            <p className="text-white font-semibold capitalize">
              {transaction.type}
            </p>

            <div className="flex items-center gap-2 mt-1">

              {getStatusIcon()}

              <span className="text-slate-400 text-sm capitalize">
                {
                  transaction.status
                }
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="text-right">

          <p
            className={`font-bold text-lg ${
              isDeposit
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {isDeposit
              ? "+"
              : "-"}
            {transaction.amount}
            ETH
          </p>

          <p className="text-slate-500 text-xs mt-1">
            {new Date(
              transaction.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

      {/* Hash */}

      <div className="mt-4">

        <p className="text-slate-500 text-xs break-all">
          {
            transaction.txHash
          }
        </p>

      </div>

    </button>
  );
}
