---
version: 1
slug: "src-app-atlas-page-tsx"
primary_target: "src/app/atlas/page.tsx"
related_targets: ["src/app/page.tsx","src/app/topics/[...slug]/page.tsx"]
---

# Atlas Surface Brief

- Scope and mode: `/atlas` is a Read/Operate hybrid for locating, understanding, and acting on interview concepts. The user must be able to orient in the curriculum in seconds, then enter a topic without losing prerequisite context.
- Audience and task: a one-year-experience learner rebuilding fundamentals while targeting mid-level interviews. They browse six role tracks, select a concept, inspect its prerequisites and relevance, then open the field note, practice, or save it for revision.
- Direction: user-pinned Technical Field Atlas. Approved comp: `.impeccable/mocks/atlas-map-dominant.png`. The memorable moment is the selected concept tracing its dependency path in blueprint blue while the right inspector updates and the rest of the atlas stays quiet.
- Boundaries: no marketing hero, bento/card dashboard, gamification, decorative charts, dark theme, glass, or visual effects that compete with reading. Core text, controls, and diagrams remain semantic code.
- States and ranges: six track tabs; 10–40 nodes per track; topic states unseen/reading/practicing/revising/confident encoded by label, symbol, and line style as well as color. Loading, empty search, missing offline pack, and storage failure states must remain actionable.
- Responsive behavior: desktop keeps index, map, and inspector visible. Below 900px the semantic topic outline replaces the graph; the inspector becomes the selected item’s detail region. All controls remain keyboard reachable.

## Approved Composition Inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Global header | 58px ruled strip with wordmark, command search, filters, view control, and offline readiness | Semantic HTML/CSS |
| Track index | 17% desktop rail with six icon-and-label tracks, counts, secondary actions, and calibrated dividers | Semantic nav + inline SVG icons |
| Skill map | Dominant 56% field; faint dot/grid calibration; 10–40 nodes; restrained orthogonal dependency lines; selected path in cobalt | `@xyflow/react` with semantic outline fallback |
| Selected marker | Small folded “YOU ARE HERE” flag physically attached to the selected node | CSS/SVG, not raster |
| Topic inspector | 27% ruled pane with title, metadata, summary, prerequisites, next topics, and three full-width actions | Semantic aside/sections/buttons |
| Status language | Solid cobalt selected; outlined gray available; teal check/confident; amber review; labels and icons always present | CSS + SVG |
| Paper material | Very subtle cool paper grain; must not reduce contrast or resemble beige editorial paper | CSS noise pattern at very low opacity |
| Typography | Narrow, highly legible UI sans; dark compact headings; mono reserved for metadata and code | Local/system font stacks |
| Secondary routes | Reading page borrows comp 2’s article/rail structure; topic index borrows comp 3’s ruled rows | Semantic HTML/CSS |
| Raster use | Only the three design comps ship as design records; production UI needs no raster imagery | Accepted omission from runtime assets |

## Sampled Palette

- Page ground: `rgb(249 251 253)` / `#F9FBFD`.
- Navigation field: `rgb(231 234 239)` / `#E7EAEF`.
- Primary action field: `rgb(46 127 233)` / `#2E7FE9`.
- Selected path: `rgb(30 118 243)` / `#1E76F3`.
- Confident teal: `rgb(39 171 171)` / `#27ABAB`.
- Needs-review amber: `rgb(228 165 68)` / `#E4A544`.
- Deep ink sample: `rgb(4 23 73)` / `#041749`; body ink may lift slightly for sustained reading.

## Direction Contract

THESIS: Interview knowledge is a traversable atlas, not a course dashboard; the map is the primary instrument and every action preserves context.
OWN-WORLD: Cool paper, deep ink, cobalt route lines, restrained teal and amber, calibrated rules, folded index flags, and compact field-note typography.
STORY: The learner sees the complete territory, traces prerequisites, selects a concept, and moves directly into study, practice, or revision.
FIRST VIEWPORT: A 17/56/27 index-map-inspector split under one command strip; Hash Tables is selected, its route is traced, and its three actions sit at the lower right.
FORM: Technical field atlas, user-pinned and retained over seed `3c6e11b2`; map-dominant approved comp.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
