export function MMTechSpecs({ specs }) {
  if (!specs || specs.length === 0) return null;

  return (
    <section className="bg-white rounded-xl overflow-hidden border border-[#E8E4F0] mb-8">
      <div className="p-8 pb-4">
        <h2 className="text-2xl font-bold font-serif text-gray-900">
          Technical Specifications
        </h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#FDFCFF] border-b border-[#E8E4F0]">
            <th className="px-8 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
              Parameter
            </th>
            <th className="px-8 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
              Specification
            </th>
          </tr>
        </thead>
        <tbody>
          {specs.map((s, idx) => (
            <tr key={idx} className="border-b border-[#E8E4F0] last:border-b-0">
              <td className="px-8 py-4 font-semibold text-gray-800">
                {s.parameter}
              </td>
              <td className="px-8 py-4 text-gray-600">
                {s.specification}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
