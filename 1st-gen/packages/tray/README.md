## Overview

`<sp-tray>` elements are typically used to portray information on mobile device or smaller screens.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tray?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tray)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tray?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tray)

```zsh
yarn add @spectrum-web-components/tray
```

Import the side effectful registration of `<sp-tray>` via:

```js
import '@spectrum-web-components/tray/sp-tray.js';
```

When looking to leverage the `Tray` base class as a type and/or for extension purposes, do so via:

```js
import { Tray } from '@spectrum-web-components/tray';
```

### Anatomy

A tray has a single default `slot`. Expected content typically includes dialogs and their content, plain text, forms and/or form elements, and some native HTML elements. Always ensure that your tray's content is accessible according to WCAG standards.

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">Toggle tray</sp-button>
    <sp-tray slot="click-content">
        <sp-dialog size="s" dismissable>
            <h2 slot="heading">New Messages</h2>
            You have 5 new messages.
        </sp-dialog>
    </sp-tray>
</overlay-trigger>
```

### Accessibility

`<sp-tray>` presents a page blocking experience and should be opened with the `Overlay` API using the `modal` interaction to ensure that the content appropriately manages the presence of other content in the tab order of the page and the availability of that content for a screen reader.

#### Auto-detection behavior

By default, `<sp-tray>` automatically detects whether its slotted content includes keyboard-accessible dismiss buttons (like `<sp-button>`, `<sp-close-button>`, or HTML `<button>` elements). When no dismiss buttons are found, the tray renders visually hidden dismiss buttons before and after its content to support mobile screen readers, particularly VoiceOver on iOS where users navigate through interactive elements sequentially.

These built-in dismiss buttons:

- Are visually hidden but accessible to screen readers
- Allow mobile screen reader users to easily dismiss the tray from either the beginning or end of the content
- Are labeled "Dismiss" for clear screen reader announcements

This dismiss helper pattern is also implemented in the [`<sp-picker>`](https://opensource.adobe.com/spectrum-web-components/components/picker/) component, which uses the same approach when rendering menu content in a tray on mobile devices.

<sp-tabs selected="auto" auto label="Dismiss helper examples">
<sp-tab value="auto">Content has no buttons</sp-tab>
<sp-tab-panel value="auto">

This example shows the default behavior where the tray automatically detects that the content lacks dismiss buttons and renders visually hidden helpers. Screen readers will announce them as "Dismiss, button" and these helpers are keyboard accessible.

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">
        Toggle tray content
    </sp-button>
    <sp-tray slot="click-content">
        <div style="display: flex; flex-direction: column; margin: 16px;">
            <p style="margin-block-start: 0;">
                Custom content that doesn't have dismiss functionality, so the
                tray detects it needs the visually-hidden dismiss buttons.
            </p>
            <label>
                What's your favorite Super Mario character?
                <select
                    name="favorite-characters"
                    style="margin-block-start: 8px;"
                >
                    <option value="">
                        Choose your favorite Super Mario character.
                    </option>
                    <option value="mario">Mario</option>
                    <option value="luigi">Luigi</option>
                    <option value="toad">Toad</option>
                    <option value="bowser">Bowser</option>
                </select>
            </label>
        </div>
    </sp-tray>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="with-buttons">Content has buttons</sp-tab>
<sp-tab-panel value="with-buttons">

This example shows auto-detection recognizing that the dialog has its own dismiss functionality, so no additional helpers are rendered.

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">
        Toggle dialog content
    </sp-button>
    <sp-tray slot="click-content">
        <sp-dialog size="s" dismissable>
            <h2 slot="heading">New messages</h2>
            You have 5 new messages.
        </sp-dialog>
    </sp-tray>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="force-hide">Manual override</sp-tab>
<sp-tab-panel value="force-hide">

Set `has-keyboard-dismiss` (or `has-keyboard-dismiss="true"`) to prevent the tray from rendering visually hidden dismiss helpers, even when no buttons are detected. You are then responsible for ensuring that your tray content has keyboard-accessible dismiss functionality.

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger" variant="secondary">
        Toggle without helpers
    </sp-button>
    <sp-tray slot="click-content" has-keyboard-dismiss>
        <p style="margin: 16px;">
            Custom content that should have custom dismiss functionality, even
            though the tray didn't detect buttons in this slot.
        </p>
    </sp-tray>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>
