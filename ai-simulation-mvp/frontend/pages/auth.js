import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const router = useRouter();

  return (
    <main className="mx-auto grid min-h-screen max-w-md place-items-center p-6">
      <div className="w-full space-y-4">
        <AuthForm mode={mode} onAuth={() => router.push('/dashboard')} />
        <button className="text-sm text-slate-300" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          Switch to {mode === 'login' ? 'signup' : 'login'}
        </button>
      </div>
    </main>
  );
}
