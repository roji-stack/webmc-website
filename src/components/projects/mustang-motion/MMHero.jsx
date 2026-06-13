import { StatusBadge } from "../StatusBadge";

export function MMHero({ project }) {
  const { title, tagline, status, year, disciplines } = project;

  return (
    <header className="py-14 px-6 text-white bg-wu-purple">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-none bg-[#EEEDFE] text-wu-purple">
            {year}
          </span>
          <StatusBadge status={status} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
          {title}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl opacity-80 mb-6">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <span
              key={d}
              className="text-xs px-3 py-1 rounded-none bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-medium"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
