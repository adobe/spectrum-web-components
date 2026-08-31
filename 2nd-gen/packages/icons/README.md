# @adobe/spectrum-wc-icons

Spectrum 2 **workflow icons** for [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/). Public, framework-agnostic icon art delivered two ways:

- **Per-icon custom elements** (`<swc-icon-star>`): drop-in tags that render in any framework with zero ceremony, carrying size, color, and accessibility.
- **Per-icon SVG-string functions** (`Icon_Star()`): the tree-shakeable substrate, usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`.

Neither couples a consumer to Lit. The package depends only on `@adobe/spectrum-wc-core` (for the shared `IconBase`).

> The art is generated from the Adobe-internal A4U **S2 Icon Global Set (Open Source)** by the workflow generator in the `@adobe/spectrum-wc` package. See the [icon strategy RFC](../../../CONTRIBUTOR-DOCS/03_project-planning/05_strategies/icon-rfc.md).

## Install

```bash
yarn add @adobe/spectrum-wc-icons
```

## Usage

### Custom element (any framework, no Lit)

Import the per-icon element by subpath; the import registers the tag as a side effect.

```ts
import '@adobe/spectrum-wc-icons/swc-icon-star.js';
```

```html
<swc-icon-star accessible-label="Favorite"></swc-icon-star>
```

```jsx
<swc-icon-star accessible-label="Favorite" /> // React 19
```

Register every icon at once (not tree-shakeable; prefer per-icon imports in apps):

```ts
import '@adobe/spectrum-wc-icons/elements.js';
```

### SVG-string function (build-time, SSR, custom composition)

```ts
import { Icon_Star } from '@adobe/spectrum-wc-icons/Star.js';

element.innerHTML = Icon_Star();
```

The package's default export is the barrel of every function, for convenience:

```ts
import { Icon_Star, Icon_Folder } from '@adobe/spectrum-wc-icons';
```

## API

Every element extends `IconBase` from `@adobe/spectrum-wc-core`:

| Member                 | Type                                | Default        | Notes                                                                                  |
| ---------------------- | ----------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `size`                 | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'`          | Sizes the box; the single drawing scales to it.                                        |
| `accessible-label`     | `string`                            | `''`           | Set: host gets `role="img"` + `aria-label`. Empty: host is `aria-hidden` (decorative). |
| CSS `color`            | `<color>`                           | inherited      | Drives icon color via the `currentColor` fallback.                                     |
| CSS `--swc-icon-color` | `<color>`                           | `currentColor` | Advanced color override, independent of text `color`.                                  |

## Naming

For an A4U logical name `<Name>` (PascalCase, e.g. `Star`, `AddCircle`, `3DAsset`):

| Output           | Form               | Example (`AddCircle`) | Example (`3DAsset`) |
| ---------------- | ------------------ | --------------------- | ------------------- |
| Function         | `Icon_<Name>()`    | `Icon_AddCircle()`    | `Icon_3DAsset()`    |
| Element class    | `Icon<Name>`       | `IconAddCircle`       | `Icon3DAsset`       |
| Element tag      | `swc-icon-<kebab>` | `swc-icon-add-circle` | `swc-icon-3d-asset` |
| Function subpath | `/<Name>.js`       | `/AddCircle.js`       | `/3DAsset.js`       |

## Regenerating

Icon art is generated, not hand-authored. To refresh (Adobe-internal, VPN required): download the S2 Icon Global Set (Open Source) SVGs into `2nd-gen/packages/swc/icon-source/workflow/`, then from the `swc` package run:

```bash
yarn generate:workflow-icons
```

The source SVGs are git-ignored; only the generated art in `src/` is committed. See the [icon source README](../swc/icon-source/README.md).
