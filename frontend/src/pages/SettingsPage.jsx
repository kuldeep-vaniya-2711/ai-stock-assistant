import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function SettingsPage() {

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Settings
          </h1>

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-gray-400">
              Settings page coming soon...
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}