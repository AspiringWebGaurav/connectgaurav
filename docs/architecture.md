# ConnectGaurav Enterprise Architecture

## Client vs Server Boundaries

- `src/lib/firebase/client.ts`: **Strictly Client-Side.** Use this for UI-based authentication and direct Firestore reads if needed from React components.
- `src/lib/firebase/admin.ts`: **Strictly Server-Side.** Never import this into a client component. It has full read/write access via the Service Account and is used exclusively in API routes (`src/app/api`) or Server Actions.
- `src/lib/redis/upstash.ts`: **Strictly Server-Side Cache.** Used in API routes or DB services to cache expensive database queries and lower Firebase read counts.

## Services Layer (`src/services`)
All heavy lifting (database calls, business logic) should live in `src/services`. React components should not contain complex database queries. They should call Server Actions or API routes, which in turn call the `DBService`.

**Caching Strategy:**
- **Server Caching ONLY:** We use Upstash Redis strictly on the backend to cache Firebase results.
- **NO Local Storage:** The browser's `localStorage`, `sessionStorage`, and complex client-side caching are explicitly avoided. We trust the server-side Redis or direct Firebase backend exclusively.

## External Overlays (Switchyy)
- Handled at the outermost boundary in `src/app/layout.tsx`.
- Controlled via `NEXT_PUBLIC_SWITCHYY_KEY` locally and in Vercel.
