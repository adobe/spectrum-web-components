---
component: badge
tag: swc-badge
package: '@adobe/spectrum-wc/badge'
status: preview
since: 0.0.1
sizes: [s, m, l, xl]
default_size: m
variants:
  semantic: [accent, informative, neutral, positive, notice, negative]
  color:
    [
      fuchsia,
      indigo,
      magenta,
      purple,
      seafoam,
      yellow,
      gray,
      red,
      orange,
      chartreuse,
      celery,
      green,
      cyan,
      blue,
      pink,
      turquoise,
      brown,
      cinnamon,
      silver,
    ]
default_variant: informative
boolean_attributes: [subtle, outline]
enum_attributes:
  fixed: [block-start, block-end, inline-start, inline-end]
slots:
  - name: ''
    accepts: text
    required_when: 'aria-label is not set on host'
    description: text label of the badge
  - name: icon
    accepts: 'swc-icon-* | sp-icon-*'
    required: false
    description: optional icon rendered before the label
events: []
methods: []
peer_components: [overlay-trigger, sp-tooltip, swc-icon-*]
not_for: [interactive-actions, filter-chips, decorative-color-swatches]
---

## When to use

- Status, category, or supplementary metadata pinned to another element.
- Replaces a status-light when you also want a text label.
- Shows count, version, or environment markers (e.g., `Beta`, `v1.2.10`).

## When NOT to use

- For interactive actions → use `button` or `action-button`.
- For filterable chips → use `tag` (1st-gen) or its 2nd-gen equivalent when migrated.
- For purely decorative color swatches → use plain CSS.
- For pure status indicators without text → use `swc-status-light`.

## Canonical import

```js
import '@adobe/spectrum-wc/badge';
```

For the base class as a type or for extension:

```ts
import { Badge } from '@adobe/spectrum-wc/badge';
```

## Minimal correct examples

```html
<!-- Semantic status with text -->
<swc-badge variant="positive">Approved</swc-badge>

<!-- Icon + label -->
<swc-badge variant="informative">
  <swc-icon-checkmark slot="icon"></swc-icon-checkmark>
  Active
</swc-badge>

<!-- Icon-only — aria-label MANDATORY -->
<swc-badge variant="informative" aria-label="Active">
  <swc-icon-checkmark slot="icon"></swc-icon-checkmark>
</swc-badge>

<!-- Outline (semantic only) -->
<swc-badge variant="negative" outline>Rejected</swc-badge>

<!-- Subtle (works on any variant) -->
<swc-badge variant="cyan" subtle>Analytics</swc-badge>

<!-- Fixed positioning (visual only — apply CSS position separately) -->
<swc-badge fixed="block-end">Live</swc-badge>
```

## Accessibility contract

- The component sets: nothing on the host. Badges are non-interactive and non-focusable. No implicit `role`.
- The consumer MUST provide:
  - text in the default slot, OR
  - `aria-label` on the host element when only an icon slot is present.
- Tooltip content does NOT satisfy the labeling requirement — `aria-label` is still required.
- Color is never the only signal — semantic variant intent is conveyed via accompanying text or icon.
- Avoid wrapping interactive elements inside a badge.

## Composition rules

- **Pairs with**: `overlay-trigger` + `sp-tooltip` for icon-only badges where the icon's meaning is not obvious.
- **Pairs with**: any `swc-icon-*` component in the `icon` slot.
- **Conflicts with**: nesting interactive elements (links, buttons) — badge is non-interactive by design.
- **Sibling component**: `swc-status-light` for text-less status indicators.

## Runtime constraints

- `outline` is honored only when `variant` is one of the 6 semantic variants. Otherwise the component logs a debug warning. (Source: `core/components/badge/Badge.base.ts:163-177`.)
- Invalid `variant` values log a debug warning at runtime but do not throw. (Source: `core/components/badge/Badge.base.ts:152-161`.)
- Long labels wrap automatically. To force wrapping or truncation, apply `max-inline-size` via CSS.

## Common LLM mistakes

- ❌ `<swc-badge variant="success">` — there is no `success` variant. Use `positive`.
- ❌ `<swc-badge variant="error">` — there is no `error` variant. Use `negative`.
- ❌ `<swc-badge variant="warning">` — there is no `warning` variant. Use `notice`.
- ❌ `outline` + a color variant like `<swc-badge variant="seafoam" outline>` — `outline` is semantic-only.
- ❌ Importing from `@spectrum-web-components/badge` while using `<swc-badge>` (mismatched gen). Pick one.
- ❌ Icon-only badge without `aria-label`.
- ❌ Adding click handlers — badges are non-interactive. Use a button or link.
- ❌ Using `fixed` and expecting the badge to physically position itself — `fixed` only adjusts border radius. Apply `position: absolute` + offsets via CSS.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-badge`)                  | S2 (`swc-badge`)                                              |
| ---------------------- | -------------------------------- | ------------------------------------------------------------- |
| Tag                    | `sp-badge`                       | `swc-badge`                                                   |
| Package                | `@spectrum-web-components/badge` | `@adobe/spectrum-wc/badge`                                    |
| `subtle` attribute     | not present                      | added (any variant)                                           |
| `outline` attribute    | not present                      | added (semantic variants only)                                |
| Color variants         | 14                               | 19 (added `pink`, `turquoise`, `brown`, `cinnamon`, `silver`) |
| Custom-property prefix | `--mod-badge-*`                  | `--swc-badge-*`                                               |

See [`consumer-migration-guide.mdx`](./consumer-migration-guide.mdx) for the full upgrade guide.
