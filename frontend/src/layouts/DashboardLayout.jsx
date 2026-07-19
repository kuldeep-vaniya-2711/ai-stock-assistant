import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <main className="p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;