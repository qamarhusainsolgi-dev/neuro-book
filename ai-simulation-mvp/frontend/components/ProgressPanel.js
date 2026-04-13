export default function ProgressPanel({ progress }) {
  const level = progress?.level || 1;
  const total = progress?.total_points || 0;
  const pct = Math.min(100, total % 100);

  return (
    <aside className="rounded-xl bg-slate-900 p-5">
      <h3 className="font-semibold">Progress</h3>
      <p className="mt-2 text-sm">Level {level}</p>
      <p className="text-sm">Points: {total}</p>
      <div className="mt-2 h-3 overflow-hidden rounded bg-slate-700">
        <div className="h-full bg-emerald-400" style={{ width: `${pct}%` }} />
      </div>
    </aside>
  );
}
