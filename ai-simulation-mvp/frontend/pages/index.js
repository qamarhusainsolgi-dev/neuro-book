import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">SimuVerse AI Simulation Platform</h1>
      <p className="mt-4 text-slate-300">Train leadership, strategy, and decision-making with AI-driven scenarios.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/auth" className="rounded bg-indigo-500 px-4 py-2">Get Started</Link>
        <Link href="/leaderboard" className="rounded border px-4 py-2">Leaderboard</Link>
      </div>
    </main>
  );
}
