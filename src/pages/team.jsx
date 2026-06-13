import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/team.json")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
        setLoading(false);
      });
  }, []);

  // Function to get initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800 flex flex-col justify-between">
      <Navbar />

      {/* ── Page Hero ──────────────────────────────────────────── */}
      <header className="py-14 px-6 text-white bg-wu-purple">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-55">
            WE-BMC
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            Our Team
          </h1>
          <p className="text-sm leading-relaxed max-w-lg opacity-75">
            We are a multidisciplinary group of Western University students uniting engineering design, software development, and clinical research to improve patient care.
          </p>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14 flex-grow w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium font-serif">Loading team roster...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 border border-[#E8E4F0] shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <div
                  key={member.name || index}
                  className="bg-white rounded-none overflow-hidden border border-wu-purple/40 shadow-[0_1px_4px_rgba(79,38,131,0.04)] hover:border-wu-purple hover:shadow-[0_4px_12px_rgba(79,38,131,0.08)] transition-all duration-300 flex flex-col"
                >
                  {/* Image / Fallback Container */}
                  <div className="h-56 bg-gradient-to-br from-[#EEEDFE] to-[#F8F7FB] flex items-center justify-center relative overflow-hidden border-b border-wu-purple/40">
                    {member.image && !member.image.includes("placeholder") ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          // Fallback to initials avatar if image fails to load
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    {/* Fallback initials avatar */}
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wu-purple to-wu-purple-light text-white text-4xl font-bold font-serif"
                      style={{
                        display: member.image && !member.image.includes("placeholder") ? "none" : "flex",
                      }}
                    >
                      {getInitials(member.name)}
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 font-serif">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-wu-purple mb-3">
                        {member.role}
                      </p>
                    </div>
                    <div className="border-t border-wu-purple/20 pt-3 mt-3">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-wu-purple/60 block uppercase tracking-wider mb-1 text-[10px]">
                          Discipline
                        </span>
                        {member.discipline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}
