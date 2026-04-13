import { useEffect, useState } from 'react';
import api from '../lib/api';
import ScenarioCard from '../components/ScenarioCard';
import ProgressPanel from '../components/ProgressPanel';

export default function Dashboard() {
  const [scenarios, setScenarios] = useState([]);
  const [progress, setProgress] = useState({ total_points: 0, completed_count: 0, level: 1 });
  const [badge, setBadge] = useState(null);

  const load = async () => {
    const [s, p] = await Promise.all([api.get('/scenarios'), api.get('/scenarios/progress')]);
    setScenarios(s.data);
    setProgress(p.data);
  };

  const onComplete = async (scenarioId, points) => {
    const { data } = await api.post('/scenarios/complete', { scenarioId, points });
    setProgress({ ...data.progress, level: Math.floor(data.progress.total_points / 100) + 1 });
    setBadge(data.badge);
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="mx-auto grid max-w-6xl gap-4 p-6 md:grid-cols-[2fr_1fr]">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Scenario Dashboard</h1>
        {scenarios.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} onComplete={onComplete} />)}
      </section>
      <section className="space-y-3">
        <ProgressPanel progress={progress} />
        {badge && <div className="rounded-xl bg-amber-600 p-4 font-semibold">New Badge: {badge}</div>}
      </section>
    </main>
  );
}
