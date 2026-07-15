'use client';

import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAppStore } from '@/lib/store/useAppStore';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-1">
            Workspace Overview
          </h1>
          <p className="text-sm text-zinc-500">
            Enterprise environment connected and secured.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => toast.success('Enterprise library skeleton verified!')}
            className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Test Sonner
          </button>
          <button 
            onClick={toggleSidebar}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md border transition-colors shadow-sm",
              isSidebarOpen ? "bg-white border-zinc-200 text-zinc-900" : "bg-orange-50 text-orange-600 border-orange-200"
            )}
          >
            Zustand: {isSidebarOpen ? 'Sidebar Open' : 'Sidebar Closed'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Status Card 1 */}
        <div className="p-5 rounded-lg bg-white border border-zinc-200 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-medium">Authentication</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-emerald-600 text-xs font-semibold">Active</span>
            </div>
          </div>
          <div className="text-2xl font-medium tracking-tight text-zinc-900">Superadmin</div>
        </div>

        {/* Status Card 2 */}
        <div className="p-5 rounded-lg bg-white border border-zinc-200 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-medium">Database Layer</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-emerald-600 text-xs font-semibold">Live</span>
            </div>
          </div>
          <div className="text-2xl font-medium tracking-tight text-zinc-900">Firestore</div>
        </div>

        {/* Status Card 3 */}
        <div className="p-5 rounded-lg bg-white border border-zinc-200 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-medium">Cache Layer</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-emerald-600 text-xs font-semibold">Live</span>
            </div>
          </div>
          <div className="text-2xl font-medium tracking-tight text-zinc-900">Redis</div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-zinc-200 px-5 py-4 bg-zinc-50">
          <h2 className="text-sm font-medium text-zinc-900">Recent Activity</h2>
        </div>
        <div className="p-8 text-center text-sm text-zinc-500">
          No recent activity to display.
        </div>
      </div>
    </motion.div>
  );
}
