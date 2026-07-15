'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-zinc-900 font-sans">
      <div className="flex flex-col items-center gap-4 text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold tracking-tight">System Interruption</h2>
        <p className="text-sm text-zinc-500">
          The operation encountered an unexpected failure. A fallback state has been triggered to prevent the application from hanging.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Retry Request
          </button>
          <button
            onClick={() => {
              router.push('/');
              reset();
            }}
            className="px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
