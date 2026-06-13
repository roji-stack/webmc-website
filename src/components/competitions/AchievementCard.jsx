export function AchievementCard({ rank, scope, detail }) {
  return (
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
}
