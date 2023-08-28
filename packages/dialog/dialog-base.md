## Description

`sp-dialog-base` accepts slotted dialog content (often an `<sp-dialog>`) and presents that content in a container that is animated into place when toggling the `open` attribute. In concert with the [Overlay API](../overlay) or [Overlay Trigger](../overlay-trigger), the provided dialog content will be displayed over the rest of the page. Leverage the `interaction = modal` and `receivesFocus = 'auto'` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/MLYDVWpWhNxJZDW3Ywqq/src/index.ts)

```
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog-base>` via:

```
import '@spectrum-web-components/dialog/sp-dialog-base.js';
```

When looking to leverage the `DialogBase` base class as a type and/or for extension purposes, do so via:

```
import { DialogBase } from '@spectrum-web-components/dialog';
```

## Example

```html
<overlay-trigger type="modal">
    <sp-dialog-base underlay slot="click-content">
        <sp-dialog size="s">
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

## Dialog

`sp-dialog-base` expects a single slotted child element to play the role of the dialog that it will deliver within your application. When leveraging it as a base class be sure to customize the `dialog` getter to ensure that it acquires the appropriate element for your use case in order to correctly pass focus into your content when the dialog is opened.
