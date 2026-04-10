# Icon migration guide: `sp-icon` → `swc-icon`

This guide covers everything you need to move from the 1st-gen `sp-icon` component
(`@spectrum-web-components/icon`) to the 2nd-gen `swc-icon` component
(`@adobe/spectrum-wc/icon`).

> **Before you start:** The 2nd-gen icon component is architecturally simpler than
> 1st-gen. Named icon loading (via `name` + iconset registration) and image icon loading
> (via `src`) have both been removed. All icons are now provided as slotted SVG content.
> If your usage relied on either of those loading strategies, read the
> [named icons removed](#named-icons-removed-name-attribute) and
> [image icons removed](#image-icons-removed-src-attribute) sections carefully before migrating.

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/icon

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/icon/sp-icon.js';

// After
import '@adobe/spectrum-wc/icon';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/icon`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.

---

## Quick reference

| What changed          | Before (1st-gen)                        | After (2nd-gen)                                                              |
| --------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| Tag name              | `sp-icon`                               | `swc-icon`                                                                   |
| Package               | `@spectrum-web-components/icon`         | `@adobe/spectrum-wc`                                                         |
| `label` attribute     | `label="…"`                             | `label="…"` — unchanged                                                      |
| `size` attribute      | `xxs \| xs \| s \| m \| l \| xl \| xxl` | `xs \| s \| m \| l \| xl` — `xxs` and `xxl` removed                          |
| `name` attribute      | Named iconset lookup                    | **Removed** — see [Named icons removed](#named-icons-removed-name-attribute) |
| `src` attribute       | Image icon URL                          | **Removed** — see [Image icons removed](#image-icons-removed-src-attribute)  |
| Icon loading          | Name, src, or slotted SVG               | Slotted SVG only                                                             |
| `error` event         | Fired when `src` fails                  | **Removed** (no `src` support)                                               |
| CSS custom properties | `--mod-icon-*`                          | `--swc-icon-*`                                                               |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-icon` with `swc-icon` in your templates and HTML.

```html
<!-- Before -->
<sp-icon label="Search">
  <svg>…</svg>
</sp-icon>

<!-- After -->
<swc-icon label="Search">
  <svg>…</svg>
</swc-icon>
```

---

### Named icons removed (`name` attribute)

The `name` attribute and the iconset registry system have been removed. In 1st-gen,
you could register a named icon set and reference icons by name:

```html
<!-- Before — no longer works -->
<sp-icon name="ui:Arrow100"></sp-icon>
```

**After:** Icon factory functions are re-exported directly from `@adobe/spectrum-wc/icon`
(the same entry point used to register the element). Each factory returns a Lit
`TemplateResult` and must be used inside a `html\`\`` tagged template literal.

**Using Lit:**

```ts
import { Arrow100Icon } from '@adobe/spectrum-wc/icon';
import { html } from 'lit';

// Inside a Lit template:
html`
  <swc-icon label="Arrow">${Arrow100Icon()}</swc-icon>
`;
```

**Not using Lit:** Call the factory, convert the result to an SVG string, or simply
inline the SVG markup directly in the slot:

```html
<!-- Inline SVG — works in any framework or plain HTML -->
<swc-icon label="Arrow">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <path
      d="M9.60547 4.46973 6.3457 1.20996c-.29297-.29297-.76758-.29297-1.06055 0s-.29297.76758 0 1.06055l1.97949 1.97949H.9248c-.41406 0-.75.33594-.75.75s.33594.75.75.75h6.33984l-1.97949 1.97949c-.29297.29297-.29297.76758 0 1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3.25977-3.25977c.29297-.29297.29297-.76758 0-1.06055Z"
    />
  </svg>
</swc-icon>
```

The 2nd-gen icon catalog covers common UI icons. The full list of available factory
functions is in the `elements/` directory of the package source. If you need an icon
that isn't in the catalog, provide your own inline SVG in the slot — any valid SVG works.

If you were using iconsets from `@spectrum-web-components/icons-ui` or
`@spectrum-web-components/icons-workflow`, check whether the equivalent icon exists in
the 2nd-gen catalog. For icons not yet available, use inline SVG.

---

### Image icons removed (`src` attribute)

The `src` attribute and raster/SVG image loading have been removed. In 1st-gen, you
could load an icon from a URL:

```html
<!-- Before — no longer works -->
<sp-icon src="/icons/my-icon.svg" label="My icon"></sp-icon>
```

**After:** Inline the SVG or use an `<img>` element directly:

```html
<!-- Option 1: inline SVG in the default slot -->
<swc-icon label="My icon">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">…</svg>
</swc-icon>

<!-- Option 2: use a standalone <img> when an icon wrapper is not needed -->
<img src="/icons/my-icon.svg" alt="My icon" />
```

---

### `error` event removed

The `error` event that fired when an `src` URL failed to load has been removed along
with `src` support. Remove any `error` event listeners attached to `sp-icon` elements.

---

### Sizes `xxs` and `xxl` removed

The `xxs` and `xxl` size values are not available in 2nd-gen. If you used either, update
to the nearest available size:

| Removed value | Recommended replacement |
| ------------- | ----------------------- |
| `xxs`         | `xs`                    |
| `xxl`         | `xl`                    |

```html
<!-- Before -->
<sp-icon size="xxs"><svg>…</svg></sp-icon>
<sp-icon size="xxl"><svg>…</svg></sp-icon>

<!-- After -->
<swc-icon size="xs"><svg>…</svg></swc-icon>
<swc-icon size="xl"><svg>…</svg></swc-icon>
```

---

### CSS custom properties

All `--mod-icon-*` custom properties have been removed. Replace them with the
`--swc-icon-*` equivalents:

| Removed (1st-gen)        | Replacement (2nd-gen)                                |
| ------------------------ | ---------------------------------------------------- |
| `--mod-icon-inline-size` | `--swc-icon-inline-size`                             |
| `--mod-icon-block-size`  | `--swc-icon-block-size`                              |
| `--mod-icon-color`       | `--swc-icon-color`                                   |
| `--mod-icon-size`        | `--swc-icon-inline-size` and `--swc-icon-block-size` |

```css
/* Before */
sp-icon {
  --mod-icon-color: hotpink;
}

/* After */
swc-icon {
  --swc-icon-color: hotpink;
}
```

---

## Accessibility

- Always provide `label` with a meaningful description when the icon conveys information
  that is not available through surrounding text.
- When `label` is provided, `swc-icon` removes `aria-hidden` from the host and applies
  `aria-label` and `role="img"` directly to the slotted SVG element.
- When the icon is purely decorative (meaning is conveyed by adjacent text), omit
  `label`. The component sets `aria-hidden="true"` on the host by default.
- `swc-icon` is not focusable. If an icon needs to be interactive, wrap it in a
  `<button>` or `<a>` element with an accessible label.
