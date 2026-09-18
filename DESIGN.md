---
name: Interview Atlas
description: A calm technical field manual for navigating interview knowledge.
colors:
  blueprint-blue: "#1768d4"
  blueprint-blue-deep: "#135fc8"
  blueprint-blue-soft: "#eaf2ff"
  annotation-teal: "#178d8b"
  annotation-teal-soft: "#e3f6f4"
  annotation-amber: "#bd771d"
  annotation-amber-soft: "#fff3dc"
  danger-red: "#ad3343"
  cool-paper: "#f9fbfd"
  raised-paper: "#ffffff"
  navigation-field: "#e7eaef"
  dark-ink: "#101b36"
  muted-ink: "#56647d"
  faint-ink: "#7b879b"
  rule: "#d9e0e8"
  rule-strong: "#bdc9d8"
typography:
  headline:
    fontFamily: "Atkinson Hyperlegible Next Variable, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(1.55rem, 2.25vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, Atkinson Hyperlegible, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.48
  label:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: "0.66rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  sheet: "4px"
  sm: "6px"
  control: "7px"
  field: "8px"
  panel: "9px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.blueprint-blue}"
    textColor: "{colors.raised-paper}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
    height: "43px"
  button-secondary:
    backgroundColor: "{colors.raised-paper}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
    height: "43px"
  input-search:
    backgroundColor: "{colors.raised-paper}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "42px"
  chip-status:
    backgroundColor: "{colors.annotation-teal-soft}"
    textColor: "{colors.annotation-teal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "3px 7px"
---

# Design System: Interview Atlas

## Overview

**Creative North Star: "Technical Field Atlas"**

Interview Atlas should feel like a carefully maintained engineering field manual: calm, exact, dense enough to be useful, and quiet enough for long study sessions. Cool paper, dark ink, fine rules, index tabs, and blueprint annotations turn a large curriculum into navigable terrain rather than a generic dashboard. Two related instruments share this world: the Role Atlas maps prerequisites, while the Stack Workbench layers ecosystems from runtime through framework to tooling.

The interface is diagram-led but never illustration-led. Meaning lives in semantic text, explicit labels, node-and-edge relationships, and non-color status markers. The world rejects decorative gamification, glass surfaces, gradients, card mosaics, stock imagery, and ornamental charts.

**Key Characteristics:**

- Cool technical paper with dark blue-black ink.
- Blueprint blue reserved for active paths and primary actions.
- Teal and amber behave like restrained editorial annotations.
- Ruled, mostly flat surfaces with small-radius working controls.
- Mono typography is metadata, never the reading voice.
- Stack plates, command ledgers, and problem rows expose relationships without becoming dashboard cards.

## Colors

The palette is a restrained technical-manual system: one blueprint accent, two annotation colors, and a cool neutral paper scale.

### Primary

- **Blueprint Blue:** active graph paths, selected nodes, primary actions, and current-location markers.
- **Deep Blueprint:** link and hover emphasis where blue text needs stronger contrast.
- **Blueprint Wash:** selected rows and low-emphasis active backgrounds.

### Secondary

- **Annotation Teal:** published/completed states and positive confirmation; always paired with a symbol or label.
- **Annotation Amber:** warnings, hints, and needs-review material; use the soft tone for the field and the dark tone for ink.

### Neutral

- **Cool Paper:** the application canvas and primary reading ground.
- **Raised Paper:** controls, field notes, and inspector surfaces.
- **Dark Ink:** all primary reading and structural text.
- **Muted Ink:** summaries, supporting metadata, and secondary navigation.
- **Rule / Strong Rule:** structure the interface without turning every region into a card.

**The Blueprint Rarity Rule.** Blueprint blue marks location, path, focus, or primary action; it is not a decorative fill.

**The Redundancy Rule.** Never communicate status through hue alone. Use labels, line styles, icons, or geometry with color.

## Typography

**Display Font:** Atkinson Hyperlegible Next Variable (with Atkinson Hyperlegible and sans-serif fallbacks)  
**Body Font:** Atkinson Hyperlegible Next Variable (with Atkinson Hyperlegible and sans-serif fallbacks)  
**Label/Mono Font:** JetBrains Mono Variable (with monospace fallback)

**Character:** Atkinson keeps dense educational material open and readable; JetBrains Mono contributes the compact calibration-label voice of a technical atlas. The contrast is functional, not decorative.

### Hierarchy

- **Headline** (700, fluid 1.55–2.25rem, 1.05): track and topic titles with tight spacing.
- **Title** (650–700, 1.08–1.25rem): section titles, inspector headings, and navigation anchors.
- **Body** (400, 1rem, 1.48): explanations and lessons; long reading measures stay near 70ch.
- **Manual Body** (400, 0.94–1rem, 1.58): technology manuals, command explanations, problem statements, and company notes.
- **Label** (400, 0.62–0.70rem, spaced uppercase): track codes, levels, times, and status metadata.

**The Mono Is Metadata Rule.** Do not use the mono face for paragraphs, headings, or personality copy.

## Layout

Desktop atlas pages use a 17% / flexible center / 27% three-pane grid below a 70px sticky command header. The left pane indexes tracks, the center is the working map, and the right inspector explains the current selection. Thin rules establish ownership between regions.

Desktop Stack Workbench pages use an 18% / flexible center / 26% three-pane grid. The ecosystem index stays left, the center arranges technology layers in semantic stack order, and the inspector stays right. Technology manuals use a narrower 235px contents rail beside a readable article measure; DSA sheets use ruled ledgers rather than tiles.

At 1120px atlas panes tighten. At 980px the Workbench inspector drops below the stack while the ecosystem index remains available. At 900px atlas pages become vertical documents: tracks turn into horizontally scrollable index tabs, the interactive graph is replaced by the semantically equivalent topic outline, and the inspector follows it. At 720px Workbench and manual pages become a single semantic document with a two-column ecosystem outline; at 540px the command header stacks and nonessential utility labels yield to icons. Spacing follows a compact 6/8/12/16/24px rhythm, with larger article gaps used only between lesson sections.

Ruled comparisons use the same row-and-column grammar as adjacent manifests so curated guidance and complete inventories remain part of one field manual. When comparison rows collapse on narrow screens, retain the subject plus the decisive fields and repeat a visible inline label inside every surviving non-title cell.

**The Map-and-Inspector Rule.** On wide screens, selection context and explanation remain visible together. On narrow screens, preserve the same information order in a readable outline rather than shrinking the graph.

**The Layered Stack Rule.** Technology layers read from language or runtime foundations through frameworks and operational tooling. Mobile preserves that order as a document instead of imitating a compressed canvas.

## Elevation & Depth

The system is flat by default. Rules, paper tones, and spatial ownership create most depth. Small ambient shadows are allowed for orientation-sensitive objects: the sticky header, wordmark, search results, selected graph node, dark code field, and printable revision sheet.

### Shadow Vocabulary

- **Floating overlay** (`0 12px 34px rgb(4 23 73 / 0.14)`): command-search results only.
- **Selected node** (`0 7px 18px rgb(30 118 243 / 0.16)`): current graph location.
- **Quiet lift** (`0 4px 12px rgb(4 23 73 / 0.055)`): available graph nodes.

**The Flat-by-Default Rule.** A shadow must explain focus, overlay, or physical page separation; static containers use rules instead.

## Shapes

Working controls use gently curved 6–9px corners. Revision sheets use a tighter 4px corner so they read as printable paper. Status tokens and small markers are circular or pill-shaped. Dashed borders mean planned content; solid borders mean available or published content. The folded `YOU ARE HERE` flag is the signature atlas silhouette.

Workbench stack plates use 5px corners and small stepped offsets so depth communicates dependency order, not decoration. Command rows remain square-edged inside their ruled cookbook.

## Components

### Buttons

- **Shape:** compact, gently curved control (7px) with a minimum 40–43px target.
- **Primary:** Blueprint Blue with white text and a strong blue border.
- **Secondary:** Raised Paper with dark ink and a cool structural border.
- **Hover / Focus:** border or ink shifts toward Deep Blueprint; focus uses a visible three-pixel blue outline with separation.

### Chips

- **Style:** compact mono labels, 3px × 7px padding, pill geometry.
- **State:** teal wash for published, amber wash for caution, and ruled neutral for taxonomy.

### Cards / Containers

- **Corner Style:** panels use 8–9px corners; print-oriented sheets use 4px.
- **Background:** Cool Paper for the field and Raised Paper for active reading or controls.
- **Shadow Strategy:** none at rest; see Elevation & Depth.
- **Border:** one-pixel cool rules define structure.
- **Internal Padding:** typically 16–24px.

### Inputs / Fields

- **Style:** white field, strong cool rule, 6–8px corners, dark ink.
- **Selects:** use the same raised-paper field, blueprint chevron, compact label, and visible hover/focus/disabled states; browser-native select chrome must not introduce an unrelated visual system.
- **Focus:** the global focus-visible outline remains unobscured.
- **Error / Disabled:** error uses labelled Danger Red; disabled actions remain legible and explicitly unavailable.

### Navigation

Track navigation is an index, not a tab-card collection. Active items gain a Blueprint Wash and a three-pixel edge marker. Mobile retains the same labels in a horizontally scrollable strip with a blue underline.

### Ruled Comparisons

- **Structure:** use the manifest's ruled table grammar for side-by-side comparisons rather than introducing cards.
- **Priority Links:** render prioritized destinations as direct links labelled with their canonical destination titles; do not expose internal slugs or replace the title with a generic action.
- **Responsive Collapse:** keep the subject and decisive fields, and show a compact mono field label inside each surviving non-title cell.
- **Manifest Boundary:** end the curated comparison before the complete inventory and give that manifest its own heading and scope statement.

**The Curated-to-Complete Rule.** A comparison helps the reader choose an emphasis; the explicitly headed manifest that follows remains the authoritative complete inventory.

### Atlas Node

Nodes are bordered paper labels with circular state markers. Planned nodes use a dashed outline, published nodes use teal state marks, and the selected node gets a Blueprint border, traced path, and folded location flag.

### Workbench Stack Plate

A stack plate is a wide ruled technology row with an ecosystem code, kind, version policy, and publication label. The selected plate uses a Blueprint edge and wash; adjacent plates retain paper backgrounds. Small horizontal offsets indicate layers, while DOM and reading order remain foundation-to-tooling.

### Command Cookbook

Commands are displayed in ruled rows with purpose, platform, expected result, safety classification, and an explicit copy control. Shell text uses the mono font; explanations remain in the reading face. Safety always has a written label and may use amber or red only as redundant emphasis.

### Full-Depth Manual

Full-depth manuals use a visible basic-to-expert learning ladder, numbered theory ledger, ruled misconception corrections, tricky-question explanations with strong-answer rubrics, rapid-recall rows, and a printable self-check sheet. Every theory entry begins with a plain-English translation, then pairs a bounded analogy (including where it stops matching) with a concrete example. A teal labelled status marks a manual that passed the full content contract. Future incomplete material must remain planned and outside published packs rather than appearing as a shallow overview.

### DSA Ledger

Sheets and problem inventories use dense ruled rows with stable problem numbers, pattern, difficulty, estimated time, solution-language availability, a non-color progress label, and an explicit external practice destination. The Atlas title remains the internal explanation link; a separate restrained control opens the verified LeetCode match or labelled GFG fallback. Filters sit above the ledger and do not detach results from their sheet context.

Every row also carries a written lesson-depth label. A full problem page moves from exact contract and worked trace through analogy, baseline, optimal method, invariant proof, complexity, misconceptions, follow-ups, and reviewed reference code. Unreviewed language ports are visibly labelled blueprints and never presented as finished solutions.

## Do's and Don'ts

### Do:

- **Do** preserve the three-pane atlas relationship on wide screens and its semantic reading order on mobile.
- **Do** use rules, whitespace, and labels before introducing another container.
- **Do** pair every color state with text, iconography, or line treatment.
- **Do** keep body text in the hyperlegible sans face and metadata in mono.
- **Do** honor reduced-motion preferences for path tracing and panel transitions.
- **Do** use canonical destination titles for priority links and visible field labels when comparison rows collapse.
- **Do** separate curated comparisons from complete manifests with an explicit heading and scope statement.
- **Do** keep Stack Workbench layers in runtime-to-framework-to-tooling reading order and preserve that order on mobile.
- **Do** give every command a stated purpose, platform, expected result, and safety classification.
- **Do** use ruled ledgers for large problem, command, company, and technology inventories.
- **Do** label technology depth explicitly and reserve “full depth” for subject-specific theory, misconceptions, question rubrics, and revision material.
- **Do** use analogies to establish intuition, state their limits, and follow them with a technically exact example.

### Don't:

- **Don't** turn curriculum sections into a generic grid of dashboard cards.
- **Don't** add points, streaks, trophies, badges, or decorative progress theater.
- **Don't** introduce gradients, glassmorphism, stock imagery, or decorative analytics.
- **Don't** use dense shadows to manufacture hierarchy that rules and layout can express.
- **Don't** hide planned content or make it look finished.
- **Don't** place hundreds of technologies into the role graph; use the Stack Workbench and ecosystem index.
- **Don't** let adaptive recommendations silently override user-controlled confidence or hide their selection reason.
- **Don't** publish a technology until its specialist focus map, theory depth, examples, interview practice, recall material, and authoritative sources pass the same measurable contract.
