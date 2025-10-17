## Overview

`<sp-tray>` elements are typically used to portray information on mobile device or smaller screens.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tray?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tray)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tray?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tray)

```bash
yarn add @spectrum-web-components/tray
```

Import the side effectful registration of `<sp-tray>` via:

```js
import '@spectrum-web-components/tray/sp-tray.js';
```

When looking to leverage the `Tray` base class as a type and/or for extension purposes, do so via:

```js
import { Tray } from '@spectrum-web-components/tray';
```

### Anatomy

A tray has a single default `slot`.

<sp-tabs selected="dialog" auto label="Using tray's slot">
<sp-tab value="dialog">Dialog</sp-tab>
<sp-tab-panel value="dialog">

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">Toggle tray</sp-button>
    <sp-tray slot="click-content">
        <sp-dialog size="s" dismissable>
            <h2 slot="heading">New Messages</h2>
            You have 5 new messages.
        </sp-dialog>
    </sp-tray>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="menu">Menu</sp-tab>
<sp-tab-panel value="menu">

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">Toggle menu</sp-button>
    <sp-tray slot="click-content">
        <sp-menu style="width: 100%">
            <sp-menu-item selected>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item focused>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    </sp-tray>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

`<sp-tray>` presents a page blocking experience and should be opened with the `Overlay` API using the `modal` interaction to ensure that the content appropriately manages the presence of other content in the tab order of the page and the availability of that content for a screen reader.

#### Mobile screen reader support

The `<sp-tray>` component automatically includes visually hidden dismiss buttons before and after its content to support mobile screen readers. This is particularly important for VoiceOver on iOS, where users navigate through interactive elements sequentially.

These built-in dismiss buttons:

- Are visually hidden but accessible to screen readers
- Use `tabindex="-1"` to prevent keyboard tab navigation interference
- Allow mobile screen reader users to easily dismiss the tray from either the beginning or end of the content
- Are labeled "Dismiss" for clear screen reader announcements

This dismiss helper pattern is also implemented in the [`<sp-picker>`](https://opensource.adobe.com/spectrum-web-components/components/picker/) component, which uses the same approach when rendering menu content in a tray on mobile devices.

Simply place your content inside the tray - the dismiss buttons are automatically rendered:

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">
        Toggle menu content
    </sp-button>
    <sp-tray slot="click-content">
        <sp-menu style="width: 100%">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
        </sp-menu>
    </sp-tray>
</overlay-trigger>

<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">
        Toggle dialog content
    </sp-button>
    <sp-tray slot="click-content">
        <sp-dialog size="s">
            <h2 slot="heading">New messages</h2>
            You have 5 new messages.
        </sp-dialog>
    </sp-tray>
</overlay-trigger>
```
