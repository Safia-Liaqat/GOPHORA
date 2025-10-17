import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function OpportunityForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    type: initialData.type || "job",
    description: initialData.description || "",
    location: initialData.location || "",
    tags: initialData.tags || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Post a New Opportunity
      </h3>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Opportunity Title"
        required
        className="border border-white/20 p-3 rounded-xl bg-[#161B30] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
      />

      {/* Type Dropdown */}
      <div className="relative">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-white/20 p-3 pr-10 rounded-xl bg-[#161B30] text-white appearance-none w-full focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
        >
          <option className="bg-[#161B30]" value="job">Job</option>
          <option className="bg-[#161B30]" value="internship">Internship</option>
          <option className="bg-[#161B30]" value="hackathon">Hackathon</option>
          <option className="bg-[#161B30]" value="project">Project</option>
          <option className="bg-[#161B30]" value="collaboration">Collaboration</option>
          <option className="bg-[#161B30]" value="other">Other</option>
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none"
        />
      </div>

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="5"
        required
        className="border border-white/20 p-3 rounded-xl bg-[#161B30] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
      />

      {/* Location */}
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location (City, Country)"
        required
        className="border border-white/20 p-3 rounded-xl bg-[#161B30] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
      />

      {/* Tags */}
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags / Skills (comma separated)"
        className="border border-white/20 p-3 rounded-xl bg-[#161B30] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A3FF] transition-all duration-200"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200"
      >
        Post Opportunity
      </button>
    </form>
  );
}
