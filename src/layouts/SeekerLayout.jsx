import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function SeekerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0a0118] via-[#120826] to-[#1a093f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(158,123,255,0.25)]">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#9E7BFF] to-[#C5A3FF] drop-shadow-[0_0_10px_rgba(158,123,255,0.5)]">
            Gophora
          </h1>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3">
            <Link
              to="/seeker/dashboard"
              className="text-gray-300 hover:text-[#C5A3FF] font-medium transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/seeker/opportunities"
              className="text-gray-300 hover:text-[#C5A3FF] font-medium transition-all duration-200"
            >
              Browse Opportunities
            </Link>
            <Link
              to="/seeker/applications"
              className="text-gray-300 hover:text-[#C5A3FF] font-medium transition-all duration-200"
            >
              My Applications
            </Link>
            <Link
              to="/seeker/profile"
              className="text-gray-300 hover:text-[#C5A3FF] font-medium transition-all duration-200"
            >
              Profile
            </Link>
          </nav>
        </div>

        {/* Logout Button and Footer */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
          <div className="mt-2 text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Gophora
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 text-white">
        <Outlet />
      </main>
    </div>
  );
}
