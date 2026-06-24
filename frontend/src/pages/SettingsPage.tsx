import Sidebar from "../components/layout/Sidebar";
import MobileNav from "../components/layout/MobileNav";
import Header from "../components/layout/Header";

export default function SettingsPage() {

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 pb-24">

        <Header />

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">

          <h2 className="text-white text-2xl font-semibold mb-6">
            Settings
          </h2>

          <div className="space-y-4">

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </main>

      <MobileNav />

    </div>
  );
}