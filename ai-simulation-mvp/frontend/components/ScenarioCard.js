export default function ScenarioCard({ scenario, onComplete }) {
  return (
    <div className="rounded-xl bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">{scenario.title} {scenario.is_premium ? '🔒' : '🆓'}</h3>
      <p className="mt-2 text-sm text-slate-300">{scenario.content}</p>
      <div className="mt-4 grid gap-2">
        {scenario.options.map((opt, idx) => (
          <button
            key={idx}
            className="rounded bg-slate-800 p-3 text-left hover:bg-slate-700"
            onClick={() => onComplete(scenario.id, opt.points)}
          >
            <span className="font-medium">{opt.text}</span>
            <span className="block text-xs text-slate-400">{opt.consequence} (+{opt.points} pts)</span>
          </button>
        ))}
      </div>
    </div>
  );
}
