<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Asset / Asset component plan

<!-- Document title (editable) -->

# Asset component plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
- [Current API surface](#current-api-surface)
    - [1st-gen (`sp-asset`, published — out of scope)](#1st-gen-sp-asset-published--out-of-scope)
    - [2nd-gen (`swc-asset`, internal genre — the starting point for this plan)](#2nd-gen-swc-asset-internal-genre--the-starting-point-for-this-plan)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
    - [Must ship — v1 core](#must-ship--v1-core)
    - [Additive — deferred, not required for v1](#additive--deferred-not-required-for-v1)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [CSS custom properties](#css-custom-properties)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes](#accessibility-semantics-notes)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Ticket breakdown (Epic SWC-2317)](#ticket-breakdown-epic-swc-2317)
- [Implementation checklist](#implementation-checklist)
    - [Preparation (SWC-2318, this document)](#preparation-swc-2318-this-document)
    - [API (SWC-2319)](#api-swc-2319)
    - [Styling (SWC-2319)](#styling-swc-2319)
    - [Accessibility (SWC-2319 implementation, SWC-2320 testing)](#accessibility-swc-2319-implementation-swc-2320-testing)
    - [Testing (SWC-2320)](#testing-swc-2320)
    - [Documentation (SWC-2321)](#documentation-swc-2321)
    - [Review (SWC-2322)](#review-swc-2322)
- [Blockers and open questions](#blockers-and-open-questions)
    - [Design](#design)
    - [Architecture and behavior](#architecture-and-behavior)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2317** — [Asset] Expanded feature set.
>
> This is not a 1st-gen → 2nd-gen migration. `swc-asset` already exists (internal genre); this
> plan covers **expanding it in place** into a general image/media primitive, then promoting it
> to a public component.

---

## TL;DR

Asset (`swc-asset`) grows from a minimal file/folder-icon-or-slot component into a general
image/media primitive that Card (and other consumers) can slot directly and configure. v1:
flexible sizing (aspect-ratio and/or width/height, stretch-to-fill), a `fit` property
(`cover`/`contain`, `cover` default), retiring the `variant="file"|"folder"` icon variants in
favor of accepting images and SVG generically, a `decorative` property with a generalized
accessible-name fallback, and a `background` property (`transparent`/`solid`/`checkerboard`).
Genre promotion (internal → public) ships as part of this work, since the explicit intent is for
consumers to slot Asset directly once it lands. Responsive/adaptive image support (including
`<picture>`) and video are deferred past v1.

Card's own in-progress work (`seckles/swc-card` branch, not yet merged) is a **consumer**, not a
dependency that blocks this plan: Card's v1 ships with plain `<img>` support and one
aspect-ratio custom property, independent of Asset's timeline. The only coordination point is a
weak-sync mechanism for `aspect-ratio` (see [Behavioral semantics](#behavioral-semantics)),
which has already been tested and requires no changes to Card's existing CSS.

### Most blocking open questions

- **Q1–Q3** in [Design](#design): the loading/pending state's event names, payload, default
  visual (if any) for standalone use, and whether a failed-load state is part of the same
  scheme. Explicitly unresolved; may end up deferred out of v1 entirely if not settled in time.
- **Q4** in [Architecture and behavior](#architecture-and-behavior): the exact SVG
  accessible-name detection algorithm (which of `aria-label` / `aria-labelledby` / child
  `<title>` / existing `role="img"` count as "already labeled") needs sign-off from the team's
  a11y SME before it's final.

---

## Current API surface

### 1st-gen (`sp-asset`, published — out of scope)

**Source:** [`1st-gen/packages/asset/src/Asset.ts`](../../../../1st-gen/packages/asset/src/Asset.ts), [`Asset.base.ts`](../../../../1st-gen/packages/asset/src/Asset.base.ts)
**Package:** `@spectrum-web-components/asset`
**Custom element tag:** `sp-asset`

| Property  | Type                        | Default    | Attribute | Notes                                                    |
| --------- | --------------------------- | ---------- | --------- | --------------------------------------------------------- |
| `variant` | `'file' \| 'folder' \| undefined` | `undefined` | reflected | Selects a fixed inline icon; DEBUG-warns on invalid value  |
| `label`   | `string`                    | `''`       | attribute | Used as `aria-label` on the generated file/folder icon SVG |

**Slots:** default slot — custom content (typically an `<img>`) rendered when `variant` is unset.

**No sizing, fit, loading-state, or background-treatment API exists.** This package is real and
externally published; nothing here changes as part of this plan — out of scope.

### 2nd-gen (`swc-asset`, internal genre — the starting point for this plan)

**Source:** [`2nd-gen/packages/core/components/asset/Asset.base.ts`](../../../../2nd-gen/packages/core/components/asset/Asset.base.ts), [`2nd-gen/packages/swc/components/asset/Asset.ts`](../../../../2nd-gen/packages/swc/components/asset/Asset.ts)
**Custom element tag:** `swc-asset` — currently `@status internal`, docs/stories named
`asset.internal.mdx` / `asset.internal.stories.ts` (excluded from production builds today)

| Property  | Type                        | Default    | Attribute | Notes                                                    |
| --------- | --------------------------- | ---------- | --------- | --------------------------------------------------------- |
| `variant` | `AssetVariant \| undefined` (`'file' \| 'folder'`) | `undefined` | reflected | Mirrors 1st-gen; retired as part of this plan |
| `label`   | `string`                    | `''`       | attribute | Mirrors 1st-gen; renamed to `accessibleLabel` and repurposed as part of this plan (see [Accessibility semantics notes](#accessibility-semantics-notes)) |

**Slots:** default slot — custom content when `variant` is unset (renders `<slot></slot>`
inside an internal `.swc-Asset` wrapper).

**CSS today:** a blanket `::slotted(*) { object-fit: contain; max-inline-size: 100%; max-block-size: 100%; }`
rule applies to all slotted content unconditionally — this becomes conditional once `fit` ships.

**Full feature inventory being added** (source: the originating feature request, compared
against [React Spectrum Image](https://react-spectrum.adobe.com/Image) for parity reference):

1. Aspect-ratio and/or width/height sizing (stretch-and-fill model)
2. `fit`: cover / contain
3. Accept images and SVG generically (file/folder variants retired)
4. Loading/pending state — **open, see Q1–Q3**
5. `background`: transparent, solid color, or opacity checkerboard
6. `decorative` property and generalized accessible-name fallback
7. Genre promotion (internal → public)

Out of scope for v1: responsive/adaptive sizing (`srcset`/`sizes`-equivalent, including
`<picture>`), video support, Thumbnail deprecation (Thumbnail stays a separate component).

---

## Dependencies

| Package/component                        | Role                                                                                       | Blocking? |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- | --------- |
| `2nd-gen/packages/swc/stylesheets/_lit-styles/opacity-checkerboard.css` | Shared `.swc-OpacityCheckerboard` fragment; import directly for the checkerboard background option | No — already exists |
| `swc-card` (`seckles/swc-card` branch, unmerged) | Primary intended **consumer** once Asset ships; not a build dependency of Asset itself | No — independent timelines, only the aspect-ratio weak-sync contract needs to line up |
| `swc-thumbnail` (migration not started)   | Sibling visual primitive; a11y model reference only (see [accessibility-migration-analysis.md](../thumbnail/accessibility-migration-analysis.md)) | No |
| `2nd-gen/packages/core/controllers/pending-controller` | Considered and likely **not** reused as-is for the loading state (see Q1) — scope mismatch between a whole-control busy state and a per-image loading state | No |

No prerequisite migration or shared-base relationship blocks this work. Asset does not need to
wait on Card, Thumbnail, or any other component's migration.

The relationship runs the other direction: Card is the validation target for Asset's own
development, not a blocker on it. During SWC-2319, the in-progress Card branch should be updated
to slot `<swc-asset>` in its `preview` and `collection` slots so the API gets exercised against its primary real
consumer while it's still being built, rather than only after the fact. Card will need a
type-based selector split to keep supporting a plain `<img>` alongside `<swc-asset>` — see
[Behavioral semantics](#behavioral-semantics) for the specific rule. Card's own README/Storybook
docs (SWC-2321) should also reference Asset directly as an example consumer.

---

## Changes overview

> Since `swc-asset` is currently internal (no real external consumers), nothing here is a
> breaking change in the public-API sense. Items below are still separated into **Must ship**
> (required for a coherent, publishable v1) and **Additive** (deferred) for clarity and to keep
> the plan legible for reviewers.

### Must ship — v1 core

#### API and naming

| #      | What changes | Current (`swc-asset` internal) behavior | v1 behavior | Notes |
| ------ | ------------- | ---------------------------------------- | ----------- | ----- |
| **B1** | Retire `variant`/`ASSET_VARIANTS` (`file`/`folder`) and the inline icon rendering | `choose()`-driven icon SVG rendering based on `variant` | Generic slotted content only (image or SVG); no built-in icon variants | No real consumer impact (internal genre). Removes `ASSET_VARIANTS`/`AssetVariant`, the icon templates, and `.swc-Asset-file`/`-folder` CSS classes entirely |
| **B2** | Add `aspectRatio` property with an ancestor weak-sync default | N/A today | New property; see [Behavioral semantics](#behavioral-semantics) for the resolution mechanism | DEBUG warning when set together with both `width` and `height` — see [Behavioral semantics](#behavioral-semantics) |
| **B3** | Add `width`/`height` properties as an alternative sizing input | N/A today | Accepts any valid CSS `<length-percentage>` (e.g. `"100px"`, `"90%"`); default unset (`auto`) | Simpler than `aspectRatio` — private-only, no exposed ancestor-default channel, since Card's v1 has no width/height default to hand down |
| **B4** | Add `fit` property (`'cover' \| 'contain'`, default `'cover'`) | Blanket `::slotted(*) { object-fit: contain }` | Conditional, attribute-selector-driven; `cover` is the new default | Entirely Asset's own concern — no ancestor hand-off (see [Behavioral semantics](#behavioral-semantics)); DEBUG warning on an invalid value |
| **B5** | Genre promotion: drop `.internal.*` naming and `@status internal` | Internal genre, excluded from production docs/build | Public component | Consumers should be able to slot Asset directly and control its features themselves |

#### Accessibility

| #      | What changes | Current behavior | v1 behavior | Notes |
| ------ | ------------- | ------------------ | ----------- | ----- |
| **B6** | Add `decorative` property | N/A today | Mirrors Thumbnail: host `aria-hidden="true"` when set; suppresses any auto-applied labeling | — |
| **B7** | Rename `label` → `accessibleLabel` (`accessible-label` attribute) and generalize it into a fallback accessible name | `label` only feeds the (retired) file/folder icon's `aria-label` | Follows the existing `accessible-label` convention (Button, Tabs, ActionButton, etc.); applied to slotted `<img>`/`<svg>` only when it has no accessible name of its own; DEBUG warning when neither `decorative`, existing labeling, nor `accessible-label` is present | SVG detection algorithm needs a11y SME sign-off — see [Q4](#architecture-and-behavior) |
| **B8** | Asset never exposes `disabled`/`focused`/`selected` | N/A today (not present) | Explicitly excluded, matching Thumbnail's "parent owns interactive state" model | — |
| **B9** | DEBUG-warn when more than one child, or an unsupported child type, is slotted into the default slot | N/A today | Only a single `<img>` or `<svg>` is a supported child; anything else (multiple children, or an unrecognized element) triggers a DEBUG warning | Behavior for the extra/invalid content itself (hide vs. render as-is) is an implementation detail for SWC-2319, not specified here |

#### Styling and visuals

| #       | What changes | Current behavior | v1 behavior | Notes |
| ------- | ------------- | ------------------ | ----------- | ----- |
| **B10** | Add `background` property (`'transparent' \| 'solid' \| 'checkerboard'`, default `'transparent'`) | No background handling today | `'transparent'` matches today's behavior (no background); `'checkerboard'` reuses the shared `.swc-OpacityCheckerboard` fragment; `'solid'` uses a new exposed `--swc-asset-background-color` property, default `token("gray-100")` | DEBUG warning on an invalid value. No forced-colors override needed for `'solid'` — see [Behavioral semantics](#behavioral-semantics) |
| **B11** | `.swc-Asset` gets `border-radius: inherit` and `overflow: hidden` | No corner-radius handling today | A host-level `border-radius` set by any consumer via ordinary CSS is inherited by the internal wrapper and clips slotted content to match | No dedicated corner-radius/border property on Asset itself — a consumer applies `border-radius`/`border`/`box-shadow` directly to the `<swc-asset>` host like any other element. `overflow: hidden` lives on `.swc-Asset`, not `:host`, so a host-level `box-shadow` isn't clipped by it |

### Additive — deferred, not required for v1

| #      | What is deferred | Notes |
| ------ | ------------------ | ----- |
| **A1** | Responsive/adaptive image support (`srcset`/`sizes`-equivalent), including `<picture>` for format fallback or art-direction | `<picture>` is not a replaced element, so `::slotted()` can't reach its inner `<img>` to size it, and its accessible name lives on `picture > img[alt]` rather than the top-level node — both would need special-cased handling. Since `<picture>` is also the natural vehicle for this same responsive/art-direction capability, it's grouped with this deferral rather than solved separately. v1 accepts a plain `<img>` or `<svg>` only |
| **A2** | Video (`<video>`) support | Its loading/decode/poster semantics differ enough from images to warrant separate design work |
| **A3** | Thumbnail deprecation/consolidation | Decided against — Thumbnail stays a separate component |
| **A4** | Deriving a background color/gradient from the slotted image itself (dominant edge color, or opposing-corner colors for a gradient) | Explored, not planned: requires same-origin or CORS-enabled images to sample pixels via canvas (`getImageData` throws on a cross-origin image without `crossorigin` + permissive `Access-Control-Allow-Origin`, which a general-purpose component can't guarantee), plus a real per-image canvas draw + GPU-readback cost that adds up at scale (e.g. 50 cards × up to 4 Asset images = up to 200 images in one view). A cheaper, more robust alternative already exists for products that want this: compute it once upstream (server/CDN-side, several image services already return an average-color or LQIP swatch as metadata) and pass the result to Asset's own `--swc-asset-background-color`, rather than Asset doing client-side pixel analysis per instance |

---

## 2nd-gen API decisions

### Public API

| Property         | Type                                                       | Default     | Attribute         | Notes |
| ---------------- | ------------------------------------------------------------ | ----------- | ------------------- | ----- |
| `aspectRatio`     | `string \| undefined` (CSS `<ratio>` syntax, e.g. `"16/9"`, plus the `square` keyword) | `undefined` | `aspect-ratio`      | Falls through to an ancestor-supplied default, else `auto`, when unset (see [Behavioral semantics](#behavioral-semantics)). Also accepts `square` and normalizes `:`-separated ratios (e.g. `"16:9"`) to `/`. DEBUG warning when set together with both `width` and `height` |
| `width`           | `string \| undefined` (CSS `<length-percentage>`, e.g. `"100px"`, `"90%"`) | `undefined` (`auto`) | `width`  | DEBUG warning on an invalid value |
| `height`          | `string \| undefined` (CSS `<length-percentage>`)           | `undefined` (`auto`) | `height`   | DEBUG warning on an invalid value |
| `fit`             | `'cover' \| 'contain'`                                       | `'cover'`   | `fit`               | Asset-owned only, no ancestor sync. DEBUG warning on an invalid value |
| `decorative`      | `boolean`                                                    | `false`     | reflected           | — |
| `accessibleLabel` | `string \| undefined`                                       | `undefined` | `accessible-label`  | Renamed from `label`, generalized fallback accessible name; matches the existing `accessible-label` convention used by Button/Tabs/ActionButton/etc. Exact SVG detection algorithm is [Q4](#architecture-and-behavior) |
| `background`      | `'transparent' \| 'solid' \| 'checkerboard'`                 | `'transparent'` | `background`    | `'transparent'` matches today's behavior; `'solid'` uses `--swc-asset-background-color` (default `token("gray-100")`); `'checkerboard'` reuses the shared opacity-checkerboard fragment. DEBUG warning on an invalid value |
| `variant`         | _(removed)_                                                  | —           | —                   | See B1 |

**Slots (2nd-gen):**

| Slot    | Content                          |
| ------- | ---------------------------------- |
| default | A single `<img>` or `<svg>` element. More than one child, or an unsupported child type, triggers a DEBUG warning |

### CSS custom properties

No `--mod-*` properties are exposed, per [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
and the retirement of that pattern for 2nd-gen (`05_anti-patterns.md` #2).

| Custom property                | Type            | Exposed? | Purpose |
| --------------------------------- | ----------------- | -------- | ------- |
| `--swc-asset-aspect-ratio`        | `<ratio>`         | Yes (`--swc-*`) | Weak-default channel: any ancestor (Card or otherwise) can hand Asset a fallback aspect-ratio by setting this property anywhere upstream — inherits normally, no coordination code required |
| `--_swc-asset-aspect-ratio`       | `<ratio>`         | No (`--_swc-*`, private) | Set by Asset's own JS when the consumer sets `aspectRatio` explicitly; resolves first in the fallback chain so an explicit value always wins |
| `--_swc-asset-width`             | `<length-percentage>` | No (private) | Set by Asset's own JS when `width` is explicit; no exposed ancestor-default counterpart |
| `--_swc-asset-height`            | `<length-percentage>` | No (private) | Same as `--_swc-asset-width` |
| `--swc-asset-background-color`   | `<color>`         | Yes (`--swc-*`) | Used only when `background="solid"`; default `token("gray-100")` |

Each exposed `--swc-*` property must get a `@cssprop` JSDoc tag on the primary SWC component
class, per the standard convention.

### Behavioral semantics

#### Aspect-ratio weak-sync

```css
.swc-Asset {
  aspect-ratio: var(--_swc-asset-aspect-ratio, var(--swc-asset-aspect-ratio, auto));
}
```

- Declared on the **internal `.swc-Asset` wrapper, not `:host`**. This is what makes the scheme
  work: if Card (or any ancestor) ever set the literal `aspect-ratio` CSS property directly on
  the `<swc-asset>` host from outside, the host's box would become fully definite in both
  dimensions, making Asset's own internal ratio physically inert regardless of any cascade
  trick. Ancestors must only ever hand Asset a value through the inherited custom property
  (`--swc-asset-aspect-ratio`), never the literal property.
- When the consumer sets `aspectRatio` explicitly, Asset's JS sets `--_swc-asset-aspect-ratio`
  as a plain custom-property assignment (not an inline `style.aspectRatio`) — it resolves first
  in the `var()` chain, so it always wins over any ancestor-supplied default.
- Card's existing `card-template.css` rule for ::slotted([slot="preview"])`
  needs a type-based split to support both content types at once, since a plain `<img>` and a
  `<swc-asset>` need different declarations for the same conceptual default:

  ```css
  ::slotted(img[slot="preview"]) {
    aspect-ratio: var(--swc-card-base-preview-aspect-ratio, 3/2);
    object-fit: cover;
  }
  ::slotted(swc-asset[slot="preview"]) {
    --swc-asset-aspect-ratio: var(--swc-card-base-preview-aspect-ratio, 3/2);
  }
  ```

  A similar adjustment will be needed in `card.css` for handling the `collection` slot `aspect-ratio`.

  The `<img>` branch is unchanged from today. The `<swc-asset>` branch only ever sets the custom
  property, never a literal `aspect-ratio`/`object-fit` on the host — consistent with the
  box-model reasoning above. `object-fit` has no `<swc-asset>` counterpart to set at all: `fit`
  has no ancestor hand-off (see below), and `object-fit` has no effect on a non-replaced custom
  element regardless. The other layout properties on `::slotted([slot="preview"])`
  (`display`, `grid-area`, `inline-size`) are untyped and continue to apply to both.

#### Aspect-ratio keywords and separator normalization

`square` resolves to `1/1`. `hd` and any further keywords are not included — `16/9` is already
self-explanatory CSS syntax, "HD" names a resolution standard rather than a ratio and doesn't
generalize (an ultrawide or portrait ratio has no equally natural keyword), and a keyword set is
easier to grow later than to walk back. Ship `square` alone and add more only if real usage shows
a clear demand.

**Separator normalization** such as for `"16:9"` is silently normalized to `"16/9"` before use. Normalizing rather than DEBUG-warning is
deliberate — unlike an invalid `variant` value (where the component can't know what the author
meant), `"16:9"` unambiguously means `"16/9"`; a colon has no other meaning in this attribute, so
warning about it would just be noise.

A DEBUG warning fires when `aspectRatio` is set together with both `width` and `height` — once
both dimensions are already definite, the ratio has nothing left to resolve, so the combination
almost always indicates author confusion rather than intent. Setting `aspectRatio` with only one
of `width`/`height` is the normal, unwarned pattern (one dimension fixed, the other derived from
the ratio).

An `<swc-asset>` with none of `aspectRatio`/`width`/`height` set, and no ancestor-supplied
default, has been tested directly and does not collapse to zero size — no additional built-in
fallback ratio is needed.

#### Width and height

Same mechanism as aspect-ratio's private half, without the exposed ancestor-default half (no
ancestor hands Asset a width/height default): `inline-size: var(--_swc-asset-width, auto)` /
`block-size: var(--_swc-asset-height, auto)` on `.swc-Asset`, set by Asset's own JS from the
`width`/`height` properties when explicit.

The `width`/`height` property names are physical, matching native `<img width height>` and the
CSS `width`/`height` properties, even though they resolve internally to logical
`inline-size`/`block-size`. This isn't a gap relative to native expectations: image and SVG
content doesn't mirror with writing-mode direction the way text layout does, so a physical name
is what a consumer already expects from sizing image content, in or out of RTL contexts.

An invalid (non-length-percentage) value for `width`/`height` triggers a DEBUG warning.

#### Fit (cover/contain) — no ancestor hand-off

`cover` is Asset's own hardcoded default; an explicit `fit="contain"` is resolved purely via
Asset's own attribute selectors (e.g. `:host([fit="contain"]) ::slotted(*) { object-fit: contain; }`).
No CSS custom-property or ancestor-default mechanism is needed for this property — simpler than
`aspectRatio`. An invalid value triggers a DEBUG warning.

#### Sizing model

"Stretch and fill the container until meeting an aspect-ratio or width/height constraint" — not
a token-based fixed-size-step model (ruling out Thumbnail's `size` enum as a pattern here).

#### Background treatment

A single `background` property, `'transparent' | 'solid' | 'checkerboard'`, defaulting to
`'transparent'` (matching today's behavior — no background). `'checkerboard'` imports the shared
`.swc-OpacityCheckerboard` fragment directly rather than duplicating its gradient. `'solid'` uses
a new exposed `--swc-asset-background-color` custom property, defaulting to `token("gray-100")`.
An invalid value triggers a DEBUG warning.

No forced-colors override is needed for `'solid'`. The checkerboard fragment opts out of the
browser's default forced-colors neutralization (`forced-color-adjust: none`) specifically to keep
its decorative pattern recognizable in high-contrast mode; a plain consumer-set solid color has
no such requirement and should instead yield to the browser's default forced-colors behavior like
any other custom background color.

Whatever `background` is set to shows around the edges when `fit="contain"` letterboxes the
slotted content, and is also what's visible behind the slot before the image resolves (i.e.
during the still-unresolved loading state, [Q1–Q3](#design)) — worth calling out explicitly in
documentation, since pairing `fit="contain"` with a non-transparent `background` is the natural
way to get a polished letterboxed look.

Explicitly not pursued: deriving a background color or gradient from the slotted image itself
(dominant edge color, or opposing-corner colors for a gradient) — see
[A4](#additive--deferred-not-required-for-v1) for why.

#### Corner radius and border

`.swc-Asset` gets `border-radius: inherit` and `overflow: hidden`. This lets a host-level
`border-radius` — set by any consumer via ordinary CSS on the `<swc-asset>` element, no dedicated
Asset property involved — flow down to the internal wrapper and clip the slotted content to
match. `overflow: hidden` is placed on `.swc-Asset` specifically, not `:host`: keeping the host
itself free of `overflow: hidden` means a host-level `box-shadow` a consumer applies isn't clipped
by it.

#### Picture element vs. `<img>`

`<picture>` is not supported as slotted content for v1 — grouped with the [A1](#additive--deferred-not-required-for-v1)
responsive-image deferral. Two concrete conflicts drove this: `::slotted()` only matches the
top-level distributed node, not descendants (`::slotted(picture) img` isn't valid), and since
`<picture>` itself isn't a replaced element, sizing needs to land on its inner `<img>` —
reachable only via JS walking into the slotted content, not CSS. Its accessible name also lives
on `picture > img[alt]` rather than the top-level node, which would need a special case in the
B7 detection logic. Document v1 as accepting a plain `<img>` or `<svg>` only.

#### Performance guidance for documentation

SWC-2321 should encourage consumers to apply `loading="lazy"` (and `decoding="async"` where
relevant) on their own slotted `<img>` elements. This matters more as Asset usage scales — e.g. a
grid of many Cards, each with one or more Asset instances — even though (per earlier research)
`loading="lazy"` itself carries no accessibility semantics; it's a pure resource-timing
recommendation.

#### Loading/pending state — open, see Q1–Q3

Current leaning: Asset emits lifecycle events (working names: "loading" / "ready") for its own
slotted content, rather than folding a busy announcement into its own accessible name the way
`PendingController` does for whole controls. This fits the Card Figma reference, where a loading
treatment applies only to the `preview` image, not to the whole card — i.e. loading is a
per-`swc-asset`-instance concern that the embedding parent should be free to represent however
fits its own content (a full `ProgressCircle`, a lighter visual-only spinner, or nothing at all).
Exact event names, payload, whether Asset renders any default visual/accessible treatment for
standalone (non-Card) use, and whether a failed-load state shares the same event scheme are all
unresolved — see [Q1–Q3](#design).

### Accessibility semantics notes

- `decorative` property, mirroring Thumbnail — host `aria-hidden="true"` when set.
- Asset never exposes `disabled`, `focused`, or `selected` — those visual states belong entirely
  to whatever embeds Asset, matching Thumbnail's "parent owns interactive state" model exactly.
- More than one slotted child, or an unsupported child type, triggers a DEBUG warning — the
  sizing/fit CSS and the accessible-name detection logic below both only anticipate a single
  assigned `<img>` or `<svg>`.
- `label` is renamed to `accessibleLabel` (`accessible-label` attribute — matching the existing
  convention used by Button, Tabs, ActionButton, ProgressBar, and others) and becomes a fallback
  accessible name applied only when slotted content doesn't already carry its own. Detection
  order:
  1. `decorative` is set → suppress from AT entirely, regardless of content type.
  2. Content already has its own accessible name (`img[alt]`, or `svg` with `role="img"` +
     `aria-label`/`aria-labelledby` or a direct child `<title>`) → leave it alone.
  3. Neither of the above, but `accessible-label` is provided → apply it to the slotted node
     (`aria-label` on an `<svg>` root, since SVG has no native `alt`).
  4. None of the above → DEBUG warning, mirroring Thumbnail's "neither alt nor decorative" case.

  Exact SVG detection algorithm pending a11y SME sign-off — see [Q4](#architecture-and-behavior).
- **Open**: loading-state AT exposure (see Q1–Q3).

---

## Architecture: core vs SWC split

The existing split is retained and extended, not restructured:

| Layer    | Path                                             | Contains                                                                                                    |
| -------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/asset/`         | `Asset.base.ts` (shared properties: `aspectRatio`, `width`, `height`, `fit`, `decorative`, `accessibleLabel`, `background`), `Asset.types.ts` (new `AssetFit`/`AssetBackground` types; `AssetVariant`/`ASSET_VARIANTS` removed), validation/DEBUG warnings, accessible-name resolution logic |
| **SWC**  | `2nd-gen/packages/swc/components/asset/`          | `Asset.ts`, `asset.css` (aspect-ratio/sizing resolution, `fit` attribute selectors, checkerboard import), element registration, stories, tests |

Planned rendering shape: Core owns API normalization, warnings, and the slotted-content
inspection logic (accessible-name detection, decorative handling); SWC renders the `.swc-Asset`
wrapper and its sizing/background CSS (see [Behavioral semantics](#behavioral-semantics) for the
exact mechanism), and imports the shared `opacity-checkerboard.css` fragment for the background
option.

---

## Ticket breakdown (Epic SWC-2317)

This plan is the shared baseline for the following linked tickets:

| Ticket       | Title                                                                 | Consumes from this plan                                                                                 |
| ------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **SWC-2318** | Define v1 API and accessibility plan **(this document)**              | —                                                                                                        |
| **SWC-2319** | Implement v1 API: file structure, TypeScript, accessibility, styling  | [2nd-gen API decisions](#2nd-gen-api-decisions), [Architecture](#architecture-core-vs-swc-split)        |
| **SWC-2320** | Code conformance and test coverage for v1 API                         | [Changes overview](#changes-overview), [Accessibility semantics notes](#accessibility-semantics-notes) |
| **SWC-2321** | Storybook documentation and consumer migration guide for v1 API       | [Public API](#public-api), [Changes overview](#changes-overview)                                        |
| **SWC-2322** | Review and finalize v1 release                                        | Whole plan, for the final consistency pass                                                              |

If implementation, tests, or docs need to deviate from this plan during those tickets, call out
the drift explicitly and update this plan rather than silently diverging (per the migration
plan contract pattern this document follows).

---

## Implementation checklist

### Preparation (SWC-2318, this document)

- [x] Current API surface documented (1st-gen and 2nd-gen)
- [x] Dependencies identified
- [x] Changes overview documented (Must ship / Additive)
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer
- [ ] Loading/pending state design resolved (Q1–Q3)
- [ ] SVG accessible-name detection algorithm signed off by the team's a11y SME (Q4)

### API (SWC-2319)

- [ ] `Asset.types.ts`: define `AssetFit` (`'cover' | 'contain'`) and `AssetBackground`
      (`'transparent' | 'solid' | 'checkerboard'`); remove `ASSET_VARIANTS`/`AssetVariant`
- [ ] `Asset.base.ts`: add `aspectRatio`, `width`, `height`, `fit`, `decorative`,
      `accessibleLabel` (renamed from `label`), `background`; remove `variant`
- [ ] Implement the `square` aspect-ratio keyword and `:`-to-`/` separator normalization
- [ ] Implement slotted-content inspection for accessible-name detection (`img[alt]`; `svg` with
      `role="img"` + `aria-label`/`aria-labelledby`/child `<title>`) and the DEBUG warning path
- [ ] Implement DEBUG warnings: invalid `fit`/`background` values; `aspectRatio` set together
      with both `width` and `height`; more than one slotted child or an unsupported child type
- [ ] Update Card to slot `<swc-asset>` in its `preview` slot, as a live validation target for
      this API while it's being built
- [ ] Split Card's `card-template.css` preview-slot rule and `card.css` collection-slot rule — see [Behavioral semantics](#behavioral-semantics)

#### Alignment checks

- [ ] Confirm the exact SVG detection algorithm with the a11y SME before finalizing (Q4)

### Styling (SWC-2319)

- [ ] Remove `.swc-Asset-file`/`-folder` icon CSS and the inline SVG icon templates
- [ ] Implement the aspect-ratio weak-sync chain on `.swc-Asset` (`--_swc-asset-aspect-ratio` /
      `--swc-asset-aspect-ratio`)
- [ ] Implement `width`/`height` private custom properties (`--_swc-asset-width`/`-height`)
- [ ] Implement `fit` attribute selectors (`cover` default, `contain` override)
- [ ] Implement `background` treatment (`solid` via `--swc-asset-background-color`;
      `checkerboard` via the shared fragment; `transparent` as the no-op default)
- [ ] Add `border-radius: inherit` and `overflow: hidden` to `.swc-Asset` (not `:host`)
- [ ] Import `2nd-gen/packages/swc/stylesheets/_lit-styles/opacity-checkerboard.css`
- [ ] Add `@cssprop` JSDoc tags for `--swc-asset-aspect-ratio` and `--swc-asset-background-color`
- [ ] Pass stylelint

### Accessibility (SWC-2319 implementation, SWC-2320 testing)

- [ ] `decorative` sets `aria-hidden="true"` on the host
- [ ] `accessibleLabel` fallback applied per the detection order in
      [Accessibility semantics notes](#accessibility-semantics-notes) (pending Q4)
- [ ] DEBUG warning fires when neither `decorative`, existing labeling, nor `accessibleLabel` is
      present
- [ ] Confirm Asset exposes no `disabled`/`focused`/`selected`

### Testing (SWC-2320)

- [ ] Unit tests for `aspectRatio`/`width`/`height`/`fit`/`background` behavior, including the
      `square` keyword and `:`-to-`/` normalization
- [ ] Unit tests for each accessible-name detection branch (labeled `img`, labeled `svg`,
      `decorative`, DEBUG-warning case)
- [ ] Unit tests for each new DEBUG-warning path: invalid `fit`/`background`, `aspectRatio` +
      `width` + `height` combined, multiple/unsupported slotted children
- [ ] Confirm an unconfigured `<swc-asset>` (no `aspectRatio`/`width`/`height`, no ancestor
      default) doesn't collapse to zero size, across the layout contexts it's expected to be used
      in (standalone, inside Card's `preview` slot)
- [ ] Playwright `asset.a11y.spec.ts` with `toMatchAriaSnapshot`
- [ ] VRT coverage for `background` treatments (transparent/solid/checkerboard) and `fit`
      (cover/contain), including `fit="contain"` with a non-transparent `background`

### Documentation (SWC-2321)

- [ ] Drop `.internal.*` naming and `@status internal`; promote docs/stories to public
- [ ] JSDoc on all public properties, slots, and CSS custom properties
- [ ] Storybook stories for sizing, `fit`, `background`, and `decorative`/`accessibleLabel`
- [ ] Consumer migration guide covers the `variant` removal and the `label` →
      `accessibleLabel` rename
- [ ] Reference Card directly as an example consumer (Storybook docs and/or the consumer
      migration guide), pointing at its `preview` and `collection` slot usage
- [ ] Document v1 support for a single `img` or `svg` child only
- [ ] Document `loading="lazy"`/`decoding="async"` performance guidance
- [ ] Document the resulting CSS behavior when combining `aspectRatio` with only one of
      `width`/`height` (the supported pattern — one dimension fixed, the other derived)
- [ ] Document that `background` shows around the edges under `fit="contain"` and behind the
      slot before the image resolves, and that pairing a non-transparent `background` with
      `fit="contain"` is the recommended way to get a polished letterboxed/loading look

### Review (SWC-2322)

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] 2nd-gen migration status table updated, if applicable
- [ ] PR created referencing Epic SWC-2317
- [ ] Peer engineer sign-off

---

## Blockers and open questions

Only genuinely unresolved items remain here. Everything else has been folded into the section it
affects.

### Design

| #      | Item | Blocking? | Status | Owner |
| ------ | ---- | --------- | ------ | ----- |
| **Q1** | Loading/pending state: exact event name(s) and payload shape | Yes — blocks B-item classification for loading in [Changes overview](#changes-overview) | Open; leaning toward events over an ARIA-busy pattern, not confirmed | Design + implementation |
| **Q2** | Whether Asset renders any default visual/accessible loading indicator for standalone (non-Card) use | Yes, for standalone use cases | Open | Design + accessibility reviewer |
| **Q3** | Whether a failed-load (error) state shares the loading event scheme or is a separate concern | No — can resolve after Q1/Q2 | Open | Implementation |

### Architecture and behavior

| #      | Item | Blocking? | Status | Owner |
| ------ | ---- | --------- | ------ | ----- |
| **Q4** | Exact SVG accessible-name detection algorithm (which of `aria-label`/`aria-labelledby`/child `<title>`/existing `role="img"` count as "already labeled") | Yes — blocks finalizing B7 | Author accepts the proposed direction; pending sign-off from the team's a11y SME | Accessibility reviewer |

---

## References

- [Asset research.md](./research.md) — the deep-read artifact this plan is drawn from, including the full reasoning behind the aspect-ratio weak-sync mechanism and the Card Gen2 findings
- [Thumbnail accessibility migration analysis](../thumbnail/accessibility-migration-analysis.md) — a11y model reference (decorative, no disabled/focused/selected, host has no ARIA role)
- [Asset rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [1st-gen source](../../../../1st-gen/packages/asset/src/Asset.ts)
- [2nd-gen source (core)](../../../../2nd-gen/packages/core/components/asset/Asset.base.ts)
- [2nd-gen source (SWC)](../../../../2nd-gen/packages/swc/components/asset/Asset.ts)
- [Opacity checkerboard shared style](../../../../2nd-gen/packages/swc/stylesheets/_lit-styles/opacity-checkerboard.css)
- [Pending controller](../../../../2nd-gen/packages/core/controllers/pending-controller/src/pending-controller.ts) — considered and likely not directly reused for the loading state (see Q1)
- [React Spectrum Image](https://react-spectrum.adobe.com/Image) — feature-comparison reference from the originating request
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)
- `seckles/swc-card` branch (unmerged) — Card's in-progress Gen2 implementation, the primary intended consumer of Asset once shipped
