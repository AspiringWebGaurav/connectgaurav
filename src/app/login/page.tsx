'use client';

import { useState } from 'react';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      const token = await user.getIdToken();
      
      // Verify with backend
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        router.push('/admin');
      } else {
        setError("Unauthorized: Superadmin access only.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center font-sans px-4">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-xl flex items-center justify-center font-serif font-bold text-2xl text-white mb-8 shadow-lg shadow-orange-500/20">
          C
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight mb-2">ConnectGaurav</h1>
        <p className="text-sm text-zinc-500 mb-10">Sign in to access the enterprise console.</p>

        {error && (
          <div className="w-full p-3 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-left">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full relative flex items-center justify-center gap-3 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <div className="bg-white p-0.5 rounded-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.7 17.57V20.34H19.26C21.34 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.7 17.57C14.73 18.22 13.48 18.63 12 18.63C9.13 18.63 6.7 16.69 5.82 14.08H2.16V16.92C3.97 20.52 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.82 14.08C5.59 13.42 5.46 12.72 5.46 12C5.46 11.28 5.59 10.58 5.82 9.92V7.08H2.16C1.42 8.56 1 10.22 1 12C1 13.78 1.42 15.44 2.16 16.92L5.82 14.08Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.03L19.34 3.9C17.45 2.14 14.97 1 12 1C7.7 1 3.97 3.48 2.16 7.08L5.82 9.92C6.7 7.31 9.13 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
            </div>
          )}
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
