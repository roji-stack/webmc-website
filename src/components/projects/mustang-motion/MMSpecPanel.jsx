export function MMSpecPanel({ mechanical }) {
  return (
    <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
      <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">
        Mechanical Housing & Ergonomic Design
      </h2>
      <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        {mechanical}
      </div>
    </section>
  );
}
