export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-5 rounded-full flex-shrink-0 bg-wu-purple" />
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {children}
      </span>
    </div>
  );
}
