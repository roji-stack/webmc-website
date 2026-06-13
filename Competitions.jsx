/**
 * WE-BMC Competitions Page
 * ─────────────────────────────────────────────────────────────────
 * Single-file React component using Tailwind CSS.
 * WU Purple (#4F2683) is injected via inline styles where exact
 * brand fidelity is required; layout/spacing uses Tailwind utilities.
 *
 * Prerequisites:
 *   - Tailwind extended with wu-purple (see tailwind.config.js in ARCHITECTURE.md)
 *   - lucide-react installed:  npm install lucide-react
 *
 * To swap hardcoded copy for data-driven content, replace the
 * `competition` constant with an import from `src/data/competitions.js`.
 * ─────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";

// ── Brand token ──────────────────────────────────────────────────
const WU_PURPLE = "#4F2683";
const WU_PURPLE_PALE = "#EEEDFE";
const BORDER_COLOR = "#E8E4F0";
const PAGE_BG = "#F8F7FB";

// ── Static data (swap for import from src/data/competitions.js) ──
const competition = {
  id: "tnbc-2024",
  name: "True North Biomedical Competition",
  acronym: "TNBC",
  year: "2024",
  location: "Ontario & National",
  project: "MustangMotion",
  tags: ["Medical Devices", "Diagnostics", "Wearables", "Biomechanics"],
  achievements: [
    {
      rank: "1st",
      scope: "Provincial",
      label: "Ontario Champion",
      detail: "Top score among all Ontario university teams",
      textColor: "#92400e",
      bgColor: "#fffbeb",
      borderColor: "#fcd34d",
    },
    {
      rank: "4th",
      scope: "National",
      label: "National Finalist",
      detail: "Top 4 finish among all Canadian university teams",
      textColor: "#1e3a8a",
      bgColor: "#eff6ff",
      borderColor: "#93c5fd",
    },
  ],
  tabs: {
    overview: `Canada's foremost student biomedical engineering competition, TNBC challenges
    university teams to design, prototype, and clinically validate a novel medical device.
    Submissions are evaluated across four weighted criteria: technical engineering innovation,
    clinical relevance and addressable unmet need, commercialization viability, and presentation
    quality. Judging panels are composed of practicing biomedical engineers, clinical specialists,
    and representatives from the venture capital and medical device industry — making TNBC one
    of the most technically demanding and clinically-informed competitions in Canadian engineering
    education.`,

    context: `WE-BMC entered TNBC 2024 with MustangMotion, our smart diagnostic knee brace.
    After advancing through the provincial adjudication round with the top score among all Ontario
    university teams, the club represented the province at the national level — ultimately finishing
    4th against teams from Canada's top engineering programs. Over 30 university teams competed at
    the national stage. The provincial championship reflects the clinical plausibility of the
    MustangMotion platform — a standard set by practicing healthcare professionals on the panel.
    The national placement is a benchmark we intend to surpass.`,
  },
};

const navItems = ["About", "Projects", "Competitions", "Team"];

// ── Sub-components ───────────────────────────────────────────────

/**
 * AchievementCard
 * Displays a single placement result (rank + scope + detail).
 */
function AchievementCard({ rank, scope, detail, textColor, bgColor, borderColor }) {
  return (
    <div
      className="flex flex-col items-start p-5 rounded-lg border"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <span
        className="text-5xl font-bold leading-none"
        style={{
          color: textColor,
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {rank}
      </span>
      <span
        className="text-xs font-semibold uppercase tracking-widest mt-2 mb-3"
        style={{ color: textColor }}
      >
        {scope}
      </span>
      <div
        className="w-6 h-px mb-3"
        style={{ backgroundColor: borderColor }}
      />
      <span className="text-xs leading-relaxed" style={{ color: textColor, opacity: 0.82 }}>
        {detail}
      </span>
    </div>
  );
}

/**
 * SectionLabel
 * Eyebrow label with left-border accent — reusable across pages.
 */
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-1 h-5 rounded-full flex-shrink-0"
        style={{ backgroundColor: WU_PURPLE }}
      />
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {children}
      </span>
    </div>
  );
}

// ── Page Component ───────────────────────────────────────────────

const TABS = ["overview", "context", "project"];

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const comp = competition;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: PAGE_BG,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav
        className="bg-white sticky top-0 z-20"
        style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: WU_PURPLE }}
            >
              WE
            </div>
            <span
              className="text-sm font-semibold hidden sm:block"
              style={{ color: WU_PURPLE }}
            >
              Western Engineering BMC
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="transition-colors no-underline"
                style={{
                  color: item === "Competitions" ? WU_PURPLE : "#6B7280",
                  fontWeight: item === "Competitions" ? 600 : 400,
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            className="text-xs font-semibold px-4 py-2 rounded text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: WU_PURPLE }}
          >
            Join Club
          </button>
        </div>
      </nav>

      {/* ── Page Hero ──────────────────────────────────────────── */}
      <header
        className="py-14 px-6 text-white"
        style={{ backgroundColor: WU_PURPLE }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-55">
            WE-BMC
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
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

        {/* ── TNBC Feature Card ──────────────────────────────── */}
        <div
          className="bg-white rounded-xl overflow-hidden mb-14"
          style={{
            border: `1px solid ${BORDER_COLOR}`,
            boxShadow: "0 1px 4px rgba(79,38,131,0.06)",
          }}
        >

          {/* Card header */}
          <div
            className="px-8 pt-7 pb-6"
            style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

              {/* Left: name + meta */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: WU_PURPLE_PALE, color: WU_PURPLE }}
                  >
                    {comp.year}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} aria-hidden="true" />
                    {comp.location}
                  </span>
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {comp.name}
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-1">{comp.acronym}</p>
              </div>

              {/* Right: discipline tags */}
              <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                {comp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full text-gray-500"
                    style={{ border: `1px solid ${BORDER_COLOR}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement stats */}
          <div
            className="px-8 py-7"
            style={{
              borderBottom: `1px solid ${BORDER_COLOR}`,
              backgroundColor: "#FDFCFF",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Results
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-xs">
              {comp.achievements.map((a) => (
                <AchievementCard key={a.scope} {...a} />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 pt-6">
            <div
              className="flex gap-5 mb-5"
              style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-sm pb-3 capitalize transition-colors"
                  style={{
                    color: activeTab === tab ? WU_PURPLE : "#9CA3AF",
                    fontWeight: activeTab === tab ? 600 : 400,
                    borderBottom: `2px solid ${activeTab === tab ? WU_PURPLE : "transparent"}`,
                    marginBottom: "-1px",
                    background: "none",
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${activeTab === tab ? WU_PURPLE : "transparent"}`,
                    paddingBottom: "12px",
                    cursor: "pointer",
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
                    This competition entry was built around{" "}
                    <strong className="text-gray-800 font-semibold">MustangMotion</strong> —
                    WE-BMC's flagship smart diagnostic knee brace. The device integrates
                    embedded flex sensing, real-time gait analysis, and a Bluetooth-enabled
                    clinical reporting pipeline into an ergonomic, patient-ready housing
                    designed for post-operative rehabilitation monitoring and outpatient
                    biomechanical screening.
                  </p>
                  <a
                    href="/projects/mustangmotion"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity no-underline"
                    style={{ color: WU_PURPLE }}
                  >
                    View the MustangMotion project
                    <ChevronRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Competition Record ──────────────────────────────── */}
        <SectionLabel>Competition Record</SectionLabel>

        <div
          className="bg-white rounded-xl overflow-hidden mb-14"
          style={{ border: `1px solid ${BORDER_COLOR}` }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  backgroundColor: "#FDFCFF",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
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
              <tr style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}>
                <td className="px-6 py-4 font-medium text-gray-800">
                  True North Biomedical Competition
                </td>
                <td className="px-6 py-4 text-gray-500">2024</td>
                <td className="px-6 py-4 text-gray-500">MustangMotion</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: "#fffbeb", color: "#92400e" }}
                    >
                      1st Provincial
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}
                    >
                      4th National
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="px-6 py-4 text-xs text-gray-400 italic"
                  colSpan={4}
                >
                  Additional competitions to be announced — follow our updates for the
                  2025 season.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Recruitment CTA ────────────────────────────────── */}
        <div
          className="rounded-xl py-12 px-8 text-center text-white"
          style={{ backgroundColor: WU_PURPLE }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-55">
            Interested in competing?
          </p>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Join WE-BMC for the 2025 season
          </h3>
          <p className="text-sm leading-relaxed max-w-md mx-auto mb-7 opacity-72">
            We're actively recruiting engineers, designers, and clinically-minded students
            for the next competition cycle. No prior competition experience required — just
            a drive to build things that work in the real world.
          </p>
          <button
            className="px-6 py-3 rounded text-sm font-semibold bg-white hover:opacity-90 transition-opacity"
            style={{ color: WU_PURPLE }}
          >
            Apply to Join →
          </button>
        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="text-center py-8 text-xs text-gray-400"
        style={{ borderTop: `1px solid ${BORDER_COLOR}` }}
      >
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London,
        Ontario
      </footer>

    </div>
  );
}
