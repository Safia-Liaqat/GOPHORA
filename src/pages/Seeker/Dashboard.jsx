import React, { useState, useEffect } from "react";
import { Sparkles, Send, Stars } from "lucide-react";

export default function SeekerDashboard() {
  const [stats, setStats] = useState({
    recommended: 0,
    applicationsSent: 0,
    newMatches: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const [appsRes, oppsRes] = await Promise.all([
          fetch("/api/applications/me", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/opportunities"),
        ]);

        if (appsRes.ok) {
          const applications = await appsRes.json();
            // read any local delta caused by recent applies from Opportunities page
            const delta = parseInt(localStorage.getItem("applicationsSentDelta") || "0", 10) || 0;
            setStats(prevStats => ({
              ...prevStats,
              applicationsSent: applications.length + delta,
            }));
            // clear the delta after consuming it so it doesn't double count on next load
            if (delta > 0) localStorage.removeItem("applicationsSentDelta");
        }

        // Try to get personalized recommendations first (if token exists).
        const localToken = localStorage.getItem("token");
        if (localToken) {
          try {
            const recRes = await fetch('/api/opportunities/recommend', { headers: { Authorization: `Bearer ${localToken}` } });
            if (recRes.ok) {
              const recs = await recRes.json();
              const recommendedCount = Array.isArray(recs) ? recs.length : 0;
              
              const lastVisited = localStorage.getItem('lastVisitedSeekerDashboard');
              const newMatchesCount = lastVisited
                ? recs.filter(opp => new Date(opp.createdAt) > new Date(lastVisited)).length
                : recommendedCount;

              setStats(prev => ({
                ...prev,
                recommended: recommendedCount,
                newMatches: newMatchesCount,
              }));
              
              // we already have personal recs, no need to use the public list as primary
              return;
            }
          } catch (err) {
            console.debug('Personalized recommendations failed, falling back to public opportunities', err);
            // fallthrough to public list
          }
        }

        if (oppsRes.ok) {
          const opportunities = await oppsRes.json();
          setStats(prevStats => ({
            ...prevStats,
            recommended: opportunities.length,
            newMatches: opportunities.length,
          }));
        }

      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();

    return () => {
      localStorage.setItem('lastVisitedSeekerDashboard', new Date().toISOString());
    };
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Welcome, Opportunity Seeker 🌱
      </h2>
      <p className="text-gray-300 mb-8">
        Explore new opportunities tailored to your skills and location.
      </p>

      {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recommended for You */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              Recommended for You
            </h3>
            <Sparkles className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.recommended}</p>
        </div>

        {/* Applications Sent */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              Applications Sent
            </h3>
            <Send className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.applicationsSent}</p>
        </div>

        {/* New Matches */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#C5A3FF]">
              New Matches
            </h3>
            <Stars className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.newMatches}</p>
        </div>
      </div>
    </div>
  );
}
