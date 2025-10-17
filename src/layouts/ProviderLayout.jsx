import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Briefcase, LayoutDashboard, PlusCircle, User } from "lucide-react";

export default function ProviderLayout() {
  const location = useLocation();

  const navLinks = [
    { path: "/provider/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/provider/opportunities", label: "My Opportunities", icon: <Briefcase size={18} /> },
    { path: "/provider/create-opportunity", label: "Post Opportunity", icon: <PlusCircle size={18} /> },
    { path: "/provider/profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0a0118] via-[#120826] to-[#1a093f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(158,123,255,0.25)]">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#9E7BFF] to-[#C5A3FF] drop-shadow-[0_0_10px_rgba(158,123,255,0.5)]">
            Gophora
          </h1>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ path, label, icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-white/20 text-[#C5A3FF] shadow-[0_0_15px_rgba(197,163,255,0.5)]"
                        : "text-gray-300 hover:bg-white/10 hover:text-[#C5A3FF]"
                    }`}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Gophora
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 text-white">
        <Outlet />
      </main>
    </div>
  );
}
