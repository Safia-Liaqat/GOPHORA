import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0A0F2C] text-white text-center py-40">
        Loading Opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0A0F2C] text-red-500 text-center py-40">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="relative bg-[#0A0F2C] text-white py-20 px-6 overflow-hidden">
      {/* ... (Background and Header elements) ... */}
      <div className="relative z-[2] max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-extrabold">
          Latest <span className="text-[#A28EFF]">Opportunities</span>
        </h2>
        <p className="text-gray-300 text-base mt-3">
          Explore missions and collaborations from across the globe
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {opportunities.map((opp, index) => (
          <div
            key={index}
            className="bg-[#161B30]/80 border border-[#1F254A] rounded-2xl p-6
                       hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(162,142,255,0.25)]
                       transition-all duration-300 ease-in-out flex flex-col justify-between"
          >
            {/* --- THIS CONTENT MUST BE PRESENT --- */}
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-base truncate">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-gray-400">{opp.postedBy?.name}</p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium text-[#A28EFF] border border-[#A28EFF]/30 bg-[#A28EFF]/10">
                  {opp.type}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
                {opp.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {opp.tags && opp.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#1F254A] text-[#A28EFF] text-[11px] px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* --- END OF CONTENT --- */}

            {/* --- BUTTON WITH ONCLICK HANDLER --- */}
            <button
              onClick={() => navigate("/login")}
              className="mt-auto bg-gradient-to-r from-[#6D5DD3] to-[#7E6DF4] hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] transition-all text-white text-sm font-semibold py-2 rounded-lg w-full"
            >
              🚀 Apply to Mission
            </button>
            {/* --- END OF BUTTON --- */}

          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="relative z-[2] text-center mt-12">
        <button
          onClick={() => navigate("/opportunities/all")}
          className="flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg transition-all text-sm mx-auto"
        >
          🔍 Explore More Missions
        </button>
      </div>
    </section>
  );
}