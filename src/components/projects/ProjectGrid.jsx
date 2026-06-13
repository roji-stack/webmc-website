import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-white p-8">
        <p className="text-gray-400 font-medium">No projects available right now.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
