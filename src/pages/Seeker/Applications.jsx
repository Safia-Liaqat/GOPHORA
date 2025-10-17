import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Frontend Developer",
        type: "job",
        status: "Pending",
        dateApplied: "2025-10-10",
      },
      {
        id: 2,
        title: "AI Internship",
        type: "internship",
        status: "Accepted",
        dateApplied: "2025-09-28",
      },
      {
        id: 3,
        title: "Hackathon Challenge",
        type: "hackathon",
        status: "Rejected",
        dateApplied: "2025-09-15",
      },
    ];
    setApplications(mockData);
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || app.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        backgroundColor: "#0E1224",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(197,163,255,0.1), transparent 50%), radial-gradient(circle at bottom right, rgba(158,123,255,0.1), transparent 50%)",
      }}
    >
      {/* 🌟 Heading */}
      <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        My Applications
      </h2>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-[#2A2F55] bg-[#161B30] text-white p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
        />

        <div className="relative w-full md:w-60">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-[#2A2F55] bg-[#161B30] text-white p-3 pr-10 rounded-xl w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
          >
            <option className="bg-[#161B30]" value="all">
              All Statuses
            </option>
            <option className="bg-[#161B30]" value="pending">
              Pending
            </option>
            <option className="bg-[#161B30]" value="accepted">
              Accepted
            </option>
            <option className="bg-[#161B30]" value="rejected">
              Rejected
            </option>
          </select>

          {/* dropdown icon */}
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none"
          />
        </div>
      </div>

      {/* 🗂 Table Section */}
      {filteredApplications.length === 0 ? (
        <p className="text-gray-400 italic">No applications found.</p>
      ) : (
        <div
          className="overflow-x-auto rounded-2xl border border-[#2A2F55] shadow-[0_0_25px_rgba(158,123,255,0.15)]"
          style={{
            backgroundColor: "rgba(22, 27, 48, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <table
            className="min-w-full text-left text-sm"
            style={{
              backgroundColor: "transparent",
              color: "white",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                backgroundColor: "rgba(30, 35, 68, 0.7)",
                color: "#C5A3FF",
              }}
            >
              <tr>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-[#2A2F55] hover:bg-[#1E2344]/50 transition-all duration-200"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <td className="p-4">{app.title}</td>
                  <td className="p-4 capitalize text-gray-300">{app.type}</td>
                  <td
                    className={`p-4 font-medium ${
                      app.status === "Accepted"
                        ? "text-green-400"
                        : app.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="p-4 text-gray-400">{app.dateApplied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
