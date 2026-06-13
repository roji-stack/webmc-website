import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MMHero } from "../../components/projects/mustang-motion/MMHero";
import { MMSpecPanel } from "../../components/projects/mustang-motion/MMSpecPanel";
import { MMClinicalPanel } from "../../components/projects/mustang-motion/MMClinicalPanel";
import { MMTechSpecs } from "../../components/projects/mustang-motion/MMTechSpecs";
import { Navbar } from "../../components/layout/Navbar";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7FB] flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium font-serif">Loading project details...</p>
      </div>
    );
  }

  // Find project
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F7FB] flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Project Not Found</h2>
        <p className="text-gray-500 mb-6">The project you are looking for does not exist or has been moved.</p>
        <Link to="/projects" className="px-4 py-2 bg-wu-purple text-white text-sm font-semibold rounded hover:bg-wu-purple-light transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Render specific layout for MustangMotion
  const isMustangMotion = project.id === "mustangmotion";

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero Header ────────────────────────────────────────── */}
      {isMustangMotion ? (
        <MMHero project={project} />
      ) : (
        <header className="py-14 px-6 text-white bg-wu-purple">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{project.title}</h1>
            <p className="text-lg leading-relaxed max-w-2xl opacity-80">{project.tagline}</p>
          </div>
        </header>
      )}

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* The Problem Section */}
        <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
          <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">The Problem</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {project.detail.problem}
          </p>
        </section>

        {/* MustangMotion Specific Sections */}
        {isMustangMotion && (
          <>
            <MMSpecPanel mechanical={project.detail.mechanical} />
            <MMClinicalPanel clinical={project.detail.clinical} />
            <MMTechSpecs specs={project.detail.specs} />

            {/* Competition Highlight */}
            <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
              <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">Competition Highlight</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                MustangMotion was WE-BMC's entry into the 2024 True North Biomedical Competition — where the device earned <strong className="text-gray-800 font-semibold">1st place provincially</strong> and <strong className="text-gray-800 font-semibold">4th place nationally</strong> among all Canadian university teams.
              </p>
              <Link to="/competitions" className="inline-flex items-center gap-1 text-sm font-semibold text-wu-purple hover:text-wu-purple-light transition-colors">
                View competition details & achievements →
              </Link>
            </section>
          </>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link to="/projects" className="text-sm font-semibold text-wu-purple hover:text-wu-purple-light transition-colors inline-flex items-center gap-1">
            ← Back to all projects
          </Link>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}
