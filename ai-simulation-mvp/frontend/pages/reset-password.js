import { useState } from 'react';
import api from '../lib/api';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/password-reset', { email });
    setMsg(data.message);
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <form onSubmit={submit} className="space-y-3 rounded-xl bg-slate-900 p-6">
        <h2 className="text-xl font-bold">Password reset</h2>
        <input className="w-full rounded p-2 text-black" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full rounded bg-indigo-500 p-2">Request reset</button>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
      </form>
    </main>
  );
}
