import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Send,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-950 border-t border-slate-800 z-50">

      <div className="grid grid-cols-4 h-16">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive
                ? "text-blue-500"
                : "text-slate-400"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-xs">
            Home
          </span>
        </NavLink>

        <NavLink
          to="/wallet"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive
                ? "text-blue-500"
                : "text-slate-400"
            }`
          }
        >
          <Wallet size={20} />
          <span className="text-xs">
            Wallet
          </span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive
                ? "text-blue-500"
                : "text-slate-400"
            }`
          }
        >
          <ArrowLeftRight size={20} />
          <span className="text-xs">
            Activity
          </span>
        </NavLink>

        <NavLink
          to="/send"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive
                ? "text-blue-500"
                : "text-slate-400"
            }`
          }
        >
          <Send size={20} />
          <span className="text-xs">
            Send
          </span>
        </NavLink>

      </div>

    </div>
  );
}