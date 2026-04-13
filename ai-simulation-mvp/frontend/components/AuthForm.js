import { useState } from 'react';
import api from '../lib/api';

export default function AuthForm({ mode = 'login', onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const path = mode === 'signup' ? '/auth/signup' : '/auth/login';
    const { data } = await api.post(path, { email, password });
    localStorage.setItem('token', data.token);
    onAuth?.(data.user);
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl bg-slate-900 p-6">
      <h2 className="text-xl font-bold">{mode === 'signup' ? 'Create account' : 'Login'}</h2>
      <input className="w-full rounded p-2 text-black" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full rounded p-2 text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full rounded bg-indigo-500 p-2 font-semibold">Continue</button>
    </form>
  );
}
