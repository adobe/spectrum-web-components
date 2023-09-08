## Description

`sp-alert-dialog` displays important information that users need to acknowledge. When used directly the `sp-alert-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

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

## Variants

### Confirmation

This is the default variant for alert dialogs. Use a confirmation variant for asking a user to confirm a choice.

```html
<sp-alert-dialog variant="confirmation">
    <h2 slot="heading">Disclaimer</h2>
    Smart filters are nondestructive and will preserve your original images.
    <sp-button
        slot="button"
        id="cancelButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        id="confirmButton"
        variant="accent"
        treatment="fill"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Enable
    </sp-button>
</sp-alert-dialog>
```

### Information

Information alert dialogs communicate important information that a user needs to acknowledge. Before using this kind of alert dialog, make sure it’s the appropriate communication channel for the message instead of a toast or a more lightweight messaging option.

```html
<sp-alert-dialog variant="information">
    <h2 slot="heading">Connect to wifi</h2>
    Please connect to wifi to sync your projects or go to Settings to change
    your preferences.
    <sp-button
        slot="button"
        id="cancelButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        id="confirmButton"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

### Warning

Warning alert dialogs communicate important information to users in relation to an issue that needs to be acknowledged, but does not block the user from moving forward.

```html
<sp-alert-dialog variant="warning">
    <h2 slot="heading">Unverified format</h2>
    This format has not been verified and may not be viewable for some users. Do
    you want to continue publishing?
    <sp-button
        slot="button"
        id="cancelButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        id="confirmButton"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

### Error

Error alert dialogs communicate critical information about an issue that a user needs to acknowledge.

```html
<sp-alert-dialog variant="error">
    <h2 slot="heading">Unable to share</h2>
    An error occured while sharing your project. Please verify the email address
    and try again.
    <sp-button
        slot="button"
        id="confirmButton"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

### Destructive

Destructive alert dialogs are for when a user needs to confirm an action that will impact their data or experience in a potentially negative way, such as deleting files or contacts.

```html
<sp-alert-dialog variant="destructive">
    <h2 slot="heading">Delete 3 documents?</h2>
    Are you sure you want to delete the 3 selected documents?
    <sp-button
        slot="button"
        id="cancelButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        id="confirmButton"
        variant="negative"
        treatment="fill"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Delete
    </sp-button>
</sp-alert-dialog>
```

### Secondary Button

An alert dialog can have a total of 3 buttons if the secondary outline button label is defined.

```html
<sp-alert-dialog variant="secondary">
    <h2 slot="heading">Rate this app</h2>
    If you enjoy our app, would you mind taking a moment to rate it?
    <sp-button
        slot="button"
        id="secondaryButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        No, thanks
    </sp-button>
    <sp-button
        slot="button"
        id="cancelButton"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Remind me later
    </sp-button>
    <sp-button
        slot="button"
        id="confirmButton"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Rate now
    </sp-button>
</sp-alert-dialog>
```
