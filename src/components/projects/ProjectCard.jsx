import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project }) {
  const { slug, title, tagline, status, year, disciplines, coverImage, summary } = project;

  return (
    <div className="bg-white rounded-none overflow-hidden border border-wu-purple/40 shadow-[0_1px_4px_rgba(79,38,131,0.04)] flex flex-col h-full hover:border-wu-purple hover:shadow-[0_4px_12px_rgba(79,38,131,0.08)] transition-all duration-300">
      {/* Cover Image */}
      <div className="h-48 bg-[#EEEDFE] flex items-center justify-center overflow-hidden border-b border-wu-purple/40 relative">
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover z-10"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-[#EEEDFE] text-wu-purple text-lg font-bold font-serif opacity-40">
          {title}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-none bg-[#EEEDFE] text-wu-purple">
            {year}
          </span>
          <StatusBadge status={status} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-400 font-medium mb-3 italic">
          {tagline}
        </p>

        <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow">
          {summary}
        </p>

        {/* Disciplines */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {disciplines.map((d) => (
            <span
              key={d}
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-none text-wu-purple/80 bg-wu-purple/5 border border-wu-purple/20"
            >
              {d}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${slug}`}
          className="text-xs font-semibold text-wu-purple hover:text-wu-purple-light transition-colors inline-flex items-center gap-1 mt-auto"
        >
          View Project Details →
        </Link>
      </div>
    </div>
  );
}
