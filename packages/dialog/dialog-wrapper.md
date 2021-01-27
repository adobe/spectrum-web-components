## Description

`sp-dialog-wrapper` supplies an attribute based interface for the managed custmization of an `sp-dialog` element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an `sp-underlay` element between your page content and the `sp-dialog` that opens over it.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)

```
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog-wrapper>` via:

```
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
```

When looking to leverage the `DialogWrapper` base class as a type and/or for extension purposes, do so via:

```
import { DialogWrapper } from '@spectrum-web-components/dialog';
```

## Example

### Small

```html
<overlay-trigger type="modal" placement="none">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        dismissable
        underlay
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

### Fullscreen Mode

```html
<overlay-trigger type="modal" placement="none">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        mode="fullscreen"
        confirm-label="Keep Both"
        secondary-label="Replace"
        cancel-label="Cancel"
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button
        slot="trigger"
        variant="primary"
        onClick="
            const overlayTrigger = this.parentElement;
            const dialogWrapper = overlayTrigger.clickContent;
            function handleEvent({type}) {
                spAlert(this, `<sp-dialog-wrapper> '${type}' event handled.`);
                dialogWrapper.open = false;
                dialogWrapper.dispatchEvent(
                    new Event('close', {
                        bubbles: true,
                    })
                );
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

### Fullscreen Takeover Mode

```html
<overlay-trigger type="modal" placement="none">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        mode="fullscreenTakeover"
        confirm-label="Keep Both"
        secondary-label="Replace"
        cancel-label="Cancel"
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button
        slot="trigger"
        variant="primary"
        onClick="
            const overlayTrigger = this.parentElement;
            const dialogWrapper = overlayTrigger.clickContent;
            dialogWrapper.open = true;
            function handleEvent({type}) {
                spAlert(this, `<sp-dialog-wrapper> '${type}' event handled.`);
                dialogWrapper.open = false;
                dialogWrapper.dispatchEvent(
                    new Event('close', {
                        bubbles: true,
                    })
                );
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
