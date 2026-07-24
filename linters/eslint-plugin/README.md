# @spectrum-web-components/eslint-plugin

ESLint plugin for [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/). It catches accessibility gaps, deprecated APIs, and invalid attribute and slot usage **at lint time**, shifting left what `window.__swc.warn()` and axe otherwise catch at runtime. It also bundles a few repository code-style rules.

The Spectrum usage rules are data-driven and work with both Lit `html` tagged templates and JSX/TSX (React, Preact, etc.), so both kebab-case custom elements (`<sp-action-menu>`) and PascalCase wrappers (`<SpActionMenu>`) are checked.

## Installation

```bash
yarn add --dev @spectrum-web-components/eslint-plugin
```

ESLint 9+ (flat config) is required. `eslint` is a peer dependency.

## Quick start (ESLint 9+ flat config)

The `recommended` and `strict` presets are available from the `/configs` entry point. `recommended` reports the Spectrum usage rules as warnings; `strict` reports them as errors.

### Lit (html tagged templates)

```js
// eslint.config.js
import swc from '@spectrum-web-components/eslint-plugin/configs';

export default [swc.configs.recommended];
```

### JSX / TSX (React, Preact, etc.)

The plugin detects both syntaxes automatically. Enable JSX parsing in your ESLint config:

```js
// eslint.config.js
import swc from '@spectrum-web-components/eslint-plugin/configs';

export default [
  {
    ...swc.configs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
];
```

Both kebab-case custom elements and PascalCase React wrappers are supported:

```jsx
// These are equivalent — both are checked
<sp-action-menu label="Actions"></sp-action-menu>
<SpActionMenu label="Actions"></SpActionMenu>
```

For strict CI enforcement:

```js
import swc from '@spectrum-web-components/eslint-plugin/configs';

export default [swc.configs.strict];
```

### Enabling individual rules

To register the plugin and opt in to specific rules yourself, import the full plugin from the package root and add it under the `swc` namespace:

```js
// eslint.config.js
import { swcPlugin } from '@spectrum-web-components/eslint-plugin';

export default [
  {
    plugins: { swc: swcPlugin },
    rules: {
      'swc/accessible-component': 'warn',
      'swc/no-deprecated': 'error',
    },
  },
];
```

The root package export exposes every rule listed below (both the Spectrum usage rules and the repository code-style rules). The `/configs` presets cover only the six Spectrum usage rules.

## Rules

### Spectrum usage rules

These validate `sp-*` usage against Spectrum Web Components component descriptors.

#### `swc/accessible-component`

Require accessibility attributes on SWC elements.

```js
// ❌ Bad — Lit
html`<sp-action-menu></sp-action-menu>`;
html`<sp-picker></sp-picker>`;

// ❌ Bad — JSX
<SpActionMenu></SpActionMenu>
<SpPicker></SpPicker>

// ✅ Good — Lit
html`<sp-action-menu label="More actions"></sp-action-menu>`;
html`<sp-picker aria-label="Select option"></sp-picker>`;

// ✅ Good — JSX
<SpActionMenu label="More actions"></SpActionMenu>
<SpPicker aria-label="Select option"></SpPicker>
```

| Element                | Required (at least one of)                          |
| ---------------------- | --------------------------------------------------- |
| `<sp-action-menu>`     | `label`, `aria-label`, `aria-labelledby`            |
| `<sp-avatar>`          | `label`, `is-decorative`                            |
| `<sp-clear-button>`    | `label`                                             |
| `<sp-dialog-wrapper>`  | `headline`                                          |
| `<sp-picker>`          | `label`, `aria-label`, `aria-labelledby`            |
| `<sp-progress-bar>`    | `label`, `aria-label`, `aria-labelledby`            |
| `<sp-progress-circle>` | `label`, `aria-label`, `aria-labelledby`            |
| `<sp-status-light>`    | `label`, `aria-label`, `aria-labelledby`            |
| `<sp-tabs>`            | `accessible-label`, `aria-label`, `aria-labelledby` |

#### `swc/no-deprecated`

Flag deprecated attributes and attribute values.

```js
// ❌ Bad — Lit
html`<sp-button variant="cta">Click</sp-button>`;
html`<sp-overlay allow-outside-click></sp-overlay>`;

// ❌ Bad — JSX
<SpButton variant="cta">Click</SpButton>
<SpOverlay allowOutsideClick></SpOverlay>

// ✅ Good — Lit
html`<sp-button variant="accent">Click</sp-button>`;
html`<sp-overlay></sp-overlay>`;

// ✅ Good — JSX
<SpButton variant="accent">Click</SpButton>
<SpOverlay></SpOverlay>
```

| Deprecated                             | Replacement                                |
| -------------------------------------- | ------------------------------------------ |
| `<sp-button variant="cta">`            | `variant="accent"`                         |
| `<sp-button variant="overBackground">` | `static-color="white" treatment="outline"` |
| `<sp-button href="...">`               | Use native `<a>` element                   |
| `<sp-overlay allow-outside-click>`     | Remove attribute                           |
| `<sp-status-light variant="accent">`   | `"neutral"` or `"info"`                    |
| `<sp-status-light disabled>`           | Remove attribute                           |

#### `swc/required-attributes`

Enforce presence of configuration attributes.

```js
// ❌ Bad
html`
  <sp-theme></sp-theme>
`;
html`
  <overlay-trigger>content</overlay-trigger>
`;

// ✅ Good
html`
  <sp-theme color="light" scale="medium" system="spectrum"></sp-theme>
`;
html`
  <overlay-trigger triggered-by="click hover">content</overlay-trigger>
`;
```

#### `swc/valid-attribute-values`

Catch invalid enum values at lint time.

```js
// ❌ Bad
html`
  <sp-theme color="lightest"></sp-theme>
`;
html`
  <sp-button variant="danger">Click</sp-button>
`;

// ✅ Good
html`
  <sp-theme color="light"></sp-theme>
`;
html`
  <sp-button variant="accent">Click</sp-button>
`;
```

#### `swc/valid-slot-names`

Warn when a child element targets a slot that the parent component doesn't define.

```js
// ❌ Bad — Lit
html`
  <sp-action-menu label="Actions">
    <sp-menu-item slot="header">Edit</sp-menu-item>
  </sp-action-menu>
`;

// ❌ Bad — JSX
<SpActionMenu label="Actions">
  <SpMenuItem slot="header">Edit</SpMenuItem>
</SpActionMenu>;

// ✅ Good — Lit
html`
  <sp-action-menu label="Actions">
    <sp-menu-item>Edit</sp-menu-item>
    <sp-icon slot="icon"></sp-icon>
  </sp-action-menu>
`;

// ✅ Good — JSX
<SpActionMenu label="Actions">
  <SpMenuItem>Edit</SpMenuItem>
  <SpIcon slot="icon"></SpIcon>
</SpActionMenu>;
```

#### `swc/valid-slot-children`

Warn when a child element's tag is not accepted in the slot it targets.

```js
// ❌ Bad — Lit (sp-action-menu default slot only accepts sp-menu-item/group/divider)
html`
  <sp-action-menu label="Actions">
    <sp-button>Wrong child</sp-button>
  </sp-action-menu>
`;

// ❌ Bad — JSX
<SpActionMenu label="Actions">
  <SpButton>Wrong child</SpButton>
</SpActionMenu>;

// ✅ Good — Lit
html`
  <sp-action-menu label="Actions">
    <sp-menu-item>Edit</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Delete</sp-menu-item>
  </sp-action-menu>
`;

// ✅ Good — JSX
<SpActionMenu label="Actions">
  <SpMenuItem>Edit</SpMenuItem>
  <SpMenuDivider></SpMenuDivider>
  <SpMenuItem>Delete</SpMenuItem>
</SpActionMenu>;
```

| Component             | Default slot accepts                               | Named slots                                           |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| `<sp-action-menu>`    | `sp-menu-item`, `sp-menu-group`, `sp-menu-divider` | `icon`, `label`, `tooltip`                            |
| `<sp-picker>`         | `sp-menu-item`, `sp-menu-group`, `sp-menu-divider` | `label`, `tooltip`, `description`                     |
| `<sp-tabs>`           | `sp-tab`, `sp-tab-panel`                           | —                                                     |
| `<sp-button>`         | (any)                                              | `icon` (accepts `sp-icon`)                            |
| `<sp-dialog-wrapper>` | (any)                                              | `hero`, `heading`, `button` (accepts `sp-button`)     |
| `<overlay-trigger>`   | (any)                                              | `click-content`, `hover-content`, `longpress-content` |

### Repository code-style rules

These support Spectrum Web Components' own source conventions and are used inside this monorepo. They are not part of the `recommended` / `strict` presets.

| Rule                          | Type       | Description                                                                                                                 |
| ----------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `swc/notice-after-shebang`    | fixable    | Require the copyright notice header directly under a shebang line (`#!/usr/bin/env node`). Mirrors `notice/notice` options. |
| `swc/prevent-argument-names`  | suggestion | Disallow specific identifier names as function or arrow parameters (e.g. `e`, `ev`, `evt`, `err`).                          |
| `swc/document-active-element` | problem    | Disallow `document.activeElement`, which can be incorrect across shadow DOM boundaries.                                     |

## Dynamic values

The rules only evaluate statically analyzable markup. Dynamic expressions are left alone, since the value cannot be verified at lint time:

```js
// Not reported — value is dynamic
html`
  <sp-action-menu label=${this.label}></sp-action-menu>
`;
html`
  <sp-theme color=${this.color}></sp-theme>
`;
```

## Presets and exports

| Import                                           | What you get                                                                                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@spectrum-web-components/eslint-plugin/configs` | Default export: plugin with `.configs.recommended` and `.configs.strict` presets (the six Spectrum usage rules). Also named exports `{ rules, configs }`. |
| `@spectrum-web-components/eslint-plugin`         | Named export `{ swcPlugin }`: the full plugin with every rule above, for manual registration under the `swc` namespace.                                   |

## License

Apache-2.0. See the repository [LICENSE](https://github.com/adobe/spectrum-web-components/blob/main/LICENSE).
