---
component: progress-circle
tag: swc-progress-circle
package: '@adobe/spectrum-wc/progress-circle'
status: preview
since: 0.0.1
sizes: [s, m, l]
default_size: m
boolean_attributes: [indeterminate]
number_attributes:
  progress: '0..100'
string_attributes:
  label: accessible label string
enum_attributes:
  static-color: [white, black]
slots:
  - name: ''
    accepts: text
    description: accessible label fallback when `label` attribute is not set
events: []
methods: []
peer_components: [overlay-trigger]
not_for: [linear-progress, file-upload-byte-progress-bars]
---

## When to use

- Loading or progress indication when total progress is known (`progress`) OR unknown (`indeterminate`).
- Inline pending state inside cards, dialogs, buttons (composed externally).

## When NOT to use

- For linear progress bars → use the dedicated linear-progress component (when migrated).
- For file-upload byte progress with detailed labels → consider a richer progress component; progress-circle is purely visual.
- For static "loading…" placeholders → consider `swc-skeleton` or similar.

## Canonical import

```js
import '@adobe/spectrum-wc/progress-circle';
```

## Minimal correct examples

```html
<!-- Determinate progress with accessible label -->
<swc-progress-circle
  progress="42"
  label="Uploading document"
></swc-progress-circle>

<!-- Indeterminate (unknown total) -->
<swc-progress-circle indeterminate label="Loading"></swc-progress-circle>

<!-- Slot fallback for label -->
<swc-progress-circle indeterminate>Loading</swc-progress-circle>

<!-- Static color over dark background -->
<swc-progress-circle
  indeterminate
  label="Loading"
  static-color="white"
></swc-progress-circle>

<!-- Sizes -->
<swc-progress-circle
  size="s"
  indeterminate
  label="Loading"
></swc-progress-circle>
<swc-progress-circle
  size="m"
  indeterminate
  label="Loading"
></swc-progress-circle>
<swc-progress-circle
  size="l"
  indeterminate
  label="Loading"
></swc-progress-circle>
```

## Accessibility contract

- The component sets: `role="progressbar"` semantics implicitly, `aria-valuenow` reflecting current `progress`.
- The consumer MUST provide either:
  - the `label` attribute (preferred), OR
  - text content in the default slot.
- An unlabeled progress-circle is inaccessible.
- For indeterminate state, the label is still required — describe what is loading (`Uploading document`, not `Loading`).
- The animation respects `prefers-reduced-motion`.

## Composition rules

- **Pairs with**: pending-state buttons, file-upload cards, dialog body, form-submission states.
- **Combine with**: status text near the indicator (e.g., "Uploading… 42%") — read alongside via `aria-describedby` if needed.
- **Conflicts with**: stacking two progress indicators on the same task.

## Runtime constraints

- `progress` accepts numbers from 0 to 100. Out-of-range values are not validated at runtime; clamp upstream.
- `indeterminate` and `progress` are not mutually exclusive at the type level, but in practice `indeterminate` overrides the visual progress fill.
- `static-color` valid values: `white`, `black`. S1 supports only `white`; S2 adds `black`.

## Common LLM mistakes

- ❌ Omitting `label` and the default slot — leaves the progress indicator unlabeled.
- ❌ Using `value` instead of `progress` — the property is `progress`.
- ❌ Using percentage strings like `progress="42%"` — `progress` is a number 0-100, not a CSS percentage.
- ❌ `<swc-progress-circle progress="0.42">` for 42% — the scale is 0-100, not 0-1.
- ❌ Setting both `progress="50"` and `indeterminate` and expecting both to render — `indeterminate` wins visually.
- ❌ Using `static-color="black"` against a 1st-gen `<sp-progress-circle>` — `black` is S2-only.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-progress-circle`)                  | S2 (`swc-progress-circle`)           |
| ---------------------- | ------------------------------------------ | ------------------------------------ |
| Tag                    | `sp-progress-circle`                       | `swc-progress-circle`                |
| Package                | `@spectrum-web-components/progress-circle` | `@adobe/spectrum-wc/progress-circle` |
| `static-color`         | `white` only                               | `white`, `black`                     |
| Custom-property prefix | `--mod-progresscircle-*`                   | `--swc-progress-circle-*`            |
