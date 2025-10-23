import React, { useState, useEffect } from "react";
import { Sparkles, Send, Stars } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

export default function SeekerDashboard() {
  const [stats, setStats] = useState({
    recommended: 0,
    applicationsSent: 0,
    newMatches: 0,
  });
  const [error, setError] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const navigate = useNavigate();

  // Colored icons for different opportunity types
  const icons = {
    job: L.divIcon({
      className: "custom-marker",
      html: `<i class="fa-solid fa-briefcase" style="color:#3b82f6; font-size:24px;"></i>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    }),
    education: L.divIcon({
      className: "custom-marker",
      html: `<i class="fa-solid fa-graduation-cap" style="color:#f97316; font-size:24px;"></i>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    }),
    hobby: L.divIcon({
      className: "custom-marker",
      html: `<i class="fa-solid fa-star" style="color:#22c55e; font-size:24px;"></i>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    }),
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const [appsRes, oppsRes] = await Promise.all([
          fetch("/api/applications/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/opportunities"),
        ]);

        if (appsRes.ok) {
          const applications = await appsRes.json();
          const delta =
            parseInt(localStorage.getItem("applicationsSentDelta") || "0", 10) ||
            0;
          setStats((prevStats) => ({
            ...prevStats,
            applicationsSent: applications.length + delta,
          }));
          if (delta > 0) localStorage.removeItem("applicationsSentDelta");
        }

        if (oppsRes.ok) {
          const opps = await oppsRes.json();
          setOpportunities(opps);
          setStats((prevStats) => ({
            ...prevStats,
            recommended: opps.length,
            newMatches: opps.length,
          }));
        }

        // Personalized recommendations (optional)
        const localToken = localStorage.getItem("token");
        if (localToken) {
          try {
            const recRes = await fetch("/api/opportunities/recommend", {
              headers: { Authorization: `Bearer ${localToken}` },
            });
            if (recRes.ok) {
              const recs = await recRes.json();
              const recommendedCount = Array.isArray(recs) ? recs.length : 0;

              const lastVisited =
                localStorage.getItem("lastVisitedSeekerDashboard");
              const newMatchesCount = lastVisited
                ? recs.filter(
                    (opp) => new Date(opp.createdAt) > new Date(lastVisited)
                  ).length
                : recommendedCount;

              setStats((prev) => ({
                ...prev,
                recommended: recommendedCount,
                newMatches: newMatchesCount,
              }));

              return; // already have personal recs
            }
          } catch (err) {
            console.debug(
              "Personalized recommendations failed, falling back to public opportunities",
              err
            );
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();

    return () => {
      localStorage.setItem(
        "lastVisitedSeekerDashboard",
        new Date().toISOString()
      );
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

      {error && (
        <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recommended */}
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
            <h3 className="text-lg font-semibold text-[#C5A3FF]">New Matches</h3>
            <Stars className="w-6 h-6 text-[#C5A3FF]" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.newMatches}</p>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="h-[450px] rounded-xl overflow-hidden relative mt-6">
        <MapContainer
          center={[30.3753, 69.3451]}
          zoom={3}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Dark Blue Basemap */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {opportunities.map((opp) => (
            <Marker
              key={opp.id}
              position={[opp.lat, opp.lng]}
              icon={icons[opp.type]}
            >
              <Popup className="bg-[#1f254a] text-white rounded-xl p-3 shadow-lg">
                <h3 className="font-semibold text-lg">{opp.title}</h3>
                <p className="text-sm text-gray-300">
                  {opp.city}, {opp.country}
                </p>
                <button
                  onClick={() => navigate(`/opportunity/${opp.id}`)}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  Jump In
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
