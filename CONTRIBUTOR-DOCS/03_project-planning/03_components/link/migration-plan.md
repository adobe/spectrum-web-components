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
- **Styling gap (confirmed from roadmap).** Spectrum 2 adds `.spectrum-Link--inline` for inline copy; 1st-gen `sp-link` does not map that modifier yet ([rendering analysis](./rendering-and-styling-migration-analysis.md)). Closing this gap belongs in **must ship** work for S2 parity, regardless of CE vs CSS-only packaging.
- **A11y-required corrections.** Remove or deprecate **`disabled` on navigational links** ([SWC-966](https://jira.corp.adobe.com/browse/SWC-966)); align contrast and “link vs body text” presentation with WCAG expectations ([SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160)); document **quiet** links for **section-scoped** patterns (e.g. footers), not undifferentiated body prose (per accessibility analysis).
- **Consumer migration.** Track global native-anchor styling and API deprecation direction ([SWC-926](https://jira.corp.adobe.com/browse/SWC-926), [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428)) in the written migration path for teams still on `sp-link`.
- **Open decisions:** **Q4** only — confirm or override the canonical **repo location and import story** for link CSS (see [Recommended packaging (default)](#recommended-packaging-default)). **Epic:** [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956) (resolved). **Q1** (Figma scope) and **Q2** (architecture) are **resolved** — see [Blockers and open questions](#blockers-and-open-questions).

### Most blocking open questions

- **Q4** ([Architecture and behavior](#architecture-and-behavior)): Confirm canonical **2nd-gen repo location** for link rules — default is **[`stylesheets/link.css` + compose into `typography.css`](#recommended-packaging-default)** unless you explicitly override (e.g. different filename, no `@import` into typography, or `global-elements.css` with design sign-off).
- **Q1** ([Design](#design)): **Resolved** — [Figma — S2 / Web, Link (`18850-110`)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110); confirmed to cover **overview, properties, and variants**.
- **Q2** ([Architecture and behavior](#architecture-and-behavior)): **Resolved** — **CSS + native `<a>` only** (no transitional `sp-link` / CE in this migration).
- **Q3** ([Scope and prerequisites](#scope-and-prerequisites)): **Resolved** — migration Epic is [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956).

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

- Confirm **Q4**: canonical link CSS home — [default recommendation](#recommended-packaging-default) is **`stylesheets/link.css`** composed into **`typography.css`**; override only if Typography / CSS owners agree on a different split.

### Recommended packaging (default)

**Q2 is resolved** (CSS + native `<a>` only — no compatibility CE). Unless **Q4** chooses a different layout, treat Link like **Typography** for repo shape: **no `2nd-gen/packages/core/components/link/`** (Typography today has **no** core `.ts` layer — only [`2nd-gen/packages/swc/components/typography/`](../../../../2nd-gen/packages/swc/components/typography/) for stories/tests/docs and [`2nd-gen/packages/swc/stylesheets/typography.css`](../../../../2nd-gen/packages/swc/stylesheets/typography.css) for rules).

- **NPM package:** still **`@adobe/spectrum-wc`** (`2nd-gen/packages/swc`); there is no separate link-only package.
- **Stylesheet source of truth:** add **`2nd-gen/packages/swc/stylesheets/link.css`** (name TBD) holding Spectrum 2 link rules migrated from Spectrum CSS; keeps ownership and review scope clear.
- **Compose into prose by default:** **`@import`** (or build-time equivalent) that **`link.css`** from **`typography.css`** so apps loading typography for `.swc-Typography--prose` get correct native `<a href>` styling without a second manual import.
- **Optional direct import:** document importing **`link.css`** alone for apps that need link appearance **without** full typography — same package, different entry.
- **`global-elements.css`:** use only if design explicitly wants **unscoped** native-anchor styling; higher blast radius — not the default recommendation.
- **Core folder:** for this CSS-only path, **no** core TypeScript is required, matching Typography.

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
| **B3** | **S2 inline** presentation | No `spectrum-Link--inline` mapping | CSS includes inline / standalone semantics per S2 | Update markup/classes per final Typography + Link docs once **Q4** packaging is settled |
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
| **A2** | Extra Storybook coverage for **static color** on imagery / dark backgrounds | Visual regression alongside typography stories |

---

## 2nd-gen API decisions

These are derived from 1st-gen, the [rendering roadmap](./rendering-and-styling-migration-analysis.md), the [accessibility analysis](./accessibility-migration-analysis.md), and [React Spectrum Link](https://react-spectrum.adobe.com/Link). **Q1** (Figma) and **Q2** (native `<a>` only) are **resolved**. **Q4** remains if packaging needs an explicit owner sign-off beyond the default below (**Q3** / Epic: [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956)).

### Public API

#### Properties / attributes (2nd-gen)

**Confirmed (Q2):** no custom element — use native HTML attributes on `<a>` (`href`, `target`, `rel`, `download`, `referrerpolicy`, `aria-label`, `lang`, etc.). No transitional `sp-link` in this migration.

#### Visual matrix (2nd-gen)

N/A as a “fill / outline” matrix. Planned **presentation modes** (from roadmap + 1st-gen README + React):

| Mode | Notes |
| ---- | ----- |
| Default / primary inline (S2) | **Confirmed** against Figma handoff (**Q1**) — implement per S2 / CSS once **Q4** packaging is settled |
| Secondary | `variant="secondary"` today → class or data-attribute pattern on `<a>` (**Inferred**) |
| Quiet | Boolean-style presentation; **scope** per **B5** |
| Static white / black | `static-color` analog as classes on `<a>` for on-image / on-tint contexts |

#### Slots (2nd-gen)

N/A for native `<a>` (element content is the link text). **Open question** only if a CE returns: default slot remains phrasing content.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Initial expectation for **Link** is a **small reviewed set** (likely tied to typography / prose), not a large modifier fan-out.

### Behavioral semantics

- **Navigation:** real `href` or framework `Link` that renders a real `<a>`; avoid JS-only “fake” links for standard navigation (**Confirmed** from accessibility analysis).
- **Quiet + critical flows:** treat as design-governed; engineering ships CSS but docs must encode constraints (**Confirmed** policy direction from accessibility analysis).

### Accessibility semantics notes (2nd-gen)

Follow the [accessibility migration analysis](./accessibility-migration-analysis.md) as the controlling document: implicit **link** role from `<a href>`, no `role="link"` on non-anchors, no `disabled` on anchors, icon-only links need discoverable name, focus-visible must remain perceivable.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

**Link-specific deviation:** the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) describes the default **core + `sp-*` SWC** split. For Link, the **primary** 2nd-gen deliverable is **shared CSS + documentation** with **native anchors** (**Q2** resolved). **Q4** only adjusts *where* those rules live in-repo if the default packaging is overridden.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/link/` | **N/A** — **Q2** resolved: CSS + native `<a>` only (same as Typography; no core) |
| **SWC** | `2nd-gen/packages/swc/components/link/` | **N/A** — no `sp-link` CE; rules under [`stylesheets/`](../../../../2nd-gen/packages/swc/stylesheets/) per [Recommended packaging (default)](#recommended-packaging-default) unless **Q4** overrides; stories/tests extend **Typography** |

Planned rendering shape (native-`<a>` model — **preferred**):

- **No shadow boundary** around the activation target for default prose links.
- **CSS** applies Spectrum Link classes / design tokens to the author’s `<a>`.
- **Docs + Storybook** show correct combinations with `swc-Typography--prose` (or successor) wrappers.

---

## Migration checklist

### Preparation (this ticket)

- [ ] 1st-gen API surface documented
- [ ] Dependencies identified
- [ ] Breaking changes documented
- [ ] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Confirm **Q4** (or accept default): `stylesheets/link.css` + import from `typography.css` — see [Recommended packaging (default)](#recommended-packaging-default)
- [ ] If a new package is created: wire exports in the relevant `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [x] Publish author-facing decision: **native `<a>`** only (**Q2** resolved)
- [ ] ~~If CE path: define `Link.types.ts` / base~~ **N/A** — no CE

#### Alignment checks

- [ ] Align prose examples with [React Spectrum Link](https://react-spectrum.adobe.com/Link) naming where applicable
- [x] **Q1:** Figma parity — confirmed overview / properties / variants at [S2 / Web — Link (`18850-110`)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=18850-110)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] ~~If a CE exists: add `.swc-Link`~~ **N/A** — no CE (**Q2**)
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch [`components/link/index.css`](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/link) (not `/dist`) into the chosen 2nd-gen stylesheet entry point
- [ ] Implement **inline** modifier parity called out in [rendering analysis](./rendering-and-styling-migration-analysis.md)

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Add `@cssprop` JSDoc on any **new** exposed `--swc-*` tokens (likely on Typography / prose entry if no Link CE)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [ ] Ship docs + examples per [accessibility migration analysis](./accessibility-migration-analysis.md) checklist (native `<a>`, quiet scope, no `disabled` on links)
- [ ] Cross-link [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx) from Typography / Link docs

#### State verification

- [ ] Validate focus-visible in prose on light / dark / static-color backgrounds
- [ ] Confirm no regression on [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160) class of issues

### Testing

- [ ] Port applicable assertions from [`1st-gen/packages/link/test/link.test.ts`](../../../../1st-gen/packages/link/test/link.test.ts) **only if** a CE remains; otherwise replace with **native `<a>`** fixture tests in typography / pattern packages
- [ ] Add Playwright coverage for prose + links (`toMatchAriaSnapshot`) in the package that owns prose styles

#### Behavior

- [ ] Regression guard: single navigation per user gesture (patterns from [SWC-923](https://jira.corp.adobe.com/browse/SWC-923), [SWC-921](https://jira.corp.adobe.com/browse/SWC-921))

#### Visual regression

- [ ] VRT: default / secondary / quiet / static black / static white × hover / focus-visible (scoped to final home per **Q4**)
- [ ] VRT: inline vs standalone presentation per **Q1** Figma / **Q4** stylesheet home

### Documentation

#### General

- [ ] JSDoc / MDX for public CSS entries (no CE — **Q2**)
- [ ] Storybook: Typography / prose examples show `<a href>` patterns (per accessibility analysis summary checklist)

#### Breaking changes

- [ ] Migration guide section: `sp-link` → native `<a>` + classes; `disabled` removal; quiet usage guidance

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956)
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
| **Q4** | Canonical **code location** for link CSS — default **[`link.css` + compose into `typography.css`](#recommended-packaging-default)**; confirm with Typography + CSS owners or document an override (e.g. no `@import` into typography, different filename, or `global-elements.css` with explicit design sign-off) | Yes, until confirmed or defaulted | Open | CSS reviewer + Typography owner |

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

- **Repo layout / import graph** for link CSS until **Q4** is confirmed or explicitly defaulted to [Recommended packaging (default)](#recommended-packaging-default).

## What to provide next

1. **Q4:** Typography + CSS owners **confirm the default** (`stylesheets/link.css` + pulled into `typography.css`) or **write down an override** (what changes, and why).

When deferred work is ticketed under [SWC-1956](https://jira.corp.adobe.com/browse/SWC-1956), replace drafting-time rows in [Blockers and open questions](#blockers-and-open-questions) with the deferred-ticket table format described in the migration-prep skill (`Ticket`, `Deferred item`, `Why deferred`, `Related plan section`).
