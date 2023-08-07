## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/alert-dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/alert-dialog)

```
yarn add @spectrum-web-components/alert-dialog
```

Import the side effectful registration of `<sp-alert-dialog>` via:

```
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
```

When looking to leverage the `AlertDialog` base class as a type and/or for extension purposes, do so via:

```
import { AlertDialog } from '@spectrum-web-components/alert-dialog';
```

## Example

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="confirmation"
        slot="click-content"
        headline="Dialog title"
        confirm-label="Keep Both"
        secondary-label="Replace"
        cancel-label="Cancel"
        underlay
    >
        Content of the dialog
    </sp-alert-dialog>
    <sp-button
        slot="trigger"
        variant="primary"
        onClick="
            const overlayTrigger = this.parentElement;
            const dialogWrapper = overlayTrigger.clickContent;
            function handleEvent({type}) {
                spAlert(this, `<sp-alert-dialog> '${type}' event handled.`);
                dialogWrapper.open = false;
                dialogWrapper.removeEventListener('confirm', handleEvent);
                dialogWrapper.removeEventListener('secondary', handleEvent);
                dialogWrapper.removeEventListener('cancel', handleEvent);
            }
            dialogWrapper.addEventListener('confirm', handleEvent);
            dialogWrapper.addEventListener('secondary', handleEvent);
            dialogWrapper.addEventListener('cancel', handleEvent);
        "
    >
        Toggle Dialog
    </sp-button>
</overlay-trigger>
```
