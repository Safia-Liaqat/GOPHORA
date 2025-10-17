import React, { useState } from "react";

export default function Profile() {
  // Mock provider data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    organization: "Tech Corp",
    website: "https://techcorp.com",
    location: "Karachi, Pakistan",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        My Profile
      </h2>

      <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] max-w-2xl mx-auto flex flex-col gap-5">
        {/* Name */}
        <label className="font-medium text-[#C5A3FF]">Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!editMode}
          className={`w-full border border-white/20 p-3 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200`}
        />

        {/* Email */}
        <label className="font-medium text-[#C5A3FF]">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border border-white/20 p-3 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
        />

        {/* Organization */}
        <label className="font-medium text-[#C5A3FF]">Organization</label>
        <input
          type="text"
          name="organization"
          value={profile.organization}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border border-white/20 p-3 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
        />

        {/* Website */}
        <label className="font-medium text-[#C5A3FF]">Website</label>
        <input
          type="url"
          name="website"
          value={profile.website}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border border-white/20 p-3 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
        />

        {/* Location */}
        <label className="font-medium text-[#C5A3FF]">Location</label>
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border border-white/20 p-3 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
        />

        {/* Buttons */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="w-full py-3 bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
