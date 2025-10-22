import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerificationForm() {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    provider_name: "",
    email: "",
    website_url: "",
    domain_age: "",
    social_url: "",
    video_intro_url: "",
    user_description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/verification/gemini",
        {
          provider_name: formData.provider_name,
          provider_type: providerType,
          data_sources: {
            website_url: formData.website_url || null,
            email: formData.email || null,
            domain_age: formData.domain_age || null,
            social_profiles: formData.social_url
              ? [{ platform: "linkedin", url: formData.social_url }]
              : [],
            video_intro_url: formData.video_intro_url || null,
            user_description: formData.user_description || null,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-b from-[#1E1B2E] to-[#0E0C18]">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(158,123,255,0.3)]">
        <h2 className="text-3xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF]">
          Provider Verification 🔍
        </h2>
        <p className="text-gray-300 mb-8">
          Complete your verification to unlock trust and visibility on GOPHORA.
        </p>

        {/* If verification result is shown */}
        {result ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3 text-green-400">
              Verification Complete
            </h3>
            <p className="text-lg mb-2">Trust Score: {result.trust_score}</p>
            <p className="text-gray-300 mb-4">Reason: {result.reason}</p>
            <button
              onClick={() => navigate("/provider/dashboard")}
              className="bg-[#9E7BFF] px-6 py-2 rounded-lg font-semibold hover:bg-[#8258ff]"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Provider Type */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Provider Type
              </label>
              <div className="relative">
                <select
                  name="provider_type"
                  value={providerType}
                  onChange={(e) => setProviderType(e.target.value)}
                  className="w-full p-3 bg-[#1E1B2E] border border-white/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
                >
                  <option value="institutional">Institutional</option>
                  <option value="professional">Professional</option>
                  <option value="new_talent">New Talent</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Common Fields */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Provider Name
              </label>
              <input
                type="text"
                name="provider_name"
                value={formData.provider_name}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                required
              />
            </div>

            {providerType === "institutional" && (
              <>
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Domain Age (years)
                  </label>
                  <input
                    type="number"
                    name="domain_age"
                    value={formData.domain_age}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </>
            )}

            {providerType === "professional" && (
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Social Profile URL (LinkedIn / Instagram / Behance)
                </label>
                <input
                  type="url"
                  name="social_url"
                  value={formData.social_url}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
            )}

            {providerType === "new_talent" && (
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Video Introduction URL
                </label>
                <input
                  type="url"
                  name="video_intro_url"
                  value={formData.video_intro_url}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Description / Bio
              </label>
              <textarea
                name="user_description"
                value={formData.user_description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#9E7BFF] w-full py-3 rounded-lg font-semibold hover:bg-[#8258ff] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Submit for Verification"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
