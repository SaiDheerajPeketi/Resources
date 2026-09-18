---
version: 2
slug: "src-app-interview-page-tsx"
primary_target: "src/app/interview/page.tsx"
related_targets: ["src/app/practice/page.tsx","src/app/revision/page.tsx"]
---

# Interview Surface Brief

- Scope and mode: `/interview` is a Read/Operate reference for selecting a role or company-archetype loop, assembling a candidate packet, running cross-track simulations, and turning the debrief into practice and revision actions.
- Audience and task: a learner rebuilding interview fluency across several technical role families. They need concrete round shapes, truthful career-story templates, and one reusable mock protocol.
- Direction: inherit the approved Technical Field Atlas. The memorable moment is a ruled sequence that moves from role and company emphasis to candidate evidence, cross-track rehearsal, and a timed debrief without becoming a course dashboard.
- Boundaries: no scores without a rubric, gamification, decorative career advice, offer claims, or equal-sized card grid. Keep the page printable, calm, and useful without an account.
- Responsive behavior: role loops and career rows become single-column documents below 900px; time labels remain adjacent to their mock step; all links retain visible focus.

## Shipped Composition Inventory

| Ingredient | Shipped commitment | Responsive behavior |
| --- | --- | --- |
| Role-loop selector | Five ruled rows pair a role and duration with an ordered round sequence and one question-bank action. The rows remain part of one continuous field rather than becoming equal-sized cards. | The three-column row becomes one column below 900px; duration stays attached to the role heading and rounds retain their order. |
| Company-archetype packs | Seven ruled rows separate company context, preparation focus, representative rounds, and direct curated-set links. The copy explicitly frames them as replaceable emphasis maps rather than claims about an employer. | Four aligned columns become two below 900px and one below 540px; context stays before rounds and practice actions. |
| Evidence system | Six career artifacts use a repeated purpose / checklist / working-template structure. A thin blueprint rule and mono label identify the reusable template without turning it into a separate card. | The three-part evidence row and two-column checklist become a single reading column below 900px. |
| Cross-track simulations | Four continuous ruled rows combine an interview scenario, total time, ordered evidence stages, and a direct first-prompt action. Each circuit deliberately crosses at least two curriculum tracks. | Scenario, stages, and action stack below 900px; the two-column stage field becomes one column below 540px. |
| Timed mock template | Four ordered steps place a mono time range beside the action and its evidence standard. The sequence ends with one debrief question and a direct revision-list action. | Time remains a dedicated adjacent rail; it narrows from 110px to 72px on narrow screens instead of separating from the step. |
| Structural language | Dark section rules, cool one-pixel row rules, dark ink, muted explanatory copy, and sparse blueprint links carry hierarchy. No score tile, progress meter, badge, or decorative completion state is introduced. | Reading order is preserved as role loop → evidence artifact → mock step → debrief. |
| Semantic foundation | The surface uses labelled sections, headings, ordered lists for sequences, unordered lists for checklists, and native links for onward actions. | The same semantic order serves the mobile reflow; visible global focus treatment and reduced-motion rules remain inherited. |

## Durable Surface Patterns

- **Evidence before progress.** Preparation is represented by truthful artifacts, rubric evidence, and a next revision action—not by completion percentages or motivational scoring.
- **One ruled field, not a card collection.** Related options and artifacts share continuous top and bottom rules; whitespace and column alignment provide grouping.
- **Templates are annotations.** Reusable language is offset with one blueprint hairline and a compact mono label, keeping the body copy dominant.
- **Time is operational metadata.** Duration sits next to the role or mock step it governs and remains visible through the mobile reflow.
- **The loop closes in revision.** Every rehearsal ends in a debrief question and a concrete route back to saved revision work.
- **Archetypes are hypotheses, not employer claims.** Every company-family map states its assumed emphasis and points the learner back to the recruiter-confirmed loop.
- **Cross-track mocks score one evidence trail.** A simulation joins several domains through ordered stages while preserving one debrief and revision path.

## Finish Record

- Release 7 extension finish review: **SHIP**; no material design fixes remain. The review ran in-thread because this task did not authorize delegated agents.
- `DESIGN.md` and `.impeccable/design.json` stay unchanged. The implementation adds no new global token or primitive; its durable decisions are composition rules scoped to this interview surface.

## Direction Contract

THESIS: Interview preparation is a repeatable evidence loop, not a gamified checklist.
OWN-WORLD: Cool paper, dark ink, blueprint blue, restrained amber/teal, tab/index strips, ruled panels, and the diagram-led Technical Field Atlas.
STORY: Choose a role or company emphasis → assemble evidence → practice a curated or cross-track mock → capture the debrief.
FIRST VIEWPORT: Orient the learner to the role-loop selector, evidence system, and mock template.
FORM: Desktop-first technical manual with a mobile reflow.
FINISH: Restrained motion, WCAG 2.2 AA, and no dashboard-card or gamification aesthetic; independent finish review disposition is SHIP.
