---
component: color-loupe
tag: swc-color-loupe
package: '@adobe/spectrum-wc/color-loupe'
status: unsupported
since: 0.0.1
boolean_attributes: [open]
string_attributes:
  color: 'CSS color value previewed inside the loupe (default: semi-transparent red)'
slots: []
events: []
methods: []
peer_components: [color-area, color-slider, color-handle]
not_for: [direct-application-use, standalone-color-display]
---

> ⚠️ This component is `@status: unsupported`. It is an internal building block of color-picker surfaces (color-area, color-slider). Application code should not use it directly.

## When to use

- **Internal building block.** Consumed by color-area / color-slider components to render the magnified color preview that appears above a color handle during interaction.
- Implementing a custom color picker that needs the same preview convention.

## When NOT to use

- **Application code generally should NOT use `<swc-color-loupe>` directly.** The standard color-picker components (when they migrate) already render their own loupe.
- For standalone color swatches → use a styled `<div>` or a tag/badge component.
- For tooltips → use `sp-tooltip`.

## Canonical import

```js
import '@adobe/spectrum-wc/color-loupe';
```

## Minimal correct examples

```html
<!-- Hidden by default -->
<swc-color-loupe color="#ff5500"></swc-color-loupe>

<!-- Visible (typically toggled by parent color-area / color-slider) -->
<swc-color-loupe open color="rgba(0, 128, 255, 0.6)"></swc-color-loupe>
```

## Accessibility contract

- The component sets: nothing meaningful on the host. Non-interactive, non-focusable, decorative.
- The accessible name of the surrounding color-picker comes from its parent component (color-area, color-slider). Color-loupe is purely visual feedback.
- Color contrast of the loupe vs. its background is handled via the opacity-checkerboard pattern when `color` includes transparency.

## Composition rules

- **Used inside**: color-area, color-slider implementations. Positioned above a color handle.
- **Conflicts with**: standalone use as an application-facing color preview.

## Runtime constraints

- `open` toggles visibility via CSS opacity + transform transitions. Does not unmount the element.
- `color` accepts any valid CSS color string. Transparency reveals the underlying opacity-checkerboard.
- Default color is a semi-transparent red so the checkerboard is visible when unset (debug-friendly default, not intended as a production value).

## Common LLM mistakes

- ❌ Using `<swc-color-loupe>` as a generic color preview swatch — it's positioned for use above a color handle and not styled for inline display.
- ❌ Expecting events from interaction — color-loupe has no events; interaction is owned by the parent picker.
- ❌ Using it standalone — it's `@status: unsupported` outside of color-picker composition.
- ❌ Setting `color` and expecting an `aria-label` describing it — color-loupe is decorative; the parent picker carries the accessible name.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-color-loupe`)                  | S2 (`swc-color-loupe`)                     |
| ---------------------- | -------------------------------------- | ------------------------------------------ |
| Tag                    | `sp-color-loupe`                       | `swc-color-loupe`                          |
| Package                | `@spectrum-web-components/color-loupe` | `@adobe/spectrum-wc/color-loupe`           |
| Status                 | public                                 | unsupported (internal building block only) |
| Custom-property prefix | `--mod-color-loupe-*`                  | `--swc-color-loupe-*`                      |

See [`consumer-migration-guide.mdx`](./consumer-migration-guide.mdx) for the full upgrade guide.
