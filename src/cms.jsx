import CMS from 'decap-cms-app';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import ProjectPreview from './components/cms/ProjectPreview';
import styles from './styles/globals.css?inline';

// Register Tailwind CSS styling for the preview iframe
CMS.registerPreviewStyle(styles, { raw: true });

// Local helper components for CompetitionsPreview
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-1 h-5 rounded-full flex-shrink-0 bg-wu-purple" />
    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </span>
  </div>
);

const AchievementCard = ({ rank = "Rank", scope = "Scope", detail = "Detail" }) => (
  <div className="flex flex-col items-start p-6 rounded-none border border-wu-purple/50 bg-white">
    <span className="text-5xl font-bold leading-none font-serif text-wu-purple">
      {rank}
    </span>
    <span className="text-xs font-semibold uppercase tracking-widest mt-2 mb-3 text-wu-purple-light">
      {scope}
    </span>
    <div className="w-6 h-px mb-3 bg-wu-purple" />
    <span className="text-xs leading-relaxed text-gray-700">
      {detail}
    </span>
  </div>
);

// AboutPreview component
function AboutPreview({ entry }) {
  const rawData = entry.getIn(['data']);
  if (!rawData) return <div className="p-8 text-center text-gray-500 font-serif">Loading preview data...</div>;

  const data = rawData.toJS();
  
  const heroText = data.heroText || "We build clinical-grade medical hardware.";
  const missionText = data.mission || "Our mission is to design, prototype, and validate clinical-grade medical hardware...";
  const descriptionText = data.description || "Established in 2023...";
  const focusAreas = data.focusAreas || [];

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800 flex flex-col justify-between p-4">
      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex-grow flex flex-col items-start justify-center w-full">
        {/* Hero Section */}
        <section className="text-left mb-16 max-w-4xl w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-wu-purple mb-4 block">
            Western Engineering Biomedical Engineering Club
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif leading-tight">
            {heroText}
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed whitespace-pre-wrap">
            {descriptionText}
          </p>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full text-left">
            {(focusAreas.length > 0 ? focusAreas : [
              {
                title: "Mechanical Engineering",
                description: "Structural design, kinematic joint modeling, and rapid prototyping..."
              },
              {
                title: "Embedded Systems",
                description: "Multi-sensor fusion, low-power Bluetooth (BLE) telemetry pipelines..."
              },
              {
                title: "Clinical Medicine",
                description: "Direct validation with clinical collaborators..."
              }
            ]).map((area, idx) => (
              <div key={idx} className="bg-white p-6 border border-wu-purple/40 rounded-none hover:border-wu-purple transition-colors">
                <h3 className="text-sm font-bold uppercase tracking-wider text-wu-purple mb-3 font-serif">
                  {area?.title || "Focus Area"}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {area?.description || "Description placeholder"}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            <span className="px-6 py-3 rounded text-sm font-semibold text-white bg-wu-purple">
              Explore Projects (Preview Mode)
            </span>
            <span className="px-6 py-3 rounded text-sm font-semibold text-wu-purple bg-white border border-[#E8E4F0]">
              Competition Record (Preview Mode)
            </span>
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

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}

// TeamPreview component
function TeamPreview({ entry, getAsset }) {
  const rawData = entry.getIn(['data']);
  if (!rawData) return <div className="p-8 text-center text-gray-500 font-serif">Loading preview data...</div>;

  const data = rawData.toJS();
  
  let membersList = [];
  if (data && Array.isArray(data.members)) {
    membersList = data.members;
  } else if (data && data.name) {
    membersList = [data];
  }

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
      {/* Page Hero */}
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-14 flex-grow w-full">
        {membersList.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-serif border border-dashed border-gray-200 bg-white">
            No team members available in the roster. Add a member on the left panel to begin.
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 border border-[#E8E4F0] shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {membersList.map((member, index) => {
                if (!member) return null;
                const {
                  name = "Unnamed Member",
                  role = "Role Placeholder",
                  discipline = "Discipline Placeholder",
                  image
                } = member;

                const memberImageSrc = image ? getAsset(image)?.toString() || image : '';

                return (
                  <div
                    key={name + index}
                    className="bg-white rounded-none overflow-hidden border border-wu-purple/40 shadow-[0_1px_4px_rgba(79,38,131,0.04)] hover:border-wu-purple hover:shadow-[0_4px_12px_rgba(79,38,131,0.08)] transition-all duration-300 flex flex-col"
                  >
                    {/* Image / Fallback Container */}
                    <div className="h-56 bg-gradient-to-br from-[#EEEDFE] to-[#F8F7FB] flex items-center justify-center relative overflow-hidden border-b border-wu-purple/40">
                      {memberImageSrc && !memberImageSrc.includes("placeholder") ? (
                        <img
                          src={memberImageSrc}
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      {/* Fallback initials avatar */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wu-purple to-wu-purple-light text-white text-4xl font-bold font-serif"
                        style={{
                          display: memberImageSrc && !memberImageSrc.includes("placeholder") ? "none" : "flex",
                        }}
                      >
                        {getInitials(name) || "?"}
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 font-serif">
                          {name}
                        </h3>
                        <p className="text-xs font-semibold text-wu-purple mb-3">
                          {role}
                        </p>
                      </div>
                      <div className="border-t border-wu-purple/20 pt-3 mt-3">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-wu-purple/60 block uppercase tracking-wider mb-1 text-[10px]">
                            Discipline
                          </span>
                          {discipline}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}

// CompetitionsPreview component
function CompetitionsPreview({ entry, getAsset }) {
  const rawData = entry.getIn(['data']);
  if (!rawData) return <div className="p-8 text-center text-gray-500 font-serif">Loading preview data...</div>;

  const data = rawData.toJS();
  
  let competitionsList = [];
  if (data && Array.isArray(data.competitions)) {
    competitionsList = data.competitions;
  } else if (data && data.name) {
    competitionsList = [data];
  }

  // Use state for activeTab
  const [activeTab, setActiveTab] = React.useState("overview");

  if (competitionsList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FB] p-8 border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No competition records available. Add one on the left panel to begin.</p>
      </div>
    );
  }

  // Use the first competition as the featured entry
  const comp = competitionsList[0] || {};
  const {
    name = "Competition Name",
    acronym = "TBD",
    year = 2026,
    location = "Location",
    project = "Project ID",
    tags = [],
    achievements = [],
    tabs = {}
  } = comp;

  // Set up robust tab handling
  const tabsList = Object.keys(tabs).length > 0 ? tabs : {
    overview: "Overview description placeholder.",
    context: "Context description placeholder.",
    project: "Project description placeholder."
  };
  const TABS = Object.keys(tabsList);
  
  // Guard activeTab
  const currentTab = TABS.includes(activeTab) ? activeTab : (TABS[0] || "overview");

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800">
      {/* Page Hero */}
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Featured competition label */}
        <SectionLabel>Featured Competition</SectionLabel>

        {/* Featured Competition Card */}
        <div className="bg-white rounded-xl overflow-hidden mb-14 border border-[#E8E4F0] shadow-[0_1px_4px_rgba(79,38,131,0.06)]">
          {/* Card header */}
          <div className="px-8 pt-7 pb-6 border-b border-[#E8E4F0]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-none bg-wu-purple-pale text-wu-purple">
                    {year}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} aria-hidden="true" />
                    {location}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-serif">
                  {name}
                </h2>
                {acronym && <p className="text-xs font-mono text-gray-400 mt-1">{acronym}</p>}
              </div>

              {/* tags */}
              <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                {tags && tags.map((tag) => (
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
              {achievements && achievements.map((a, idx) => (
                <AchievementCard key={a.scope || idx} {...a} />
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
                    color: currentTab === tab ? "#4F2683" : "#9CA3AF",
                    fontWeight: currentTab === tab ? 600 : 400,
                    borderColor: currentTab === tab ? "#4F2683" : "transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pb-8 max-w-3xl">
              {currentTab !== "project" && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tabsList[currentTab]}
                </p>
              )}
              {currentTab === "project" && (
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {tabsList[currentTab]}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-wu-purple">
                    View the {project || "MustangMotion"} project (Preview Mode)
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Competition Record Table */}
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
              {competitionsList.map((c, idx) => {
                if (!c) return null;
                const {
                  name = "Competition Name",
                  acronym = "TBD",
                  year = 2026,
                  project = "Project ID",
                  achievements = []
                } = c;
                return (
                  <tr key={c.id || idx} className="border-b border-[#E8E4F0] last:border-b-0">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {name} {acronym ? `(${acronym})` : ''}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{year}</td>
                    <td className="px-6 py-4 text-gray-500 capitalize">{project}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {achievements && achievements.map((a, aIdx) => (
                          <span
                            key={a.scope || aIdx}
                            className="text-xs px-2 py-0.5 rounded-none font-medium border"
                            style={{
                              backgroundColor: a.bgColor || '#f3f4f6',
                              color: a.textColor || '#374151',
                              borderColor: a.borderColor || '#e5e7eb',
                            }}
                          >
                            {a.rank} {a.scope}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="px-6 py-4 text-xs text-gray-400 italic" colSpan={4}>
                  Additional competitions to be announced — follow our updates for the 2025 season.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recruitment CTA */}
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
      
      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}

// Register preview templates
CMS.registerPreviewTemplate('projects', ({ entry, getAsset }) => (
  <MemoryRouter>
    <ProjectPreview entry={entry} getAsset={getAsset} />
  </MemoryRouter>
));
CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('team_members', TeamPreview);
CMS.registerPreviewTemplate('competitions', CompetitionsPreview);
CMS.registerPreviewTemplate('about', AboutPreview);
CMS.registerPreviewTemplate('about_content', AboutPreview);

// Initialize the CMS app manually
CMS.init();

