# Consumer migration guide: canonical template

Component authors copy this template when authoring a new `consumer-migration-guide.mdx` for a 2nd-gen component. The headings below are the structure that `swc-consumer-migration` knows how to parse. Keep them stable. Sentence case.

The authoritative location of a guide in source is:

```
2nd-gen/packages/swc/components/<component>/consumer-migration-guide.mdx
```

Use `.mdx` so it renders in Storybook. The skill also accepts `.md` as a fallback.

---

````mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="<Component>/Consumer migration guide" />

# <Component> consumer migration guide

One paragraph: what changed at a glance, and the smallest mental model the consumer needs to migrate.

## What changed

### Renamed

| Area             | Spectrum 1 (`sp-<component>`)                      | Spectrum 2 (`swc-<component>`)   |
| ---------------- | -------------------------------------------------- | -------------------------------- |
| Tag              | `sp-<component>`                                   | `swc-<component>`                |
| Import path      | `@spectrum-web-components/<component>`             | `@adobe/spectrum-wc/<component>` |
| CSS custom props | `--mod-<component>-*` / `--spectrum-<component>-*` | `--swc-<component>-*`            |

### Added in Spectrum 2

| Addition                     | Notes            |
| ---------------------------- | ---------------- |
| (new attribute / slot / API) | (when to use it) |

### Removed in Spectrum 2

| Removed       | Replacement                                      |
| ------------- | ------------------------------------------------ |
| (removed API) | (1:1 replacement, or "no replacement — see ...") |

## Update your code

### 1. Update the import

```js
// Before
import '@spectrum-web-components/<component>/sp-<component>.js';
// After
import '@adobe/spectrum-wc/<component>';
```
````

### 2. Rename the tag

```html
<!-- Before -->
<sp-<component> ...>...</sp-<component>>
<!-- After -->
<swc-<component> ...>...</swc-<component>>
```

### 3. <Component-specific transformation>

(One subsection per concrete code change consumers must make. Each subsection MUST contain a Before/After fenced code block so the skill can extract the transformation.)

## Styling

(Custom-property renames. Note any properties that have no 1:1 replacement.)

## Accessibility

(Consumer-facing accessibility deltas: required attribute additions, ARIA changes, focus behavior changes.)

## Verification

(Concrete checks the consumer should run after migrating: visual smoke test path, automated test command, screen reader behaviors to verify.)

```

---

## Authoring rules

- **Sentence case** for every heading.
- **Tables** are the source of truth for renames. Code blocks under `## Update your code` are the source of truth for concrete edits.
- **Before / After** must appear inside fenced code blocks for every transformation. The skill keys off this.
- **No links to maintainer docs.** Link only to public consumer docs (Storybook, npm).
- **Do not include `Components/` in the `<Meta title>`** — `titlePrefix` adds it automatically.
- If a section does not apply (e.g. no styling changes), keep the heading and write "No changes." underneath. Do not delete the heading.
```
