<div align="center">
  <div style="width: 120px; height: 120px; background: linear-gradient(to top right, #ea580c, #f59e0b); border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
    <h1 style="color: white; font-family: serif; font-size: 64px; margin: 0;">C</h1>
  </div>
  <h1 align="center">ConnectGaurav</h1>
  <p align="center"><strong>Enterprise Workspace & Unified Communications Platform</strong></p>
  
  <p align="center">
    <a href="https://connectgaurav.eu.cc">View Live Environment</a>
  </p>
</div>

---

## 🔒 Proprietary Software Notice

**Copyright © 2026 ConnectGaurav. All Rights Reserved.**

This repository and its contents are proprietary and strictly confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit, written permission from the owner.

---

## ⚡ Tech Stack

ConnectGaurav is built on a mathematically pristine, V1 enterprise skeleton utilizing the absolute latest web technologies (v0.2.0):

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS (v4) with `clsx` and `tailwind-merge`
- **Database:** Firebase (Firestore NoSQL)
- **Authentication:** Firebase Auth + Edge-verification
- **Caching:** Upstash Redis (Serverless Edge Caching)
- **Global State:** Zustand
- **Animations:** Framer Motion
- **Validation:** Zod Schema Validation
- **Notifications:** Sonner

---

## 🏗 Architecture Overview

This codebase strictly adheres to enterprise isolation principles:

1. **Security & Authentication Layer (`src/app/admin/layout.tsx`):** Protected routes (e.g., `/admin`) are guarded with direct Firebase Auth verification and server-side token validation via `/api/auth/verify`, optimized for zero Edge quota consumption.
2. **Standardized APIs (`src/lib/api.ts`):** Every backend route uses strict wrappers to guarantee a mathematically predictable JSON response.
3. **Database Types (`src/types/db.types.ts`):** Firestore reads and writes are strictly typed using TypeScript interfaces to prevent NoSQL data mutation errors.
4. **Environment Safety (`src/lib/config/env.ts`):** The application will fatally crash on boot if environment variables fail Zod schema validation, ensuring secrets are never missing in production.

For more detailed diagrams and logic boundaries, refer to [`docs/architecture.md`](docs/architecture.md).

---

## 🚀 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Configure your secure credentials in `.env.local` based on your service providers (Firebase, Upstash Redis).

3. **Start Turbopack Server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

The master branch is automatically linked to Vercel for continuous integration. Ensure all environment variables inside `.env.local` are perfectly mirrored in your Vercel Project Settings prior to deployment.
