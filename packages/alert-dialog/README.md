## Description

`sp-alert-dialog-wrapper` supplies an attribute based interface for the managed custmization of an `sp-alert-dialog` element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an `sp-underlay` element between your page content and the `sp-alert-dialog` that opens over it.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/alert-dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/alert-dialog)

```
yarn add @spectrum-web-components/alert-dialog
```

Import the side effectful registration of `<sp-alert-dialog-wrapper>` via:

```
import '@spectrum-web-components/alert-dialog/sp-alert-dialog-wrapper.js';
```

When looking to leverage the `AlertDialog` base class as a type and/or for extension purposes, do so via:

```
import { AlertDialog } from '@spectrum-web-components/alert-dialog';
```

## Variants

### Confirmation

This is the default variant for alert dialogs. Use a confirmation variant for asking a user to confirm a choice.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>

    <sp-alert-dialog-wrapper
        variant="confirmation"
        slot="click-content"
        headline="Enable Smart Filters?"
        confirm-label="Enable"
        cancel-label="Cancel"
        underlay
    >
        Smart filters are nondestructive and will preserve your original images.
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Information

Information alert dialogs communicate important information that a user needs to acknowledge. Before using this kind of alert dialog, make sure it’s the appropriate communication channel for the message instead of a toast or a more lightweight messaging option.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="information"
        slot="click-content"
        headline="Connect to wifi"
        confirm-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        Please connect to wifi to sync your projects or go to Settings to change
        your preferences.
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Warning

Warning alert dialogs communicate important information to users in relation to an issue that needs to be acknowledged, but does not block the user from moving forward.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="warning"
        slot="click-content"
        headline="Unverified format"
        confirm-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        This format has not been verified and may not be viewable for some
        users. Do you want to continue publishing?
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Error

Error alert dialogs communicate critical information about an issue that a user needs to acknowledge.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="error"
        slot="click-content"
        headline="Unable to share"
        confirm-label="Continue"
        underlay
    >
        An error occured while sharing your project. Please verify the email
        address and try again.
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Destructive

Destructive alert dialogs are for when a user needs to confirm an action that will impact their data or experience in a potentially negative way, such as deleting files or contacts.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="destructive"
        slot="click-content"
        headline="Delete 3 documents?"
        confirm-label="Delete"
        cancel-label="Cancel"
        underlay
    >
        Are you sure you want to delete the 3 selected documents?
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Secondary Button

An alert dialog can have a total of 3 buttons if the secondary outline button label is defined.

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="secondary"
        slot="click-content"
        headline="Rate this app"
        confirm-label="Rate now"
        cancel-label="Remind me later"
        secondary-label="No, thanks"
        underlay
    >
        If you enjoy our app, would you mind taking a moment to rate it?
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```

### Scroll

```html
<overlay-trigger type="modal">
    <sp-button variant="primary" slot="trigger">Toggle Alert Dialog</sp-button>
    <sp-alert-dialog-wrapper
        variant="scroll"
        slot="click-content"
        headline="Lorem Ipsum"
        confirm-label="Continue"
        cancel-label="Cancel"
        underlay
    >
        <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed ac
            dolor sit amet purus malesuada congue. Donec quis nibh at felis
            congue commodo. Ut enim ad minima veniam, quis nostrum
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
            ex ea commodi consequatur? Sed ac dolor sit amet purus malesuada
            congue. Nam libero tempore, cum soluta nobis est eligendi optio
            cumque nihil impedit quo minus id quod maxime placeat facere
            possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            Nullam sit amet magna in magna gravida vehicula. Itaque earum rerum
            hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
            maiores alias consequatur aut perferendis doloribus asperiores
            repellat. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat
            voluptatem. Phasellus faucibus molestie nisl. Vestibulum fermentum
            tortor id mi. Integer rutrum, orci vestibulum ullamcorper ultricies,
            lacus quam ultricies odio, vitae placerat pede sem sit amet enim.
            Maecenas sollicitudin. Nullam rhoncus aliquam metus.
        </p>
        <p>
            Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel
            sapien. Fusce nibh. Proin pede metus, vulputate nec, fermentum
            fringilla, vehicula vitae, justo. Aenean placerat. Aliquam erat
            volutpat. Et harum quidem rerum facilis est et expedita distinctio.
            Fusce nibh. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Vestibulum erat nulla, ullamcorper nec,
            rutrum non, nonummy ac, erat. Etiam posuere lacus quis dolor. Mauris
            elementum mauris vitae tortor. Nulla turpis magna, cursus sit amet,
            suscipit a, interdum id, felis. Nam libero tempore, cum soluta nobis
            est eligendi optio cumque nihil impedit quo minus id quod maxime
            placeat facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Nulla accumsan, elit sit amet varius semper, nulla
            mauris mollis quam, tempor suscipit diam nulla vel leo. Pellentesque
            sapien.
        </p>
        <p>
            Curabitur vitae diam non enim vestibulum interdum. Sed elit dui,
            pellentesque a, faucibus vel, interdum nec, diam. Praesent vitae
            arcu tempor neque lacinia pretium. Ut tempus purus at lorem.
            Phasellus rhoncus. Temporibus autem quibusdam et aut officiis
            debitis aut rerum necessitatibus saepe eveniet ut et voluptates
            repudiandae sint et molestiae non recusandae. Duis ante orci,
            molestie vitae vehicula venenatis, tincidunt ac pede. Integer
            vulputate sem a nibh rutrum consequat. Aenean placerat. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Sed vel lectus. Donec odio tempus molestie, porttitor
            ut, iaculis quis, sem. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos hymenaeos. Integer in
            sapien. Nullam dapibus fermentum ipsum.
        </p>
        <p>
            Integer vulputate sem a nibh rutrum consequat. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            hymenaeos. Duis bibendum, lectus ut viverra rhoncus, dolor nunc
            faucibus libero, eget facilisis enim ipsum id lacus. Aliquam erat
            volutpat. Aenean id metus id velit ullamcorper pulvinar. Morbi
            scelerisque luctus velit. Aliquam erat volutpat. Temporibus autem
            quibusdam et aut officiis debitis aut rerum necessitatibus saepe
            eveniet ut et voluptates repudiandae sint et molestiae non
            recusandae. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat
            eu, orci. Suspendisse sagittis ultrices augue. Nullam justo enim,
            consectetuer nec, ullamcorper ac, vestibulum in, elit. Praesent
            vitae arcu tempor neque lacinia pretium. Nullam faucibus mi quis
            velit. Maecenas aliquet accumsan leo. Morbi scelerisque luctus
            velit. Aliquam ornare wisi eu metus.
        </p>
        <p>
            Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam.
            Praesent vitae arcu tempor neque lacinia pretium. Etiam dictum
            tincidunt diam. Et harum quidem rerum facilis est et expedita
            distinctio. Duis ante orci, molestie vitae vehicula venenatis,
            tincidunt ac pede. Integer lacinia. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Mauris tincidunt sem sed arcu. Praesent in
            mauris eu tortor porttitor accumsan. Aenean id metus id velit
            ullamcorper pulvinar. Donec iaculis gravida nulla. Duis bibendum,
            lectus ut viverra rhoncus, dolor nunc faucibus libero, eget
            facilisis enim ipsum id lacus. Nulla quis diam. Quisque porta.
            Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam
            ultricies odio, vitae placerat pede sem sit amet enim. Nam sed
            tellus id magna elementum tincidunt. In enim a arcu imperdiet
            malesuada.
        </p>
    </sp-alert-dialog-wrapper>
</overlay-trigger>
```
