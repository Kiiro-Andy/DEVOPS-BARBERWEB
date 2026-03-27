import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bloquear scroll cuando sidebar está abierto en movil
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col md:ml-64 min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-14 md:mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

