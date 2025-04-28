## Overview

`sp-dialog-wrapper` supplies an attribute based interface for the managed customization of an `sp-dialog` element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an `sp-underlay` element between your page content and the `sp-dialog` that opens over it.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/MLYDVWpWhNxJZDW3Ywqq/src/index.ts)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog-wrapper>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
```

When looking to leverage the `DialogWrapper` base class as a type and/or for extension purposes, do so via:

```ts
import { DialogWrapper } from '@spectrum-web-components/dialog';
```

### Anatomy

The dialog wrapper consists of several key parts:

-   A headline (via `headline` attribute)
-   Content (via default slot)
-   Footer content (via `footer` attribute)
-   Optional dismiss button (via `dismissable` attribute)

### Options

#### Size

A small dialog can be created using the default configuration:

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        dismissable
        dismiss-label="Close"
        underlay
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

#### Mode

The dialog wrapper supports different display modes:

##### Fullscreen Mode

```html
<overlay-trigger type="modal">
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

##### Fullscreen Takeover Mode

```html
<overlay-trigger type="modal">
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
            function handleEvent({type}) {
                spAlert(this, `<sp-dialog-wrapper> '${type}' event handled.`);
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

### Accessibility

An `sp-dialog-wrapper` element leverages the `headline` attribute/property to label the dialog content for screen readers. The `headline-visibility` attribute will accept a value of `"none"` to suppress the headline visually.
