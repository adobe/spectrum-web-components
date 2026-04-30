# vite-global-elements-css

Derives `global-{component}.css` stylesheets from component shadow-DOM CSS sources. Keeps global-element styles in sync with their component counterparts without manual duplication.

## How it works

Shadow-DOM stylesheets use selectors that are meaningless outside a custom element (`::slotted`, `:host([attr])`). Global stylesheets target native elements with BEM modifier classes. This plugin bridges the two by reading the component CSS, applying deterministic selector transformations, stripping component-only blocks, and writing the result to `stylesheets/global/global-{component}.css`.

- **In dev**: runs at startup and re-derives on every source file save (triggers a full page reload).
- **At build**: runs in `configResolved`, before `processStylesheets` picks up the generated file in `closeBundle`.

The generated file is annotated with a `DO NOT EDIT` header that includes the source file path. It contains `token()` calls unchanged — those are resolved by the existing PostCSS pipeline.

## Selector transformation

Transformations are derived from BEM conventions with no per-component mapping required.

| Source (shadow DOM)                                  | Global output                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `:host`                                              | `.swc-[Component]`                                                                  |
| `:host([variant="primary"])`                         | `.swc-[Component]--primary`                                                         |
| `:host([truncate])`                                  | `.swc-[Component]--truncate` (boolean attr → attr name as modifier)                 |
| `:host([variant="secondary"][fill-style="outline"])` | `.swc-[Component]--secondary.swc-[Component]--outline` (compound → chained classes) |
| `:host([variant="primary"]) .swc-[Component]-label`  | `.swc-[Component]--primary .swc-[Component]-label`                                  |
| `slot[name="icon"]::slotted(*)`                      | `.swc-[Component]-icon` (slot name → BEM element)                                   |

The modifier value comes from:

- **String attributes**: the attribute **value** (e.g. `variant="primary"` → `--primary`)
- **Boolean attributes**: the attribute **name** (e.g. `[truncate]` → `--truncate`)

This relies on all modifier values being unique within a component's BEM namespace, which is enforced by the type definitions in `Button.types.ts` and equivalent files.

### SWC API attribute prefixing

Two attributes in the stable SWC API produce **prefixed** modifiers automatically — no configuration needed:

| Attribute      | Value   | Modifier        |
| -------------- | ------- | --------------- |
| `size`         | `s`     | `--sizeS` etc.  |
| `static-color` | `white` | `--staticWhite` |
| `static-color` | `black` | `--staticBlack` |

The prefix is the first hyphen-segment of the attribute name (`static-color` → `static`). For single-word attributes like `size`, the prefix is the full attribute name. This avoids ambiguous single-character modifier classes (`--l`, `--s`) in the global stylesheet.

### Wildcard rule injection

Shadow DOM stylesheets commonly include `* { box-sizing: border-box }` scoped to the shadow root. A bare `*` selector in a global stylesheet would leak to the entire page, so the plugin instead **injects** the wildcard declarations directly into the root block rule and descendents:

```css
/* source */
* {
  box-sizing: border-box;
}

/* generated — box-sizing injected, no wildcard in output */
.swc-Button,
.swc-Button * {
  box-sizing: border-box;
}
```

## `@global-exclude` fences

Mark component-only blocks that have no global equivalent. The plugin strips everything between the open and close comments:

```css
/* @global-exclude: pending state requires JS runtime */
@keyframes swc-pending-spinner-rotate { ... }

:host([pending]) .swc-Button {
  cursor: default;
}

.swc-Button--pendingActive { ... }
/* @global-exclude-end */
```

The reason string after `@global-exclude:` is optional but recommended for clarity.

### Fences inside at-rules

Fences work at any nesting depth. A fence inside an `@media` block strips only the rules within that block's scope — the `@media` wrapper itself is preserved unless all of its content is fenced (in which case the empty at-rule is removed automatically):

```css
@media (prefers-reduced-motion: reduce) {
  .swc-Button {
    transition-duration: 0ms; /* kept — has a global equivalent */
  }

  /* @global-exclude: pending spinner override requires JS runtime */
  .swc-Button--pendingActive .swc-Button-pendingSpinner-fill {
    animation-duration: 15s;
  }
  /* @global-exclude-end */
}
```

The generated global stylesheet will contain the `@media` block with only `transition-duration: 0ms`.

## Comment stripping

All CSS comments are removed from the source before generating the output. The generated file receives a single Apache 2.0 copyright header and a `DO NOT EDIT` notice pointing to the source file. This prevents stale or duplicated comment blocks when the plugin concatenates base and component stylesheets.

## Rule merging

When base and component stylesheets both define rules with the same selector (e.g. both declare `.swc-Button { … }`), the plugin merges them into a single rule. If the same property appears in both, the last declaration wins — matching CSS cascade order.

## Cascade layer

The generated stylesheet wraps all rules inside `@layer swc-global-elements`:

```css
@layer swc-global-elements {
  .swc-Button { … }
  .swc-Button--accent { … }
}

.swc-Button { all: revert-layer !important; }
```

This provides encapsulation similar to shadow DOM to prevent application styles affecting these global element style utilities.

## Base file auto-detection

If a `{name}-base.css` file exists alongside `{name}.css` in the same component directory, the plugin automatically concatenates it before the component CSS and includes it in the derivation. This covers shared resets (like `button-base.css`) without any extra configuration.

## Setup

### 1. Install

The package is workspace-local. Add the alias to `vite.config.ts` and `tsconfig.json`:

```ts
// vite.config.ts
resolve: {
  alias: {
    '@adobe/vite-global-elements-css': resolve(__dirname, '../tools/vite-global-elements-css'),
  },
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@adobe/vite-global-elements-css": ["../tools/vite-global-elements-css"]
    }
  }
}
```

### 2. Register the plugin

The `rootElementSelector` class is derived automatically from the component name (`'button'` → `'swc-Button'`, `'action-button'` → `'swc-ActionButton'`), so only `component` is required:

```ts
import { globalElementCSS } from '@adobe/vite-global-elements-css';

export default defineConfig({
  plugins: [
    globalElementCSS({
      elements: [{ component: 'button' }, { component: 'action-button' }],
    }),
    // ... other plugins
  ],
});
```

### 3. Add `@global-exclude` fences to component CSS

Wrap any block that should not appear in the global stylesheet:

```css
/* @global-exclude: spinner animations require JS pending state */
@keyframes swc-pending-spinner-rotate { ... }
@keyframes swc-pending-spinner-dashoffset { ... }
/* @global-exclude-end */
```

## Options

### `elements`

Array of component entries. Each entry:

| Option                | Type     | Required | Description                                                             |
| --------------------- | -------- | -------- | ----------------------------------------------------------------------- |
| `component`           | `string` | yes      | Component name, e.g. `'button'`. Derives all paths and the block class. |
| `source`              | `string` | no       | Override source CSS filename when it differs from `component`.          |
| `rootElementSelector` | `string` | no       | Override the derived BEM block class (e.g. `'swc-Button'`).             |

The `source` option is only needed for naming discrepancies:

```ts
// CSS lives at components/close-btn/close-btn.css
// but the component name is 'close-button'
{ component: 'close-button', source: 'close-btn' }
```

The `rootElementSelector` option is only needed when the derived class doesn't match the actual block class:

```ts
// Derived class would be swc-CloseBtn, but the actual class is swc-CloseButton
{ component: 'close-button', source: 'close-btn', rootElementSelector: 'swc-CloseButton' }
```

## Output

Generated files are written to `stylesheets/global/global-{component}.css` relative to the Vite project root. Each file:

- Begins with an Apache 2.0 copyright header and a `DO NOT EDIT` notice that includes the source file path
- Contains no CSS comments (all stripped from source)
- Wraps all rules in `@layer swc-global-elements`
- Contains `token()` calls unchanged — those are resolved by the PostCSS pipeline that processes `stylesheets/` at build time

Commit the generated files. They are stable output — the same input always produces the same output.

## Limitations

- The transformation assumes modifier **values** are unique within a component's BEM namespace. If two attributes share a value name (unlikely given Spectrum naming conventions), the output modifier class will be ambiguous. Resolve by using distinct values in the component's type definitions.
- Global stylesheets do not support component-only states (pending, JS-driven class toggling). Exclude those blocks with fences.
