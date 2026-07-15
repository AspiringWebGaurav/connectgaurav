# ConnectGaurav Enterprise Architecture

This document outlines the strict architectural boundaries and infrastructure pillars of the ConnectGaurav application (v0.2.0 Skeleton).

## 1. Edge Security & Proxy Layer
- **`src/proxy.ts` (Next.js Edge Proxy):** The absolute outermost boundary of the application. Requests to secure areas (like `/admin`) are intercepted here at the edge. 
- Because it runs on Vercel's Edge Network, it provides zero-latency security checks before the Node.js server is even spun up.

## 2. Standardized API Layer
All custom backend endpoints reside in `src/app/api/`. 
- **`src/lib/api.ts`:** To prevent disparate JSON responses across the app, all backend routes must use the `apiSuccess` and `apiError` wrappers. 
- Every API endpoint structurally guarantees either `{ success: true, data: T }` or `{ success: false, error: string }`.

## 3. Client vs Server Boundaries

- `src/lib/firebase/client.ts`: **Strictly Client-Side.** Use this for UI-based authentication and direct Firestore reads from React components.
- `src/lib/firebase/admin.ts`: **Strictly Server-Side.** Never import this into a client component. It possesses full read/write bypass access via the Service Account and is used exclusively in API routes or Server Actions.
- `src/lib/redis/upstash.ts`: **Strictly Server-Side Cache.** Used in backend routes to cache expensive Firebase queries and drastically lower read costs.

## 4. Strict Data Typings
- **`src/types/db.types.ts`:** Firestore is inherently schemaless. To prevent runtime chaos, every collection in Firestore has a strict TypeScript interface defined here (e.g., `UserDocument`, `SystemLogDocument`). 
- You must cast Firestore responses to these types immediately upon reading.

## 5. UI and State Management
- **Base Components (`src/components/ui`):** Reusable, flat, pure-white enterprise components. Uses `src/lib/utils.ts` (`cn()`) to resolve any Tailwind class conflicts (`tailwind-merge`).
- **Global State (`Zustand`):** Found in `src/lib/store/useAppStore.ts`. Exclusively handles ultra-fast client-side UI states (like toggling sidebars or modals) without prop-drilling.
- **Animations:** Powered by `framer-motion` for premium, buttery-smooth interactions.

## 6. External Overlays
- **Switchyy Link Management:** Handled at the outermost boundary in `src/app/layout.tsx`. Controlled securely via `NEXT_PUBLIC_SWITCHYY_KEY` locally and in Vercel.
