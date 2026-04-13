import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  useEffect(() => { api.get('/leaderboard').then((r) => setRows(r.data)); }, []);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <div className="mt-4 rounded-xl bg-slate-900 p-4">
        {rows.map((row, idx) => (
          <div key={row.id} className="flex justify-between border-b border-slate-800 py-2 last:border-none">
            <span>#{idx + 1} {row.email}</span><span>{row.total_points} pts</span>
          </div>
        ))}
      </div>
    </main>
  );
}
