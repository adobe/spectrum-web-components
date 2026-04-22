---
name: accessibility-migration-analysis
description: Create accessibility migration analysis docs for 2nd-gen component migration. Use when on the "analyze accessibility" step for one or more components.
globs: CONTRIBUTOR-DOCS/**/accessibility-migration-analysis.md
alwaysApply: false
---

# Component migration: analyze accessibility

Create comprehensive accessibility documentation for the **analyze accessibility** step of 2nd-gen component migration. One markdown file per component, following a fixed structure (ARIA context, recommendations, testing, checklist, references).

## Mindset

You are an accessibility auditor, not a documenter. Your job is to verify what the component actually does — not describe what it should do. Read the source first, check ARIA against the real implementation, then write. Never document behavior you haven't confirmed.

## When to use this skill

- You are on the "analyze accessibility" step of the 2nd-gen component migration workstream
- The user asks to create an accessibility migration analysis for one or more components
- The user asks to analyze accessibility for a component (e.g. "analyze accessibility for button", "create accessibility analysis for dialog")

## How to invoke

- Say "create accessibility analysis for [component]", "analyze accessibility for [component]", or "accessibility migration for [component]"
- Or refer to the step "analyze accessibility" in the 2nd-gen component migration workstream — the agent should use this skill and read the full instructions below

## Quick reference

### Output

- **One markdown file per component** at:
  `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/accessibility-migration-analysis.md`
- **Pairing:** Link to `./rendering-and-styling-migration-analysis.md` from **Overview → Also read**
- **Nav:** After adding the file or changing `##` / `###` headings, run `node update-nav.js` from `CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs`. Register the doc in `03_components/README.md` when introducing a new component folder.

### Reference examples (consistency)

Use these existing docs when matching structure, headings, tables, and phrasing:

- `CONTRIBUTOR-DOCS/03_project-planning/03_components/badge/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/divider/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/progress-circle/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/status-light/accessibility-migration-analysis.md`

### Important

- Verify behavior and ARIA in **2nd-gen source** before stating what the component exposes — do not document ARIA the code does not set
- Ask clarifying questions for uncertain mappings instead of guessing

## Full instructions

### Required section order

Use this **H2** order. **Do not** skip sections that apply; omit only what truly does not apply (and say so briefly if it helps readers).

1. `## Overview`
2. `## ARIA and WCAG context`
3. `## Recommendations: \`<swc-component-name>\``
4. `## Testing` with `### Automated tests`
5. `## Summary checklist`
6. `## References`

Under **`## Recommendations`**, use these **`###` subsections** in order:

1. `### ARIA roles, states, and properties`
2. `### Shadow DOM and cross-root ARIA Issues`
3. `### Accessibility tree expectations`
4. **Optional (when product guidance needs it):** e.g. `### Assistive technology, live regions` — place **after** accessibility tree expectations and **before** keyboard and focus. For **motion** (WCAG 2.2.2, reduced motion, Spectrum tokens), add rows to **Guidelines that apply** and the **Recommendations** table instead of a separate `### Motion` section — see `progress-circle/accessibility-migration-analysis.md`.
5. `### Keyboard and focus`

Separate major sections with a horizontal rule (`---`) where existing docs use it (after Overview, after ARIA and WCAG context, after Recommendations block before Testing).

### Overview

- Start with a short paragraph: what the doc covers, **`swc-*` name**, and **WCAG 2.2 Level AA** as the target.
- Use **`###` subheadings** for structured bits — **do not** use bold-only labels like `**Also read:**` as section titles.

**Typical subheadings** (include what fits the component):

| Subheading                                 | Use when                                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `### Also read`                            | Always — point at the component's `rendering-and-styling-migration-analysis.md` (and optional related a11y docs).  |
| `### What it is` or `### What a <noun> is` | Always — one clear definition.                                                                                     |
| `### When to use something else`           | When authors often confuse this with another component — link to other migration or a11y docs with relative paths. |
| `### What it is not`                       | When a common mistaken identity exists (e.g. progress ring vs in-field spinner).                                   |
| `### Related`                              | Optional — related components (e.g. progress bar vs progress circle).                                              |

### ARIA and WCAG context

- `### Pattern in the APG` — bullets: how APG (or lack of a named pattern) relates to this widget; link to APG patterns when relevant.
- `### Guidelines that apply` — a **table** with columns **`Idea`** and **`Plain meaning`** (WCAG / WAI-ARIA links in the first column as needed).
- Use the heading **`### Guidelines that apply`** (not "Guidelines that still apply") for consistency across components.
- Optional closing paragraph: `**Bottom line:** …` before `---`.

### Recommendations: ARIA roles, states, and properties

Use a **table** (`Topic | What to do`).

**Single semantic role policy** (always address):

- **Prescribed host role** (e.g. `separator`, `progressbar`): State that the role is **prescribed** and **fixed**, **must not** be author-overridable in implementation or docs, and that **`swc-*` maps to one semantic role only**. If another role is needed, authors must use **different markup or a different component** — not a role override on this element.
- **No default host role** (e.g. badge, status light): State that the component should still represent **one** clear semantic thing; **do not** set a conflicting host `role` (e.g. `button`, `progressbar`) to fake another widget — use the appropriate **button / link / tag / other** component instead.

Then add rows for **name**, **states**, **properties**, **visual-only props**, **docs expectations**, etc., **verified against the real implementation**.

### Shadow DOM and cross-root ARIA Issues

- **Heading text must be exactly:** `### Shadow DOM and cross-root ARIA Issues` (word **Issues** capitalized).
- **If** the component has **no** cross-root ARIA concerns (no reliance on **ID references** that must resolve across shadow boundaries, e.g. `aria-labelledby` / `aria-describedby` pointing at shadow-only IDs) **and** it is **not** a **form-associated** control, the **entire body** of the subsection should be a single word: **`None`** (no extra sentences).
- **Otherwise** describe the concrete issues and expectations (e.g. `ElementInternals`, `aria-*` delegation, proposed ID strategies).

### Live regions and announcements

When the component or its docs touch **live regions** or **frequent** status updates:

- Call out **over-announcing** as a risk: docs should **warn** authors not to flood screen reader users.
- **Never** recommend **`aria-live="assertive"`** for loading or routine progress.
- Treat **`aria-live="polite"`** as **rare**: polite regions still **queue** speech, and **several** components or regions updating together becomes **noisy** (bursts, backlog). Prefer **native role semantics** (e.g. **`progressbar`**) and **one** primary message for related loaders when possible.

See `progress-circle/accessibility-migration-analysis.md` for a full example.

### Keyboard and focus

- **If the component is not focusable** in its default, supported use: the subsection must contain **only** this sentence:

  `**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.`

- **If the component is focusable or has a keyboard pattern:** replace with accurate, component-specific guidance (Tab order, keys, roving tabindex, focus trap, etc.).

### Accessibility tree expectations

- Use short subsections or bold lead-ins for variants (e.g. with text, icon-only, determinate vs indeterminate).
- Describe what assistive technologies should **see** — aligned with implementation.

### Testing

### Automated tests

- Table: **Kind of test** | **What to check** (unit, aXe/Storybook, Playwright ARIA snapshots, contrast, etc. — match what the repo actually uses for that component).

### Summary checklist

- Markdown task list (`- [ ]`) of concrete, verifiable items (stories, docs, tree, focus, tooling).

### References

- Include **WAI-ARIA**, **WCAG 2.2**, **APG "Read me first"** (or equivalent), and the component **rendering-and-styling migration** link at minimum. Add APG pattern links when used in the doc.

### Writing style

- Follow **text-formatting** rules: sentence case for headings (proper nouns such as **ARIA**, **WCAG**, **APG** stay as usual).
- Prefer plain, scannable wording; avoid duplicating the rendering doc — **link** to it instead.
- **Verify** behavior and ARIA in **2nd-gen source** before stating what the component exposes.

## Related rules and skills

- **contributor-doc-update.md** — when to run `update-nav.js` after heading or structure changes.
- **component-migration-analysis** skill — for `rendering-and-styling-migration-analysis.md`, not this file.
- **stories-documentation.md** / **stories-format.md** — Storybook docs, separate from this contributor planning doc.
