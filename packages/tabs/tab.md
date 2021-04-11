## Description

An `<sp-tab>` element surfaces a `label` attribute to serve as its default text content when none is available in the DOM. An icon may be assigned to the element via the `icon` slot; e.g. `<sp-tab><svg slot="icon" aria-label="Tab w/ Icon">...</svg></sp-tab>`. Associate an `<sp-tab>` element with the `<sp-tab-panel>` that represents its content with the `value` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/2JFFTBPXfCZpePD0wk58/src/index.ts)

```
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tab>` via:

```
import '@spectrum-web-components/tabs/sp-tab.js';
```

When looking to leverage the `Tab` base class as a type and/or for extension purposes, do so via:

```
import {
    Tab,
} from '@spectrum-web-components/tabs';
```

## Examples

```html
<sp-tabs selected="1">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab value="2">Tab 2</sp-tab>
    <sp-tab label="Tab 3" value="3">
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab vertical value="4">
        Tab 4
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab-panel value="1">
        Content for Tab 1 which uses an attribute for its content delivery
    </sp-tab-panel>
    <sp-tab-panel value="2">
        Content for Tab 2 which uses its text content directly
    </sp-tab-panel>
    <sp-tab-panel value="3">
        Content for Tab 3 which uses an attribute with a
        <code>[slot="icon"]</code>
        child
    </sp-tab-panel>
    <sp-tab-panel value="4">
        Content for Tab 4 which uses both its text content and a
        <code>[slot="icon"]</code>
        child displayed using the
        <code>[vertical]</code>
        attribute to define their alignment
    </sp-tab-panel>
</sp-tabs>
```

```html
<sp-tabs selected="1" direction="vertical">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab value="2">Tab 2</sp-tab>
    <sp-tab label="Tab 3" value="3">
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab vertical value="4">
        Tab 4
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab-panel value="1">
        Content for Tab 1 which uses an attribute for its content delivery
    </sp-tab-panel>
    <sp-tab-panel value="2">
        Content for Tab 2 which uses its text content directly
    </sp-tab-panel>
    <sp-tab-panel value="3">
        Content for Tab 3 which uses an attribute with a
        <code>[slot="icon"]</code>
        child
    </sp-tab-panel>
    <sp-tab-panel value="4">
        Content for Tab 4 which uses both its text content and a
        <code>[slot="icon"]</code>
        child displayed using the
        <code>[vertical]</code>
        attribute to define their alignment
    </sp-tab-panel>
</sp-tabs>
```
