## Overview

The `<sp-alert-banner>` displays pressing and high-signal messages, such as system alerts. It is intended to be noticeable and prompt users to take action.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/alert-banner?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/alert-banner)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/alert-banner?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/alert-banner)

```bash
yarn add @spectrum-web-components/alert-banner
```

Import the side effectful registration of `<sp-alert-banner>` via:

```javascript
import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
```

### Anatomy

The alert dialog consists of several key parts:

#### Content

The message in its default slot.

```html
<sp-alert-banner open>
    All documents in this folder have been archived
</sp-alert-banner>
```

#### Buttons

An optional action using `slot="action"`:

```html
<sp-alert-banner open>
    Your trial has expired
    <sp-button treatment="outline" static-color="white" slot="action">
        Buy now
    </sp-button>
</sp-alert-banner>
<bd></bd>
```

### Options

#### Dismissable

Use the `dismissible` attribute to include an icon-only close button used to dismiss the alert banner:

```html
<sp-alert-banner open dismissible>
    All documents in this folder have been archived
</sp-alert-banner>
```

#### Variants

The `<sp-alert-banner>` supports different variants to convey the nature of the message:

<sp-tabs selected="info" auto label="Variants">
<sp-tab value="info">Info</sp-tab>
<sp-tab-panel value="info">

Use `variant="info"` for informational messages.

```html
<sp-alert-banner open variant="info" dismissible>
    Your trial will expire in 3 days
    <sp-button treatment="outline" static-color="white" slot="action">
        Buy now
    </sp-button>
</sp-alert-banner>
```

</sp-tab-panel>
<sp-tab value="negative">Negative</sp-tab>
<sp-tab-panel value="negative">

Use `variant="negative"` for error or warning messages.

```html
<sp-alert-banner open variant="negative" dismissible>
    Connection interrupted. Check your network to continue
</sp-alert-banner>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

Alert banners should be used for system-level messages and they should be dismissed only as a result of a user action or if the internal state that triggered the alert has been resolved.

The alert can be dismissed by triggering the close button in case of a dismissible alert. It also exposes a public `close` method to allow consumers to close the alert programmatically.

The component dispatches a `close` event to announce that the alert banner has been closed. This can be prevented by using the `event.preventDefault()` API.

### Accessibility

The `<sp-alert-banner>` is rendered with a `role` of `alert` to notify screen readers.

Ensure the alert is placed in a container with a `role` of `region` for better accessibility.

It supports keyboard interactions, including:

-   <kbd>Tab</kbd>: Navigate to the next interactive element. Navigate to the next interactive element.
-   <kbd>Shift + Tab</kbd>: Navigate to the previous interactive element.
-   <kbd>Space</kbd>/<kbd>Enter</kbd>: Trigger the focused button.
-   <kbd>Esc</kbd>: Dismiss a dismissible alert.
-   <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd><kbd>ArrowUp</kbd><kbd>ArrowDown</kbd>: Once focus is on the alert banner, arrow keys can be used to navigate between the close button and the slotted action buttons.
