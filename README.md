# 3D ULPIN Generation & Vertical Property Mapping — Frontend

Frontend for SIH26011 (Ministry of Rural Development, Smart India Hackathon 2026) — a system that generates a verified 3D spatial identity for a property, down to the individual flat, and flags conflicts against neighboring parcels or underground infrastructure before they become real disputes.

This repo is the frontend only. It renders property records, 3D/LiDAR structures, and flagged conflicts. Model generation and conflict detection are ML/backend work — see `docs/INTEGRATION_GUIDE.md` for exactly how they plug in.

## Stack

- Vite + React 19 + TypeScript
- Three.js via React Three Fiber + drei, for the 3D viewer
- React Router (declarative mode) for routing, Motion for page/route transitions
- Zustand for state, React Hook Form + Zod for the property form
- Tailwind CSS v4 for styling, with a light/dark theme toggle
- MSW (Mock Service Worker) standing in for the real backend — see below

## Getting started

Requires Node 20+ (LTS).

```
npm install
npm run dev
```

Runs at `http://localhost:5173`. `npm run build && npm run preview` checks the production build — this matters here specifically because the mock API is meant to run in production too (see the integration guide), not just in dev.

Copy `.env.example` to `.env` if you want to change any settings — right now that's just the mock-API toggle.

## Where things are

- `/` — landing page
- `/property` — property details form (GPS location, address, floors — individual owner vs. surveyor changes what's asked)
- `/upload` — upload a 3D/LiDAR file directly, or a 2D blueprint image for server-side model generation
- `/viewer` — the 3D model, with flagged conflicts and per-flat ownership detail
- `/report` — export/summary (placeholder, not built yet)

Full breakdown of what each folder/file does: `docs/INTEGRATION_GUIDE.md`.

## Current status

Everything above works end-to-end against mock data — there's no real backend hosted for this build. `src/mocks/handlers.ts` is the fake API standing in for it.

**Built:** property input, file upload (3D/LiDAR + blueprint image), 3D/LiDAR rendering (GLTF, OBJ, LAS/LAZ), demo conflict highlighting, the mock backend layer.
**Not built:** real intersection detection, the report/export page, live backend calls.
