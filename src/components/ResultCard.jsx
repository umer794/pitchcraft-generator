export default function ResultCard({ title, tagline, pitch }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-indigo-400">{title}</h2>
      <p className="italic text-gray-400 mb-3">“{tagline}”</p>
      <p className="text-sm leading-relaxed">{pitch}</p>
    </div>
  );
}
