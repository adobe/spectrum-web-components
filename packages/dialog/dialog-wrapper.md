## Overview

`sp-dialog-base` accepts slotted dialog content (often an `<sp-dialog>`) and presents that content in a container that is animated into place when toggling the `open` attribute. In concert with the [Overlay API](../overlay) or [Overlay Trigger](../overlay-trigger), the provided dialog content will be displayed over the rest of the page.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/MLYDVWpWhNxJZDW3Ywqq/src/index.ts)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog-base>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog-base.js';
```

When looking to leverage the `DialogBase` base class as a type and/or for extension purposes, do so via:

```ts
import { DialogBase } from '@spectrum-web-components/dialog';
```

### Anatomy

The dialog base consists of a single default slot that expects an [`sp-dialog` element](./dialog) to be provided. The dialog base manages the presentation and animation of this content.

```html
<overlay-trigger type="modal">
    <sp-dialog-base slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
            <sp-checkbox slot="footer">Don't show me this again</sp-checkbox>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

### Options

#### Sizes

The dialog wrapper supports different sizes via the `size` attribute: `s`, `m`, `l`.

<sp-tabs selected="m" auto label="Size attribute options">
    <sp-tab value="s">Small</sp-tab>
    <sp-tab-panel value="s">

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content" size="s">
        <sp-dialog size="s" dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content" size="m">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content" size="l">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

#### Underlay

The `underlay` attribute can be used to add an underlay element between the page content and the dialog.

```html
</style>
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
            <sp-checkbox slot="footer">Don't show me this again</sp-checkbox>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

#### Dismissable

The `dismissable` attribute can be used to add an underlay element between the page content and the dialog.

```html
</style>
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

#### Mode

The dialog base supports different display modes:

##### Fullscreen Mode

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay mode="fullscreen" slot="click-content">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

##### Fullscreen Takeover Mode

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay mode="fullscreenTakeover" slot="click-content">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

### Behaviors

The dialog base manages several behaviors:

1. Animation of the dialog content when opening/closing
2. Focus management when the dialog opens
3. Event handling for closing the dialog

#### Receives focus

The `receives-focus` attribute can be used to control whether the dialog should receive focus when it is opened. Leverage the `type="modal"` and `receives-focus="auto"` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

```html
<overlay-trigger type="modal" receives-focus="auto">
    <sp-dialog-base underlay mode="fullscreenTakeover" slot="click-content">
        <sp-dialog dismissable>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

### Accessibility

The dialog base component ensures proper focus management by:

-   Moving focus into the dialog when opened
-   Trapping tab order within the dialog while open
-   Returning focus to the trigger element when closed

See the [Dialog](./dialog) component for more information on the accessibility features of the dialog content.
