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
-   **Content:** Alert dialogs can include a description using the default slot. A description briefly communicates any additional information or context that a user needs to know to continue with an action
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

#### Buttons

Use `slot="button"` to render your action button(s) that allow users to respond

-   An alert dialog must have one primary action button (with `variant="secondary"`) with the option to include a secondary action and/or a cancel action.
-   Non-primary action buttons should be `variant="secondary"` and `treatment: "outline"`.
-   The three buttons should be rendered in the DOM in the following order:
    -   **Cancel action:** Offers an option to go back and cancel the action.
    -   **Secondary action:** Offers a secondary action. e.g. "Remind me later"
    -   **Primary action:** The first (right-most) button communicates what the button will do if selected, or to acknowledge and dismiss the dialog. Check [variants](#variants) for the correct primary button styling.

```html
<sp-alert-dialog variant="information">
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
        treatment="outline"
        onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
    >
        Delete
    </sp-button>
</sp-alert-dialog>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Context

An alert dialog should be placed inside a model overaly:

```html
<sp-button id="trigger">open modal</sp-button>
<sp-overlay trigger="trigger@click" type="modal">
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
</sp-overlay>
```

### Accessibility

When implementing an alert dialog:

-   Use concise, meaningful dialog title that clearly states the purpose
-   Uses semantic heading elements (`<h2>`) for the dialog title
-   Ensure button labels clearly indicate the action they will perform
-   Provides clear, concise content that explains the situation and required actions
-   Consider the appropriate variant based on the message's importance and urgency
