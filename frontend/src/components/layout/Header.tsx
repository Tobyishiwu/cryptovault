import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

import api from "../../api/axios";

export default function Header() {

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {

        const res =
          await api.get(
            "/auth/me"
          );

        setProfile(
          res.data
        );

      } catch (error) {
        console.error(error);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

      <div>

        <h1 className="text-3xl lg:text-4xl font-bold text-white">

          Welcome Back,
          {" "}
          {profile?.fullName ||
            "User"} 👋

        </h1>

        <p className="text-slate-400 mt-1">

          {profile?.email ||
            "Loading..."}

        </p>

      </div>

      <div className="flex items-center gap-3 flex-wrap">

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">

          <p className="text-slate-300 text-sm">
            Ethereum Sepolia
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-2">

          <User
            size={16}
            className="text-blue-500"
          />

          <span className="text-white text-sm">

            {profile?.fullName ||
              "User"}

          </span>

        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  );
}