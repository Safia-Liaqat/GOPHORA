import React, { useState } from "react";
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
    portfolio_url: "",
    references: "",
    video_intro_url: "",
    reference_name: "",
    reference_comment: "",
    user_description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Mock verification (no backend needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simulate Gemini API delay
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 100);
      const mockData = {
        trust_score: mockScore,
        reason:
          mockScore >= 85
            ? "Professional website and verified email."
            : mockScore >= 40
            ? "Good start, but needs more professional presence."
            : "Insufficient verification data.",
      };
      setResult(mockData);
      setLoading(false);
    }, 1200);
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

        {/* Show Gemini Result */}
        {result ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3 text-green-400">
              Verification Complete ✅
            </h3>
            <p className="text-lg mb-2 text-white">
              Trust Score: {result.trust_score} / 100
            </p>
            <p className="text-gray-300 mb-2">Reason: {result.reason}</p>
            <p className="text-sm text-[#C5A3FF] mb-4 italic">
              Verified by Gemini AI System
            </p>

            {/* Improvement Suggestions */}
            {result.trust_score < 85 && (
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-left max-w-md mx-auto mb-6">
                <p className="text-[#C5A3FF] font-semibold mb-1">
                  💡 How to improve your verification:
                </p>
                <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
                  {providerType === "institutional" && (
                    <>
                      <li>
                        Add complete “About Us” and “Contact” pages on your
                        website.
                      </li>
                      <li>Use a corporate email (e.g., info@yourdomain.com).</li>
                    </>
                  )}
                  {providerType === "professional" && (
                    <>
                      <li>
                        Connect more active social profiles (LinkedIn, Instagram).
                      </li>
                      <li>
                        Increase posting consistency and engagement rate.
                      </li>
                    </>
                  )}
                  {providerType === "new_talent" && (
                    <>
                      <li>
                        Upload a clear introduction video (30–60 seconds).
                      </li>
                      <li>
                        Ask early users for positive reviews to raise your
                        score.
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setResult(null)}
                className="bg-[#6B5ACD] px-6 py-2 rounded-lg font-semibold hover:bg-[#5948b6]"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/provider/dashboard")}
                className="bg-[#9E7BFF] px-6 py-2 rounded-lg font-semibold hover:bg-[#8258ff]"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          // Verification Form
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Provider Type */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Provider Type
              </label>
              <select
                name="provider_type"
                value={providerType}
                onChange={(e) => setProviderType(e.target.value)}
                className="w-full p-3 bg-[#2B2540] text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E7BFF]"
              >
                <option value="institutional">
                  Institutional (Company / Organization)
                </option>
                <option value="professional">
                  Professional / Freelancer
                </option>
                <option value="new_talent">New Talent / Explorer</option>
              </select>
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

            {/* Institutional Fields */}
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

            {/* Professional / Freelancer Fields */}
            {providerType === "professional" && (
              <>
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
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Portfolio / Website (optional)
                  </label>
                  <input
                    type="url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    References / Reviews (optional)
                  </label>
                  <textarea
                    name="references"
                    rows={2}
                    value={formData.references}
                    onChange={handleChange}
                    placeholder="Add short feedback or client names"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </>
            )}

            {/* New Talent / Explorer Fields */}
            {providerType === "new_talent" && (
              <>
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
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Personal Reference (optional)
                  </label>
                  <input
                    type="text"
                    name="reference_name"
                    value={formData.reference_name}
                    onChange={handleChange}
                    placeholder="Name of a teacher, friend, or community member"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Reference Comment
                  </label>
                  <textarea
                    name="reference_comment"
                    rows={2}
                    value={formData.reference_comment}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </>
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
