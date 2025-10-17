import React from "react";
import { Briefcase, Users, Activity } from "lucide-react";

export default function ProviderDashboard() {
  return (
    <div className="text-white">
      {/* Header */}
      <h2 className="text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Welcome, Opportunity Provider 👋
      </h2>
      <p className="text-gray-300 mb-8">
        Manage your posted opportunities and track engagement here.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Opportunities */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] hover:shadow-[0_0_35px_rgba(197,163,255,0.4)] transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">Total Opportunities</h3>
            <Briefcase className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">8</p>
        </div>

        {/* Applications Received */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] hover:shadow-[0_0_35px_rgba(197,163,255,0.4)] transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">Applications Received</h3>
            <Users className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">42</p>
        </div>

        {/* Active Listings */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] hover:shadow-[0_0_35px_rgba(197,163,255,0.4)] transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">Active Listings</h3>
            <Activity className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">5</p>
        </div>
      </div>
    </div>
  );
}
