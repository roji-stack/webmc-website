import { useState, useEffect } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { SectionLabel } from "../components/ui/SectionLabel";
import { AchievementCard } from "../components/competitions/AchievementCard";
import { Navbar } from "../components/layout/Navbar";

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch("/content/competitions.json")
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.competitions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FB]">
        <p className="text-gray-500 font-medium font-serif">Loading competition details...</p>
      </div>
    );
  }

  if (!competitions || competitions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FB]">
        <p className="text-gray-500 font-medium">No competition records available.</p>
      </div>
    );
  }

  // Use the first competition as the featured entry
  const comp = competitions[0];
  const TABS = Object.keys(comp.tabs || {});

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Page Hero ──────────────────────────────────────────── */}
      <header className="py-14 px-6 text-white bg-wu-purple">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-55">
            WE-BMC
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            Competitions
          </h1>
          <p className="text-sm leading-relaxed max-w-lg opacity-75">
            We challenge ourselves against the best biomedical engineering minds in Canada —
            designing devices that matter and defending them before industry experts.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-7 text-xs opacity-55">
            <span>1 National finalist appearance</span>
            <span className="hidden sm:inline">·</span>
            <span>1 Provincial championship</span>
            <span className="hidden sm:inline">·</span>
            <span>1 Featured project</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14">

        {/* Featured competition label */}
        <SectionLabel>Featured Competition</SectionLabel>

        {/* ── Featured Competition Card ────────────────────────── */}
        <div className="bg-white rounded-xl overflow-hidden mb-14 border border-[#E8E4F0] shadow-[0_1px_4px_rgba(79,38,131,0.06)]">

          {/* Card header */}
          <div className="px-8 pt-7 pb-6 border-b border-[#E8E4F0]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: name + meta */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-none bg-wu-purple-pale text-wu-purple">
                    {comp.year}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} aria-hidden="true" />
                    {comp.location}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-serif">
                  {comp.name}
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-1">{comp.acronym}</p>
              </div>

              {/* Right: discipline tags */}
              <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                {comp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-none text-wu-purple/80 bg-wu-purple/5 border border-wu-purple/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement stats */}
          <div className="px-8 py-7 border-b border-[#E8E4F0] bg-[#FDFCFF]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Results
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              {comp.achievements.map((a) => (
                <AchievementCard key={a.scope} {...a} />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 pt-6">
            <div className="flex gap-5 mb-5 border-b border-[#E8E4F0]">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-sm pb-3 capitalize transition-all border-b-2 cursor-pointer bg-none outline-none focus:outline-none"
                  style={{
                    color: activeTab === tab ? "#4F2683" : "#9CA3AF",
                    fontWeight: activeTab === tab ? 600 : 400,
                    borderColor: activeTab === tab ? "#4F2683" : "transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pb-8 max-w-3xl">
              {activeTab !== "project" && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {comp.tabs[activeTab]}
                </p>
              )}
              {activeTab === "project" && (
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {comp.tabs[activeTab]}
                  </p>
                  <a
                    href={`/projects/${comp.project}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity no-underline text-wu-purple"
                  >
                    View the MustangMotion project
                    <ChevronRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Competition Record Table ─────────────────────────── */}
        <SectionLabel>Competition Record</SectionLabel>

        <div className="bg-white rounded-xl overflow-hidden mb-14 border border-[#E8E4F0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FDFCFF] border-b border-[#E8E4F0]">
                {["Competition", "Year", "Project", "Result"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitions.map((c) => (
                <tr key={c.id} className="border-b border-[#E8E4F0] last:border-b-0">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {c.name} ({c.acronym})
                  </td>
                  <td className="px-6 py-4 text-gray-500">{c.year}</td>
                  <td className="px-6 py-4 text-gray-500 capitalize">{c.project}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {c.achievements.map((a) => (
                        <span
                          key={a.scope}
                          className="text-xs px-2 py-0.5 rounded-none font-medium border"
                          style={{
                            backgroundColor: a.bgColor,
                            color: a.textColor,
                            borderColor: a.borderColor,
                          }}
                        >
                          {a.rank} {a.scope}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4 text-xs text-gray-400 italic" colSpan={4}>
                  Additional competitions to be announced — follow our updates for the 2025 season.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Recruitment CTA ─────────────────────────────────── */}
        <div className="rounded-xl py-12 px-8 text-center text-white bg-wu-purple">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-55">
            Interested in competing?
          </p>
          <h3 className="text-2xl font-bold mb-3 font-serif">
            Join WE-BMC for the 2025 season
          </h3>
          <p className="text-sm leading-relaxed max-w-md mx-auto mb-7 opacity-72">
            We're actively recruiting engineers, designers, and clinically-minded students
            for the next competition cycle. No prior competition experience required — just
            a drive to build things that work in the real world.
          </p>
          <button className="px-6 py-3 rounded text-sm font-semibold bg-white text-wu-purple hover:bg-opacity-95 transition-opacity">
            Apply to Join →
          </button>
        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>

    </div>
  );
}
