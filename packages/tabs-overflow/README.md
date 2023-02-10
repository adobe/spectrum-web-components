## Description

The `<sp-tabs-overflow>` is a decorative component that works in conjunction with the `<sp-tabs>` component. It enables horizontal tab scrolling in cases where the available width is insufficient to display all tabs.

_Note: Veritical scrolling is not yet supported._

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs-overflow?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs-overflow)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs-overflow?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs-overflow)

```
yarn add @spectrum-web-components/tabs-overflow
```

To import the `<sp-tabs-overflow>` component with its associated side effects, use the following import statement:

```
import '@spectrum-web-components/tabs-overflow/sp-tabs-overflow.js';
```

To utilize the `TabsOverflow` base class as a type or for extending its functionality, utilize the following method:

```
import { TabsOverflow } from '@spectrum-web-components/tabs-overflow';
```

## Example

To use the `<sp-tabs-overflow>` component, simply wrap it around the `<sp-tabs>` element as a child element:

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
