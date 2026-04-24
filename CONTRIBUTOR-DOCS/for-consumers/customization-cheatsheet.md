<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / For Consumers / Customization cheatsheet

<!-- Document title (editable) -->

# Customization cheatsheet

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Install the stylesheet](#install-the-stylesheet)
    - [Override the application background](#override-the-application-background)
    - [PostCSS Preset Env settings](#postcss-preset-env-settings)
- [Override component styles with `--swc-*`](#override-component-styles-with---swc-)
    - [Scope overrides to attributes](#scope-overrides-to-attributes)
    - [Scope overrides to a custom class](#scope-overrides-to-a-custom-class)
    - [Exclusions](#exclusions)
    - [Global token overrides](#global-token-overrides)
- [Themes and scales](#themes-and-scales)
    - [Theme classes](#theme-classes)
    - [Scale classes](#scale-classes)
    - [Custom dynamic-scaling values](#custom-dynamic-scaling-values)
- [Fonts](#fonts)
    - [Option 1 — Adobe Fonts (recommended)](#option-1--adobe-fonts-recommended)
    - [Option 2 — Self-hosted](#option-2--self-hosted)
    - [Font stacks](#font-stacks)
    - [CJK](#cjk)
- [Style native elements via the global stylesheet](#style-native-elements-via-the-global-stylesheet)
    - [`.swc-Button` for native links and buttons](#swc-button-for-native-links-and-buttons)
    - [Customize via custom properties](#customize-via-custom-properties)
    - [Customize via the overrides cascade layer](#customize-via-the-overrides-cascade-layer)
- [Live example](#live-example)
- [Migration from 1st-gen](#migration-from-1st-gen)

</details>

<!-- Document content (editable) -->

One scannable reference for the four customization surfaces consumers reach for most: the application stylesheet, the `--swc-*` override pattern, theme/scale modifiers, and Adobe Clean Spectrum VF font loading.

For a gentler introduction, start with [Get started (for consumers)](get-started.md). Deep-dive topics link out from each section below.

## Install the stylesheet

2nd-gen SWC does not use the `<sp-theme>` wrapper. A single application-level stylesheet delivers Spectrum 2 design tokens, default typography, the default app background, and the scaffolding that powers theme + scale switching.

```html
<link rel="stylesheet" href="/node_modules/@adobe/spectrum-wc/swc.css" />
```

Inclusion method varies by build pipeline — CDN link, bundler import, or framework-specific plugin. The file is exposed under the `/swc.css` package export.

**Optional global sheets**:

- `@adobe/spectrum-wc/global-elements.css` — enables `.swc-Button`-styled native `<a>` and `<button>` elements
- Individual per-feature sheets are also exposed as `@adobe/spectrum-wc/global-[feature].css`

### Override the application background

Set `--swc-application-background` on `:root` **after** the main stylesheet. Prefer a Spectrum color token so the override adapts to light and dark themes.

```css
:root {
  --swc-application-background: var(--swc-gray-100);
}
```

### PostCSS Preset Env settings

If your pipeline re-processes `swc.css` through PostCSS Preset Env, disable these features — they transpile the source in ways that break across shadow DOM:

```json
{
  "stage": 2,
  "features": {
    "nesting-rules": false,
    "custom-properties": false,
    "light-dark-function": false,
    "logical-properties-and-values": false,
    "is-pseudo-class": false,
    "cascade-layers": false
  }
}
```

## Override component styles with `--swc-*`

The 2nd-gen public styling API uses the `--swc-*` prefix exclusively. `--mod-*` and `--spectrum-*` are 1st-gen and do **not** apply.

Use the least intrusive option that fits:

| Option                                     | When to reach for it                                                  |
| ------------------------------------------ | --------------------------------------------------------------------- |
| Component attributes (`variant`, `size`)   | Always first — stays within Spectrum recommendations                  |
| Component custom properties (`--swc-*`)    | Tweak specific visuals without forking the component                  |
| Custom class + custom properties           | Scope overrides to individual instances                               |
| Global design token overrides              | Brand-wide color/scale changes                                        |
| Extending the component class              | When none of the above covers the need                                |

Inspect a component in devtools and look for declarations named `--swc-[component]-[property]-[feature]` to discover what's exposed.

### Scope overrides to attributes

Selectors must be attribute-scoped so they don't over-apply. A bare tag selector will bleed across all variants.

```css
/* Badge at extra-large size */
swc-badge[size='xl'] {
  --swc-badge-font-size: var(--swc-font-size-400);
}

/* Badge with outline + positive variant */
swc-badge[outline][variant='positive'] {
  --swc-badge-border-color: var(--swc-celery-background-color-default);
}
```

### Scope overrides to a custom class

For per-instance overrides, attach a class and target it the same way.

```css
.divider--accent {
  --swc-divider-background-color: var(--swc-accent-visual-color);
}
```

```html
<swc-divider class="divider--accent" size="m"></swc-divider>
```

### Exclusions

Some surfaces are not overridable at the component level:

- Colors on `static-color="white"` / `static-color="black"` variants
- Colors tied to non-semantic palette variants (e.g. Badge's `magenta`)
- Properties modified for forced-colors mode

For these, use a global token override instead.

### Global token overrides

Place after the main stylesheet so the cascade does the work. Scaling tokens must be set on both `:root` and `.swc-theme` to keep dynamic scaling working.

```css
/* Non-scaling override */
:root {
  --swc-accent-color-500: var(--swc-indigo-500);
}

/* Scaling override — must include both medium and large values */
:root,
.swc-theme {
  --swc-avatar-size-400: var(--swc-theme--sizeM, 32px)
    var(--swc-theme--sizeL, 48px);
}
```

## Themes and scales

Theme and scale context classes replace the features previously offered by `<sp-theme>`. They can be applied to the root or to nested subtrees.

### Theme classes

Defaults to light. Apply both `swc-theme` and one theme modifier to switch.

| Class                   | Effect                                               |
| ----------------------- | ---------------------------------------------------- |
| `.swc-theme--light`     | `color-scheme: light`                                |
| `.swc-theme--dark`      | `color-scheme: dark`                                 |
| `.swc-theme--adaptive`  | `color-scheme: light dark` — follows user OS setting |

```html
<html class="swc-theme swc-theme--dark"></html>

<div class="swc-theme swc-theme--dark">
  <div class="swc-theme swc-theme--light"><!-- nested light island --></div>
</div>
```

### Scale classes

Two scale contexts control `font-size` and spacing. Defaults to medium ("Desktop"). Apply both `swc-theme` and one scale modifier to switch.

| Class                 | Effect                   |
| --------------------- | ------------------------ |
| `.swc-theme--sizeM`   | Medium scale (Desktop)   |
| `.swc-theme--sizeL`   | Large scale (Mobile)     |

Switch responsively with a media or container query — the target must also carry the `swc-theme` class:

```css
@media (max-width: 600px) {
  :root,
  .swc-theme {
    --swc-theme-size: var(--swc-theme--sizeL);
  }
}

.my-responsive-section {
  @container (inline-size < 30ch) {
    --swc-theme-size: var(--swc-theme--sizeL);
  }
}
```

### Custom dynamic-scaling values

Tokens with scale-aware values encode medium and large together:

```css
--swc-font-size-100: var(--swc-theme--sizeM, 14px) var(--swc-theme--sizeL, 17px);
```

To author your own, follow the same shape:

```css
.element {
  margin-block: var(--swc-theme--sizeM, 1rem) var(--swc-theme--sizeL, 1.25rem);
}
```

## Fonts

2nd-gen SWC uses **Adobe Clean Spectrum VF** — the variable-font typeface introduced with Spectrum 2. Visually identical to legacy Adobe Clean, but with improved metrics, variable weight + width, and Spectrum Serif alignment. Components will not render correctly with Adobe Clean or system fonts.

You **must** load Adobe Clean Spectrum VF in your application.

### Option 1 — Adobe Fonts (recommended)

If your org has Adobe Fonts access, create a web project with:

- **Adobe Clean Spectrum VF** — sans-serif
- **Adobe Clean Spectrum Serif VF** — serif (optional)
- **Adobe Clean Han** — CJK (optional)

Embed in your application `<head>`:

```html
<link rel="preconnect" href="https://use.typekit.net" crossorigin />
<link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css" />
```

### Option 2 — Self-hosted

Host the font files via your CDN and declare `@font-face`:

```css
@font-face {
  font-family: 'adobe-clean-spectrum-vf';
  src: url('/path/to/adobe-clean-spectrum-vf.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

### Font stacks

Tokens encode the full fallback chain — reference them by token, don't hand-write the stack.

```css
font-family: var(--swc-sans-font-family-stack);
font-family: var(--swc-serif-font-family-stack);
font-family: var(--swc-font-family-japanese);
```

### CJK

CJK kits (Japanese, Korean, Simplified / Traditional / Hong Kong Chinese) ship via Adobe Fonts JS with [dynamic subsetting](https://helpx.adobe.com/fonts/using/dynamic-subsetting.html). No CSS endpoint exists for CJK kits — requesting one returns HTTP 412. Font faces register via the browser's [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) and appear in `document.fonts`, not in DOM `<style>` elements.

Storybook previews all supported locales via the **Language** toolbar; CJK kits load on demand.

## Style native elements via the global stylesheet

Including `@adobe/spectrum-wc/global-elements.css` exposes Spectrum styling to native elements so they stay semantically correct and keep their default accessibility behavior. For slotted elements to pick up these styles, the sheet must be loaded at the application level and processed by your bundler.

To apply global styles inside the shadow DOM of extended or custom components, import the same sheet from that component's styles.

### `.swc-Button` for native links and buttons

Uses BEM-style classes. Requires `.swc-Button` plus optional variant classes.

```html
<a href="#" class="swc-Button">As link</a>
<button type="button" class="swc-Button">As button</button>
<a href="#" class="swc-Button swc-Button--primary">Primary link</a>
```

> Button-styled native links do not support `disabled` or `pending` states.

### Customize via custom properties

```css
.swc-Button {
  --swc-button-min-width: 10ch;
}
```

### Customize via the overrides cascade layer

For properties not exposed as custom properties, write into the `swc-global-element-overrides` cascade layer:

```css
@layer swc-global-element-overrides {
  .swc-Button {
    color: blue;
  }
}
```

## Live example

The snippet below assembles every piece: stylesheet install, dark theme, large scale, and a scoped custom-property override.

```html
<!doctype html>
<html class="swc-theme swc-theme--dark swc-theme--sizeL">
  <head>
    <link rel="stylesheet" href="/node_modules/@adobe/spectrum-wc/swc.css" />
    <link
      rel="stylesheet"
      href="https://use.typekit.net/YOUR-KIT-ID.css"
    />
    <style>
      :root {
        --swc-application-background: var(--swc-gray-100);
      }

      swc-badge[variant='positive'] {
        --swc-badge-border-color: var(--swc-celery-background-color-default);
      }
    </style>
    <script type="module">
      import '@adobe/spectrum-wc/components/badge';
    </script>
  </head>
  <body>
    <swc-badge variant="positive">Approved</swc-badge>
  </body>
</html>
```

## Migration from 1st-gen

| Surface          | 1st-gen                               | 2nd-gen                                            |
| ---------------- | ------------------------------------- | -------------------------------------------------- |
| Theme context    | `<sp-theme>` element                  | `.swc-theme` + modifier classes                    |
| Custom-prop API  | `--spectrum-*` + `--mod-*`            | `--swc-*` (public)                                 |
| Primary font     | Adobe Clean                           | Adobe Clean Spectrum VF (variable)                 |
| Spectrum version | Spectrum 1                            | Spectrum 2                                         |
| Font loading     | Via `<sp-theme>` or manual            | Manual (required in your app)                      |
