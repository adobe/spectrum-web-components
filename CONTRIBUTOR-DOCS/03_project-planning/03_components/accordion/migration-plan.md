<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration plan

<!-- Document title (editable) -->

# Accordion migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
- [1st-gen API surface](#1st-gen-api-surface)
    - [`sp-accordion` (`Accordion`)](#sp-accordion-accordion)
    - [`sp-accordion-item` (`AccordionItem`)](#sp-accordion-item-accordionitem)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions (planned)](#2nd-gen-api-decisions-planned)
    - [Public API](#public-api)
    - [React Spectrum alignment considerations](#react-spectrum-alignment-considerations)
    - [ARIA and keyboard contract](#aria-and-keyboard-contract)
    - [Selection sync — `RadioController` pattern (consider)](#selection-sync--radiocontroller-pattern-consider)
    - [Analysis inputs](#analysis-inputs)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
    - [Preparation (this ticket)](#preparation-this-ticket)
    - [Setup](#setup)
    - [API](#api)
    - [Styling](#styling)
    - [Accessibility](#accessibility)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Review](#review)
- [Blockers and open questions](#blockers-and-open-questions)
    - [Open — API and scope](#open--api-and-scope)
    - [Tracked bugs](#tracked-bugs)
- [References](#references)

</details>

<!-- Document content (editable) -->

> Planning output for migrating **`sp-accordion`** / **`sp-accordion-item`** to 2nd-gen. **Must be reviewed before implementation begins.**

---

## TL;DR

- **No 2nd-gen accordion** package exists yet under `2nd-gen/packages/`; Setup phase creates core + SWC scaffolds.
- **Accessibility migration analysis** is the behavioral contract for WCAG 2.2 AA; 2nd-gen diverges from 1st-gen on keyboard (no `FocusGroupController` arrow/Home/End on the host, no roving `tabindex` between item hosts), disabled header semantics (`aria-disabled` + panel `inert`), closed-panel hiding (`hidden` vs `display: none` only), heading **API** (**slotted** heading text **only** — **no** string **`label`**, clean break vs 1st-gen), and **Space** handling (**SWC-1487**).
- **Rendering-and-styling migration analysis** is **in progress** — 1st-gen inventory and DOM summary are in [rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md); finish S2 selector/token pass before Phase 4, with **spectrum-css** in the [same workspace](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#workspace-setup).
- **React Spectrum S2 parity (planning):** Align public surface where authors expect cross-product parity — **`quiet`** on the accordion (from RS **`isQuiet`**) and **`disabled`** on the accordion host (**accordion-wide** disable, from RS **`isDisabled`** on **`Accordion`**), in addition to per-item **`disabled`**. Details: [React Spectrum alignment considerations](#react-spectrum-alignment-considerations).
- **Severity:** **Normal** for migration planning. Escalate to **Major** only if Spectrum 2 accordion CSS is missing or core infrastructure blocks a core/SWC split (not observed today).

### Most blocking open questions

None for **starting** implementation, provided the rendering roadmap is expanded before styling work. **`label` vs slot** is **decided:** slotted heading only — **no** 2nd-gen **`label`** (see [accessibility migration analysis](./accessibility-migration-analysis.md)). Still resolve **final slot names** (heading vs panel), and **toggle event naming** before API freeze (see [Open — API and scope](#open--api-and-scope)). After [rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md) is completed with the [analyze rendering and styling](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md) workflow, do a **consistency pass** on this plan and remove stale draft placeholders.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/accordion/src/`](../../../../1st-gen/packages/accordion/src/) (`Accordion.ts`, `AccordionItem.ts`)  
**Tests:** [`1st-gen/packages/accordion/test/`](../../../../1st-gen/packages/accordion/test/)  
**Version:** `@spectrum-web-components/accordion@1.11.2`  
**Custom element tags:** `sp-accordion`, `sp-accordion-item`  
**Registration:** [`sp-accordion.ts`](../../../../1st-gen/packages/accordion/sp-accordion.ts), [`sp-accordion-item.ts`](../../../../1st-gen/packages/accordion/sp-accordion-item.ts)

### `sp-accordion` (`Accordion`)

#### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `allowMultiple` | `boolean` | `false` | `allow-multiple` | When `false`, opening one item closes others unless `sp-accordion-item-toggle` is canceled. |
| `density` | `'compact' \| 'spacious' \| undefined` | `undefined` | `density` | Reflected on **`sp-accordion`** only. **Not** assigned to **`sp-accordion-item`** in script (spacing is host + CSS); contrast **`size`** / **`level`**, which the parent pushes to each item. |
| `level` | `number` | `3` | `level` | Public on the accordion; pushed to each assigned item. Item clamps to **2–6** for `<h*>` tags. In **planned 2nd-gen**, only the parent exposes **`level`**; the item receives a **protected `heading`** (see [`AccordionItem`](#sp-accordion-item-accordionitem)). |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | (none) | `size` | `SizedMixin(..., { noDefaultSize: true })`; propagated to items on slot change / updates. |

#### Methods

| Method | Signature | Notes |
|---|---|---|
| `focus` | `(): void` | Delegates to `FocusGroupController` — first focusable item, skipping `disabled` items. |

#### Events

None on the `sp-accordion` host. Coordination uses the child item’s `sp-accordion-item-toggle` listener on the default `<slot>`.

### `sp-accordion-item` (`AccordionItem`)

#### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `open` | `boolean` | `false` | `open` | Expanded state. |
| `label` | `string` | `''` | `label` | Header text inside shadow `<button>`. |
| `disabled` | `boolean` | `false` | `disabled` | Blocks toggle; host `aria-disabled` when true; shadow `<button>` also gets native **`disabled`** (see [Changes overview](#changes-overview)). |
| `level` | `number` | `3` | `level` | Reflected; overwritten by parent `sp-accordion` when slotted. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | (none) | `size` | Set from parent. |

#### Heading level (2nd-gen)

On **`swc-accordion-item`**, **`heading`** is a **`protected`** property (implementation-only: not reflected, not part of the public consumer API). It is **set only** by **`swc-accordion`** from that host’s **public** **`level`** property (`2`–`6`) whenever assigned items change or **`level`** updates. Authors never set heading depth on the item; they set **`level`** on the parent only. **`heading`** selects which **`<h2>`–`<h6>`** wraps the shadow header **`<button>`**.

**1st-gen note:** Today **`level`** is also reflected on **`sp-accordion-item`** and overwritten when slotted; 2nd-gen removes that public surface on the item in favor of **`protected` `heading`** driven by the parent (**B9**).

Inherited: `SizedMixin(Focusable)` — `tabIndex` / `focus` / `blur` / `click` delegate to shadow `#header` when not `disabled`.

#### Methods

| Method | Signature | Notes |
|---|---|---|
| `focus` | `(options?: FocusOptions): void` | From `Focusable`; targets `#header`. |
| `blur` | `(): void` | From `Focusable`. |
| `click` | `(): void` | From `Focusable`; no-op when `disabled`. |

`toggle()` is **private**; consumers use `open`, pointer, or keyboard on the header.

#### Events

| Event | Detail | Bubbles | Composed | Cancelable | Notes |
|---|---|---|---|---|---|
| `sp-accordion-item-toggle` | none | yes | yes | yes | After `open` flips; parent closes siblings when not `allow-multiple`. `preventDefault()` reverts `open`. |

#### Slots

| Slot | Content | Notes |
|---|---|---|
| default | Panel body | Hidden when not `open` (CSS `display: none` on `#content` when closed). |

### CSS custom properties

1st-gen accordion pulls Spectrum 1 styles from [`spectrum-accordion.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion.css), [`spectrum-accordion-item.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion-item.css), and related files; authors could reach a **broad** **`--spectrum-accordion-*`** / **`--mod-*`** surface for overrides.

**2nd-gen:** This full modifier surface **will not** be carried forward. Replace with S2 tokens and a **narrow**, reviewed customization story (see [rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md) and Phase 4 mapping). 
### Shadow DOM output (rendered HTML)

**`sp-accordion-item` (conceptual):**

```html
<h2 id="heading">
  <!-- optional chevron (2nd-gen: prefer swc-icon) + -->
  <button id="header" aria-expanded="..." aria-controls="content">...</button>
</h2>
<div id="content" role="region" aria-labelledby="header">
  <slot></slot>
</div>
```

**`sp-accordion`:** default `<slot>` only; no shadow children beyond the slot.

**2nd-gen slot model (planned):** Today **1st-gen** puts **panel** content in the item’s **default** slot and header text in the **`label`** attribute. **2nd-gen** moves **header text** into **light DOM slotted** content projected into the shadow **`<button>`** so the real **`<h*>` > `<button>`** tree can take an accessible name from authored nodes (phrasing, emphasis) per [accessibility migration analysis](./accessibility-migration-analysis.md). **Yes — the visible heading / header label is slotted**, not only the panel body. Exact **slot names** (e.g. **heading** vs **default** for the label vs **`content`** for the panel) are an **API-freeze** decision; the migration guide must show clear before/after examples.

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| `@spectrum-web-components/base` | `1.11.2` | `SpectrumElement`, `SizedMixin`, `html`, decorators, `when` |
| `@spectrum-web-components/icon` | `1.11.2` | Chevron spectrum icon CSS |
| `@spectrum-web-components/icons-ui` | `1.11.2` | `sp-icon-chevron100` |
| `@spectrum-web-components/reactive-controllers` | `1.11.2` | 1st-gen: `FocusGroupController` on `Accordion` (arrow/Home/End + roving tabindex — **not** carried forward). 2nd-gen: consider a **`RadioController`**-style primitive in **core** or shared controllers (see [Selection sync](#selection-sync--radiocontroller-pattern-consider)); 2nd-gen already ships **`FocusgroupNavigationController`** in `2nd-gen/packages/core/controllers/` for arrow-key roving elsewhere — selection sync is a **different** concern (property reflection, not focus traversal). |
| `@spectrum-web-components/shared` | `1.11.2` | `Focusable` on `AccordionItem` |

**Sibling / runtime:** Items are expected under `sp-accordion` for `level`, `size`, and exclusive-open behavior (standalone item use exists in tests). **External:** **spectrum-css** `spectrum-two` for Phase 4 styling.

---

## Migration sequencing and prerequisites

| Topic | Assessment |
|---|---|
| **Upstream 2nd-gen components** | Accordion does not require another incomplete 2nd-gen composite; it uses **core** + **base** + **icons** patterns. Follow the [badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) for core/SWC layout. |
| **Cross-component API alignment** | **`level`** / heading naming should stay aligned with **illustrated message** and **card** when those specs exist ([accessibility migration analysis](./accessibility-migration-analysis.md)). **`quiet`** / host **`disabled`** naming should match other 2nd-gen components that expose the same Spectrum concepts ([React Spectrum alignment considerations](#react-spectrum-alignment-considerations)). |
| **Step 1 (analyze rendering and styling)** | [Rendering roadmap](./rendering-and-styling-migration-analysis.md) is **in progress** — finish S2 selector and token pass with **spectrum-css** `spectrum-two` beside this repo before treating Step 1 as complete. |

---

## Changes overview

> **Priority framing (same as other component migrations):**
> - **Accessibility is non-negotiable** — ship APG-aligned semantics and keyboard behavior with the migration.
> - **Breaking changes** are called out explicitly so consumers can migrate once.
> - **Additive** work can follow without breaking consumers already on 2nd-gen.

### Must ship — breaking or a11y-required

| # | What changes | 1st-gen behavior | 2nd-gen / target behavior | Consumer migration path |
|---|---|---|---|---|
| **B1** | Tags and package | `sp-*`, `@spectrum-web-components/accordion` | `swc-*`, 2nd-gen package layout | Update imports and tag names. |
| **B2** | Heading label API | String `label` only; default slot = **panel** | Slotted **header** label only — **no** 2nd-gen **`label`** attribute (clean break; see [accessibility migration analysis](./accessibility-migration-analysis.md)) | Migrate **`label="…"`** to slotted heading text; separate **panel** slot if the default slot becomes heading-only. |
| **B3** | Keyboard — headers | `FocusGroupController`: ArrowUp/Down, Home, End with `preventDefault`; roving `tabindex` on item hosts | Tab / Shift+Tab through all focusables; no default header-only arrows; see [Why we omit roving tabindex…](./accessibility-migration-analysis.md#why-we-omit-roving-tabindex-and-optional-header-only-arrows) | Remove reliance on arrow keys between headers. |
| **B4** | Disabled item | Native `disabled` on shadow `<button>` + host `aria-disabled` | Prefer `aria-disabled` on header, `inert` on panel; do not fake disabled with `tabindex="-1"` on header | Tests and SR workflows that assumed native disabled-only behavior. |
| **B5** | Closed panel | `display: none` on `#content` | `hidden` (or equivalent) per a11y analysis | Usually none if markup unchanged; a11y tree may differ slightly. |
| **B6** | Space / scroll | Scroll quirks in overflow (**SWC-1487**) | `preventDefault` on Space for activation on header | Verify nested scroll layouts after upgrade. |
| **B7** | Toggle event name | `sp-accordion-item-toggle` | `swc-*` event per 2nd-gen naming | Update listeners. |
| **B8** | CSS customization | Broad `--spectrum-accordion-*` / `--mod-*` | S2 tokens; narrow reviewed `--swc-*` if any | Replace theme overrides per Phase 4 mapping doc. |
| **B9** | Heading level API surface | Public reflected **`level`** on **`sp-accordion-item`** (overridden by parent) | **`level`** public **only** on **`swc-accordion`**; item uses **`protected` `heading`** set by parent | Consumers set **`level`** on the accordion for slotted sets; **`swc-accordion-item`** without a parent keeps a **default** **`heading`** of **`3`** ([Open — API and scope](#open--api-and-scope)). |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
|---|---|---|
| **A1** | Documented `--swc-accordion-*` (if justified) | Per [component custom property exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure); do not recreate full `--mod-*` matrix. |
| **A2** | Playwright / Storybook a11y snapshots | Single vs multiple open, disabled item, **accordion-wide `disabled`**, **`quiet`** variant, heading levels. |
| **A3** | **`RadioController`** (name TBD) — shared selection sync | Optional **core** helper: **resolver** → item list, **selected** reference (or id), **descriptor** for which property to set or remove per item (`open`, `selected`, `aria-selected`, …) so only **selected** carries the “on” state. **Reuse targets:** exclusive accordion (`allow-multiple` false), **`role="radiogroup"`** / radio group, **`role="menuitemradio"`** collections, and **tablists** with a single active tab. **Refactor angle:** could evolve from or complement **`FocusgroupNavigationController`** (`2nd-gen/packages/core/controllers/`) — that controller owns **roving focus** and arrow navigation; **`RadioController`** would own **which item is selected** in the sense of mirrored state flags, not keyboard routing (keep responsibilities split unless a deliberate merge is designed). **Out of scope** for accordion’s first PR unless another team needs the same API immediately — otherwise track as follow-up. |

---

## 2nd-gen API decisions (planned)

No 2nd-gen package yet — this section records **planned** decisions from analysis docs and this plan. Update when API freeze lands.

### Public API

| Topic | Planned direction | Notes |
|---|---|---|
| Accordion | `allow-multiple` (or aligned name), **public** **`level`** (`2`–`6`), **`density`**, `size` | **`level`** is the **only** author-facing control for heading depth for all items. **`size`** propagates to assigned items (same as 1st-gen). See **`density`** row. |
| Accordion — `density` | Reflected string **`compact`** \| **`regular`** \| **`spacious`** | Align with [React Spectrum **`density`**](https://react-spectrum.adobe.com/Accordion) and S2: **`regular`** is the default spacing (1st-gen **omitted** / legacy default maps here). **TypeScript** and docs should list **all three** values even though **`regular`** is default. **Dev warning** when the attribute is **omitted** is **recommended** (same spirit as Badge **`variant`**) so authors stay explicit—confirm at API freeze. Host-only (1st-gen does **not** assign **`density`** on **`AccordionItem`** in script). |
| Accordion — `quiet` | Boolean; reflected attribute **`quiet`** | Parity with [React Spectrum **`isQuiet`**](https://react-spectrum.adobe.com/Accordion). **Accordion host only** — propagate effective quiet styling to assigned items internally. **Do not** expose **per-item** **`quiet`**: quiet removes dividers between rows; mixing styles per item is **visually chaotic** and **contradicts** Figma usage guidance ([rendering-and-styling migration analysis — Figma](./rendering-and-styling-migration-analysis.md#figma--s2-web-desktop-scale)). |
| Accordion — `disabled` | Boolean; reflected attribute **`disabled`** | Parity with RS **`isDisabled`** on **`Accordion`**: **accordion-wide** disable — every item non-interactive (no expand/collapse), same **a11y** posture as item-level disable ([accessibility migration analysis](./accessibility-migration-analysis.md): header **`aria-disabled`**, panel **`inert`**). When the host is **`disabled`**, that gate **wins** over per-item **`disabled`** being false. When the host clears **`disabled`**, each item’s own **`disabled`** applies again unchanged. For **visual** disabled state on descendants, prefer **container queries** or host-driven styling so you do **not** reflect host **`disabled`** onto every child **solely** for CSS—only use per-item flags where behavior or a11y requires it. |
| Item | `open`, `disabled` | Same semantics as today unless renamed for consistency. **No** public **`quiet`** on the item. |
| Item (implementation) | **`protected` `heading`** (`2`–`6`) | **Not** public API—not reflected, not set by consumers. Parent **`level`** assigns **`heading`** on each slotted item (core/SWC lifecycle). |
| Heading text | Slotted (see [Shadow DOM output](#shadow-dom-output-rendered-html)) | **Rationale:** a string **`label`** cannot mirror phrasing content (`<strong>`, `<code>`) into the header’s accessible name the way slotted light DOM can; matches [accessibility migration analysis](./accessibility-migration-analysis.md). **Breaking** vs 1st-gen **`label`**: **clean break** — 2nd-gen does **not** expose **`label`**; authors migrate markup to the heading slot only. |
| Events | Renamed toggle event | Exact string TBD. |

### React Spectrum alignment considerations

[React Spectrum S2 — Accordion](https://react-spectrum.adobe.com/Accordion) exposes **`isQuiet`** and **`isDisabled`** on the **`Accordion`** root (and **`isQuiet`** / **`isDisabled`** on **`AccordionItem`**). 1st-gen **`sp-accordion`** has **neither** host **`quiet`** nor host **`disabled`**; only **`sp-accordion-item`** supports **`disabled`**. For 2nd-gen, treat the following as **API planning targets** so Spectrum authors can mirror React examples in markup:

1. **`quiet`:** Map RS **`isQuiet`** to boolean **`quiet`** on **`swc-accordion`** (Spectrum 2 CSS uses the same name). Propagate styling to items **internally**; **do not** add a public **per-item** **`quiet`** API ([rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md#figma--s2-web-desktop-scale)).

2. **Accordion-wide `disabled`:** Map RS **`isDisabled`** on **`Accordion`** to **`disabled`** on **`swc-accordion`**. Implementation should drive the same behavior as “every item disabled” without authors having to set **`disabled`** on each item: block toggles, apply quiet/disabled visuals per design, and apply the **disabled item** a11y matrix on **every** header/panel pair. **Controlled-mode** authors who set **`open`** on items should not be able to expand while the host stays **`disabled`** (treat like item-level guardrails today, extended to the whole set).

3. **Docs and Storybook:** Add stories that mirror RS docs patterns — **quiet accordion**, **fully disabled accordion**, and **host disabled + mixed item flags** — so QA and consumers can verify parity.

4. **`density`:** Ship reflected **`compact` \| `regular` \| `spacious`** with **`regular`** as default; preserve existing **`compact` / `spacious`** authoring. Prefer a **dev warning** when **`density`** is omitted (see [Public API](#public-api) **`density`** row).

### ARIA and keyboard contract

- **`aria-expanded`**, **`aria-controls`**, **`role="region"`** + **`aria-labelledby`** on the panel; **`<h*>` > `<button>`** in shadow ([accessibility migration analysis](./accessibility-migration-analysis.md)). The `<h2>`–`<h6>` tag follows **`protected` `heading`**, which the parent sets from public **`level`**.
- **Tab** only between headers and in-panel focusables; **Space** / **Enter** on header; **Space** uses **`preventDefault()`** where required (**SWC-1487**).
- **No** roving `tabindex` on headers; **no** default Arrow/Home/End handlers on headers that **`preventDefault()`** vertical arrows (scroll vs “next header” conflict).

### Selection sync — `RadioController` pattern (consider)

For **`allow-multiple` false**, the parent must keep **at most one** item **`open`** (today implemented by listening for **`sp-accordion-item-toggle`** and closing siblings). Consider a small **reactive controller** (working name **`RadioController`**) that:

- Accepts a **function** that returns the current **item** collection (e.g. assigned **`swc-accordion-item`** instances, or header elements if ever refactored to light DOM).
- Accepts the **selected** item (or a stable **key** / index resolved by the host).
- For each item, **sets, updates, or removes** a configured **property or attribute** (examples: **`open`**, **`selected`**, **`aria-selected`**) so only the selected member carries the “on” state; others are cleared.

**Integration notes:** Accordion still needs **cancelable** toggle events and item-level **disabled** handling — the controller would **reflect** resolved selection after a successful toggle (or run on slot / `open` changes), not replace the full event contract. **`allow-multiple` true** bypasses the controller or passes a no-op / multi-select variant.

**Broader reuse (same primitive or shared module):** **`role="radiogroup"`** and native-like **radio** groups; menus where exactly one **`role="menuitemradio"`** is checked; **tablists** with one **`aria-selected="true"`** tab; and optionally a **refactor** path alongside **`FocusgroupNavigationController`** — e.g. that controller could **delegate** “which child is active” state updates to this helper while it keeps **tabindex** / **keydown** routing, **or** both stay separate to avoid mixing focus and selection semantics. Prefer **one** implementation under **`2nd-gen/packages/core/`** (controllers or component bases) once two consumers agree on the API; until then keep logic inside **`AccordionBase`** (**A3**).

### Analysis inputs

| Document | Use |
|---|---|
| [Accessibility migration analysis](./accessibility-migration-analysis.md) | WCAG 2.2 AA target, disabled matrix, keyboard, testing expectations. |
| [Rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md) | S2 CSS and token mapping — **in progress**; complete S2 sections before Phase 4. |
| [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md) | Phase order and quality gates. |

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other at runtime.

Follow the [washing machine — core vs SWC](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#core-vs-swc-where-does-code-go) split. The [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) is the concrete pattern for file layout.

| Layer | Path | Contains |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/accordion/` | `AccordionBase` / item base (if split), types, `allow-multiple` coordination, **public** `level` validation, propagation of **`level`** → item **`protected` `heading`**, **accordion-wide** **`quiet`** / **`disabled`** effective visuals and interaction to assigned items ([React Spectrum alignment considerations](#react-spectrum-alignment-considerations)), toggle event contract, disabled + `inert` rules testable without full render. **Optional:** compose a **`RadioController`** (or equivalent) for exclusive **`open`** / **`aria-selected`** sync ([Selection sync](#selection-sync--radiocontroller-pattern-consider)). **No** Lit template/CSS. |
| **SWC** | `2nd-gen/packages/swc/components/accordion/` | `swc-accordion`, `swc-accordion-item` Lit classes, `.css`, registration, stories, tests, S2 styling. Use **`swc-icon`** for internal chevron / disclosure graphics ([Open — API and scope](#open--api-and-scope)). |

---

## Migration checklist

Gates align with [01_washing-machine-workflow.md](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md).

### Preparation (this ticket)

- [ ] Preparation inputs tracked (Figma, epic id, S2 rendering pass) per team process—no separate contributor prep doc for accordion
- [ ] This plan + accessibility analysis + expanded rendering roadmap reviewed
- [ ] Breaking changes and consumer migration notes agreed
- [ ] Open questions in [Blockers and open questions](#blockers-and-open-questions) resolved or ticketed
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/.../accordion` and `2nd-gen/packages/swc/.../accordion`
- [ ] Wire exports; build passes with placeholder implementation

### API

- [ ] Public properties, attributes, and events match agreed 2nd-gen surface (including renames; **no** string **`label`** on item — heading via slot only); include reflected **`density`** (`compact` \| `regular` \| `spacious`), **`quiet`** (host only), and host **`disabled`** per [React Spectrum alignment considerations](#react-spectrum-alignment-considerations)
- [ ] Dev-mode warning when **`density`** is omitted (if adopted)
- [ ] Exclusive open (`allow-multiple` false): decide **`RadioController`** vs inline sibling-close logic; if controller is shared, document API and add tests

### Styling

- [ ] S2 CSS integrated; stylelint clean
- [ ] Document token / `--mod-*` → S2 (or `--swc-*`) mapping for consumers; include **`density` × `size`** matrix ([rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md#summary-of-changes))

### Accessibility

- [ ] Region + `aria-labelledby`, `aria-controls`, closed panel semantics, disabled + `inert`, Space **`preventDefault`**, no arrow-key header trap
- [ ] Manual SR spot-check (VoiceOver + NVDA or team minimum)

### Testing

- [ ] [`keyboard.test.ts`](../../../../1st-gen/packages/accordion/test/keyboard.test.ts) expectations updated (Tab order, no `FocusGroup` arrows)
- [ ] Port / extend: [`a11y-tree.test.ts`](../../../../1st-gen/packages/accordion/test/a11y-tree.test.ts), [`controlled.test.ts`](../../../../1st-gen/packages/accordion/test/controlled.test.ts), [`declarative.test.ts`](../../../../1st-gen/packages/accordion/test/declarative.test.ts), [`imperative.test.ts`](../../../../1st-gen/packages/accordion/test/imperative.test.ts), [`dev-mode.test.ts`](../../../../1st-gen/packages/accordion/test/dev-mode.test.ts), [`memory.test.ts`](../../../../1st-gen/packages/accordion/test/memory.test.ts), [`accordion-memory.test.ts`](../../../../1st-gen/packages/accordion/test/accordion-memory.test.ts)
- [ ] New unit coverage per [accessibility migration analysis — automated tests](./accessibility-migration-analysis.md#automated-tests)
- [ ] Storybook a11y + play functions: single open, multiple open, disabled item, **accordion host `disabled`**, **`quiet`**

### Documentation

- [ ] JSDoc, usage docs, Storybook stories (include a spacing / **custom properties** story for “no inline padding” style parity—**no** **`show paddings`**-style attribute; see [rendering roadmap — Figma](./rendering-and-styling-migration-analysis.md#figma--s2-web-desktop-scale))
- [ ] Do not document arrow-key navigation between headers for 2nd-gen (contrast with legacy README)

### Review

- [ ] Lint / tests / Storybook per Phase 8 washing machine checklist
- [ ] [01_status.md](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) updated when migration lands

---

## Blockers and open questions

### Open — API and scope

| Topic | Question |
|---|---|
| **Standalone item** | **Direction:** **`swc-accordion-item`** without a parent stays **supported** with reasonable defaults (**`protected` `heading`** defaults to **`3`**, same as today’s accordion default)—matches existing tests and story patterns. Ticket any change if product requires parent-only usage. |
| Heading slot content | Text-only vs inline phrasing (`<strong>`, `<code>`) in heading slot. |
| Toggle event | Exact `swc-*` event name. |
| Rendering doc | Who expands [rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md) with S2 paths before Phase 4? |
| Chevron / disclosure icon | Prefer **`swc-icon`** internally; finalize icon asset/name against S2. |
| Accordion host **`disabled`** | Confirm **controlled** **`open`** cannot expand while host **`disabled`**; prefer **container-query** / host styling for descendant disabled visuals ([Public API](#public-api) **`disabled`** note). |
| **`density`** dev warning | Confirm **omit-attribute** warning ships with accordion (recommended; same spirit as Badge **`variant`**). |
| **`RadioController`** scope | Ship **inside** `AccordionBase` first vs extract to **core** for **radio group**, **`role="menuitemradio"`** menus, **tabs**, and/or coordinate with a **refactor** of **`FocusgroupNavigationController`** (split “selection flags” vs “focus roving”)? **Depends on** menu / radio / tabs migration timing and whether teams want one shared **selection-sync** API vs local loops per component. |

**Not a blocker:** Missing 2nd-gen package before implementation starts is expected.

### Tracked bugs

| Ticket | Summary |
|---|---|
| [SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487) | Space on accordion header causes unwanted scroll in overflow containers. |

---

## References

- [React Spectrum S2 — Accordion](https://react-spectrum.adobe.com/Accordion) (`isQuiet`, `isDisabled` on **`Accordion`**, item-level flags)
- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Migration project planning (epics / tickets)](../../02_workstreams/02_2nd-gen-component-migration/03_migration-project-planning.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [1st-gen source — `Accordion.ts`](../../../../1st-gen/packages/accordion/src/Accordion.ts)
- [1st-gen source — `AccordionItem.ts`](../../../../1st-gen/packages/accordion/src/AccordionItem.ts)
- [1st-gen tests directory](../../../../1st-gen/packages/accordion/test/)
- [1st-gen README](../../../../1st-gen/packages/accordion/README.md)
- [1st-gen accordion item doc](../../../../1st-gen/packages/accordion/accordion-item.md)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
