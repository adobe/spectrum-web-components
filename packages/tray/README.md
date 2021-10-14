## Description

`<sp-tray>` elements are typically used to portray information on mobile device or smaller screens.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@future-ui/tray?style=for-the-badge)](https://www.npmjs.com/package/@future-ui/tray)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@future-ui/tray?style=for-the-badge)](https://bundlephobia.com/result?p=@future-ui/tray)

```
yarn add @future-ui/tray
```

Import the side effectful registration of `<sp-tray>` via:

```
import '@future-ui/tray/sp-tray.js';
```

When looking to leverage the `Tray` base class as a type and/or for extension purposes, do so via:

```
import { Tray } from '@future-ui/tray';
```

## Dialog

```html
<sp-button
    variant="secondary"
    onclick="
    const trigger = this;
    const interaction = 'modal';
    const content = this.nextElementSibling;
    const options = {
        offset: 0,
        placement: 'none',
        receivesFocus: 'auto',
    };
    Overlay.open(
        trigger, 
        interaction,
        content,
        options
    );
"
>
    Toggle tray
</sp-button>
<sp-tray>
    <sp-dialog size="small" dismissable>
        <h2 slot="heading">New Messages</h2>
        You have 5 new messages.
    </sp-dialog>
</sp-tray>
```

## Menu

```html
<sp-button
    variant="secondary"
    onclick="
    const trigger = this;
    const interaction = 'modal';
    const content = this.nextElementSibling;
    const options = {
        offset: 0,
        placement: 'none',
        receivesFocus: 'auto',
    };
    Overlay.open(
        trigger, 
        interaction,
        content,
        options
    );
"
>
    Toggle menu
</sp-button>
<sp-tray>
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
```

## Accessibility

`<sp-tray>` presents a page blocking experience and should be opened with the `Overlay` API using the `modal` interaction to ensure that the content appropriately manages the presence of other content in the tab order of the page and the availability of that content for a screen reader.
