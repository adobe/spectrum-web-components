<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration plan

<!-- Document title (editable) -->

# Accordion migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Severity](#severity)
- [1st-gen API surface](#1st-gen-api-surface)
    - [sp-accordion — properties / attributes](#sp-accordion--properties--attributes)
    - [sp-accordion-item — properties / attributes](#sp-accordion-item--properties--attributes)
    - [Methods](#methods)
    - [Events](#events)
    - [Slots](#slots)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM and rendering notes](#shadow-dom-and-rendering-notes)
- [Dependencies](#dependencies)
    - [npm packages (`1st-gen/packages/accordion/package.json`)](#npm-packages-1st-genpackagesaccordionpackagejson)
    - [Runtime / sibling requirements](#runtime--sibling-requirements)
    - [External repo (styling)](#external-repo-styling)
- [Inputs from analysis docs](#inputs-from-analysis-docs)
    - [Accessibility migration analysis](#accessibility-migration-analysis)
    - [Rendering-and-styling migration analysis](#rendering-and-styling-migration-analysis)
- [Breaking changes and behavior deltas](#breaking-changes-and-behavior-deltas)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist (washing machine alignment)](#migration-checklist-washing-machine-alignment)
    - [Phase 1 — Preparation (this plan)](#phase-1--preparation-this-plan)
    - [Phase 2 — Setup](#phase-2--setup)
    - [Phase 3 — API](#phase-3--api)
    - [Phase 4 — Styling](#phase-4--styling)
    - [Phase 5 — Accessibility](#phase-5--accessibility)
    - [Phase 6 — Testing](#phase-6--testing)
    - [Phase 7 — Documentation](#phase-7--documentation)
    - [Phase 8 — Review](#phase-8--review)
- [Blockers and open questions](#blockers-and-open-questions)
- [Epic comment (paste into parent ticket)](#epic-comment-paste-into-parent-ticket)
- [References](#references)

</details>

<!-- Document content (editable) -->

Planning output for migrating **`sp-accordion`** / **`sp-accordion-item`** to **`swc-accordion`** / **`swc-accordion-item`**. Complete **before** implementation PRs. Aligns with the [washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md) and incorporates [accordion accessibility migration analysis](./accessibility-migration-analysis.md) and [accordion migration roadmap](./rendering-and-styling-migration-analysis.md).

**QA for this plan:** Confirm every public property, event, slot, and consumer-facing CSS hook is listed; confirm dependency list is complete; confirm breaking changes are explicit; **peer review** by at least one engineer before coding starts.

---

## TL;DR

- **No 2nd-gen accordion** exists yet under `2nd-gen/packages/`; setup phase creates core + SWC packages from this plan.
- **Accessibility analysis** is the source of truth for WCAG 2.2 AA target behavior; several items **differ** from current 1st-gen (keyboard, disabled pattern, closed panel hiding, heading label API).
- **Rendering-and-styling migration** doc is currently a **stub**; treat expanding it (Spectrum 2 CSS mapping, token inventory) as a **pre–Phase 4** task with spectrum-css in the [same workspace](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#workspace-setup).
- Expect **documented breaking changes**: tag rename (`sp-*` → `swc-*`), heading label moving from **`label` attribute** toward **slot-first** API, removal of **FocusGroup** arrow/Home/End navigation on the host, and **disabled** semantics on the header control.

### Severity

**Normal** for migration feasibility. Escalate to **Major** only if Spectrum 2 accordion CSS is missing or core infrastructure blocks a split core/SWC accordion (not currently observed).

---

## 1st-gen API surface

**Sources:** [`1st-gen/packages/accordion/src/Accordion.ts`](../../../../1st-gen/packages/accordion/src/Accordion.ts), [`1st-gen/packages/accordion/src/AccordionItem.ts`](../../../../1st-gen/packages/accordion/src/AccordionItem.ts), [`1st-gen/packages/accordion/package.json`](../../../../1st-gen/packages/accordion/package.json) (`@spectrum-web-components/accordion@1.11.2`).

**Registration entry points:** [`1st-gen/packages/accordion/sp-accordion.ts`](../../../../1st-gen/packages/accordion/sp-accordion.ts), [`1st-gen/packages/accordion/sp-accordion-item.ts`](../../../../1st-gen/packages/accordion/sp-accordion-item.ts).

### sp-accordion — properties / attributes

| Property | Type | Default | Attribute | Notes |
|----------|------|---------|-----------|-------|
| `allowMultiple` | `boolean` | `false` | `allow-multiple` | When `false`, opening one item closes others (unless toggle event is canceled). |
| `density` | `'compact' \| 'spacious' \| undefined` | `undefined` | `density` | Reflected string; spacing variant. |
| `level` | `number` | `3` | `level` | Clamped on item to **2–6** for heading tags; pushed to each assigned `AccordionItem`. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | (none) | `size` | From `SizedMixin(..., { noDefaultSize: true })`; propagated to items on slot change / updates. |

### sp-accordion-item — properties / attributes

| Property | Type | Default | Attribute | Notes |
|----------|------|---------|-----------|-------|
| `open` | `boolean` | `false` | `open` | Expanded state. |
| `label` | `string` | `''` | `label` | Header text (rendered inside shadow `<button>`). |
| `disabled` | `boolean` | `false` | `disabled` | Blocks toggle; sets `aria-disabled` on host when true; also sets native **`disabled`** on the shadow **button** (see [Breaking changes](#breaking-changes-and-behavior-deltas)). |
| `level` | `number` | `3` | `level` | Overwritten by parent `sp-accordion`’s `level` when slotted. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | (none) | `size` | Set from parent accordion. |

Inherited from **`SizedMixin(Focusable)`** (item): standard `tabIndex` behavior via `Focusable` (focus delegates to shadow `#header` button).

### Methods

| Element | Method | Notes |
|---------|--------|-------|
| `sp-accordion` | `focus()` | Delegates to `FocusGroupController` to focus first focusable item (skips `disabled` items). |
| `sp-accordion-item` | `focus()`, `blur()`, `click()` | From `Focusable`; `focus` / `click` target `#header` when not `disabled`. |
| `sp-accordion-item` | *(none public)* | `toggle()` is **private**; consumers use `open`, click, or keyboard. |

### Events

| Name | Detail | Bubbles | Composed | Cancelable | Notes |
|------|--------|-----------|----------|--------------|-------|
| `sp-accordion-item-toggle` | none | yes | yes | yes | Fired after `open` flips; `Accordion` listens to close siblings when not `allow-multiple`. `preventDefault()` reverts `open`. |

### Slots

| Element | Slot | Purpose |
|---------|------|---------|
| `sp-accordion` | default | **`sp-accordion-item`** children only (assigned nodes drive `FocusGroupController` and `level` / `size` sync). |
| `sp-accordion-item` | default | **Panel body**; docstring: hidden when not `open` (visually via `display: none` on `#content` when closed). |

### CSS custom properties

**Host-level (accordion root)** — from [`accordion.css`](../../../../1st-gen/packages/accordion/src/accordion.css):

| Custom property | Role |
|-----------------|------|
| `--spectrum-logical-rotation` | RTL / logical transform hook for disclosure indicator (often empty on `:host`). |

**Spectrum + mod tokens** — defined or consumed in generated Spectrum CSS (see [`spectrum-accordion.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion.css), [`spectrum-accordion-item.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion-item.css), [`accordion-overrides.css`](../../../../1st-gen/packages/accordion/src/accordion-overrides.css)). Consumers and themes often override **`--mod-*`** aliases, for example:

- `--mod-accordion-item-height`, `--mod-accordion-item-width`
- `--mod-accordion-divider-color`, `--mod-accordion-divider-thickness`
- `--mod-accordion-disclosure-indicator-height`, `--mod-accordion-edge-to-disclosure-indicator-space`, `--mod-accordion-disclosure-indicator-to-text-space`, `--mod-accordion-edge-to-text-space`
- `--mod-accordion-item-header-*` (padding, font, line-height, colors)
- `--mod-accordion-item-content-*` (padding, font, color)
- `--mod-accordion-background-color-*`, `--mod-accordion-corner-radius`
- `--mod-accordion-focus-indicator-*`
- `--mod-accordion-min-block-size`
- System overrides in `accordion-overrides.css`: `--spectrum-accordion-divider-color`, `--spectrum-accordion-item-content-disabled-color` (mapped from `--system-*`)

2nd-gen migration must **reconcile** these with Spectrum 2 token names (document deltas in the rendering roadmap as Phase 4 proceeds).

### Shadow DOM and rendering notes

- **Item header:** `<h2>`–`<h6>` (from `level`) wrapping `<button id="header">` with `aria-expanded`, `aria-controls="content"`, optional `disabled`, and label text from **`label` property**.
- **Item panel:** `<div id="content" role="region" aria-labelledby="header">` + default `<slot>`.
- **Closed state:** `#content { display: none; }` until `:host([open])`; not the same as HTML **`hidden`** (see a11y analysis for preferred semantics).
- **Chevron:** `sp-icon-chevron100` in a span; size maps to `s` / `m` / `l` / `xl` icon classes.

---

## Dependencies

### npm packages (`1st-gen/packages/accordion/package.json`)

| Package | Role |
|---------|------|
| `@spectrum-web-components/base` | `SpectrumElement`, `SizedMixin`, `html`, decorators, `when` directive |
| `@spectrum-web-components/icon` | Chevron spectrum icon CSS |
| `@spectrum-web-components/icons-ui` | `sp-icon-chevron100` |
| `@spectrum-web-components/reactive-controllers` | `FocusGroupController` on `Accordion` |
| `@spectrum-web-components/shared` | `Focusable` base for `AccordionItem` |

### Runtime / sibling requirements

- **`sp-accordion-item` must be slotted inside `sp-accordion`** for coordinated `level`, `size`, and exclusive-open behavior (items can render standalone for simple cases; see tests).
- **Theme / system tokens:** accordion divider and disabled content colors use system variables in overrides CSS.

### External repo (styling)

- **spectrum-css** (`spectrum-two` branch) for Spectrum 2 source during Phase 4, per washing machine [workspace setup](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#workspace-setup).

---

## Inputs from analysis docs

### Accessibility migration analysis

Use [accessibility-migration-analysis.md](./accessibility-migration-analysis.md) as the **contract** for:

- APG accordion: **`aria-expanded`**, **`aria-controls`**, **`role="region"`** + **`aria-labelledby`** on panel.
- **`<h*>` > `<button>`** in shadow; no **`role="button"`** on the heading.
- **Single vs multiple** open behavior aligned with props (mirror `allow-multiple`).
- **Disabled:** **`aria-disabled="true"`** on header control, **no** reliance on **`tabindex="-1"`** to fake disabled; **`inert`** on panel subtree; avoid HTML **`disabled`** on the header as the **only** mechanism if it removes the control from Tab in a way that hurts SR users (see analysis table).
- **Closed panels:** prefer **`hidden`** (or equivalent) so content is not exposed in the a11y tree; align with “no interactive descendants in tab order when closed.”
- **Keyboard:** Tab / Shift+Tab through all focusables; **Space** / **Enter** on header with **`preventDefault()`** for Space ([SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)); **do not** ship default **Arrow** / **Home** / **End** “headers only” navigation that calls **`preventDefault()`** on vertical arrows (scroll conflict). **Do not** use **roving tabindex** on headers—it clashes with focusable content inside open panels. The APG’s header-only arrow shortcuts are **optional** and rarely beat **Tab** between headers unless panels are packed with interactives; **`preventDefault()`** on vertical arrows at a header can steal **scroll** when the user meant to move the viewport, not the focus ring. Full rationale: [Why we omit roving tabindex and optional header-only arrows](./accessibility-migration-analysis.md#why-we-omit-roving-tabindex-and-optional-header-only-arrows).
- **Heading label API:** preferred **default slot** for heading text + **`heading-level` / `level`** (`2`–`6`); document breaking change from string **`label`** (precedence and optional `label` fallback TBD — see [Open questions](#blockers-and-open-questions)).

### Rendering-and-styling migration analysis

[rendering-and-styling-migration-analysis.md](./rendering-and-styling-migration-analysis.md) currently points readers to the a11y doc only. **Action:** Before Phase 4, extend it with:

- S2 component name(s) in spectrum-css, file paths, and token mapping from 1st-gen `--spectrum-accordion-*` / `--mod-accordion-*`.
- Density (`compact` / `spacious`) and size matrix vs S2.
- Any DOM simplification (e.g., heading / icon wrapper) that affects selectors.

---

## Breaking changes and behavior deltas

Document these in the eventual consumer migration guide and Storybook migration notes.

| Area | 1st-gen today | Planned 2nd-gen / analysis direction |
|------|----------------|--------------------------------------|
| **Tags / imports** | `sp-accordion`, `@spectrum-web-components/accordion` | `swc-accordion`, new package path per 2nd-gen conventions |
| **Heading label** | `label` attribute only | **Slot-first** label (optional `label` fallback TBD); breaking for string-only consumers |
| **Keyboard** | `FocusGroupController`: **ArrowUp/Down**, **Home**, **End** with **`preventDefault`** while focus is in group; README mentions arrow keys | Remove header-only arrow/Home/End per [accessibility-migration-analysis](./accessibility-migration-analysis.md); **breaking** for users who relied on arrows between items |
| **Tab order** | Roving **`tabindex`** on **item hosts** managed by `FocusGroupController` | Natural tab order through each header **button** and panel focusables per APG |
| **Disabled header** | Native **`disabled`** on `<button>` + host `aria-disabled` | Prefer **`aria-disabled`** without removing header from meaningful focus order; panel **`inert`** per analysis |
| **Closed panel** | `display: none` only | Add **`hidden`** (or equivalent) semantics per analysis |
| **Space key** | Native button may still interact with scroll in nested scrollers | Explicit handling per **SWC-1487** / analysis |
| **Events** | `sp-accordion-item-toggle` | New event name prefix **`swc-*`** (exact name to follow 2nd-gen event naming standard) |
| **CSS custom properties** | S1 `--spectrum-accordion-*` / `--mod-*` | S2 tokens; document one-to-one or replacement table |

Non-breaking **candidates** (confirm during API phase): keep `allow-multiple`, `density`, `level`, `open`, `disabled` names where they still match 2nd-gen naming guidelines.

---

## Architecture: core vs SWC split

Per [washing machine — core vs SWC](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#core-vs-swc-where-does-code-go):

| Layer | Responsibility |
|-------|------------------|
| **Core** (`2nd-gen/packages/core/components/accordion/`) | Open-state coordination (`allow-multiple`, sibling close), toggle event contract, `level` validation, disabled / inert rules shared by tests |
| **SWC** (`2nd-gen/packages/swc/components/accordion/`) | Lit render for `swc-accordion` + `swc-accordion-item`, S2 CSS, icons, registration |

**Do not** import 1st-gen from 2nd-gen at runtime; use 1st-gen only as reference.

---

## Migration checklist (washing machine alignment)

Copy into tickets or PR templates; gates match [01_washing-machine-workflow.md](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md).

### Phase 1 — Preparation (this plan)

- [ ] This plan + a11y analysis + (expanded) rendering roadmap reviewed and approved
- [ ] Breaking changes communicated to consumers / changelog strategy agreed
- [ ] Open questions in [Blockers](#blockers-and-open-questions) resolved or ticketed

### Phase 2 — Setup

- [ ] `2nd-gen/packages/core/.../accordion` and `2nd-gen/packages/swc/.../accordion` scaffolded
- [ ] Exports wired; build passes with placeholder implementation

### Phase 3 — API

- [ ] Properties / attributes / events match agreed 2nd-gen surface (including rename and optional `label` deprecation path)
- [ ] Dev-mode warnings if both slot and `label` provided (if both supported temporarily)

### Phase 4 — Styling

- [ ] S2 CSS integrated; stylelint clean
- [ ] Custom property story documented (what broke vs 1st-gen `--mod-*`)

### Phase 5 — Accessibility

- [ ] Implement analysis checklist: region + `aria-labelledby`, `aria-controls`, `hidden` / closed panel, disabled + `inert`, Space **preventDefault**, no arrow-key header trap
- [ ] Manual SR spot-check (VoiceOver + NVDA or agreed minimum)

### Phase 6 — Testing

Port and extend coverage from **1st-gen tests** (paths below):

- [ ] [`1st-gen/packages/accordion/test/keyboard.test.ts`](../../../../1st-gen/packages/accordion/test/keyboard.test.ts) — update expectations (Tab order, no FocusGroup arrows)
- [ ] [`1st-gen/packages/accordion/test/a11y-tree.test.ts`](../../../../1st-gen/packages/accordion/test/a11y-tree.test.ts)
- [ ] [`1st-gen/packages/accordion/test/controlled.test.ts`](../../../../1st-gen/packages/accordion/test/controlled.test.ts)
- [ ] [`1st-gen/packages/accordion/test/declarative.test.ts`](../../../../1st-gen/packages/accordion/test/declarative.test.ts)
- [ ] [`1st-gen/packages/accordion/test/imperative.test.ts`](../../../../1st-gen/packages/accordion/test/imperative.test.ts)
- [ ] [`1st-gen/packages/accordion/test/dev-mode.test.ts`](../../../../1st-gen/packages/accordion/test/dev-mode.test.ts)
- [ ] [`1st-gen/packages/accordion/test/memory.test.ts`](../../../../1st-gen/packages/accordion/test/memory.test.ts), [`accordion-memory.test.ts`](../../../../1st-gen/packages/accordion/test/accordion-memory.test.ts)
- [ ] New: unit tests listed in a11y doc ( **`aria-disabled`**, **`inert`**, **`aria-expanded`**, **`preventDefault`** on Space)
- [ ] Storybook a11y + play functions for single / multiple / disabled

### Phase 7 — Documentation

- [ ] JSDoc, usage docs, Storybook stories
- [ ] Remove or correct 1st-gen README claims (arrow keys) in 2nd-gen docs

### Phase 8 — Review

- [ ] Status table updated; final integration PR checklist from washing machine Phase 8

---

## Blockers and open questions

**Blockers (none for “start planning implementation”):**

- 2nd-gen package missing is **expected**, not a blocker.

**Open questions (resolve before or during Phase 3):**

1. **`label` vs slot:** Retain `label` as deprecated fallback for one major? **Precedence** if both (analysis recommends slot wins + dev warning).
2. **Slot content:** Text-only vs phrasing content (`<strong>`, `<code>`) in heading slot (affects accessible name computation and focusability rules).
3. **Exact 2nd-gen event name** for toggle (`swc-accordion-item-toggle` vs consolidated pattern).
4. **Expand [rendering-and-styling-migration-analysis.md](./rendering-and-styling-migration-analysis.md)** with S2 file references — who owns the Step 1 CSS diff (assign in epic).
5. **Chevron asset** in 2nd-gen: reuse same icon package vs new S2 asset pipeline.

**Tracked bugs to fold into implementation:**

- [SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487) — Space on accordion header and unwanted scroll in overflow containers.

---

## Epic comment (paste into parent ticket)

Use this as the planning deliverable comment on the **parent epic** (adjust ticket IDs and links to your Jira host):

```text
Accordion 2nd-gen migration — planning complete.

Migration plan (API, dependencies, breaking changes, washing-machine checklist, blockers):
https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTOR-DOCS/03_project-planning/03_components/accordion/migration-plan.md

Related contributor docs:
- Accessibility target behavior: CONTRIBUTOR-DOCS/03_project-planning/03_components/accordion/accessibility-migration-analysis.md
- Rendering / S2 roadmap (stub — expand before Phase 4): CONTRIBUTOR-DOCS/03_project-planning/03_components/accordion/rendering-and-styling-migration-analysis.md
- Workflow: CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md

Depends on: a11y recommendations story (complete).

Peer review: [ ] at least one engineer sign-off on the plan before implementation PRs.
```

*(Replace `main` / URL with the branch or commit URL you merge from.)*

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Migration project planning (epics / tickets)](../../02_workstreams/02_2nd-gen-component-migration/03_migration-project-planning.md)
- [Accordion accessibility migration analysis](./accessibility-migration-analysis.md)
- [Accordion migration roadmap / rendering](./rendering-and-styling-migration-analysis.md)
- 1st-gen source: [`1st-gen/packages/accordion/src/`](../../../../1st-gen/packages/accordion/src/)
- 1st-gen tests: [`1st-gen/packages/accordion/test/`](../../../../1st-gen/packages/accordion/test/)
- 1st-gen docs: [`1st-gen/packages/accordion/README.md`](../../../../1st-gen/packages/accordion/README.md), [`1st-gen/packages/accordion/accordion-item.md`](../../../../1st-gen/packages/accordion/accordion-item.md)
