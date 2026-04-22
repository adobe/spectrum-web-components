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

For deeper customization (theme and scale contexts, fonts, application background overrides), see [Customization: Getting Started](../../2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx).

## Your first component

```html
<swc-badge variant="positive">Approved</swc-badge>
```

## Framework support

React wrappers are planned. No plans for Vue or Svelte support at this time. For now, use the native custom-element tags directly in your framework of choice — the elements work anywhere the DOM works.

## Where to go next

- **Components** — browse the component catalog in Storybook (`yarn storybook` locally, or the deployed docs site)
- **Customization** — override tokens, themes, and fonts. Start with [Customization: Getting Started](../../2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx)
- **Accessibility** — review [accessibility guides](../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/overview.mdx) for consumers
- **Contributing** — see [Contributor guides](../01_contributor-guides/README.md) if you want to contribute upstream
