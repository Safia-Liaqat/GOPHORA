import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [appliedIds, setAppliedIds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities");
        if (!response.ok) throw new Error("Failed to fetch opportunities");
        const data = await response.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOpportunities();
  }, []);

  const handleApply = async (id) => {
    // Prevent duplicate apply locally
    if (appliedIds.includes(id)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to apply.");

      // Call backend to create the application. Backend expects opportunity_id as a query param.
      const res = await fetch(`/api/applications/apply?opportunity_id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to apply to opportunity");
      }

      // On success add to appliedIds so button shows "Applied"
      setAppliedIds((prev) => [...prev, id]);
      // increment a local delta so dashboard can reflect the new application immediately
      try {
        const key = "applicationsSentDelta";
        const current = parseInt(localStorage.getItem(key) || "0", 10);
        localStorage.setItem(key, String(current + 1));
      } catch (e) {
        // ignore storage errors
      }
    } catch (err) {
      setError(err.message || "Failed to apply");
    }
  };

  const availableLocations = [
    ...new Set(opportunities.map((op) => op.location).filter(Boolean)),
  ];

  const filteredOpportunities = opportunities.filter((op) => {
    const matchesCategory = selectedCategory ? op.type === selectedCategory : true;
    const matchesLocation = selectedLocation ? op.location === selectedLocation : true;
    return matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Browse Opportunities
      </h2>

      {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl">
        {/* Category */}
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-300">Select Category</label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-white/20 p-3 pr-10 rounded-xl w-full bg-[#161B30] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
            >
              <option value="">All Categories</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
              <option value="hackathon">Hackathon</option>
              <option value="project">Project</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-300">Select Location</label>
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={opportunities.length === 0}
              className={`border border-white/20 p-3 pr-10 rounded-xl w-full bg-[#161B30] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200 ${
                opportunities.length === 0 ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <option value="">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc} className="bg-[#161B30] text-white">
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="py-3 px-6 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* No Results */}
      {filteredOpportunities.length === 0 && (
        <p className="text-gray-400 p-4 text-center">No opportunities found for the selected filters.</p>
      )}

      {/* Opportunities Table */}
      {filteredOpportunities.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-lg shadow-[0_0_25px_rgba(158,123,255,0.2)] text-gray-200">
            <thead className="bg-white/10 text-[#C5A3FF] uppercase text-sm tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Tags</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((op) => (
                <tr
                  key={op.id}
                  className="border-t border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <td className="py-3 px-4">{op.title}</td>
                  <td className="py-3 px-4 capitalize">{op.type}</td>
                  <td className="py-3 px-4">{op.location}</td>
                  <td className="py-3 px-4">{(op.tags || []).join(", ")}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleApply(op.id)}
                      disabled={appliedIds.includes(op.id)}
                      className={`py-2 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        appliedIds.includes(op.id)
                          ? "bg-white/20 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] text-white hover:opacity-90"
                      }`}
                    >
                      {appliedIds.includes(op.id) ? "Applied" : "Apply"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
