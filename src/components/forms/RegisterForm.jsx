import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterForm({ role, setRole }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    skills: "",
    organizationName: "",
    website: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // ✅ Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await res.json();
        if (data.data) {
          const countryList = data.data.map((c) => ({
            name: c.country,
            cities: c.cities,
          }));
          setCountries(countryList);
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  // ✅ Update cities when a country is selected
  useEffect(() => {
    if (!formData.country) return;

    setLoadingCities(true);
    const selectedCountry = countries.find(
      (c) => c.name === formData.country
    );

    if (selectedCountry) {
      setCities(selectedCountry.cities.sort());
    } else {
      setCities([]);
    }

    setLoadingCities(false);
  }, [formData.country, countries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
          role: role,
          country: formData.country,
          city: formData.city,
          skills: formData.skills,
          organizationName: formData.organizationName,
          website: formData.website,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to register.");
      }

      alert("Registration successful! Please log in.");
      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center">
          {error}
        </div>
      )}
      {/* Common Fields */}
      {["name", "email", "password", "confirmPassword"].map((field) => (
        <input
          key={field}
          type={
            field.includes("password")
              ? "password"
              : field === "email"
              ? "email"
              : "text"
          }
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={
            field === "confirmPassword"
              ? "Confirm Password"
              : field.charAt(0).toUpperCase() + field.slice(1)
          }
          required
          className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                     p-3 rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-[#9E7BFF] transition-all duration-300"
        />
      ))}

      {/* Country Dropdown */}
      <select
        name="country"
        value={formData.country}
        onChange={(e) =>
          setFormData({ ...formData, country: e.target.value, city: "" })
        }
        required
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300"
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name} className="text-black">
            {country.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        disabled={!formData.country || loadingCities}
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300 disabled:opacity-50"
      >
        <option value="">
          {loadingCities
            ? "Loading cities..."
            : formData.country
            ? "Select City"
            : "Select Country first"}
        </option>
        {cities.map((city) => (
          <option key={city} value={city} className="text-black">
            {city}
          </option>
        ))}
      </select>

      {/* Conditional Fields */}
      {role === "seeker" && (
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="List your key skills (e.g. React, Python, UI Design)"
          rows="3"
          className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                     p-3 rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-[#9E7BFF] transition-all duration-300"
        />
      )}

      {role === "provider" && (
        <>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            placeholder="Organization / Company Name"
            required
            className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                       p-3 rounded-xl focus:outline-none focus:ring-2 
                       focus:ring-[#9E7BFF] transition-all duration-300"
          />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website or LinkedIn (optional)"
            className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                       p-3 rounded-xl focus:outline-none focus:ring-2 
                       focus:ring-[#9E7BFF] transition-all duration-300"
          />
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white tracking-wide
                   bg-gradient-to-r from-[#7F4DFF] to-[#9E7BFF]
                   hover:shadow-[0_0_30px_rgba(158,123,255,0.6)]
                   transition-all duration-300"
      >
        Register as {role === "seeker" ? "Opportunity Seeker" : "Provider"}
      </button>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => setRole("")}
        className="mt-3 text-sm text-gray-400 hover:text-gray-200 transition"
      >
        ← Go back
      </button>
    </form>
  );
}
