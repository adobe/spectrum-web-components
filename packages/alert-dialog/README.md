## Description

`sp-alert-dialog` supplies an attribute based interface for the managed custmization of an `sp-dialog` element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an `sp-underlay` element between your page content and the `sp-dialog` that opens over it.

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
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="confirmation"
        slot="click-content"
        headline="Enable Smart Filters?"
        confirm-label="Enable"
        cancel-label="Cancel"
        underlay
    >
        Smart filters are nondestructive and will preserve your original images.
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

### Information

Information alert dialogs communicate important information that a user needs to acknowledge. Before using this kind of alert dialog, make sure it’s the appropriate communication channel for the message instead of a toast or a more lightweight messaging option.

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="information"
        slot="click-content"
        headline="Connect to wifi"
        secondary-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        Please connect to wifi to sync your projects or go to Settings to change
        your prefernces.
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

### Warning

Warning alert dialogs communicate important information to users in relation to an issue that needs to be acknowledged, but does not block the user from moving forward.

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="warning"
        slot="click-content"
        headline="Unverified format"
        secondary-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        This format has not been verified and may not be viewable for some
        users. Do you want to continue publishing?
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

### Error

Error alert dialogs communicate critical information about an issue that a user needs to acknowledge.

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="error"
        slot="click-content"
        headline="Unable to share"
        secondary-label="Continue"
        underlay
    >
        An error occured while sharing your project. Please verify the email
        address and try again.
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

### Destructive

Destructive alert dialogs are for when a user needs to confirm an action that will impact their data or experience in a potentially negative way, such as deleting files or contacts.

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="destructive"
        slot="click-content"
        headline="Delete 3 documents?"
        confirm-label="Delete"
        cancel-label="Cancel"
        underlay
    >
        Are you sure you want to delete the 3 selected documents?
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

### Secondary Button

An alert dialog can have a total of 3 buttons if the secondary outline button label is defined.

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="secondary"
        slot="click-content"
        headline="Rate this app"
        secondary-label="Rate now"
        cancel-label="Remind me later"
        cancel-label="No, thanks"
        underlay
    >
        If you enjoy our app, would you mind taking a moment to rate it?
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

### Scroll

```html
<overlay-trigger type="modal" placement="none">
    <sp-alert-dialog
        variant="scroll"
        slot="click-content"
        headline="Lorem Ipsum"
        secondary-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        ultrices est eu lacus interdum, vitae volutpat tortor laoreet. Phasellus
        consectetur erat quis massa congue, vel placerat ipsum hendrerit. Aenean
        eleifend augue quam, quis blandit lacus pretium eget. Aliquam aliquam
        fermentum nunc, sed dictum metus varius in. Suspendisse in nisl libero.
        Nulla egestas massa eget lectus ullamcorper placerat. Vivamus cursus,
        nunc quis pharetra auctor, eros mi tempus elit, sit amet placerat ipsum
        velit ut dolor. Nam sit amet eleifend erat. Duis sollicitudin orci sit
        amet tellus tincidunt, vel lobortis risus pellentesque. Integer viverra
        urna elementum metus dignissim placerat. Nulla posuere eros ipsum.
        Pellentesque viverra urna justo, eu ultricies nisl fermentum et. Vivamus
        tristique porttitor dictum. Vestibulum faucibus hendrerit urna vitae
        eleifend. Aliquam suscipit ipsum et nulla bibendum imperdiet. Sed
        euismod est id mauris pretium, ut fringilla est facilisis. Sed tempus
        dignissim dui non condimentum. Nam et felis mauris. Proin tempus
        imperdiet neque, ac sagittis urna posuere et. Interdum et malesuada
        fames ac ante ipsum primis in faucibus. Cras pulvinar justo metus, sed
        porttitor tortor porta vel. Cras ultrices lectus non orci dictum auctor.
        Praesent quis augue vel tortor finibus ultricies at aliquet purus. Fusce
        eget convallis risus. Proin imperdiet urna ligula, at scelerisque eros
        vestibulum ut. Proin imperdiet ultricies turpis, eu vestibulum metus
        congue ut. Etiam commodo hendrerit diam, at luctus leo. Donec vitae erat
        id enim semper posuere. Nullam blandit condimentum lacus ac laoreet.
        Suspendisse aliquet erat id maximus porttitor. Quisque auctor dolor ac
        gravida tincidunt. Proin vitae dignissim elit. Ut a neque nisi. Nullam
        fermentum, neque ac pulvinar laoreet, augue nisi hendrerit ligula, a
        dapibus magna urna ac leo. Vivamus augue ex, aliquet sed sagittis vel,
        vulputate ac leo. Quisque ac euismod magna. Maecenas auctor nisl a
        sagittis dapibus. Donec semper lorem magna, ac commodo neque imperdiet
        id. Curabitur in luctus lorem, sed fringilla magna. Pellentesque ac urna
        eleifend, porttitor ex pharetra, congue purus. Vestibulum aliquam
        finibus urna sed egestas. Curabitur justo enim, pretium ut nulla vitae,
        hendrerit vehicula orci. Duis vel odio sed nunc accumsan vestibulum in
        ac felis. Nam ultrices eleifend lorem at viverra. Fusce dictum ligula
        dui, at mattis augue elementum id. Pellentesque non risus augue. Nulla
        porta laoreet erat sed pulvinar. Proin rutrum facilisis interdum.
        Integer orci odio, tincidunt et egestas a, ullamcorper dapibus sapien.
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

## Accessibility

An `<sp-toast>` element is by default rendered with a `role` of `alert`. When rendering the `<sp-toast>` to a page, it should be place in a container with a `role` of `region`.
