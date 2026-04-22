<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Get started](README.md) / Get started (for consumers)

<!-- Document title (editable) -->

# Get started (for consumers)

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Install](#install)
- [Your first component](#your-first-component)
- [Framework support](#framework-support)
- [Where to go next](#where-to-go-next)

</details>

<!-- Document content (editable) -->

Install 2nd-gen Spectrum Web Components and render your first component.

## Install

Add the package:

```bash
yarn add @adobe/spectrum-wc
```

Import the component you want. The import is side-effectful — it registers the custom element (`<swc-badge>` in this example):

```ts
import '@adobe/spectrum-wc/components/badge';
```

Include the SWC stylesheet once at the application root. It ships Spectrum 2 design tokens, typography defaults, and the default application background:

```html
<link rel="stylesheet" href="/node_modules/@adobe/spectrum-wc/swc.css" />
```

For deeper customization (theme and scale contexts, fonts, application background overrides), see [Customization](/docs/guides-customization-getting-started--docs).

## Your first component

```html
<swc-badge variant="positive">Approved</swc-badge>
```

## Framework support

React wrappers are planned. No plans for Vue or Svelte support at this time. For now, use the native custom-element tags directly in your framework of choice — the elements work anywhere the DOM works.

## Where to go next

- **Components** — browse the full catalog in [Storybook](/docs/components--docs)
- **Customization** — override tokens, themes, and fonts in [Customization guides](/docs/guides-customization-getting-started--docs)
- **Accessibility** — review [accessibility guidance](/docs/guides-accessibility-guides-overview--docs) for consumers
- **Contributing** — see [Contributor guides](../01_contributor-guides/README.md) if you want to contribute upstream
