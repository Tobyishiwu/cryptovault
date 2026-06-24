import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Send,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: Wallet,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Send",
    path: "/send",
    icon: Send,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 bg-slate-950 border-r border-slate-800 flex-col">

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-white">
          CryptoVault
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Premium Crypto Wallet
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl mb-2 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="p-4 border-t border-slate-800">

        <div className="bg-slate-900 rounded-2xl p-4">

          <p className="text-slate-400 text-sm">
            Network
          </p>

          <p className="text-white font-medium">
            Ethereum Sepolia
          </p>

        </div>

      </div>

    </aside>
  );
}