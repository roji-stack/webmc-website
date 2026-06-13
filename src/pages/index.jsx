import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/about.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about content:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7FB] flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium font-serif">Loading...</p>
      </div>
    );
  }

  const heroText = content?.heroText || "We build clinical-grade medical hardware.";
  const missionText = content?.mission || "Our mission is to design, prototype, and validate clinical-grade medical hardware and software systems while training the next generation of biomedical engineering leaders.";
  const descriptionText = content?.description || "Established in 2023, the Western Engineering Biomedical Engineering Club (WE-BMC) is a student-led organization at Western University. We build functional, validated prototypes that address real-world outpatient rehabilitation needs.";

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800 flex flex-col justify-between">
      <Navbar />

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex-grow flex flex-col items-start justify-center">
        {/* Hero Section */}
        <section className="text-left mb-16 max-w-4xl w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-wu-purple mb-4 block">
            Western Engineering Biomedical Engineering Club
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif leading-tight">
            {heroText}
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">
            {descriptionText}
          </p>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full text-left">
            {(content?.focusAreas || [
              {
                title: "Mechanical Engineering",
                description: "Structural design, kinematic joint modeling, and rapid prototyping using selective laser sintering (SLS) to build ergonomic, patient-ready housings."
              },
              {
                title: "Embedded Systems",
                description: "Multi-sensor fusion, low-power Bluetooth (BLE) telemetry pipelines, 6-DOF IMUs, and custom capacitive flex arrays for real-time biomechanical data."
              },
              {
                title: "Clinical Medicine",
                description: "Direct validation with clinical collaborators and Western faculty, focusing on objective recovery metrics and EHR-compatible clinical reporting."
              }
            ]).map((area, idx) => (
              <div key={idx} className="bg-white p-6 border border-wu-purple/40 rounded-none hover:border-wu-purple transition-colors">
                <h3 className="text-sm font-bold uppercase tracking-wider text-wu-purple mb-3 font-serif">
                  {area.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            <Link
              to="/projects"
              className="px-6 py-3 rounded text-sm font-semibold text-white bg-wu-purple hover:bg-wu-purple-light transition-colors shadow-md shadow-wu-purple/10"
            >
              Explore Projects
            </Link>
            <Link
              to="/competitions"
              className="px-6 py-3 rounded text-sm font-semibold text-wu-purple bg-white border border-[#E8E4F0] hover:bg-gray-50 transition-colors"
            >
              Competition Record
            </Link>
          </div>
        </section>

        {/* Mission Statement Callout */}
        <section className="w-full max-w-3xl bg-white border border-[#E8E4F0] rounded-xl p-8 md:p-10 shadow-[0_4px_20px_rgba(79,38,131,0.02)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-wu-purple"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-800 font-serif leading-relaxed italic">
            "{missionText}"
          </p>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}
