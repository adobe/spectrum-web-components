## Description

The `<sp-tabs>` displays a list of `<sp-tab>` element children which accept both a `label` attribute and a `[slot="icon"]` child to define their contents. `<sp-tab>` content can be further customized with the `vertical` attribute which stacks them in the UI rather than listing them in a row. `<sp-tabs>` is typically used as the interface for controlling a set of layered sections of content that display one panel of content at a time

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)

```
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tabs>` or `<sp-tab>` via:

```
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
```

When looking to leverage the `Tabs` or `Tab` base class as a type and/or for extension purposes, do so via:

```
import {
    Tabs,
    Tab
} from '@spectrum-web-components/tabs';
```

## Example

```html
<sp-tabs selected="1">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
</sp-tabs>
```

### Vertical

```html
<sp-tabs selected="1" direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
</sp-tabs>
```

## Variants

### Quiet

```html
<sp-tabs selected="1" quiet>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
</sp-tabs>
```

### Compact

```html
<sp-tabs selected="1" compact>
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
</sp-tabs>
```

## With icons

```html
<div>
    <sp-icons-medium></sp-icons-medium>
    <sp-tabs selected="1" direction="horizontal">
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
    </sp-tabs>
</div>
```

## Accessibility

When an `<sp-tabs>` has a `selected` value, the `<sp-tab>` child of that `value` will be given `[tabindex="0"]` and will receive initial focus when tabbing into the `<sp-tabs>` element. When no `selected` value is present, the first `<sp-tab>` child will be treated in this way. When focus is currently within the `<sp-tabs>` element, the left and right arrows will move that focus back and forth through the available `<sp-tab>` children.
