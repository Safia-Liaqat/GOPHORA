import React from "react";
import { FaLightbulb, FaUsers, FaGlobe, FaCode, FaDatabase } from "react-icons/fa";
import FounderImage from "../../assets/Founder.png"; 
import FrontendDeveloper from "../../assets/FrontendDeveloper.png"
import AiEngineer from "../../assets/AI Engineer.jpeg"

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

      {/* --- Founder Section --- */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img
              src={FounderImage}
              alt="Founder Andrea Covarrubias"
              className="rounded-2xl shadow-lg w-80 h-80 object-cover"
            />
          </div>

          {/* Right: Founder Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Founder</h2>
            <p className="text-gray-600 mb-4">
              <strong>Andrea V. Covarrubias (Visnity)</strong> — a visionary Product Owner and
              Founder Institute alumni from Silicon Valley — brings over 15 years of experience
              in designing systems that connect people through purpose and opportunity.
            </p>
            <p className="text-gray-600 mb-4">
              She is dedicated to harmonizing technology with humanity, empowering people to thrive in
              a shared future that is inclusive, purposeful, and full of discovery.
            </p>
            <h3 className="text-2xl font-semibold text-indigo-700">Andrea V. Covarrubias</h3>
            <p className="text-gray-500">Founder, Gophora</p>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Team</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* - Frontend */}
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <img
                src={FrontendDeveloper}
                alt="Safia - Frontend Developer"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700 mb-1">Safia Liaqat</h3>
              <p className="text-gray-500 mb-3">Frontend Developer</p>
              <p className="text-gray-600 text-sm">
                 A front-end developer focused on building efficient, scalable, and user-centered web applications.
  Skilled in React and modern JavaScript frameworks, she engineers Gophora’s interface for seamless usability and performance.
                </p>
              <FaCode className="text-indigo-600 text-3xl mx-auto mt-4" />
            </div>

            {/* Gia - Backend & AI */}
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <img
                src={AiEngineer}
                alt="Gia Huy Phung - Backend & AI Developer"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700 mb-1">Gia Huy Phung (Jerry)</h3>
              <p className="text-gray-500 mb-3">Backend & AI Systems Developer</p>
              <p className="text-gray-600 text-sm">
                       Data analyst with an MS in Data Science (4.0 GPA) from the University of the Pacific.
  Skilled in Python, SQL, and Tableau — building ML pipelines and optimizing Gophora’s data systems
                      </p>
              <FaDatabase className="text-indigo-600 text-3xl mx-auto mt-4" />
            </div>

            {/* Founder - Andrea */}
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <img
                src={FounderImage}
                alt="Andrea Covarrubias"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700 mb-1">Andrea V. Covarrubias</h3>
              <p className="text-gray-500 mb-3">Founder & Product Owner</p>
              <p className="text-gray-600 text-sm">
                Guiding Gophora’s vision to connect humanity through technology, purpose, and opportunity.
              </p>
              <FaLightbulb className="text-indigo-600 text-3xl mx-auto mt-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
