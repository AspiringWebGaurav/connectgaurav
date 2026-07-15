'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { LayoutDashboard, Users, Settings, LogOut, Code, Activity, Search } from 'lucide-react';
import { signOut } from '@/lib/firebase/auth';

import { GlobalLoader } from '@/components/ui/GlobalLoader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!loading) {
      if (!user) {
        if (isMounted) router.push('/login');
      } else {
        // Fallback: If verification hangs for >10s, force an error state
        const fallbackTimeout = setTimeout(() => {
          if (isMounted && verifying) {
            signOut();
            router.push('/login?error=timeout');
          }
        }, 10000);

        // Securely verify token against backend
        user.getIdToken().then(async (token) => {
          try {
            const res = await fetch('/api/auth/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            clearTimeout(fallbackTimeout);
            
            if (isMounted) {
              if (res.ok) {
                setVerifying(false);
              } else {
                // Not superadmin, kill session
                await signOut();
                router.push('/login');
              }
            }
          } catch (err) {
            clearTimeout(fallbackTimeout);
            if (isMounted) {
              await signOut();
              throw new Error("Network validation failed.");
            }
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [user, loading, router, verifying]);

  if (loading || verifying) {
    return <GlobalLoader />;
  }

  return (
    <div className="flex min-h-screen bg-white text-zinc-900 selection:bg-orange-500/30 font-sans">
      {/* Left Sidebar */}
      <aside className="w-[260px] flex-shrink-0 border-r border-zinc-200 bg-zinc-50 flex flex-col justify-between py-6">
        <div>
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-sm flex items-center justify-center font-serif font-bold text-xs text-white">
              C
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-900">ConnectGaurav</span>
          </div>

          <nav className="px-3 flex flex-col gap-1 text-sm font-medium">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-zinc-200 text-zinc-900 rounded-md transition-colors">
              <LayoutDashboard size={16} className="text-orange-500" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 rounded-md transition-colors">
              <Users size={16} />
              Users
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 rounded-md transition-colors">
              <Code size={16} />
              API Logs
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 rounded-md transition-colors">
              <Activity size={16} />
              Monitoring
            </a>
          </nav>
        </div>

        <div className="px-3">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 rounded-md transition-colors">
              <Settings size={16} />
              Settings
            </a>
            <button 
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-200 hover:text-rose-600 rounded-md transition-colors text-left"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </nav>
          
          <div className="px-3 pt-6 mt-6 border-t border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs overflow-hidden text-zinc-700">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.email?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold truncate text-zinc-900">{user?.displayName || 'Superadmin'}</span>
                <span className="text-[10px] text-zinc-500 truncate">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>ConnectGaurav</span>
            <span>/</span>
            <span className="text-zinc-900 font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 bg-zinc-50/50">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
