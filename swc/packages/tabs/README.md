## Description

The `<sp-tabs>` displays a list of `<sp-tab>` element children as `role="tablist"`. An `<sp-tab>` element is associated with a sibling `<sp-tab-panel>` element via their `value` attribute. When an `<sp-tab>` element is `selected`, the associated `<sp-tab-panel>` will also be selected, showing that panel and hiding the others.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/2JFFTBPXfCZpePD0wk58/src/index.ts)

```
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tabs>`, `<sp-tab>` or `<sp-tab-panel>` via:

```
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
```

When looking to leverage the `Tabs`, `Tab`, or `TabPanel` base class as a type and/or for extension purposes, do so via:

```
import {
    Tabs,
    Tab,
    TabPanel
} from '@spectrum-web-components/tabs';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-tabs selected="1" size="s">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-tabs selected="1" size="m">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-tabs selected="1" size="l">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-tabs selected="1" size="xl">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
</sp-tabs>

## Horizontal Tabs

An `<sp-tabs>` element will display horizontally by default. It can be modified with states like `compact`, `disabled`, and `quiet`, or with content like icons, etc.

<sp-tabs selected="compact" auto label="Horizontal Tabs variants">
<sp-tab value="compact">Compact</sp-tab>
<sp-tab-panel value="compact">

Compact tabs should never be used without the quiet variation. Please use Quiet + Compact Tabs instead.

```html demo
<sp-tabs selected="1" compact>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

When an `<sp-tabs>` element is given the `disabled` attribute its `<sp-tab>` children will be disabled as well, preventing a visitor from changing the selected tab. By default, `<sp-tab-panel>` children will not be addressed and the available content of the currently selected tab will be fully visible.

```html demo
<sp-tabs selected="2" disabled>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1 is not selectable</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2 is selected</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3 is not selectable</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4 is not selectable</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="icons">Icons</sp-tab>
<sp-tab-panel value="icons">

```html demo
<sp-tabs selected="1">
    <sp-tab label="Tab 1" value="1">
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab label="Tab 2" value="2">
        <sp-icon-close slot="icon"></sp-icon-close>
    </sp-tab>
    <sp-tab label="Tab 3" value="3">
        <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
    </sp-tab>
    <sp-tab label="Tab 4" value="4">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html demo
<sp-tabs selected="1" quiet>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="quiet+compact">Quiet + Compact</sp-tab>
<sp-tab-panel value="quiet+compact">

```html demo
<sp-tabs selected="1" quiet compact>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
</sp-tabs>

## Vertical Tabs

An `<sp-tabs>` element will display horizontally by default. It can be modified with states like `compact`, `disabled`, and `quiet`, or with content like icons, etc.

<sp-tabs selected="compact" auto label="Horizontal Tabs variants">
<sp-tab value="compact">Compact</sp-tab>
<sp-tab-panel value="compact">

Compact tabs should never be used without the quiet variation. Please use Quiet + Compact Tabs instead.

```html demo
<sp-tabs selected="1" compact direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

When an `<sp-tabs>` element is given the `disabled` attribute its `<sp-tab>` children will be disabled as well, preventing a visitor from changing the selected tab. By default, `<sp-tab-panel>` children will not be addressed and the available content of the currently selected tab will be fully visible.

```html demo
<sp-tabs selected="2" disabled direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1 is not selectable</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2 is selected</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3 is not selectable</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4 is not selectable</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="icons">Icons</sp-tab>
<sp-tab-panel value="icons">

```html demo
<sp-tabs selected="1" direction="vertical">
    <sp-tab label="Tab 1" value="1">
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab label="Tab 2" value="2">
        <sp-icon-close slot="icon"></sp-icon-close>
    </sp-tab>
    <sp-tab label="Tab 3" value="3">
        <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
    </sp-tab>
    <sp-tab label="Tab 4" value="4">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html demo
<sp-tabs selected="1" quiet direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
<sp-tab value="quiet+compact">Quiet + Compact</sp-tab>
<sp-tab-panel value="quiet+compact">

```html demo
<sp-tabs selected="1" quiet compact direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
</sp-tabs>
```

</sp-tab-panel>
</sp-tabs>

## Accessibility

When an `<sp-tabs>` has a `selected` value, the `<sp-tab>` child of that `value` will be given `[tabindex="0"]` and will receive initial focus when tabbing into the `<sp-tabs>` element. When no `selected` value is present, the first `<sp-tab>` child will be treated in this way. When focus is currently within the `<sp-tabs>` element, the left and right arrows will move that focus back and forth through the available `<sp-tab>` children.
