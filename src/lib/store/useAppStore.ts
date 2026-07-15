import { create } from 'zustand';

interface AppState {
  // Global Sidebar State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

/**
 * Global Zustand Store
 * Used for light, client-side UI states that need to be accessed across multiple components
 * without prop drilling (e.g., sidebar toggles, modal states).
 */
export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
