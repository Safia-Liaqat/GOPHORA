import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import OpportunityForm from "../../components/forms/OpportunityForm";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [editingOp, setEditingOp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // 🧩 Mock data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Frontend Developer",
        type: "job",
        location: "Karachi, Pakistan",
        tags: "React, Tailwind",
      },
      {
        id: 2,
        title: "AI Internship",
        type: "internship",
        location: "Remote",
        tags: "Python, ML",
      },
      {
        id: 3,
        title: "Hackathon Challenge",
        type: "hackathon",
        location: "Lahore, Pakistan",
        tags: "AI, ML",
      },
    ];
    setOpportunities(mockData);
  }, []);

  // ✏️ Edit, Delete, Update handlers
  const handleEdit = (op) => setEditingOp(op);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      setOpportunities(opportunities.filter((op) => op.id !== id));
    }
  };
  const handleUpdate = (updatedOp) => {
    setOpportunities(
      opportunities.map((op) => (op.id === updatedOp.id ? updatedOp : op))
    );
    setEditingOp(null);
  };

  // 🔍 Filter + Search
  const filteredOpportunities = opportunities.filter((op) => {
    const matchesSearch =
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.tags.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || op.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="text-white">
      <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        My Opportunities
      </h2>

      {/* 🔍 Search + Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 relative">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-[#2A2F55] bg-[#161B30] text-white p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
        />

        {/* Filter Dropdown with Icon */}
        <div className="relative w-full md:w-60">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-[#2A2F55] bg-[#161B30] text-white p-3 pr-10 rounded-xl w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
          >
            <option className="bg-[#161B30]" value="all">All Types</option>
            <option className="bg-[#161B30]" value="job">Job</option>
            <option className="bg-[#161B30]" value="internship">Internship</option>
            <option className="bg-[#161B30]" value="hackathon">Hackathon</option>
            <option className="bg-[#161B30]" value="project">Project</option>
            <option className="bg-[#161B30]" value="collaboration">Collaboration</option>
            <option className="bg-[#161B30]" value="other">Other</option>
          </select>

          {/* Dropdown Icon */}
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none"
          />
        </div>
      </div>

      {/* ✏️ Edit Mode */}
      {editingOp && (
        <div className="mb-6 bg-[#161B30] p-6 rounded-2xl border border-[#2A2F55] shadow-[0_0_25px_rgba(158,123,255,0.2)]">
          <h3 className="text-lg font-semibold mb-4 text-[#C5A3FF]">
            Edit Opportunity
          </h3>
          <OpportunityForm
            onSubmit={(data) => handleUpdate({ ...editingOp, ...data })}
            initialData={editingOp}
          />
          <button
            onClick={() => setEditingOp(null)}
            className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      )}

      {/* 📋 Opportunities Table */}
      {filteredOpportunities.length === 0 ? (
        <p className="text-gray-400 italic">No opportunities found.</p>
      ) : (
        <div className="overflow-x-auto bg-[#161B30]/60 backdrop-blur-lg border border-[#2A2F55] rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.15)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#1E2344]/70 text-[#C5A3FF]">
              <tr>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Tags</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((op) => (
                <tr
                  key={op.id}
                  className="border-t border-[#2A2F55] hover:bg-[#1E2344]/50 transition"
                >
                  <td className="p-4">{op.title}</td>
                  <td className="p-4 capitalize text-gray-300">{op.type}</td>
                  <td className="p-4 text-gray-300">{op.location}</td>
                  <td className="p-4 text-gray-300">{op.tags}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(op)}
                      className="px-4 py-1 bg-[#9E7BFF] rounded-lg hover:bg-[#8B67E6] transition text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(op.id)}
                      className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition text-white"
                    >
                      Delete
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
