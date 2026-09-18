# Interview Atlas

An offline-first technical interview preparation atlas built with Next.js, TypeScript, local MDX, Dexie, React Flow, Pagefind, and Serwist.

## Release 1 scope

- A versioned destination map of 146 topics across Foundations, AI + Data, SDE + Systems, DevOps + Cloud, Cybersecurity, and Fintech + Quant.
- Six complete field notes—one per track—with concept maps, analogies, theory, worked examples, failure modes, interview prompts, hints, solutions, flashcards, revision sheets, and sources.
- Desktop prerequisite graph plus a semantic mobile outline.
- Original practice questions, interview-loop templates, named revision lists, bookmarks, notes, progress states, and attempts.
- Validated JSON backup/restore and Markdown export.
- Installable PWA shell and versioned downloadable track packs with integrity metadata.
- Static search artifacts, print layouts, and a fully static deployment in `out/`.

Planned topics are deliberately visible and labelled `planned`; they are coverage commitments, not placeholder lessons presented as finished material.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/atlas/`.

## Validate

```bash
npm run validate:content
npm test
npm run build
npm run test:e2e
```

The browser suite runs against the production static export and covers desktop/mobile atlas navigation, keyboard search, local persistence, named revision lists, offline pack access, and automated WCAG A/AA checks.

## Content model

The source of truth is `src/data/catalog.ts`; generated manifests are written to `public/generated/` during the build. Published MDX field notes live in `src/content/topics/`. Product and design decisions are recorded in `PRODUCT.md` and `DESIGN.md`.

Content version: `2026.09.18-r1`.
