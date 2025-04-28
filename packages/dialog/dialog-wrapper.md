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
-   An optional **Confirm** button (via `confirm-label` attribute)
-   An optional **Secondary** button (via `secondary-label` attribute)
-   An optional **Cancel** button (via `cancel-label` attribute)
-   An optional **Dismiss** button (via `dismissable` attribute)

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        confirm-label="Keep Both"
        secondary-label="Replace"
        cancel-label="Cancel"
        footer="Content for footer"
        dismissable
        underlay
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

### Options

#### Size

The dialog wrapper supports different sizes via the `size` attribute: `s`, `m`, `l`.

<sp-tabs selected="m" auto label="Size attribute options">
    <sp-tab value="s">Small</sp-tab>
    <sp-tab-panel value="s">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        size="s"
        slot="click-content"
        headline="Dialog title"
        dismissable
        underlay
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        size="m"
        slot="click-content"
        headline="Dialog title"
        dismissable
        underlay
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        size="l"
        slot="click-content"
        headline="Dialog title"
        dismissable
        underlay
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

#### Underlay

The `underlay` attribute can be used to add an underlay element between the page content and the dialog.

```html
<overlay-trigger type="modal">
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

#### Dismissable

The `dismissable` attribute can be used to add a dismiss button to the dialog. Use the `dismiss-label` attribute to set the label for the dismiss button.

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
        dismissable
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
</overlay-trigger>
```

##### Fullscreen Takeover Mode

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        mode="fullscreenTakeover"
        dismissable
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

### Behaviors

The dialog wrapper manages several behaviors:

1. Animation of the dialog content when opening/closing
2. Focus management when the dialog opens
3. Event handling for closing the dialog
4. Button firing for the **Confirm**, **Secondary**, and **Cancel** buttons.

### Handling events

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        dismissable
        underlay
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
                dialogWrapper.removeEventListener('close', handleEvent);
                dialogWrapper.removeEventListener('confirm', handleEvent);
                dialogWrapper.removeEventListener('secondary', handleEvent);
                dialogWrapper.removeEventListener('cancel', handleEvent);
            }
            dialogWrapper.addEventListener('close', handleEvent);
            dialogWrapper.addEventListener('confirm', handleEvent);
            dialogWrapper.addEventListener('secondary', handleEvent);
            dialogWrapper.addEventListener('cancel', handleEvent);
        "
    >
        Toggle Dialog
    </sp-button>
</overlay-trigger>
```

#### Receives focus

The `receives-focus` attribute can be used to control whether the dialog should receive focus when it is opened. Leverage the `type="modal"` and `receives-focus="auto"` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

```html
<overlay-trigger type="modal" receives-focus="auto">
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

### Accessibility

#### Include a headline

An `sp-dialog-wrapper` element leverages the `headline` attribute/property to label the dialog content for screen readers. The `headline-visibility` attribute will accept a value of `"none"` to suppress the headline visually.

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        headline-visibility="none"
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

#### Focus Management

The dialog wrapper component ensures proper focus management by:

-   Moving focus into the dialog when opened
-   Trapping tab order within the dialog while open
-   Returning focus to the trigger element when closed

See the [Dialog](./dialog) component for more information on the accessibility features of the dialog content.
