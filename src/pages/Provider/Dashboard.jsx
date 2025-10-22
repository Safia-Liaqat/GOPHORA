import React, { useState, useEffect } from "react";
import { Briefcase, Users, Activity } from "lucide-react";

export default function ProviderDashboard() {
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    applicationsReceived: 0, // Initialized to 0
    activeListings: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const oppsRes = await fetch("/api/opportunities/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (oppsRes.ok) {
          const opportunities = await oppsRes.json();
          let totalApplications = 0;

          // Fetch applications for each opportunity
          for (const opportunity of opportunities) {
            const appsRes = await fetch(
              `/api/opportunities/${opportunity.id}/applications`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (appsRes.ok) {
              const applications = await appsRes.json();
              totalApplications += applications.length;
            } else {
              console.error(
                `Failed to fetch applications for opportunity ${opportunity.id}`
              );
            }
          }

          setStats((prevStats) => ({
            ...prevStats,
            totalOpportunities: opportunities.length,
            activeListings: opportunities.filter((op) => op.status === "open")
              .length,
            applicationsReceived: totalApplications, // Updated to dynamic count
          }));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Welcome, Opportunity Provider 👋
      </h2>
      <p className="text-gray-300 mb-8">
        Manage your posted opportunities and track engagement here.
      </p>

      {error && (
        <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Opportunities */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              Total Opportunities
            </h3>
            <Briefcase className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.totalOpportunities}
          </p>
        </div>

        {/* Applications Received */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              Applications Received
            </h3>
            <Users className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.applicationsReceived}
          </p>
        </div>

        {/* Active Listings */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              Active Listings
            </h3>
            <Activity className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.activeListings}
          </p>
        </div>
      </div>
    </div>
  );
}