---
component: icon
tag: swc-icon
package: '@adobe/spectrum-wc/icon'
status: internal
since: 0.0.1
sizes: [xs, s, m, l, xl]
default_size: m
string_attributes:
  label: accessible label for the icon (use empty string or omit for decorative)
boolean_attributes: []
slots:
  - name: ''
    accepts: 'SVG element (custom or inline)'
    description: SVG content rendered as the icon visual
events: []
methods: []
peer_components: [swc-badge, swc-status-light, swc-button]
not_for: [direct-application-use, icon-libraries]
---

## When to use

- **Internal building block.** `swc-icon` is the base wrapper used by other components (badge, button, status-light) to render their icon slot content with consistent sizing.
- Implementing a new SWC component that needs to expose an icon slot.

## When NOT to use

- **Application code generally should NOT use `<swc-icon>` directly.** Use the dedicated `swc-icon-*` element wrappers (e.g., `swc-icon-checkmark`, `swc-icon-edit`) or inline SVGs slotted into a parent component instead.
- For decorative icons inside text — use inline SVG with `aria-hidden="true"`.
- For icon libraries — consume the per-icon `swc-icon-{name}` exports.

> ⚠️ This component has `@status: internal`. Public API stability is not guaranteed.

## Canonical import

```js
import '@adobe/spectrum-wc/icon';
```

## Minimal correct examples

```html
<!-- Decorative icon (no label, no announcement) -->
<swc-icon size="m">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="..." />
  </svg>
</swc-icon>

<!-- Labeled icon (announced by AT) -->
<swc-icon size="s" label="Edit document">
  <svg viewBox="0 0 24 24"><path d="..." /></svg>
</swc-icon>

<!-- Inside another component's icon slot -->
<swc-badge variant="positive">
  <swc-icon slot="icon" label="">
    <svg viewBox="0 0 24 24"><path d="..." /></svg>
  </swc-icon>
  Approved
</swc-badge>
```

## Accessibility contract

- The component sets: appropriate ARIA based on `label`. Without `label`, the icon is treated as decorative.
- The consumer MUST provide:
  - `label` attribute when the icon carries meaning that text doesn't already convey, OR
  - empty `label=""` (or omit) for decorative use.
- Inline SVGs slotted should include `aria-hidden="true"` to prevent double-announcement when wrapped by `<swc-icon label="...">`.

## Composition rules

- **Used inside**: `swc-badge`'s `icon` slot, `swc-button`'s `icon` slot, similar component icon slots.
- **Pairs with**: any inline SVG.
- **Conflicts with**: rendering text content as a child — only SVG content is supported.

## Runtime constraints

- `size` t-shirt scale: `xs`, `s`, `m`, `l`, `xl`. Other values are not validated at runtime but produce no styling.
- The slotted SVG should have a viewBox; without one, sizing falls back to intrinsic SVG dimensions.

## Common LLM mistakes

- ❌ Using `<swc-icon>` in product app code instead of `<swc-icon-checkmark>` (or whichever icon-specific element exists).
- ❌ Passing the icon name as an attribute like `<swc-icon name="checkmark">` — `swc-icon` accepts an SVG via slot, not a string ID.
- ❌ Adding both an outer `label` and inner SVG `<title>` element — pick one labeling mechanism.
- ❌ Forgetting `aria-hidden="true"` on the slotted SVG when the outer `<swc-icon>` has a label — causes duplicate announcements.
- ❌ Treating this as a stable public API — `@status: internal`.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-icon`)                  | S2 (`swc-icon`)                   |
| ---------------------- | ------------------------------- | --------------------------------- |
| Tag                    | `sp-icon`                       | `swc-icon`                        |
| Package                | `@spectrum-web-components/icon` | `@adobe/spectrum-wc/icon`         |
| Status                 | public                          | internal — direct use discouraged |
| Custom-property prefix | `--mod-icon-*`                  | `--swc-icon-*`                    |
