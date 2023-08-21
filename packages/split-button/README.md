## Description

An `sp-split-button` surfaces an immediately envokable action via it's main button, as well as a list of alternative actions in its toggleable menu overlay. By default, any actions envoked from the overlay will replace the main action button. When leveraging `[type="more"]` the action will be envoked, but the main button will remain the action initally persribed by the implementor.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/split-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/split-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/split-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/splitbutton)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/wyDxsnwOiGaxibKODm3o/src/index.ts)

```
yarn add @spectrum-web-components/split-button
```

Import the side effectful registration of `<sp-split-button>` via:

```
import '@spectrum-web-components/split-button/sp-split-button.js';
```

The default of `<sp-split-button>` will load dependencies in `@spectrum-web-components/overlay` asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<sp-split-button>` as follows:

```
import '@spectrum-web-components/split-button/sync/sp-split-button.js';
```

When looking to leverage the `SplitButton` base class as a type and/or for extension purposes, do so via:

```
import { SplitButton } from '@spectrum-web-components/split-button';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-split-button size="s">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-split-button size="m">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-split-button size="l">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-split-button size="xl">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

</sp-tab-panel>
</sp-tabs>

## Variants

### CTA

```html
<sp-split-button>
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button left>
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

### Primary

```html
<sp-split-button variant="primary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button left variant="primary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

### Secondary

```html
<sp-split-button variant="secondary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button left>
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

## More button

When using the `more` value of the `type` attribute, an `<sp-split-button>` will maintain its default option value without regard to the most recently used option.

### CTA

```html
<sp-split-button type="more">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button type="more" left>
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

### Primary

```html
<sp-split-button type="more" variant="primary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button type="more" left variant="primary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```

### Secondary

```html
<sp-split-button type="more" variant="secondary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
<sp-split-button type="more" left variant="secondary">
    <sp-menu-item>Option 1</sp-menu-item>
    <sp-menu-item>Option Extended</sp-menu-item>
</sp-split-button>
```
