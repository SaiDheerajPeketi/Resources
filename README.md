# Interview Atlas

An offline-first technical interview preparation atlas built with Next.js, TypeScript, local MDX, Dexie, React Flow, Pagefind, and Serwist.

## Release 4 scope

- A versioned destination map of 146 topics across Foundations, AI + Data, SDE + Systems, DevOps + Cloud, Cybersecurity, and Fintech + Quant.
- The complete 24-topic shared-foundations pack: C++17, core DSA patterns, discrete mathematics, linear algebra, probability, statistics, SQL, Linux, networking, Git, testing, debugging, and behavioral preparation.
- The complete 26-topic AI + Data specialist pack: data quality, EDA, experimentation, classical ML, deep learning, NLP, computer vision, recommendations, forecasting, embeddings, vector search, RAG, fine-tuning, agents, evaluation, responsible AI, and MLOps.
- The complete 25-topic SDE + Systems pack: object and low-level design, modern C++, memory, concurrency, OS, databases, APIs, backend and web foundations, testing, performance, distributed systems, storage, reliability, observability, and system-design cases.
- Seventy-eight complete field notes across the corpus, each with concept maps, analogies, theory, worked examples, failure modes, original interview prompts, hints, solutions, rubrics, flashcards, revision sheets, and canonical sources.
- Separate study and interview maps for AI Engineer, ML Engineer, Data Scientist, Data Engineer, and MLOps Engineer roles.
- Desktop prerequisite graph plus a semantic mobile outline.
- Seventy-nine original practice questions, role-specific interview loops, resume/project/STAR/recruiter/negotiation guidance, and a reusable timed mock template.
- Named revision lists, bookmarks, notes, progress states, and attempts.
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

Content version: `2026.09.18-r4`.
