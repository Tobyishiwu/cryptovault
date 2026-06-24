import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate(
        "/dashboard"
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

      <div className="grid lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

          <h1 className="text-5xl font-bold text-white mb-6">
            CryptoVault
          </h1>

          <p className="text-xl text-blue-100">
            Secure Digital Assets
          </p>

          <p className="text-blue-100 mt-4 leading-relaxed">
            Store, send and manage
            cryptocurrency securely.
            Your wallet is always
            available anywhere.
          </p>

        </div>

        {/* Form Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">

          <div className="text-center lg:text-left mb-8">

            <div className="text-5xl mb-4 lg:hidden">
              💎
            </div>

            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-slate-400 mt-2">
              Sign in to your wallet
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="text-slate-300 text-sm">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-white font-semibold transition"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-slate-400">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-blue-400 hover:text-blue-300"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}