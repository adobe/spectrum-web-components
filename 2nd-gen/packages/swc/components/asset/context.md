---
component: asset
tag: swc-asset
package: '@adobe/spectrum-wc/asset'
status: unsupported
variants: [file, folder]
boolean_attributes: []
string_attributes:
  label: accessible label for file or folder variant
slots:
  - name: ''
    accepts: 'image element (typically <img>)'
    description: rendered when no `variant` is set
    required_when: 'variant is not set'
events: []
methods: []
peer_components: []
not_for: [thumbnails-with-captions, interactive-asset-cards]
---

> ⚠️ This component is currently `@status: unsupported`. Public API stability and continued availability are not guaranteed. Prefer alternative patterns where possible.

## When to use

- Display a single file, folder, or image preview as a small visual.
- Three modes:
  1. `variant="file"` — generic file icon visual.
  2. `variant="folder"` — generic folder icon visual.
  3. No variant + slotted `<img>` — preview thumbnail.

## When NOT to use

- For interactive asset cards with hover, selection, click, captions → build a richer card; `swc-asset` is purely visual.
- For decorative images outside an asset context → use a plain `<img>` with `alt`.
- New product code → confirm with the SWC team; `unsupported` status implies this surface may move.

## Canonical import

```js
import '@adobe/spectrum-wc/asset';
```

## Minimal correct examples

```html
<!-- File variant -->
<swc-asset variant="file" label="report.pdf"></swc-asset>

<!-- Folder variant -->
<swc-asset variant="folder" label="Project files"></swc-asset>

<!-- Image preview via slot (no variant) -->
<swc-asset>
  <img src="thumbnail.jpg" alt="Cover image of Q3 report" />
</swc-asset>
```

## Accessibility contract

- The component sets: nothing on the host. Non-interactive, non-focusable.
- The consumer MUST provide:
  - `label` when using `variant="file"` or `variant="folder"` (the label IS the accessible name).
  - meaningful `alt` on the slotted `<img>` when not using a variant.
- An icon-only file/folder asset without `label` is inaccessible.

## Composition rules

- **Pairs with**: list rows, grid cells, file-browser layouts.
- **Conflicts with**: nesting interactive elements — asset is non-interactive. Wrap the entire asset with a button/link if interactivity is needed.

## Runtime constraints

- `variant` valid values are `file` and `folder`. Other values log a debug warning at runtime. (Source: `core/components/asset/Asset.base.ts` `__swc.warn` block.)
- When `variant` is set, slot content is ignored.
- When `variant` is not set, the default slot content is rendered as-is.

## Common LLM mistakes

- ❌ `<swc-asset variant="image">` — there is no `image` variant. Omit the variant and slot an `<img>` instead.
- ❌ `<swc-asset variant="document">` — only `file` and `folder` are valid.
- ❌ Combining `variant="file"` with a slotted `<img>` and expecting both to render — variant wins.
- ❌ Omitting `label` on `variant="file"` — leaves the asset unlabeled.
- ❌ Treating asset as interactive — it has no events. Wrap with a button or link if needed.
- ❌ Using `<swc-asset>` in a stable production surface — `@status: unsupported`.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-asset`)                  | S2 (`swc-asset`)             |
| ---------------------- | -------------------------------- | ---------------------------- |
| Tag                    | `sp-asset`                       | `swc-asset`                  |
| Package                | `@spectrum-web-components/asset` | `@adobe/spectrum-wc/asset`   |
| Status                 | public                           | unsupported (use cautiously) |
| Custom-property prefix | `--mod-asset-*`                  | `--swc-asset-*`              |
