import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login as:", role, formData);

    if (role === "seeker") navigate("/seeker/dashboard");
    else if (role === "provider") navigate("/provider/dashboard");
    else alert("Please select a role before logging in.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Role Selection */}
      <div className="flex gap-3 mb-2">
        {["seeker", "provider"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-xl font-medium transition-all duration-300
              ${
                role === r
                  ? "bg-gradient-to-r from-[#7F4DFF] to-[#9E7BFF] text-white shadow-[0_0_20px_rgba(158,123,255,0.5)]"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
          >
            {r === "seeker" ? "Seeker" : "Provider"}
          </button>
        ))}
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white tracking-wide
                   bg-gradient-to-r from-[#7F4DFF] to-[#9E7BFF]
                   hover:shadow-[0_0_30px_rgba(158,123,255,0.6)]
                   transition-all duration-300"
      >
        Log In
      </button>
    </form>
  );
}
