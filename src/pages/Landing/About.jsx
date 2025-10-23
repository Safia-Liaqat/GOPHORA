import React from "react";
import { FaLightbulb, FaUsers, FaGlobe } from "react-icons/fa";
import Image from "../../assets/about-bg.jpg"

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* --- Header --- */}
      <section className="text-center py-20 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Gophora</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Connecting Opportunity Seekers with Providers — bridging the gap between talent and innovation.
        </p>
      </section>

      {/* --- Mission Section --- */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <FaLightbulb className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To build a future where opportunities reach everyone, regardless of their background or location.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <FaUsers className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            Empower seekers and providers through a seamless platform that promotes growth, collaboration, and equity.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <FaGlobe className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Our Impact</h3>
          <p className="text-gray-600">
            Gophora is redefining access — making it easier for people to find jobs, projects, and collaborations across the world.
          </p>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          {/* Left: Image or placeholder */}
          <div className="flex justify-center">
            <img
              src={Image}
              alt="Founder"
              className="rounded-2xl shadow-lg w-80 h-80 object-cover"
            />
          </div>

          {/* Right: Founder Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Founder</h2>
            <p className="text-gray-600 mb-4">
              Gophora was founded with a mission to make opportunity discovery effortless and inclusive.
              Every feature and function reflects our belief in human connection and digital empowerment.
            </p>
            <h3 className="text-2xl font-semibold text-indigo-700">
              Andrea V. Covarrubias Centellas
            </h3>
            <p className="text-gray-500">Founder, Gophora</p>
          </div>
        </div>
      </section>
    </div>
  );
}
