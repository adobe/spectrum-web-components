## Description

An `<sp-tab-panel>` contains the content that will be displayed when an `<sp-tab>` becomes `selected`. An `<sp-tab-panel>` can be associated with an `<sp-tab>` by sharing the same `value` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/2JFFTBPXfCZpePD0wk58/src/index.ts)

```
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tab-panel>` via:

```
import '@spectrum-web-components/tabs/sp-tab-panel.js';
```

When looking to leverage the `TabPanel` base class as a type and/or for extension purposes, do so via:

```
import {
    TabPanel,
} from '@spectrum-web-components/tabs';
```

## Examples

```html
<sp-tabs selected="1">
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

## Customizing transitions

The state of the `<sp-tab-panel>` is reflected to the boolean `selected` attribute, which can be used to customize the transition between panels when the selection changes.

```html
<style>
    sp-tabs {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: auto 1fr;
    }
    sp-tab-panel {
        grid-area: 1/2/1/2;
        transition: opacity 0.5s ease-in-out 0s, transform 0.5s ease-in-out 0s;
        opacity: 1;
        height: 100%;
        position: relative;
        z-index: 2;
    }
    sp-tab-panel:not([selected]) {
        transition: opacity 0.5s ease-in-out 0s, height 0s ease-in-out 0.5s,
            transform 0.5s ease-in-out 0s;
        display: block;
        opacity: 0;
        height: 0;
        transform: translateX(20px);
        z-index: 2;
    }
</style>
<sp-tabs selected="1" direction="vertical">
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
