# AGENTS.md — SIRAWAT × BALL

This file is for **Codex** (and any clone of the GitHub repo).

Product: bilingual 3D creative atelier. Dark ink / bone / cool silver. No purple, no gold, no emoji in UI.

## Stack

TanStack Start, React 19, Tailwind v4, Three.js, `@react-three/fiber`, `@react-three/drei`. Auth and database stay **off**.

## Commands

```bash
npm install
npm run dev          # 0.0.0.0:8080
npm run typecheck
npm run build
```

## Where to edit

| Surface | Path |
| --- | --- |
| 3D room | `src/components/canvas/atelier-world.tsx` |
| Canvas / orbit | `src/components/canvas/hero-scene.tsx` |
| Gallery page | `src/routes/gallery.tsx` |
| Work data | `src/lib/works.ts` |
| EN/TH copy | `src/lib/copy.ts` |
| GLB pipeline | `blender-mcp-pipeline/` |
| Agent protocol | `agentic-coding-workflow/` |

## Hard rules

- Keep EN and TH in sync when you change copy.
- Keep a geometry fallback until a GLB exists — never blank the WebGL canvas.
- Branch as `codex/<task>`, PR into `main`.
- Do not add accounts, Postgres, or Grok-only platform hacks unless the sandbox already has them.

Full next-task list: `agentic-coding-workflow/CODEX_PROMPT.md`.
