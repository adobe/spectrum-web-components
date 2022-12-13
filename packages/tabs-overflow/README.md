## Description

The `<sp-tabs-overflow>` is a decorator component for the `<sp-tabs>` component that enables scrolling for horizontal tabs when there is not enough width to display all of the tabs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs-overflow?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs-overflow)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs-overflow?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs-overflow)

```
yarn add @spectrum-web-components/tabs-overflow
```

Import the side effectful registration of `<sp-tabs-overflow>` via:

```
import '@spectrum-web-components/tabs-overflow/sp-tabs-overflow.js';
```

When looking to leverage the `TabsOverflow` base class as a type and/or for extension purposes, do so via:

```
import { TabsOverflow } from '@spectrum-web-components/tabs-overflow';
```

## Example

To use the `<sp-tabs-overflow>` component, simply wrap it around the `<sp-tabs>` element as a child element, like so:

```html
<sp-tabs-overflow>
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
</sp-tabs-overflow>
```
