---
name: accessibility-migration-analysis
description: Create accessibility migration analysis docs for 2nd-gen component migration. Use when on the "analyze accessibility" step for one or more components.
globs: CONTRIBUTOR-DOCS/**/accessibility-migration-analysis.md
alwaysApply: false
---

# Component migration: analyze accessibility

Create comprehensive accessibility documentation for the **analyze accessibility** step of 2nd-gen component migration.
One markdown file per component, following a fixed structure (ARIA context, recommendations, testing, checklist,
references). Use this when **creating or updating** `accessibility-migration-analysis.md` under `CONTRIBUTOR-DOCS/03_project-planning/03_components/<component>/`.

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
- **Non-focusable** components: include `### Manual screen reader testing` under `## Testing` (see [Testing](#testing) in **Full instructions**), with **browse mode** and a link to `2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx`.

### Reference examples (consistency)

Use these existing docs when matching structure, headings, tables, and phrasing:

- `CONTRIBUTOR-DOCS/03_project-planning/03_components/badge/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/divider/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/progress-circle/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/meter/accessibility-migration-analysis.md` (non-focusable component with `### Manual screen reader testing`—**browse mode** and Storybook guide)
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/status-light/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/popover/accessibility-migration-analysis.md` (subheadings for **template** subsections that **do not apply**, with **Does not apply** / **Intentionally omitted** explanations)

## File location and discovery

- **Path:** `CONTRIBUTOR-DOCS/03_project-planning/03_components/<component-name>/accessibility-migration-analysis.md`
- **Pairing:** Link to `./rendering-and-styling-migration-analysis.md` from **Overview → Also read**.
- **Nav:** After adding a file or changing `##` / `###` headings, run `node update-nav.js` from `CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs` (see **contributor-doc-update** rule). Register the doc in `03_components/README.md` when introducing a new component folder.
- **Non-focusable** components: add `### Manual screen reader testing` (browse mode + `2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx`)—see **Full instructions** under `## Testing`.

### Important

- Verify behavior and ARIA in **2nd-gen source** before stating what the component exposes — do not document ARIA the code does not set
- Ask clarifying questions for uncertain mappings instead of guessing
- When the doc covers **progress**, **loading**, **busy**, or **spinner** UX, align guidance with Adobe’s Figma file **Loading animation discovery** ([Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)); if you cite or rely on it in the doc body, **also** list that link under **`## References`**

## Full instructions

### Required section order

Use this **H2** order. **Do not** skip any of these top-level **H2** blocks for the component; each must appear in the file when that analysis exists.

1. `## Overview`
2. `## ARIA and WCAG context`
3. `## Related 1st-gen accessibility (Jira)`
4. `## Recommendations: \`<swc-component-name>\``
5. `## Testing` with `### Automated tests` and, when the component is **not focusable** in its default supported use, `### Manual screen reader testing` (see [Testing](#testing) below)
6. `## Summary checklist`
7. `## References`

Under **`## Recommendations`**, use these **`###` subsections** in order:

1. `### ARIA roles, states, and properties`
2. `### Shadow DOM and cross-root ARIA Issues`
3. `### Accessibility tree expectations`
4. **Optional (when product guidance needs it):** e.g. `### Assistive technology, live regions`—place **after** accessibility tree expectations and **before** keyboard and focus. For **motion** (WCAG 2.2.2, reduced motion, Spectrum tokens), add rows to **Guidelines that apply** and the **Recommendations** table instead of a separate `### Motion` section—see **`progress-circle/accessibility-migration-analysis.md`**. For **loading / progress** design intent (variants, motion), align with Figma **Loading animation discovery** ([Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)) and **list it under `## References`** whenever the contributor doc cites it.
5. `### Keyboard and focus`

Separate major sections with a horizontal rule (`---`) where existing docs use it (after Overview, after ARIA and WCAG context, after Related 1st-gen accessibility (Jira) before Recommendations, after Recommendations block before Testing).

### `###` subsections that do not apply (keep the heading)

The **H2** list above is mandatory. **Within Recommendations** and **Testing**, the skill and **peer** docs (for example `CONTRIBUTOR-DOCS/03_project-planning/03_components/button/accessibility-migration-analysis.md` and `popover/accessibility-migration-analysis.md`) use additional **`###` subsections**—form association, live regions, motion, extra keyboard boilerplate, Playwright or manual test expectations, and similar.

- **If a template subsection does not apply** to the component, **do not delete the topic**: keep the same **`###` heading** the peer doc or this skill would use, and set the **body** to a short **Does not apply** (or **Intentionally omitted**) explanation: **what** the subsection would normally cover, and **why** it does not apply (wrong interaction model, out of scope, concern already covered only under **Guidelines that apply** or elsewhere).
- This keeps the **In this doc** table of contents and **side-by-side** reading across components **aligned**, so reviewers are not left wondering whether a topic was forgotten or out of scope.
- **Exception — “none” is still an answer:** A subsection that exists to record **whether** cross-root or other issues **exist** may use a **minimal body** (for example **`### Shadow DOM and cross-root ARIA Issues`** with only the word **`None`**) when the **topic** applies but the **outcome** is _no_ issue. That is **not** the same as a subsection the component **type** never needs. Use **None** for “we checked; nothing to report,” and **Does not apply** for “this subsection’s category is irrelevant to this host.”

### Overview

- Start with a short paragraph: what the doc covers, **`swc-*` name**, and **WCAG 2.2 Level AA** as the target.
- Use **`###` subheadings** for structured bits—**do not** use bold-only labels like `**Also read:**` as section titles.

**Typical subheadings** (include what fits the component):

| Subheading                                 | Use when                                                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `### Also read`                            | Always—point at the component’s `rendering-and-styling-migration-analysis.md` (and optional related a11y docs).  |
| `### What it is` or `### What a <noun> is` | Always—one clear definition.                                                                                     |
| `### When to use something else`           | When authors often confuse this with another component—link to other migration or a11y docs with relative paths. |
| `### What it is not`                       | When a common mistaken identity exists (e.g. progress ring vs in-field spinner).                                 |
| `### Related`                              | Optional—related components (e.g. progress bar vs progress circle).                                              |

Body text under each `###` is normal paragraphs and/or bullets.

## ARIA and WCAG context

- `### Pattern in the APG` — bullets: how APG (or lack of a named pattern) relates to this widget; link to APG patterns when relevant.
- `### Guidelines that apply` — a **table** with columns **`Idea`** and **`Plain meaning`** (WCAG / WAI-ARIA links in the first column as needed).
- Use the heading **`### Guidelines that apply`** (not “Guidelines that still apply”) for consistency across components.
- Optional closing paragraph: `**Bottom line:** …` before `---`.

## Related 1st-gen accessibility (Jira)

- **Placement:** Third **H2**, immediately **after** `## ARIA and WCAG context` and **before** `## Recommendations`, separated with `---` like other major sections.
- **Content:** Put the **markdown table** immediately under the **H2** (no intro paragraph). **Adobe Jira** is authoritative for **open** vs **closed** status and for **resolution**—refresh table cells when you triage; this table is only a snapshot. Use link targets such as `https://jira.corp.adobe.com/browse/SWC-####`.
- **After the table:** Do **not** add follow-up paragraphs that list excluded issues or explain cross-component scope (for example paragraphs starting with **Omitted from this table (by doc rules)** or **Scope note**). Apply **Exclude** by **omitting rows**; put any needed nuance in an optional **Notes** column or in the **Summary** cell.
- **Columns (recommended): Jira** | **Type** (Story, Bug, Epic, …) | **Status (snapshot)** | **Resolution (snapshot)** (e.g. Unresolved, Done, Fixed—omit or use “—” when not applicable) | **Summary**. Optional **Notes** when helpful (PR references, file paths, `@todo` locations, “applies to related `sp-*` …”).
- **Scope:** Include rows your team tracks for this component’s **1st-gen** (`sp-*`) accessibility work; **add rows** when you file or discover issues, and **trim or update** when Jira state or scope changes. Do **not** maintain a separate contributor-doc index file for the same list.
- **Exclude (always apply when curating the table):**
  - **Labels:** Do **not** list issues that carry Jira labels **`gen2`** or **`gen-2`** (match your project’s spelling and casing). This section tracks **1st-gen** (`sp-*`) accessibility work, not 2nd-gen program-only tickets.
  - **Audit:** Do **not** list **audit** issues whose **summary begins with Audit and improve** (usually **Epics** for cross-cutting accessibility audits—e.g. primitive components, card and meter). Track those in Jira or program views, not in per-component tables.
  - **Migration consultation:** Do **not** list **stories** whose summary follows **Migration (YYYY-MM-DD): Accessibility consultation for 2nd-gen migration** (program-level 2nd-gen consultation; track in migration/program views, not per-component tables).
- **Reference:** See **`badge/accessibility-migration-analysis.md`** (and sibling component docs) for a full example table. **Avatar** currently documents the Jira block in **`avatar/rendering-and-styling-migration-analysis.md`** alongside other accessibility migration content—prefer splitting to **`avatar/accessibility-migration-analysis.md`** when that file is added.

## Recommendations: ARIA roles, states, and properties

Use a **table** (`Topic | What to do`).

**Single semantic role policy** (always address):

- **Prescribed host role** (e.g. `separator`, `progressbar`): State that the role is **prescribed** and **fixed**, **must not** be author-overridable in implementation or docs, and that **`swc-*` maps to one semantic role only**. If another role is needed, authors must use **different markup or a different component**—not a role override on this element.
- **No default host role** (e.g. badge, status light): State that the component should still represent **one** clear semantic thing; **do not** set a conflicting host `role` (e.g. `button`, `progressbar`) to fake another widget—use the appropriate **button / link / tag / other** component instead.
- **Never** recommend **`aria-live="assertive"`** for loading or routine progress.
- Treat **`aria-live="polite"`** as **rare**: polite regions still **queue** speech, and **several** components or regions updating together becomes **noisy** (bursts, backlog). Prefer **native role semantics** (e.g. **`progressbar`**) and **one** primary message for related loaders when possible.

Then add rows for **name**, **states**, **properties**, **visual-only props**, **docs expectations**, etc., **verified against the real implementation**.

### Shadow DOM and cross-root ARIA Issues

- **Heading text must be exactly:** `### Shadow DOM and cross-root ARIA Issues` (word **Issues** capitalized).
- **If** the component has **no** cross-root ARIA concerns (no reliance on **ID references** that must resolve across shadow boundaries, e.g. `aria-labelledby` / `aria-describedby` pointing at shadow-only IDs) **and** it is **not** a **form-associated** control (or otherwise dependent on cross-root labeling in ways that need a written plan), the **entire body** of the subsection should be a single word: **`None`** (no extra sentences).
- **Otherwise** describe the concrete issues and expectations (e.g. `ElementInternals`, `aria-*` delegation, proposed ID strategies).

## Accessibility tree expectations

- Use short subsections or bold lead-ins for variants (e.g. with text, icon-only, determinate vs indeterminate).
- Describe what assistive technologies should **see**—aligned with implementation.

## Live regions and announcements (progress, loading, status)

When the component or its docs touch **live regions** or **frequent** status updates:

- Call out **over-announcing** as a risk: docs should **warn** authors not to flood screen reader users.
- **Never** recommend **`aria-live="assertive"`** for loading or routine progress (interrupts and overwhelms).
- Treat **`aria-live="polite"`** as **rare**: polite regions still **queue** speech, and **several** components or regions updating together becomes **noisy** (bursts, backlog). Prefer **native role semantics** (e.g. **`progressbar`**) and **one** primary message for related loaders when possible.

For **progress**, **loading**, **busy**, or **spinner** UX (including motion, variants, and when which treatment applies), **consult** Adobe’s Figma file **Loading animation discovery**: [Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery). Align written guidance with that source where the doc covers those states; **add the same link under `## References`** in the contributor doc whenever you cite or rely on it.

See **`CONTRIBUTOR-DOCS/03_project-planning/03_components/progress-circle/accessibility-migration-analysis.md`** for a full example.

### Keyboard and focus

Use a **single** `### Keyboard and focus` subsection under `## Recommendations`. Do **not** add a separate `### “Not focusable” (skill boilerplate)` heading.

- **If the component is not focusable** in its default, supported use (no Tab stop, not a keyboard widget): under `### Keyboard and focus`, include **only** this sentence (no extra bullets or tables):

  `**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.`

- **If the component is focusable or has a keyboard pattern:** put Tab order, keys, roving tabindex, focus trap, and related guidance in the same `### Keyboard and focus` subsection. Do **not** paste the divider-style “Not focusable. …” one-liner, and do **not** add a paragraph arguing that line “does not apply”—that text is only for **non-focusable** decorative hosts.

- **If that one-sentence “Not focusable” block does not fit** (for example a shell or positioning host with no default keyboard contract, but not static decoration like a divider): still use one `### Keyboard and focus`; add a short paragraph that describes what applies for _this_ host (see `CONTRIBUTOR-DOCS/03_project-planning/03_components/popover/accessibility-migration-analysis.md`). Never split that explanation out under a nested `### “Not focusable”` heading.

## Testing

### Automated tests

- Table: **Kind of test** | **What to check** (unit, aXe/Storybook, Playwright ARIA snapshots, contrast, etc.—match what the repo actually uses for that component).

### Manual screen reader testing (non-focusable components)

**When to include:** Add `### Manual screen reader testing` after `### Automated tests` whenever the component is **not keyboard focusable** in its default, supported use—the same situation where `### Keyboard and focus` is only the prescribed **Not focusable** sentence.

**What to write:** Explain that manual testers using a **screen reader** need **browse mode** (document or scan mode) to encounter the control in **content order**; **forms** / **application**-style **focus navigation** alone will **not Tab** to a **non-focusable widget**, so **browse mode** is required to verify **name**, **role**, and **relevant state** in the **reading order**.

**Reference (required in the contributor doc when this subsection exists):** Link to the 2nd-gen Storybook accessibility guide in the repo. From `CONTRIBUTOR-DOCS/03_project-planning/03_components/<component>/accessibility-migration-analysis.md`, the relative path is:

`../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx`

In the **body**, point to the **Browse mode (document/scan mode)** section. Add the same link (or a short line such as “2nd-gen Storybook: Screen reader testing” pointing to that file) under **`## References`**. Add a **summary checklist** item that **manual SR testing** uses **browse mode** per that guide.

**See:** `CONTRIBUTOR-DOCS/03_project-planning/03_components/meter/accessibility-migration-analysis.md` for a full example.

## Summary checklist

- Markdown task list (`- [ ]`) of concrete, verifiable items (stories, docs, tree, focus, tooling, and for non-focusable components manual screen reader / browse mode per the Storybook guide when `### Manual screen reader testing` is present).

## References

- Include WAI-ARIA, WCAG 2.2, APG “Read me first” (or equivalent), and the component rendering-and-styling migration link at minimum. Add APG pattern links when used in the doc.
- When the doc includes `### Manual screen reader testing` for a non-focusable component, add the 2nd-gen Storybook screen reader testing guide: `2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx` (in contributor docs, link with `../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx` from `03_components/<component>/accessibility-migration-analysis.md`; adjust if the file moves).
- When the doc discusses progress, loading, busy, or spinner behavior and you point authors at the Loading animation discovery Figma file in the body, list it again here: [Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery).

## Writing style

- Follow text-formatting workspace rules: sentence case for headings; proper nouns (ARIA, WCAG, APG) as usual.
- Prefer plain, scannable wording; link to the rendering doc instead of duplicating it.
- Verify behavior and ARIA in 2nd-gen source before stating what the component exposes.
- For optional `###` subsections copied from peer docs that do not apply to the component, keep the heading and add a short “Does not apply” (or “Intentionally omitted”) body—do not leave readers to infer omission; match the “subsections that do not apply (keep the heading)” guidance in Full instructions.
- **Bold:** You may use `**…**` sparingly when it helps scanning (constraints, out-of-scope callouts, critical negations)—not for whole paragraphs or decoration. When estimating load, count only body prose: exclude markdown heading title lines (`#`…`####`), text inside link labels (`[…](…)`), fenced code, inline code, paths, generated breadcrumbs/TOC, and obvious boilerplate. Non-header, non-link prose should not sit more than about 30% inside bold markup; trim if above that.
- **Bold (runs):** When adjacent words share the same emphasis, use one bold span (`**migration wave**`), not separate pairs per word (`**migration** **wave**`). Do not merge across words that should stay unstyled, or around links or code where splitting is clearer.

## Related rules and skills

- `contributor-doc-update.mdc` — when to run `update-nav.js` after heading or structure changes.
- `component-migration-analysis` skill — for `rendering-and-styling-migration-analysis.md`, not this file.
- `stories-documentation.mdc` / `stories-format.mdc` — Storybook docs, separate from this contributor planning doc.
