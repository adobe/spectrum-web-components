## Description

The `<sp-tabs-overflow>` is a decorative component that works in conjunction with the `<sp-tabs>` component. It enables horizontal tab scrolling in cases where the available width is insufficient to display all tabs.

_Note: Veritical scrolling is not yet supported._

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/2JFFTBPXfCZpePD0wk58/src/index.ts)

```
yarn add @spectrum-web-components/tabs
```

To import the `<sp-tabs-overflow>` component with its associated side effects, use the following import statement:

```
import '@spectrum-web-components/tabs/sp-tabs-overflow.js';
```

To utilize the `TabsOverflow` base class as a type or for extending its functionality, utilize the following method:

```
import { TabsOverflow } from '@spectrum-web-components/tabs';
```

## Example

To use the `<sp-tabs-overflow>` component, simply wrap it around the `<sp-tabs>` element as a child element:

```html
<div class="container" style="max-width: 250px">
    <sp-tabs-overflow>
        <sp-tabs selected="1" size="m">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            <sp-tab label="Tab 5" value="5"></sp-tab>
            <sp-tab label="Tab 6" value="6"></sp-tab>
            <sp-tab label="Tab 7" value="7"></sp-tab>
            <sp-tab label="Tab 8" value="8"></sp-tab>
            <sp-tab-panel value="1">Content for Tab 1</sp-tab-panel>
            <sp-tab-panel value="2">Content for Tab 2</sp-tab-panel>
            <sp-tab-panel value="3">Content for Tab 3</sp-tab-panel>
            <sp-tab-panel value="4">Content for Tab 4</sp-tab-panel>
            <sp-tab-panel value="5">Content for Tab 5</sp-tab-panel>
            <sp-tab-panel value="6">Content for Tab 6</sp-tab-panel>
            <sp-tab-panel value="7">Content for Tab 7</sp-tab-panel>
            <sp-tab-panel value="8">Content for Tab 8</sp-tab-panel>
        </sp-tabs>
    </sp-tabs-overflow>
</div>
```
