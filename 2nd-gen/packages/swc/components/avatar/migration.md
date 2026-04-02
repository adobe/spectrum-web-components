# Avatar migration guide: `sp-avatar` → `swc-avatar`

This guide covers everything you need to move from the 1st-gen `sp-avatar` component
(`@spectrum-web-components/avatar`) to the 2nd-gen `swc-avatar` component
(`@adobe/spectrum-wc/avatar`).

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/avatar

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/avatar/sp-avatar.js';

// After
import '@adobe/spectrum-wc/avatar';
```

---

## Quick reference

| What changed          | Before (1st-gen)       | After (2nd-gen)                                                        |
| --------------------- | ---------------------- | ---------------------------------------------------------------------- |
| Tag name              | `sp-avatar`            | `swc-avatar`                                                           |
| Alt text attribute    | `label="Jane Doe"`     | `alt="Jane Doe"`                                                       |
| Decorative pattern    | `is-decorative`        | `alt=""`                                                               |
| Linked variant        | `href="..."` supported | Not supported — see [Linked variant removed](#linked-variant-removed)  |
| Disabled state        | `disabled` supported   | Not supported — not in S2 spec                                         |
| Default size          | `100` (20 px)          | `500` (40 px)                                                          |
| Available sizes       | `50`–`700`             | `50`–`1500`                                                            |
| CSS custom properties | `--mod-avatar-*`       | `--swc-avatar-*` — see [CSS custom properties](#css-custom-properties) |

---

## Breaking changes

### Tag name

Find and replace all instances of `sp-avatar` with `swc-avatar` in your templates and HTML.

```html
<!-- Before -->
<sp-avatar src="/img/user.jpg" label="Jane Doe"></sp-avatar>

<!-- After -->
<swc-avatar src="/img/user.jpg" alt="Jane Doe"></swc-avatar>
```

---

### `label` → `alt`

The `label` attribute has been renamed to `alt`. It maps directly to the `alt`
attribute on the underlying `<img>` element, following standard HTML semantics.

```html
<!-- Before -->
<sp-avatar src="/img/user.jpg" label="Jane Doe"></sp-avatar>

<!-- After -->
<swc-avatar src="/img/user.jpg" alt="Jane Doe"></swc-avatar>
```

> **Note:** `label` still works in 2nd-gen as a compatibility shim but emits a
> deprecation warning in DEBUG mode. Migrate to `alt` as soon as possible — the
> shim will be removed in a future release.

---

### `is-decorative` → `alt=""`

The `is-decorative` attribute has been removed. To mark an avatar as decorative,
pass `alt=""`. This aligns with standard HTML `<img>` semantics and lets assistive
technology consistently treat the image as decorative.

```html
<!-- Before -->
<sp-avatar is-decorative src="/img/user.jpg"></sp-avatar>

<!-- After -->
<swc-avatar alt="" src="/img/user.jpg"></swc-avatar>
```

When `alt=""` is set, `swc-avatar` automatically adds `aria-hidden="true"` to the
host element, hiding it entirely from the accessibility tree.

---

### Linked variant removed

The `href` attribute and all related link properties (`target`, `rel`, `download`,
`referrerpolicy`, `type`) are not supported in 2nd-gen. The linked avatar variant
is not part of the Spectrum 2 spec.

```html
<!-- Before -->
<sp-avatar
  href="https://example.com/profile"
  label="Jane Doe"
  src="/img/user.jpg"
></sp-avatar>
```

**After:** Wrap `swc-avatar` in a standard `<a>` element.

```html
<!-- After -->
<a href="https://example.com/profile">
  <swc-avatar alt="Jane Doe" src="/img/user.jpg"></swc-avatar>
</a>
```

> **Accessibility:** When wrapping in `<a>`, the `alt` text on `swc-avatar`
> becomes the accessible name of the link. Always provide a meaningful `alt`
> value — `alt=""` (decorative) is not valid on a linked avatar because the link
> would have no accessible name, violating WCAG 2.4.4.

---

### Disabled state removed

The `disabled` attribute is not supported in 2nd-gen. The Spectrum 2 avatar spec
does not include a disabled state.

```html
<!-- Before — linked + disabled, renders as static image -->
<sp-avatar
  disabled
  href="https://example.com/profile"
  label="Jane Doe"
  src="/img/user.jpg"
></sp-avatar>
```

If you need to prevent a wrapped link from being interactive, use standard HTML
techniques (remove the `href`, use `pointer-events: none`, or manage focus
programmatically).

---

### Default size changed

The default size changed from `100` (20 px) to `500` (40 px) to match the
Spectrum 2 specification.

If you relied on the implicit default, set `size="100"` explicitly to preserve
the previous appearance:

```html
<!-- Before: renders at 20 px -->
<sp-avatar label="Jane Doe" src="/img/user.jpg"></sp-avatar>

<!-- After: same 20 px size, now explicit -->
<swc-avatar alt="Jane Doe" src="/img/user.jpg" size="100"></swc-avatar>
```

---

### Size scale extended

The available size values have been extended from `50`–`700` to `50`–`1500`.
Existing sizes are unchanged. Eight new larger sizes have been added:
`800`, `900`, `1000`, `1100`, `1200`, `1300`, `1400`, `1500`.

---

### CSS custom properties

All `--mod-avatar-*` custom properties have been removed. Replace them with the
explicit 2nd-gen equivalents:

| Removed (1st-gen)           | Replacement (2nd-gen)       |
| --------------------------- | --------------------------- |
| `--mod-avatar-size`         | `--swc-avatar-size`         |
| `--mod-avatar-border-color` | `--swc-avatar-border-color` |
| `--mod-avatar-border-width` | `--swc-avatar-border-width` |

```css
/* Before */
sp-avatar {
  --mod-avatar-size: 48px;
}

/* After */
swc-avatar {
  --swc-avatar-size: 48px;
}
```

---

### Shadow DOM structure

The internal shadow DOM structure has changed. If you target shadow internals
with `::part()` or `:host` selectors, update them accordingly.

| 1st-gen                         | 2nd-gen                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| `<img>` directly in shadow root | `<div class="swc-Avatar"><img class="swc-Avatar-image"></div>` |

> Note: Accessing shadow internals via class selectors (`.swc-Avatar`,
> `.swc-Avatar-image`) is not a public API and may change without notice. Use
> the exposed CSS custom properties instead.

---

## New in 2nd-gen

### `over-background`

A new `over-background` boolean attribute renders a solid outline around the
avatar image, keeping it visually distinct when placed on a background that shares
the same color as the image border.

```html
<swc-avatar alt="Jane Doe" src="/img/user.jpg" over-background></swc-avatar>
```

The outline uses `--swc-avatar-border-width` (currently 1 px) for sizes 50–900
and a hardcoded 2 px for sizes 1000–1500, matching the Spectrum 2 specification.

---

## Accessibility

- Always provide `alt` with a meaningful description of the person or entity shown.
- Use `alt=""` only when the person's name already appears in surrounding text.
- Never use `alt=""` on a linked avatar (wrapped in `<a>`).
- `swc-avatar` is not focusable on its own. Keyboard accessibility for linked
  avatars is provided by the wrapping `<a>` element.
