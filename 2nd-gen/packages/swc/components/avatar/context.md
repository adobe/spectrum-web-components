---
component: avatar
tag: swc-avatar
package: '@adobe/spectrum-wc/avatar'
status: preview
since: 0.0.1
sizes:
  [
    50,
    75,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
  ]
default_size: 500
boolean_attributes: [outline, disabled, decorative]
string_attributes:
  src: URL of the profile image
  alt: text description of the avatar image (accessible name when not decorative)
slots: []
events: []
methods: []
peer_components: [swc-badge, swc-status-light]
not_for: [generic-image-thumbnails, file-icons]
---

## When to use

- Represent a person, account, or entity via a circular profile image.
- Inline next to user names, comments, presence indicators.

## When NOT to use

- For generic image thumbnails (non-person) → use `swc-asset` with a slotted `<img>`.
- For file/folder icons → use `swc-asset` with `variant="file"` / `variant="folder"`.
- For decorative graphics → use a plain `<img>` with `aria-hidden="true"`.

## Canonical import

```js
import '@adobe/spectrum-wc/avatar';
```

## Minimal correct examples

```html
<!-- Standard avatar with accessible name -->
<swc-avatar src="https://example.com/jane.jpg" alt="Jane Doe"></swc-avatar>

<!-- Specific size (numeric scale) -->
<swc-avatar
  src="https://example.com/jane.jpg"
  alt="Jane Doe"
  size="700"
></swc-avatar>

<!-- Disabled (reduced opacity for inactive accounts) -->
<swc-avatar
  src="https://example.com/jane.jpg"
  alt="Jane Doe (inactive)"
  disabled
></swc-avatar>

<!-- Outlined -->
<swc-avatar
  src="https://example.com/jane.jpg"
  alt="Jane Doe"
  outline
></swc-avatar>

<!-- Decorative (hidden from AT — use only when name is conveyed elsewhere) -->
<swc-avatar src="https://example.com/jane.jpg" decorative></swc-avatar>
```

## Accessibility contract

- The component sets: appropriate ARIA based on `alt` and `decorative`.
  - When `decorative` is true → host is hidden from assistive tech.
  - Otherwise → `alt` is used as the accessible name.
- The consumer MUST provide:
  - `alt` describing the person/entity, OR
  - `decorative` when the surrounding context already names the entity (e.g., the user's name appears next to the avatar).
- Never leave both `alt` empty AND `decorative` unset.
- The `disabled` state is purely visual (reduced opacity); it does not change ARIA semantics.

## Composition rules

- **Pairs with**: user-name labels, presence indicators (status-light), notification badges (badge positioned absolutely).
- **Conflicts with**: nesting interactive elements inside avatar (no slot, no children).
- For interactive avatars (clickable user pickers), wrap in a button or link.

## Runtime constraints

- `size` accepts only the documented numeric scale (50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500). Invalid sizes fall back to the default (500).
- `src` is a plain image URL. CORS / load failures are not surfaced via events; the underlying `<img>` will display its broken-image fallback.
- `decorative` overrides AT visibility regardless of `alt` value.

## Common LLM mistakes

- ❌ Using t-shirt sizes like `size="m"` — avatar uses numeric sizes (50–1500). Default is 500.
- ❌ `<swc-avatar src="..." />` with no `alt` and no `decorative` — leaves it unlabeled.
- ❌ Setting `alt` AND `decorative` together — `decorative` wins; `alt` is ignored.
- ❌ Treating `disabled` as interactive state — it's a visual modifier only; no interaction is blocked because the component isn't interactive in the first place.
- ❌ Slotting children — avatar accepts no slots.
- ❌ Using `<swc-avatar>` for a file thumbnail — use `swc-asset`.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-avatar`)                  | S2 (`swc-avatar`)           |
| ---------------------- | --------------------------------- | --------------------------- |
| Tag                    | `sp-avatar`                       | `swc-avatar`                |
| Package                | `@spectrum-web-components/avatar` | `@adobe/spectrum-wc/avatar` |
| Custom-property prefix | `--mod-avatar-*`                  | `--swc-avatar-*`            |

See [`migration.md`](./migration.md) for additional avatar-specific migration notes.
