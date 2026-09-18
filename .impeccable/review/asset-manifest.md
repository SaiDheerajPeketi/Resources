# Asset Manifest

## Verdict

No runtime raster asset is needed. The approved map-dominant comp contains interface chrome, an interactive prerequisite diagram, icons, rules, status marks, and a faint procedural calibration field; each is sharper, more accessible, and more responsive as semantic HTML/CSS/SVG or library-rendered vector output. The three PNG comps remain design records only.

## Produce

None.

## Direct

| id | source | output | strategy | dimensions | format | transparency | deviations | qa_status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pwa-icon` | `public/icon.svg` | `public/icon.svg` | Keep the existing authored vector project asset; the manifest already points to it. | `viewBox="0 0 512 512"` | SVG | No; cool-paper background is intrinsic | None | accepted |

## Semantic

| id | implementation | notes | qa_status |
| --- | --- | --- | --- |
| `global-header` | Semantic header/nav/search markup, CSS rules and fields, Lucide icons | Keep wordmark text and controls live; no screenshot or raster logo. | accepted |
| `track-index` | Semantic nav/buttons, Lucide track icons, CSS active rule and dividers | Six tracks and counts remain keyboard-operable and text-readable. | accepted |
| `skill-map` | `@xyflow/react` SVG edges/markers plus semantic CSS-styled nodes; semantic outline below 900px | Interactive geometry must remain vector. The dot/calibration field is code-owned. | accepted |
| `selected-marker` | CSS pseudo-element and/or small authored SVG attached to the selected node | The folded `YOU ARE HERE` flag is precise geometry, not raster; verify it is present in the final implementation. | needs_parent_review |
| `topic-inspector` | Semantic aside/sections/links/buttons, Lucide action icons, CSS rules | All text, status labels, prerequisites, and calls to action remain live. | accepted |
| `status-language` | CSS line/border styles, text labels, and SVG/Lucide symbols | Do not encode state by color alone. | accepted |
| `paper-field` | Cool paper color, extremely low-opacity procedural speckle/dot pattern, and ruled CSS borders | The comp shows no image-native paper fibers or photographic material. Do not add a raster texture. | accepted |
| `responsive-outline` | Semantic grouped topic buttons replacing the graph below 900px | No rasterized map or screenshot fallback. | accepted |

## Mock Provenance

- `atlas-map-dominant.png`, `atlas-reading-dominant.png`, and `atlas-index-dominant.png` are each 1536×1024 PNG design records.
- All three carry embedded prompts. The Impeccable prompt scan reports `3 rasters, 0 missing`.
- Each embedded prompt exactly matches its adjacent `.prompt.txt` file.
- The surface brief names `.impeccable/mocks/atlas-map-dominant.png` as the approved comp.
- `atlas-map-dominant.png.json` records `approved: true`, the approval date, selection basis, and the prompt text filename.

## Provenance Gaps

- `atlas-reading-dominant.png` and `atlas-index-dominant.png` do not have the canonical adjacent `.png.json` prompt sidecar.
- `atlas-map-dominant.png.json` is an approval record that points to the prompt text file, but it does not include the canonical `prompt`, `createdAt`, `tool`, or `model` fields.
- Prompt intent is not lost: every mock has the exact prompt embedded in the PNG and mirrored in `.prompt.txt`. The gaps are sidecar normalization/generator-metadata gaps, not missing prompt provenance.
- `.impeccable/review/atlas-desktop.png` and `atlas-mobile.png` are QA captures, not runtime assets or generated comp ingredients; they are outside the shipping-raster provenance requirement.

## Execution Order

1. No asset production work.
2. Keep all listed visual roles semantic/vector during implementation and fixes.
3. Optionally normalize the mock JSON sidecars in a separate documentation pass; do not regenerate the comps.

## Blockers

None.

## Assumptions

- The approved comp and PRODUCT.md remain authoritative.
- Review screenshots and `.impeccable/mocks/*` are not referenced by runtime code.
- The existing authored PWA SVG is intentionally code/vector-owned and does not require image-generation provenance.
