## Overview

`<sp-alert-dialog>` displays important information that users need to acknowledge. When used directly, the `<sp-alert-dialog>` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/alert-dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/alert-dialog)

```bash
yarn add @spectrum-web-components/alert-dialog
```

Import the side effectful registration of `<sp-alert-dialog>` via:

```javascript
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
```

When looking to leverage the `AlertDialog` base class as a type and/or for extension purposes, do so via:

```javascript
import { AlertDialog } from '@spectrum-web-components/alert-dialog';
```

### Anatomy

The alert dialog consists of several key parts:

-   **Title:** All alert dialogs must have a title, using `slot="heading"`, that uses a few words to convey the outcome of what will happen if a user continues with an action
-   Content, using the default slot, that provides additional context
-   Action buttons, using `slot="button"`, that allow users to respond

```html
<sp-alert-dialog variant="confirmation">
    <h2 slot="heading">Important Notice</h2>
    <p>This action requires your confirmation.</p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        variant="accent"
        treatment="fill"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Confirm
    </sp-button>
</sp-alert-dialog>
```

### Options

#### Variants

The alert dialog supports `confirmation`, `information`, `warning`, `error`, and `destructive` variants to convey the nature and importance of the message:

<sp-tabs selected="confirmation" auto label="Variants">
<sp-tab value="confirmation">Confirmation</sp-tab>
<sp-tab-panel value="confirmation">

Confirmation is the default variant for alert dialogs. Use a confirmation variant for asking a user to confirm a choice.

```html
<sp-alert-dialog variant="confirmation">
    <h2 slot="heading">Disclaimer</h2>
    <p>
        Smart filters are nondestructive and will preserve your original images.
    </p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        variant="accent"
        treatment="fill"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Enable
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
<sp-tab value="information">Information</sp-tab>
<sp-tab-panel value="information">

Information alert dialogs communicate important information that a user needs to acknowledge. Before using this kind of alert dialog, make sure it’s the appropriate communication channel for the message instead of a toast or a more lightweight messaging option.

```html
<sp-alert-dialog variant="information">
    <h2 slot="heading">Connect to wifi</h2>
    <p>
        Please connect to wifi to sync your projects or go to Settings to change
        your preferences.
    </p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
<sp-tab value="warning">Warning</sp-tab>
<sp-tab-panel value="warning">

Warning alert dialogs communicate important information to users in relation to an issue that needs to be acknowledged, but does not block the user from moving forward.

```html
<sp-alert-dialog variant="warning">
    <h2 slot="heading">Unverified format</h2>
    <p>
        This format has not been verified and may not be viewable for some
        users. Do you want to continue publishing?
    </p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
<sp-tab value="error">Error</sp-tab>
<sp-tab-panel value="error">

Error alert dialogs communicate critical information about an issue that a user needs to acknowledge.

```html
<sp-alert-dialog variant="error">
    <h2 slot="heading">Unable to share</h2>
    <p>
        An error occurred while sharing your project. Please verify the email
        address and try again.
    </p>
    <sp-button
        slot="button"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Continue
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
<sp-tab value="destructive">Destructive</sp-tab>
<sp-tab-panel value="destructive">

Destructive alert dialogs are for when a user needs to confirm an action that will impact their data or experience in a potentially negative way, such as deleting files or contacts.

```html
<sp-alert-dialog variant="destructive">
    <h2 slot="heading">Delete 3 documents?</h2>
    <p>Are you sure you want to delete the 3 selected documents?</p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Cancel
    </sp-button>
    <sp-button
        slot="button"
        variant="negative"
        treatment="fill"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Delete
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Multiple Buttons

An alert dialog can have up to three buttons when additional options are needed. Use `slot="button"`. Ideally only one button should be `variant="primary"`, and the others `variant="secondary"`.

```html
<sp-alert-dialog variant="secondary">
    <h2 slot="heading">Rate this app</h2>
    <p>If you enjoy our app, would you mind taking a moment to rate it?</p>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        No, thanks
    </sp-button>
    <sp-button
        slot="button"
        variant="secondary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Remind me later
    </sp-button>
    <sp-button
        slot="button"
        variant="primary"
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Rate now
    </sp-button>
</sp-alert-dialog>
```

### Accessibility

The `<sp-alert-dialog>` component follows these accessibility guidelines:

-   Uses semantic heading elements (`<h2>`) for the dialog title
-   Ensures all buttons have clear, descriptive labels
-   Supports keyboard navigation:
    -   <kbd>Tab</kbd>: Move focus between buttons
    -   <kbd>Space</kbd>/<kbd>Enter</kbd>: Activate the focused button
    -   <kbd>Esc</kbd>: Close the dialog
-   Maintains proper focus management when opened and closed
-   Uses ARIA roles and attributes appropriately:
    -   `role="alertdialog"` for critical messages
    -   `role="dialog"` for non-critical messages
-   Provides clear, concise content that explains the situation and required actions

When implementing an alert dialog:

-   Use concise, meaningful headings that clearly state the purpose
-   Ensure button labels clearly indicate the action they will perform
-   Provide enough context in the content area for users to make informed decisions
-   Consider the appropriate variant based on the message's importance and urgency
