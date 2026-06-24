import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setError("");

      if (
        password !==
        confirmPassword
      ) {
        return setError(
          "Passwords do not match"
        );
      }

      try {
        setLoading(true);

        const res =
          await api.post(
            "/auth/register",
            {
              fullName,
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
          "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

      <div className="grid lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

          <h1 className="text-5xl font-bold text-white mb-6">
            CryptoVault
          </h1>

          <p className="text-xl text-blue-100">
            Secure Digital Assets.
          </p>

          <p className="text-blue-100 mt-4">
            Create your account and
            automatically receive
            your Ethereum wallet.
          </p>

        </div>

        {/* Form */}
        <div className="p-8 lg:p-12">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-slate-400 mt-2">
              Start using CryptoVault
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="text-slate-300 text-sm">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                required
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
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
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="text-slate-400 mt-6 text-center">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-400 ml-2"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}