import { useState, useEffect } from "react";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
import { Navbar } from "../../components/layout/Navbar";

export default function ProjectsPage() {
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
            Projects
          </h1>
          <p className="text-sm leading-relaxed max-w-2xl opacity-75">
            We take on design challenges that exist at the boundary of mechanical engineering, embedded systems, and clinical medicine — from initial concept through to functional prototype.
          </p>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        <div className="mb-12 max-w-3xl">
          <p className="text-base text-gray-600 leading-relaxed">
            Each project is student-led from problem identification through to validated prototype. We work closely with the engineering faculty at Western and, where possible, with clinical collaborators who can stress-test our assumptions against real patient care workflows.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500 font-medium font-serif">Loading projects...</p>
        ) : (
          <div className="bg-white rounded-xl p-8 border border-[#E8E4F0] shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
            <ProjectGrid projects={projects} />
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
