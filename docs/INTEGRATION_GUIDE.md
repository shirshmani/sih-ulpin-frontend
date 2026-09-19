# Integration Guide — for ML / Backend

The frontend runs entirely against a fake API right now (MSW, intercepting requests in the browser — nothing hits a real server). This doc is about the two real seams where your work plugs in, file by file.

## The short version

Set `VITE_USE_MOCK_API=false` in the environment once your endpoints are live. Everything else is already wired to call real URLs — the fetches just get intercepted by the mock right now. You shouldn't need to touch any frontend component to go live; you need to match the contracts below.

## 1. Cadastral image → 3D model

**Endpoint:** `POST /api/v1/cadastre/process`
**Called from:** `src/pages/FileUploadPage.tsx`, in `handleAnalyze()`

Request: `multipart/form-data`, one field, `image` — the uploaded `.jpg`/`.jpeg` file.

Expected response (200):
```json
{ "modelUrl": "/models/some-generated-file.glb" }
```

`modelUrl` needs to point to an actual `.glb` file the browser can fetch directly (same-origin, or CORS-enabled). The frontend passes that URL straight into the same GLTF loader used for direct file uploads (`src/components/scene/loaders/useGLTFModel.ts`) — it doesn't care whether the file came from an upload or your API, as long as it's a valid, self-contained `.glb`. Loose `.gltf` plus a separate `.bin`/textures won't work here — the loader resolves relative paths against the URL you return, which is fragile; a single `.glb` is the only format we've tested against.

On failure, return a non-2xx status. The frontend currently shows a generic "analysis failed (status code)" message — if you want a more specific message surfaced to the user, add an `error` string field to the JSON body and it can be wired in. Not done yet, since there was nothing real to test it against.

Current mock: `src/mocks/handlers.ts` — returns a static `/models/approved_cadastre.glb` after a 3-second delay standing in for real processing time.

## 2. Intersections / conflicts

**Endpoint:** `GET /api/v1/intersections`
**Type:** `src/types/intersection.ts`

```ts
interface IntersectionRegion {
  id: string
  label: string
  description: string
  severity: 'minor' | 'major'
  boundingBox: [number, number, number, number, number, number] // [minX, minY, minZ, maxX, maxY, maxZ]
}

interface IntersectionResult {
  hasIntersection: boolean
  regions: IntersectionRegion[]
}
```

`boundingBox` is in the same coordinate space as the generated 3D model — it draws a translucent box directly in the 3D scene at those exact coordinates (`src/components/scene/IntersectionHighlight.tsx`), so it needs to line up with the model's own geometry, not GPS coordinates or a separate system.

**Not wired up yet.** The mock endpoint exists (`src/mocks/handlers.ts`) and returns fake data, but nothing in the UI calls it — the viewer still reads a hardcoded demo array (`src/services/mocks/dummyIntersectionData.ts`) via `src/hooks/useDummyBuildingData.ts`. When your endpoint is real, that's the one hook to change: swap the static import for a `fetch('/api/v1/intersections')` call. That's a small, contained change — ask when you're ready for it rather than building against the demo data assuming it'll behave the same way.

**Known gap:** the backend currently throws a 500 on overlap instead of returning bounding boxes. The frontend has nowhere to put that response yet beyond a generic failure. If a 500-on-conflict is staying as the real behavior rather than being replaced by structured bounding-box data, say so — a proper "conflict check failed" state is a different (and smaller) thing to build than what's described above.

## Everything else is local-only

Property details, the flat/floor/owner list, the underground tunnel — none of that is fetched from anywhere. It's either form state (property) or hardcoded demo data (`src/services/mocks/dummyBuildingData.ts`) shown only when no real model or analysis result is present. Don't build against it; it disappears once real data exists.
