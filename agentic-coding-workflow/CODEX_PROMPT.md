# Codex continuation prompt

Paste this into Codex after cloning `ton36475-lgtm/3d-portfolio-production`.

You are continuing **SIRAWAT × BALL**, a bilingual (EN/TH) 3D creative atelier.

Stack: TanStack Start + React 19 + Tailwind v4 + Three.js via `@react-three/fiber` + `@react-three/drei`.

The live 3D room is:

- `src/components/canvas/atelier-world.tsx` — floor, monogram, work frames
- `src/components/canvas/hero-scene.tsx` — Canvas + OrbitControls
- `src/routes/gallery.tsx` — full 3D gallery
- `src/routes/index.tsx` — hero uses the same scene
- `src/lib/works.ts` — project data + image paths

Do this next, in order:

1. **GLB frames** — replace the box/plane frames with a Blender-exported picture-frame GLB loaded via `useGLTF`. Put files in `public/models/` following `blender-mcp-pipeline/README.md`. Keep click/hover and drag-vs-click.
2. **Camera fly-to** — when a frame is selected in `/gallery`, lerp OrbitControls target to that frame without fighting auto-rotate.
3. **Monogram** — optional: replace drei `Text` “S × B” with a real GLB sculpture from Blender.
4. **Perf** — keep draw calls low; mobile (`quality === "low"`) must stay at 1x DPR, no extra lights/shadows.
5. **`npm run build` and `npm run typecheck` must pass.**

Do not add auth, a database, or a backend. Do not remove EN/TH copy. Do not use purple/gold UI accents. Open a PR from `codex/<task>` into `main`.
