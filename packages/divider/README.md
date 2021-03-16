## Description

`sp-divider` brings clarity to a layout by grouping and dividing content that exists in close proximity. It can also be used to establish rhythm and hierarchy.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/divider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/divider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/divider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/divider)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/jNHEeVQDhrcDMfbS9uZR/src/index.ts)

```
yarn add @spectrum-web-components/divider
```

Import the side effectful registration of `<sp-divider>` via:

```
import '@spectrum-web-components/divider/sp-divider.js';
```

When looking to leverage the `Divider` base class as a type and/or for extension purposes, do so via:

```
import { Divider } from '@spectrum-web-components/divider';
```

## Horizontal

### Small

```html-live
<h2 class="spectrum-Heading spectrum-Heading--sizeXS">Small</h2>
<sp-divider size="s"></sp-divider>
<p class="spectrum-Body">
    Divide like-elements (tables, tool groups, elements within a panel, etc.)
</p>
```

### Medium

```html-live
<h2 class="spectrum-Heading spectrum-Heading--sizeS">Medium</h2>
<sp-divider size="m"></sp-divider>
<p class="spectrum-Body">
    Divide subsections, or divide different groups of elements (between panels,
    rails, etc.)
</p>
```

### Large

```html-live
<h2 class="spectrum-Heading spectrum-Heading--sizeM">Large</h2>
<sp-divider size="l"></sp-divider>
<p class="spectrum-Body">Page or Section Titles.</p>
```

## Vertical

When a vertical Divider is used inside of a flex container, use `align-self: stretch; height: auto;` on the Divider.

### Small

```html-live
<div style="height: 32px; display: flex;">
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-divider size="s" vertical></sp-divider>
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</div>
```

### Medium

```html-live
<div style="height: 32px; display: flex;">
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-divider size="m" vertical></sp-divider>
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</div>
```

### Large

```html-live
<div style="height: 32px; display: flex;">
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-divider size="l" vertical></sp-divider>
    <sp-action-button quiet label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</div>
```
