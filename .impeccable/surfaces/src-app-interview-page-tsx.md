---
version: 2
slug: "src-app-interview-page-tsx"
primary_target: "src/app/interview/page.tsx"
related_targets: ["src/app/practice/page.tsx","src/app/revision/page.tsx"]
---

# Interview Surface Brief

- Scope and mode: `/interview` is a Read/Operate reference for selecting a role-specific mock loop, assembling a candidate packet, and turning the debrief into practice and revision actions.
- Audience and task: a learner rebuilding interview fluency across several technical role families. They need concrete round shapes, truthful career-story templates, and one reusable mock protocol.
- Direction: inherit the approved Technical Field Atlas. The memorable moment is a ruled sequence that moves from role loop to candidate evidence to a timed rehearsal, without becoming a course dashboard.
- Boundaries: no scores without a rubric, gamification, decorative career advice, offer claims, or equal-sized card grid. Keep the page printable, calm, and useful without an account.
- Responsive behavior: role loops and career rows become single-column documents below 900px; time labels remain adjacent to their mock step; all links retain visible focus.

## Shipped Composition Inventory

| Ingredient | Shipped commitment | Responsive behavior |
| --- | --- | --- |
| Role-loop selector | Five ruled rows pair a role and duration with an ordered round sequence and one question-bank action. The rows remain part of one continuous field rather than becoming equal-sized cards. | The three-column row becomes one column below 900px; duration stays attached to the role heading and rounds retain their order. |
| Evidence system | Six career artifacts use a repeated purpose / checklist / working-template structure. A thin blueprint rule and mono label identify the reusable template without turning it into a separate card. | The three-part evidence row and two-column checklist become a single reading column below 900px. |
| Timed mock template | Four ordered steps place a mono time range beside the action and its evidence standard. The sequence ends with one debrief question and a direct revision-list action. | Time remains a dedicated adjacent rail; it narrows from 110px to 72px on narrow screens instead of separating from the step. |
| Structural language | Dark section rules, cool one-pixel row rules, dark ink, muted explanatory copy, and sparse blueprint links carry hierarchy. No score tile, progress meter, badge, or decorative completion state is introduced. | Reading order is preserved as role loop → evidence artifact → mock step → debrief. |
| Semantic foundation | The surface uses labelled sections, headings, ordered lists for sequences, unordered lists for checklists, and native links for onward actions. | The same semantic order serves the mobile reflow; visible global focus treatment and reduced-motion rules remain inherited. |

## Durable Surface Patterns

- **Evidence before progress.** Preparation is represented by truthful artifacts, rubric evidence, and a next revision action—not by completion percentages or motivational scoring.
- **One ruled field, not a card collection.** Related options and artifacts share continuous top and bottom rules; whitespace and column alignment provide grouping.
- **Templates are annotations.** Reusable language is offset with one blueprint hairline and a compact mono label, keeping the body copy dominant.
- **Time is operational metadata.** Duration sits next to the role or mock step it governs and remains visible through the mobile reflow.
- **The loop closes in revision.** Every rehearsal ends in a debrief question and a concrete route back to saved revision work.

## Finish Record

- Independent finish review: **SHIP**; no material design fixes remain.
- `DESIGN.md` and `.impeccable/design.json` stay unchanged. The implementation adds no new global token or primitive; its durable decisions are composition rules scoped to this interview surface.

## Direction Contract

THESIS: Interview preparation is a repeatable evidence loop, not a gamified checklist.
OWN-WORLD: Cool paper, dark ink, blueprint blue, restrained amber/teal, tab/index strips, ruled panels, and the diagram-led Technical Field Atlas.
STORY: Choose a role loop → assemble evidence → practice a timed mock → capture the debrief.
FIRST VIEWPORT: Orient the learner to the role-loop selector, evidence system, and mock template.
FORM: Desktop-first technical manual with a mobile reflow.
FINISH: Restrained motion, WCAG 2.2 AA, and no dashboard-card or gamification aesthetic; independent finish review disposition is SHIP.
