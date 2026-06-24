import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
} from "lucide-react";

type Props = {
  balance: number;
  ethPrice: number;
};

export default function BalanceCard({
  balance,
  ethPrice,
}: Props) {
  const navigate = useNavigate();

  const usdValue =
    balance * ethPrice;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 lg:p-8 shadow-2xl">

      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center gap-2 mb-4">

          <Wallet
            className="text-white"
            size={22}
          />

          <p className="text-blue-100">
            Total Portfolio Value
          </p>

        </div>

        {/* USD VALUE */}

        <h1 className="text-white text-5xl font-bold">
          $
          {usdValue.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </h1>

        {/* ETH BALANCE */}

        <p className="text-blue-100 text-lg mt-3">
          {balance.toFixed(6)} ETH
        </p>

        {/* LIVE PRICE */}

        <div className="flex items-center gap-2 mt-2">

          <TrendingUp
            size={16}
            className="text-green-300"
          />

          <p className="text-blue-100 text-sm">
            ETH Price: $
            {ethPrice.toLocaleString()}
          </p>

        </div>

        <p className="text-blue-100 text-sm mt-1">
          Live market value
        </p>

        {/* ACTION BUTTONS */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() =>
              navigate("/send")
            }
            className="bg-white text-blue-700 rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
          >
            <ArrowUpRight
              size={18}
            />
            Send
          </button>

          <button
            onClick={() =>
              navigate("/wallet")
            }
            className="bg-white/20 backdrop-blur rounded-2xl py-4 text-white flex items-center justify-center gap-2 font-semibold hover:bg-white/30 transition"
          >
            <ArrowDownLeft
              size={18}
            />
            Receive
          </button>

        </div>

      </div>

    </div>
  );
}
