# Environment Variables Guide

ConnectGaurav uses a strictly typed environment validation system to ensure secure deployments and prevent runtime crashes from missing keys.

## Setup Instructions
1. Copy `.env.example` to `.env.local`
2. Never commit `.env.local` to git (it is already in `.gitignore`).
3. Fill in the keys based on your service credentials.

## Validation
When the app boots, `src/lib/config/env.ts` parses all keys through Zod. 
If a required key (like `NEXT_PUBLIC_SWITCHYY_KEY` or `FIREBASE_PRIVATE_KEY`) is missing, the application will immediately throw a build/boot error to protect itself.

## Deploying to Vercel
You must manually add these keys to the Vercel Project Settings > Environment Variables dashboard.
Remember that `NEXT_PUBLIC_` variables are shipped to the browser, while all others remain strictly server-side.
