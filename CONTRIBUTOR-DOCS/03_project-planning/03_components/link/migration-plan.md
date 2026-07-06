<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Link / Link migration plan

<!-- Document title (editable) -->

# Link migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
- [1st-gen API surface](#1st-gen-api-surface)
    - [Properties / attributes](#properties--attributes)
    - [Methods](#methods)
    - [Events](#events)
    - [Slots](#slots)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
    - [Dependency-aware recommendation](#dependency-aware-recommendation)
    - [Related components and ordering notes](#related-components-and-ordering-notes)
    - [User confirmation needed](#user-confirmation-needed)
    - [Recommended packaging (default)](#recommended-packaging-default)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
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
    - [Design](#design)
    - [Architecture and behavior](#architecture-and-behavior)
    - [Scope and prerequisites](#scope-and-prerequisites)
- [References](#references)
- [Breaking changes to verify](#breaking-changes-to-verify)
- [What is still provisional](#what-is-still-provisional)
- [What to provide next](#what-to-provide-next)

</details>

<!-- Document content (editable) -->

> **Epic [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956)** · Planning output. Must be reviewed before implementation begins.
>
> **Design sign-off (Q1):** Confirmed — linked [Figma — S2 / Web, Link](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110) covers **overview, properties, and variants**. Optional **Copy as PNG** remains available if a review packet needs an offline artifact.

---

## TL;DR

- **Atypical migration.** The approved [accessibility migration analysis](./accessibility-migration-analysis.md) positions 2nd-gen **default** link delivery as **Spectrum link styles on native `<a href>`** in the light DOM (especially inside prose / typography), **not** a per-sentence `<sp-link>` custom element. **Q2 (resolved):** **CSS + native `<a>` only** — no transitional `sp-link` compatibility CE in scope for this migration.
- **Styling / S2 parity.** Spectrum CSS may use internal selectors (e.g. `.spectrum-Link--inline`) while mapping S2; **authors do not get an “inline” variant** in the sense 1st-gen `variant` attributes worked. Default `<a>` styles should **inherit surrounding typography** and “blend in” inside paragraphs; Storybook demonstrates links **in body copy** without treating inline as a separate consumer-facing variant ([rendering analysis](./rendering-and-styling-migration-analysis.md) remains the CSS source reference).
- **A11y-required corrections.** Remove or deprecate **`disabled` on navigational links** ([SWC-966](https://jira.corp.adobe.com/browse/SWC-966)); align contrast and “link vs body text” presentation with WCAG expectations ([SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160)); document **quiet** links for **section-scoped** patterns (e.g. footers), not undifferentiated body prose (per accessibility analysis).
- **Consumer migration.** Track global native-anchor styling and API deprecation direction ([SWC-926](https://jira.corp.adobe.com/browse/SWC-926), [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428)) in the written migration path for teams still on `sp-link`.
- **Packaging defaults (Q4):** **Resolved** for engineering direction — see [Recommended packaging (default)](#recommended-packaging-default) and **PR 6304** peer review (2026-05-15). **Additive:** confirm **trailing icon** with Design / React (Figma update ~Feb 2026); not required for initial release.

### Most blocking open questions

- **None currently.** **Q1** (Figma), **Q2** (native `<a>` only), **Q3** (Epic), and **Q4** (packaging defaults) are **resolved** — see [Blockers and open questions](#blockers-and-open-questions). **Additive follow-up:** trailing icon (Figma) — sync with Design / React; see **A3** under [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/link/src/Link.ts`](../../../../1st-gen/packages/link/src/Link.ts)
**Version:** `@spectrum-web-components/link@1.12.0`
**Custom element tag:** `sp-link`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `variant` | `'secondary' \| undefined` | `undefined` | `variant` | When set, only supported value is `secondary` |
| `staticColor` | `'black' \| 'white' \| undefined` | `undefined` | `static-color` | Reflected |
| `quiet` | `boolean` | `false` | `quiet` | Reflected boolean |
| `download` | `string \| undefined` | `undefined` | `download` | From `LikeAnchor` |
| `label` | `string \| undefined` | `undefined` | `label` | Applied as `aria-label` on inner `<a>` |
| `href` | `string \| undefined` | `undefined` | `href` | From `LikeAnchor` |
| `target` | `'_blank' \| '_parent' \| '_self' \| '_top' \| undefined` | `undefined` | `target` | From `LikeAnchor` |
| `referrerpolicy` | *see LikeAnchor* | `undefined` | `referrerpolicy` | From `LikeAnchor` |
| `rel` | `string \| undefined` | `undefined` | `rel` | From `LikeAnchor` |
| `disabled` | `boolean` | `false` | `disabled` | From `Focusable`; **invalid for real navigational links** — [SWC-966](https://jira.corp.adobe.com/browse/SWC-966) |
| `autofocus` | `boolean` | `false` | (none) | From `Focusable`; not reflected in declaration file as attribute name |
| `tabIndex` | `number` | delegated | `tabindex` | Getter/setter on host; inner anchor receives delegated focus |

### Methods

None declared on `Link` beyond inherited `ReactiveElement` / mixin behavior.

### Events

No component-specific custom events documented on `Link`. Activation follows the inner native `<a>`.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| *(default)* | Link text / phrasing content | Rendered inside shadow `<a>` |

### CSS custom properties

1st-gen bundles Spectrum-derived rules plus overrides; public `--mod-*` surface is **not** a supported consumer contract for 2nd-gen (see [Rendering analysis — Modifiers](./rendering-and-styling-migration-analysis.md)). 2nd-gen will not re-expose `--mod-*`; any new surface follows [`--swc-*` guidelines](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

### Shadow DOM output (rendered HTML)

```html
<a
    id="anchor"
    href="[href]"
    download="[download]"
    target="[target]"
    aria-label="[label]"
    tabindex="[tabindex from Focusable delegation]"
    referrerpolicy="[referrerpolicy]"
    rel="[rel]"
>
    <slot></slot>
</a>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | `1.12.0` | `SpectrumElement`, Lit `html`, `@property` |
| `@spectrum-web-components/shared` | `1.12.0` | `LikeAnchor` ([`like-anchor.ts`](../../../../1st-gen/tools/shared/src/like-anchor.ts)), `Focusable` ([`focusable.ts`](../../../../1st-gen/tools/shared/src/focusable.ts)) |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

- **Ship link styling with typography / prose consumption paths** in 2nd-gen so conversational and document UIs that already use `swc-Typography--prose` ([examples](../../../../2nd-gen/packages/swc/patterns/conversational-ai/system-message/stories/system-message.stories.ts)) get correct `<a href>` appearance without requiring `sp-link` per link.
- **Do not** hard-block on unrelated component migrations unless a shared token pipeline change is required; coordinate with **Typography** owners for where link selectors live and how Storybook documents native anchors inside prose.

### Related components and ordering notes

- **Typography (2nd-gen):** Primary integration point for prose link appearance and documentation ([`typography` component](../../../../2nd-gen/packages/swc/components/typography/), [migration guide](../../../../2nd-gen/packages/swc/components/typography/migration-guide.mdx)).
- **Button / app navigation:** Accessibility analysis distinguishes **button-shaped route changes** (prefer real `<button>` + routing) from text links — aligns with existing 1st-gen direction away from “link that looks like a button” misuse.

### User confirmation needed

- **Implementation:** Typography + CSS owners execute the [Recommended packaging (default)](#recommended-packaging-default) approach (generator change + `link.css` + optional `global-link.css`) and finalize **BEM** class names during build-out.

### Recommended packaging (default)

**Q2 is resolved** (CSS + native `<a>` only — no compatibility CE). Treat Link like **Typography** for repo shape: **no `2nd-gen/packages/core/components/link/`** (Typography today has **no** core `.ts` layer — only [`2nd-gen/packages/swc/components/typography/`](../../../../2nd-gen/packages/swc/components/typography/) for stories/tests/docs and [`2nd-gen/packages/swc/stylesheets/typography.css`](../../../../2nd-gen/packages/swc/stylesheets/typography.css) for generated rules).

- **NPM package:** still **`@adobe/spectrum-wc`** (`2nd-gen/packages/swc`); there is no separate link-only package.
- **Primary link stylesheet:** **`2nd-gen/packages/swc/stylesheets/link.css`** — all **variant / modifier** rules live here; authors apply **BEM-style classes** on `<a>` for presentation. **Do not** encode presentation as custom attributes (beyond normal HTML anchor attributes such as `href`, `rel`, etc.).
- **Typography generator — prose + link groups (no `@import`):** extend the **typography stylesheet generator** so emitted `typography.css` includes **default** anchor appearance for both document prose and link lists in **one** appended rule block — keep **`link.css`** and typography generation as **separate concerns** (do **not** `@import` `link.css` into `typography.css`). Example shape:

  ```css
  .swc-Typography--links  :where(a),
  .swc-Typography--prose :where(a) { }
  ```

  Use **`:where(a)`** so specificity stays at class level and **BEM modifier classes** on `<a>` can override defaults. **`.swc-Typography--links`** is a **Typography modifier** (same pattern as `--prose`, `--emphasized`) for footers, sidebars, and `<ul>` link lists — not a separate `swc-Links` utility. Consumers who need **full modifier control** load **`link.css`** separately and apply modifier classes as documented.
- **Documentation (Link → Typography, no story duplication):** Link-facing docs (migration guide / contributor notes / any Link MDX) should **call out** that **default** and **wrapper** anchor styles ship with the **Typography** package (`@adobe/spectrum-wc/typography.css`, modifiers **`.swc-Typography--prose`** and **`.swc-Typography--links`**, optional **`link.css`** for BEM modifiers). **Do not** duplicate the full Typography Storybook catalog under Link — cross-link [`typography` docs](../../../../2nd-gen/packages/swc/components/typography/) and the [Typography migration guide](../../../../2nd-gen/packages/swc/components/typography/migration-guide.mdx) instead.
- **Storybook (Typography owns link-list demo):** add **one** Typography story for the links-specific use case — e.g. a **`<ul class="swc-Typography--links">`** with **~3** list items, each containing an `<a href>`. Keep prose-in-paragraph link examples in existing Typography prose stories; Link docs **reference** that story rather than re-implementing it.
- **Opt-in global baseline:** ship **`2nd-gen/packages/swc/stylesheets/global/global-link.css`** for **bare `<a>`** baseline styling app-wide when explicitly imported — **no** extra wrapper selector required; **do not** put this file in the **cascade layer** pattern used elsewhere — it should behave like an easily overridden **link reset**, not a locked layer.
- **Core folder:** for this CSS-only path, **no** core TypeScript is required, matching Typography.

#### Peer review — PR 6304 (requested changes, incorporated)

Engineering review on [PR 6304](https://github.com/adobe/spectrum-web-components/pull/6304) records the above: confirm **`link.css`** location; **no** custom element; **no `@import`** into typography (generator instead); **BEM classes** for presentation; **quiet** may require a **modifier pair** analogous to React’s `isStandalone` for removing underline; **inline** is **not** an author-facing variant (inherit + stories); **`swc-Typography--links`** + **`--prose`** default anchors via generator with **`:where(a)`** ([discussion](https://github.com/adobe/spectrum-web-components/pull/6304#discussion_r3259963381)); **Link docs → Typography callout** (no duplicate stories); **one Typography story** for `swc-Typography--links` link lists; **`global-link.css`** opt-in without cascade layers; **trailing icon** in Figma → **additive** / Design+React check-in, not blocking v1.

---

## Changes overview

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Prefer **native `<a href>`** for in-body / prose links | `<sp-link>` wraps shadow anchor | Classed **`<a>`** with Spectrum S2 link CSS; docs show prose wrapper patterns | Replace `sp-link` in running text with `<a class="…">` + import documented CSS; follow [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428) / [SWC-926](https://jira.corp.adobe.com/browse/SWC-926) when tickets land |
| **B2** | Remove **`disabled`** as a supported pattern on navigational links | `disabled` blocks click in tests | Not supported on real anchors; use button + routing or remove control | Remove `disabled` from links; use disabled **button** or different UX ([SWC-966](https://jira.corp.adobe.com/browse/SWC-966)) |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B3** | **S2 typography + link parity** | 1st-gen `sp-link` predates some S2 selector nuances | Default anchors in prose **inherit** surrounding type; internal CSS may mirror Spectrum’s inline/standalone selectors where needed — **not** a new author “variant” vs 1st-gen (no `inline` attribute parity) | Rely on **typography generator** + **`link.css`** docs; add Storybook for **link inside body copy** |
| **B4** | **Token / contrast** fixes | Known contrast risk vs body ([SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160)) | S2 tokens + tests in prose contexts | Retest adjacent-text contrast in authored examples |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B5** | **Quiet** usage scope | README warns but attribute is global | Docs + design guidance: quiet styles only where section context makes links obvious | Restrict quiet styling to approved patterns (footer-like regions) per [accessibility analysis](./accessibility-migration-analysis.md) |
| **B6** | Avoid **double-activation** architectures | Ecosystem issues referenced in analysis | Single real target for `href` + router | Follow [SWC-923](https://jira.corp.adobe.com/browse/SWC-923), [SWC-921](https://jira.corp.adobe.com/browse/SWC-921) patterns in docs |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | Optional **compatibility** `sp-link` | **Out of scope** — **Q2** approved CSS + native `<a>` only (no CE) |
| **A2** | Extra Storybook coverage for **static color** on imagery / dark backgrounds | Visual regression alongside Typography stories (modifier / `link.css` demos — not a duplicate Typography catalog) |
| **A3** | **Trailing icon** (Figma S2 / Web, ~Feb 2026) | **Additive** — not in React yet; confirm with **Design / React**; not a blocker for initial link CSS / prose work |

---

## 2nd-gen API decisions

These are derived from 1st-gen, the [rendering roadmap](./rendering-and-styling-migration-analysis.md), the [accessibility analysis](./accessibility-migration-analysis.md), and [React Spectrum Link](https://react-spectrum.adobe.com/Link). **Q1** (Figma), **Q2** (native `<a>` only), **Q3** (Epic), and **Q4** (packaging — [PR 6304](https://github.com/adobe/spectrum-web-components/pull/6304) review) are **resolved** for planning purposes. Remaining work is **implementation** plus **additive** **A3** coordination.

### Public API

#### Properties / attributes (2nd-gen)

**Confirmed (Q2):** no custom element. Authors use **standard HTML** on `<a>` for behavior and semantics (`href`, `target`, `rel`, `download`, `referrerpolicy`, `aria-label`, `lang`, etc.).

**Presentation:** **BEM-style classes only** (and Typography modifiers such as **`.swc-Typography--links`** / **`.swc-Typography--prose`** for unclassed anchors inside wrappers) — do **not** introduce shadow-CE-style **presentation attributes** (e.g. no `quiet="` on a hostless pattern); map old `sp-link` attributes to **classes** in migration docs.

#### Visual matrix (2nd-gen)

N/A as a “fill / outline” matrix. Planned **presentation modes** (from roadmap + 1st-gen README + React):

| Mode | Notes |
| ---- | ----- |
| Default (body / prose) | Anchors **inherit** surrounding typography; default link color / decoration per S2 inside `.swc-Typography--prose` (generator) and/or **`link.css`** — **not** an “inline variant” for authors |
| Secondary | **BEM modifier class** (replaces `variant="secondary"` on `sp-link`) |
| Quiet | **BEM modifiers** — likely **two classes** required (analogous to React requiring **`isStandalone`** to remove underline); document exact pairing when CSS lands |
| Static white / black | **BEM modifier classes** on `<a>` (replaces `static-color` attribute) |

#### Slots (2nd-gen)

N/A for native `<a>` (element content is the link text). **Open question** only if a CE returns: default slot remains phrasing content.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Initial expectation for **Link** is a **small reviewed set** (likely tied to typography / prose), not a large modifier fan-out.

### Behavioral semantics

- **Navigation:** real `href` or framework `Link` that renders a real `<a>`; avoid JS-only “fake” links for standard navigation (**Confirmed** from accessibility analysis).
- **Quiet + critical flows:** treat as design-governed; engineering ships CSS but docs must encode constraints (**Confirmed** policy direction from accessibility analysis). **Implementation note (PR 6304):** quiet underline removal may require **paired modifier classes** (see visual matrix).

### Accessibility semantics notes (2nd-gen)

Follow the [accessibility migration analysis](./accessibility-migration-analysis.md) as the controlling document: implicit **link** role from `<a href>`, no `role="link"` on non-anchors, no `disabled` on anchors, icon-only links need discoverable name, focus-visible must remain perceivable.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

**Link-specific deviation:** the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) describes the default **core + `sp-*` SWC** split. For Link, the **primary** 2nd-gen deliverable is **shared CSS + documentation** with **native anchors** (**Q2** resolved). Packaging defaults are **set** in [Recommended packaging (default)](#recommended-packaging-default) (including **PR 6304** review).

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/link/` | **N/A** — **Q2** resolved: CSS + native `<a>` only (same as Typography; no core) |
| **SWC** | `2nd-gen/packages/swc/components/link/` | **N/A** — no `sp-link` CE; rules under [`stylesheets/`](../../../../2nd-gen/packages/swc/stylesheets/) and [`stylesheets/global/`](../../../../2nd-gen/packages/swc/stylesheets/) per [Recommended packaging (default)](#recommended-packaging-default); stories/tests extend **Typography** |

Planned rendering shape (native-`<a>` model — **preferred**):

- **No shadow boundary** around the activation target for default prose links.
- **CSS** applies Spectrum Link classes / design tokens to the author’s `<a>`.
- **Docs:** Link migration content **points to Typography** for base/wrapper styles; **Storybook:** Typography owns the **`swc-Typography--links`** list story and existing prose link examples — Link does not mirror the full Typography story set.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Plan reviewed by at least one other engineer

### Setup

- [x] Implement [Recommended packaging (default)](#recommended-packaging-default): `link.css`, typography **generator** updates (`.swc-Typography--links` / `--prose` + `:where(a)`), optional `global-link.css` — no `@import` of `link.css` into `typography.css`
- [x] If a new package is created: wire exports in the relevant `package.json` files
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [x] Publish author-facing decision: **native `<a>`** only (**Q2** resolved)
- [x] ~~If CE path: define `Link.types.ts` / base~~ **N/A** — no CE

#### Alignment checks

- [x] Align prose examples with [React Spectrum Link](https://react-spectrum.adobe.com/Link) naming where applicable
- [x] **Q1:** Figma parity — confirmed overview / properties / variants at [S2 / Web — Link (`18850-110`)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [x] ~~If a CE exists: add `.swc-Link`~~ **N/A** — no CE (**Q2**)
- [x] Copy S2 source from `spectrum-css` `spectrum-two` branch [`components/link/index.css`](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/link) (not `/dist`) into the chosen 2nd-gen stylesheet entry point
- [x] Implement **inline** modifier parity called out in [rendering analysis](./rendering-and-styling-migration-analysis.md)

#### Visual model and regressions

- [x] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [x] Add `@cssprop` JSDoc on any **new** exposed `--swc-*` tokens (likely on Typography / prose entry if no Link CE)
- [x] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [x] Ship docs + examples per [accessibility migration analysis](./accessibility-migration-analysis.md) checklist (native `<a>`, quiet scope, no `disabled` on links)
- [x] Cross-link [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx) from Typography / Link docs

#### State verification

- [x] Validate focus-visible in prose on light / dark / static-color backgrounds
- [ ] Confirm no regression on [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160) class of issues

### Testing

- [x] Port applicable assertions from [`1st-gen/packages/link/test/link.test.ts`](../../../../1st-gen/packages/link/test/link.test.ts) **only if** a CE remains; otherwise replace with **native `<a>`** fixture tests in typography / pattern packages
- [x] Add Playwright coverage for prose + links (`toMatchAriaSnapshot`) in the package that owns prose styles

#### Behavior

- [x] Regression guard: single navigation per user gesture (patterns from [SWC-923](https://jira.corp.adobe.com/browse/SWC-923), [SWC-921](https://jira.corp.adobe.com/browse/SWC-921))

#### Visual regression

- [ ] VRT: default / secondary / quiet / static black / static white × hover / focus-visible (per `link.css` + prose / wrapper stories)
- [ ] VRT: links **inside running text** vs **section / quiet** stories (paired modifiers per plan)

### Documentation

#### General

- [x] JSDoc / MDX for public CSS entries in **`link.css`** (no CE — **Q2**)
- [x] **Link docs callout (no story duplication):** document that default anchor appearance comes from **Typography** (`typography.css`, **`.swc-Typography--prose`**, **`.swc-Typography--links`**) and that **`link.css`** is for BEM modifier classes; cross-link [Typography migration guide](../../../../2nd-gen/packages/swc/components/typography/migration-guide.mdx) — **do not** copy the full Typography Storybook surface under Link
- [x] Prose / in-body `<a href>` patterns remain documented in **Typography** stories and migration guide (per accessibility analysis)

#### Storybook (Typography)

- [x] Add **one** Typography story: **link list** use case — `<ul class="swc-Typography--links">` with **~3** `<li>` items, each with an `<a href>` (footers / sidebars pattern)
- [x] Confirm existing Typography **prose** story(ies) show `<a href>` inside running text (no separate Link storybook package required)
- [x] **A2:** static-color / on-image link demos live under Typography or `link.css` stories as needed — not a second full catalog

#### Breaking changes

- [x] Migration guide section: `sp-link` → native `<a>` + classes; `disabled` removal; quiet usage guidance; import path **`@adobe/spectrum-wc/typography.css`** (+ optional **`link.css`**)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier) — link CSS and docs pass stylelint/prettier; repo-wide ESLint has pre-existing failures unrelated to Link
- [x] Status table in workstream doc updated
- [x] PR created with description referencing Epic [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q1** | **Figma:** [S2 / Web (Desktop scale) — Link (`node-id=18850-110`)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110) — overview, properties, variants | No | Resolved | Design + implementation |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q2** | **Architecture:** **CSS + native `<a>` only** — no transitional `sp-link` / CE in this migration | No | Resolved | Architecture + accessibility reviewers |
| **Q4** | **Packaging:** `link.css` + typography **generator** (no `@import`; **`.swc-Typography--links`** / **`--prose`** + `:where(a)`), **`global/global-link.css`** opt-in per [Recommended packaging (default)](#recommended-packaging-default); **PR 6304** review incorporated | No | Resolved | CSS + Typography (PR 6304 — 5t3ph) |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q3** | **Epic** for Link migration work — [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956) | No | Resolved | Ticket owner |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen `Link.ts`](../../../../1st-gen/packages/link/src/Link.ts)
- [1st-gen `LikeAnchor` mixin](../../../../1st-gen/tools/shared/src/like-anchor.ts)
- [1st-gen `Focusable` mixin](../../../../1st-gen/tools/shared/src/focusable.ts)
- [1st-gen tests — `link.test.ts`](../../../../1st-gen/packages/link/test/link.test.ts)
- [1st-gen README](../../../../1st-gen/packages/link/README.md)
- [React Spectrum — Link](https://react-spectrum.adobe.com/Link)
- [Spectrum CSS — `spectrum-two` / `components/link`](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/link)
- [Spectrum CSS migration PR (context)](https://github.com/adobe/spectrum-css/pull/3570)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [2nd-gen Typography migration guide](../../../../2nd-gen/packages/swc/components/typography/migration-guide.mdx)
- [2nd-gen — Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)
- Epic: [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956) — Link migration (program Epic)
- [Figma — S2 / Web (Desktop scale), Link (`node-id=18850-110`)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110)

**Related Jira (from accessibility analysis):** [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160), [SWC-926](https://jira.corp.adobe.com/browse/SWC-926), [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428), [SWC-966](https://jira.corp.adobe.com/browse/SWC-966), [SWC-923](https://jira.corp.adobe.com/browse/SWC-923), [SWC-921](https://jira.corp.adobe.com/browse/SWC-921)

---

## Breaking changes to verify

1. **Dropping default `sp-link` for prose / in-body copy** in favor of native `<a>` + Spectrum classes — **Q2** approves this architecture; confirm major consumers are informed via migration comms / [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428) / [SWC-926](https://jira.corp.adobe.com/browse/SWC-926) as applicable.
2. **`disabled` removal on links** — confirm product teams have no blocking reliance on current `sp-link disabled` behavior ([SWC-966](https://jira.corp.adobe.com/browse/SWC-966)).
3. **Quiet link styling scope** — confirm design agrees quiet is **not** for undifferentiated long-form body without additional visual cues.

## What is still provisional

- **Exact BEM class names** and the final **quiet** modifier **pairing** — finalize during CSS implementation and Storybook.
- **Trailing icon** presentation — **additive** (**A3**); align with Design / React when ready.

## What to provide next

1. **Implementation pass:** land `link.css`, typography generator output (`.swc-Typography--links` / `--prose` + `:where(a)`), `global-link.css`, Link docs callout, and Typography **links list** story per [Recommended packaging (default)](#recommended-packaging-default).
2. **Design / React:** short sync on **trailing icon** (Figma) when scheduling **A3**.

When deferred work is ticketed under [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956), replace drafting-time rows in [Blockers and open questions](#blockers-and-open-questions) with the deferred-ticket table format described in the migration-prep skill (`Ticket`, `Deferred item`, `Why deferred`, `Related plan section`).
