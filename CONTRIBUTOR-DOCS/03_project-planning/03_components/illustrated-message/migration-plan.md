# `sp-illustrated-message` Migration Plan

> **SWC-1834** · Phase 1 output (planning). Must be reviewed before implementation begins.

---

## Table of contents

- [1st-gen API surface](#1st-gen-api-surface)
- [Dependencies](#dependencies)
- [Breaking changes](#breaking-changes)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
- [Blockers and open questions](#blockers-and-open-questions)
- [References](#references)

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/illustrated-message/src/IllustratedMessage.ts`](../../../../1st-gen/packages/illustrated-message/src/IllustratedMessage.ts)
**Version:** `@spectrum-web-components/illustrated-message@1.11.2`
**Custom element tag:** `sp-illustrated-message`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `heading` | `string` | `''` | `heading` | Fallback text if heading slot is empty |
| `description` | `string` | `''` | `description` | Fallback text if description slot is empty |

### Methods

None (component is purely presentational).

### Events

None dispatched.

### Slots

| Slot | Content | Notes |
|---|---|---|
| *(default)* | SVG illustration | No content type restriction; CSS enforces `width: 100%` on `svg[viewBox]` via `::slotted` |
| `heading` | Heading text / markup | Rendered inside a hard-coded `<h2>` shadow element |
| `description` | Body text | Rendered inside a `<div>` with `spectrum-Body spectrum-Body--sizeS` classes |

### CSS custom properties

The 1st-gen component imports `spectrum-illustratedmessage.css` (Spectrum 1 tokens) and `illustratedmessage-overrides.css`. No `--mod-*` custom properties are exposed for consumers in this generation.

### Shadow DOM output (rendered HTML)

```html
<div id="illustration"><slot></slot></div>
<h2 id="heading" class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light">
  <slot name="heading">${heading}</slot>
</h2>
<div id="description" class="spectrum-Body spectrum-Body--sizeS">
  <slot name="description">${description}</slot>
</div>
```

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| `@spectrum-web-components/base` | `1.11.2` | `SpectrumElement`, `html`, `property` decorator |
| `@spectrum-web-components/styles` | `1.11.2` | `bodyStyles`, `headingStyles` (applied via `static get styles()`) |

No mixins, no shared utilities, no other SWC components composed inside.

**Downstream consumers to be aware of:**
- The component is used inside SWC's own dropzone stories (test SVG imported from `dropzone`).
- Any consumer using `heading` or `description` slots that happens to slot `<h2>`–`<h6>` tags would be relying on undefined behavior.

---

## Breaking changes

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Migration path for consumers |
|---|---|---|---|---|
| **B1** | Heading element is always `<h2>` | Hard-coded `<h2>` in shadow DOM, no way to change level | `heading-level` attribute (`2`–`6`, default `2`) controls which heading tag renders | Consumers using the default need no change; consumers that need a different level must add `heading-level` |
| **B2** | Heading slot content type | Accepts any node; implicitly nested inside `<h2>` | Accepts `span` only (single root `span`); shadow DOM owns the heading tag | Consumers that slot phrasing content with no heading tags need no change; any who slotted heading elements must switch to `span` |
| **B3** | Size variants | No size API; fixed Spectrum 1 sizing via CSS | `size` attribute (`s` \| `l`) — new t-shirt sizing from Spectrum 2 | Consumers must add `size` if they need non-default sizing |
| **B4** | Horizontal layout | Not supported | `horizontal` boolean attribute applies `.spectrum-IllustratedMessage--horizontal` | Net-new capability; no consumer breakage, but docs must call this out |
| **B5** | Actions slot | Not supported | New `actions` slot for button group content | Net-new capability |
| **B6** | Content wrapper in shadow DOM | No content wrapper | `.spectrum-IllustratedMessage-content` wraps heading + description + actions | Any CSS selectors targeting shadow internals by id (`#heading`, `#description`) will break (shadow parts not stable API, but noting it) |
| **B7** | CSS custom properties | None exposed | Full `--mod-illustrated-message-*` set from Spectrum 2 CSS | Consumers using workaround custom properties/overrides will need to remap |
| **B8** | Styles dependency removed | `@spectrum-web-components/styles` (bodyStyles, headingStyles) | Spectrum 2 CSS via component-scoped tokens; no `spectrum-Heading`/`spectrum-Body` classes | Internal only; no consumer impact unless they depended on shared class names leaking |

---

## 2nd-gen API decisions

These are derived from the a11y analysis and rendering roadmap. Confirm each during team review.

### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `heading` | `string` | `''` | `heading` | Carry forward; rendered as text inside shadow heading |
| `description` | `string` | `''` | `description` | Carry forward |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | `heading-level` | **New.** Values outside `2`–`6` clamped to nearest valid (e.g. `1` → `2`, `7` → `6`) |
| `size` | `'s' \| 'l'` | `'l'` | `size` | **New.** Drives `--sizeS` / `--sizeL` modifier class |
| `horizontal` | `boolean` | `false` | `horizontal` | **New.** Drives `--horizontal` modifier class |

### Slots (2nd-gen)

| Slot | Content | Notes |
|---|---|---|
| *(default)* | Decorative or informative SVG | Decorative SVGs should have `aria-hidden="true"`; informative need `role="img"` + `aria-label` |
| `heading` | Single `<span>` | Restriction is semantic contract; dev-mode warning for non-`span` root nodes |
| `description` | Phrasing content | Links must be real `<a>` or link components with visible names |
| `actions` | **New.** Button group | Slotted buttons follow button/action-group labeling; order matches visual reading order |

### CSS custom properties (2nd-gen)

Full `--mod-illustrated-message-*` set from Spectrum 2 CSS. Passthrough: `--mod-buttongroup-justify-content`.

See [rendering-and-styling-migration-analysis.md](./rendering-and-styling-migration-analysis.md) for the complete list.

---

## Architecture: core vs SWC split

Following the badge reference pattern:

| Layer | Path | Contains |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/illustrated-message/` | `IllustratedMessage.base.ts` — abstract base class, `headingLevel` + `size` + `horizontal` properties, slot validation logic, `window.__swc.warn()` for dev-mode type checking. `IllustratedMessage.types.ts` — const arrays + derived types (`ILLUSTRATED_MESSAGE_VALID_SIZES`, `IllustratedMessageSize`, etc.) |
| **SWC** | `2nd-gen/packages/swc/components/illustrated-message/` | `IllustratedMessage.ts` — extends base, renders S2 shadow DOM, static overrides (`VALID_SIZES`). `illustrated-message.css` — S2 CSS from spectrum-css `spectrum-two` branch, tokens via `token(...)`. Registration, stories, tests. |

**Mixins to apply:** `SizedMixin` (for `size`); consider `ObserveSlotPresence` for `actions` slot detection if actions affect layout.

---

## Migration checklist

### Phase 1 — Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Phase 2 — Setup

- [ ] Create `2nd-gen/packages/core/components/illustrated-message/`
- [ ] Create `2nd-gen/packages/swc/components/illustrated-message/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### Phase 3 — API

- [ ] `IllustratedMessage.types.ts`: `ILLUSTRATED_MESSAGE_VALID_SIZES`, `ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS`, derived types
- [ ] `IllustratedMessage.base.ts`: abstract class with `headingLevel`, `size`, `horizontal`, `heading`, `description` properties; `getHeadingLevel()` clamping helper; `window.__swc?.DEBUG` warnings for invalid `heading-level` and heading-slot content type
- [ ] `IllustratedMessage.ts` (SWC): extends base, static `VALID_SIZES`, S2 rendering

### Phase 4 — Styling

- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch into `illustrated-message.css`
- [ ] Replace hard-coded values with `token(...)` calls
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`)

### Phase 5 — Accessibility

- [ ] Shadow heading renders correct tag (`h2`–`h6`) driven by `heading-level`
- [ ] `heading-level="1"` (and values < 2 or > 6) clamp to valid range — never renders `<h1>`
- [ ] Dev-mode `__swc.warn()` for invalid `heading-level` values
- [ ] Dev-mode `__swc.warn()` if heading slot root is not a `span`
- [ ] `aria-hidden="true"` guidance documented for decorative illustrations (slot contract, not enforced by component)
- [ ] Actions slot button labels documented

### Phase 6 — Testing

- [ ] `test/illustrated-message.test.ts`: heading tag matches `heading-level`; default is `h2`; `heading-level="1"` does not produce `<h1>`; `size` and `horizontal` attribute reflection
- [ ] `test/illustrated-message.a11y.spec.ts`: Playwright `toMatchAriaSnapshot` with default story; `heading-level` variants `2`–`5`; no `h1` stories
- [ ] Storybook stories include: default, size `s` / `l`, horizontal, custom `heading-level`, with actions
- [ ] VRT story (`illustrated-message.test-vrt.ts` equivalent)

### Phase 7 — Documentation

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook argTypes driven by `ILLUSTRATED_MESSAGE_VALID_SIZES` and `ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS` static arrays
- [ ] Migration notes: `heading-level` replaces hard-coded `h2`; heading slot now `span`-only; new `size`, `horizontal`, `actions` slot
- [ ] Storybook examples vary `heading-level` by context (not always `2`)
- [ ] Decorative vs meaningful illustration guidance in Storybook

### Phase 8 — Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing SWC-1834
- [ ] Peer engineer sign-off

---

## Blockers and open questions

| # | Item | Status | Owner |
|---|---|---|---|
| **Q1** | **`heading` attribute + `heading` slot precedence:** When both are present, which wins? Carry-forward behavior from 1st-gen (slot content shows, attribute is fallback) or explicit documented override? | Open | Needs product/design input |
| **Q2** | **`heading-level` clamping vs type-error:** Should out-of-range values silently clamp (e.g. `1` → `2`, `7` → `6`) or should TypeScript types restrict to `2`–`6` and only the runtime warning fire? The a11y doc says "clamp or coerce"; the types approach from accordion (`getHeadingLevel()`) uses a helper. Pick one policy. | Open | Team decision |
| **Q3** | **`SizedMixin` default size:** The rendering/styling analysis lists `sizeL` as the default in Spectrum 2. Confirm the default `size` value before implementing `SizedMixin` (it may need `noDefaultSize: false` with default `'l'`). | Open | Confirm against spectrum-css |
| **Q4** | **Actions slot vs `sp-action-group`:** Should the `actions` slot be untyped (accept any content) or require `sp-action-group`? Spec shows a `spectrum-ButtonGroup` wrapper — does SWC compose `sp-action-group` internally or does the consumer slot it? | Open | Needs design/arch input |
| **Q5** | **`spectrum-css` availability:** The `spectrum-two` branch CSS for illustrated-message must be confirmed available locally before Phase 4 can begin. ([CSS migration PR #3246](https://github.com/adobe/spectrum-css/pull/3246)) | Verify | Assignee |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [1st-gen source](../../../../1st-gen/packages/illustrated-message/src/IllustratedMessage.ts)
- [1st-gen tests](../../../../1st-gen/packages/illustrated-message/test/illustrated-message.test.ts)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [spectrum-css migration PR #3246](https://github.com/adobe/spectrum-css/pull/3246)
- SWC-1834 (this ticket), SWC-1466 (accordion heading level — analogous precedent)
