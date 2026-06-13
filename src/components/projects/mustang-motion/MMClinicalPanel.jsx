export function MMClinicalPanel({ clinical }) {
  if (!clinical) return null;

  return (
    <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
      <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">
        Clinical Utility
      </h2>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        {clinical.intro}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {clinical.workflows.map((w, idx) => (
          <div key={idx} className="p-5 rounded-none bg-white border border-wu-purple/40 hover:border-wu-purple transition-colors duration-200">
            <h3 className="text-base font-bold text-wu-purple mb-2 font-serif">
              {w.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {w.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-wu-purple pl-4">
        {clinical.outro}
      </p>
    </section>
  );
}
