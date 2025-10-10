## Overview

`DialogBase` is a foundational class that handles the core functionality of displaying and managing dialog content in an overlay. This base class provides the foundation for more specific dialog implementations like [`sp-dialog`](./dialog) and [`sp-dialog-wrapper`](./dialog-wrapper), handling the core functionality while allowing those implementations to focus on their specific features.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)

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

The `sp-dialog-base` element is a wrapper that provides animation and positioning for the dialog content.

The dialog base manages several behaviors:

1. Animation of the dialog content when opening/closing
2. Focus management when the dialog opens
3. Event handling for closing the dialog

Use `DialogBase` when:

- You need to present important information that requires user acknowledgment
- You're building a modal interface that blocks interaction with the page
- You need a structured container with features like backdrop/underlay
- Your content is complex and requires formal layout with headings, content sections, and actions

Use an [`sp-popover`](./popover) when:

- You need a lightweight, contextual container that's positioned relative to a trigger element
- You want to display simple content like menus, tooltips, or additional options
- You're building a non-modal interface where users can still interact with the page
- You need an element with an arrow/tip pointing to the trigger

```html
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

### Options

#### Underlay

The `underlay` attribute can be used to add an underlay element between the page content and the dialog.

<sp-tabs selected="underlay" auto label="Underlay options">
    <sp-tab value="underlay">With underlay</sp-tab>
    <sp-tab-panel value="underlay">

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="no-underlay">Without underlay</sp-tab>
<sp-tab-panel value="no-underlay">

```html
<overlay-trigger type="modal">
    <sp-dialog-base slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

#### Dismissable

The `dismissable` attribute can be used to add an underlay element between the page content and the dialog.

<sp-tabs selected="dismissable" auto label="Dismissable options">
    <sp-tab value="dismissable">Dismissable</sp-tab>
    <sp-tab-panel value="dismissable">

```html
<overlay-trigger type="modal">
    <sp-dialog-base dismissable slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="not-dismissable">Not dismissable</sp-tab>
<sp-tab-panel value="not-dismissable">

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

#### Mode

The dialog base supports different display modes: `fullscreen` and `fullscreenTakeover`.

<sp-tabs selected="fullscreen" auto label="Mode attribute options">
    <sp-tab value="fullscreen">Fullscreen</sp-tab>
    <sp-tab-panel value="fullscreen">

```html
<overlay-trigger type="modal">
    <sp-dialog-base mode="fullscreen" slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="fullscreen-takeover">Fullscreen Takeover</sp-tab>
<sp-tab-panel value="fullscreen-takeover">

```html
<overlay-trigger type="modal">
    <sp-dialog-base mode="fullscreenTakeover" slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

### Extending `DialogBase`

Extend the dialog base to create a new component that uses the same base functionality but with additional features.

`sp-dialog-base` expects a single slotted child element to play the role of the dialog that it will deliver within your application. When leveraging it as a base class be sure to customize the `dialog` getter to ensure that it acquires the appropriate element for your use case in order to correctly pass focus into your content when the dialog is opened.

See [`DialogWrapper.ts`](https://github.com/adobe/spectrum-web-components/blob/main/packages/dialog/src/DialogWrapper.ts) for an example component that extends the dialog base.

```ts
import { DialogBase } from '@spectrum-web-components/dialog';

export class MyCustomDialogWrapper extends DialogBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles];

    protected override renderDialog(): TemplateResult {
        return html`
            <my-custom-dialog>
                <slot></slot>
            </my-custom-dialog>
        `;
    }

    protected override get dialog(): Dialog {
        return this.shadowRoot.querySelector('my-custom-dialog') as Dialog;
    }
}
```

### Accessibility

#### Include a heading

The `heading` slot is of the `sp-dialog` dialog element is used to label the dialog content for screen readers.

#### Manage focus

The dialog base component ensures proper focus management by:

- Moving focus into the dialog when opened
- Trapping tab order within the dialog while open
- Returning focus to the trigger element when closed

The `receives-focus` attribute can be used to control whether the dialog should receive focus when it is opened. Leverage the `type="modal"` and `receives-focus="auto"` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

The `receives-focus` attribute on `overlay-trigger` has three possible values:

- `auto` (default): Focus will automatically move to the first focusable element in the dialog
- `true`: Forces focus to move to the overlay content
- `false`: Prevents focus from moving to the overlay

```html
<overlay-trigger type="modal" receives-focus="true">
    <sp-dialog-base mode="fullscreenTakeover" slot="click-content">
        <sp-dialog>
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <sp-button
                variant="secondary"
                treatment="fill"
                slot="button"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Ok
            </sp-button>
        </sp-dialog>
    </sp-dialog-base>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```
