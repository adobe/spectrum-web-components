## Overview

`<sp-toast>` elements display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/toast?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/toast)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/toast?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/toast)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-q323vw3s)

```bash
yarn add @spectrum-web-components/toast
```

Import the side effectful registration of `<sp-toast>` via:

```ts
import '@spectrum-web-components/toast/sp-toast.js';
```

When looking to leverage the `Toast` base class as a type and/or for extension purposes, do so via:

```ts
import { Toast } from '@spectrum-web-components/toast';
```

### Anatomy

The toast consists of two key parts:

- The message content in its default slot
- An optional action button using `slot="action"`

#### Content

The message in its default slot:

```html
<sp-toast open>
    This is important information that you should read, soon.
</sp-toast>
```

#### Action Button

An optional action using `slot="action"`:

```html
<sp-toast open>
    This is important information that you should read, soon.
    <sp-button
        slot="action"
        static-color="white"
        variant="secondary"
        treatment="outline"
    >
        Do something
    </sp-button>
</sp-toast>
```

### Options

#### Width and Wrapping

The toast can be constrained to a specific width, and its content will wrap accordingly:

```html
<sp-toast open style="width: 300px">
    This is important information that you should read, soon.
    <sp-button
        slot="action"
        static-color="white"
        variant="secondary"
        treatment="outline"
    >
        Do something
    </sp-button>
</sp-toast>
```

#### Variants

By default, the toast is rendered in gray and does not have an icon. This is used when the message is neutral in tone or when its semantics do not fit in any of the other variants.

However, the toast supports several variants to convey different types of messages:

<sp-tabs selected="negative" auto label="Toast Variants">
<sp-tab value="negative" label="Negative"></sp-tab>
<sp-tab-panel value="negative">

Use `variant="negative"` to show an error or failure.

```html
<sp-toast open variant="negative">
    This is negative information that you should read, soon.
</sp-toast>
```

</sp-tab-panel>
<sp-tab value="positive" label="Positive"></sp-tab>
<sp-tab-panel value="positive">

Use `variant="positive"` to show a successful action or completion of a task.

```html
<sp-toast open variant="positive">
    This is positive information that you should read, soon.
</sp-toast>
```

</sp-tab-panel>
<sp-tab value="info" label="Info"></sp-tab>
<sp-tab-panel value="info">

Use `variant="info"` to show an informative message.

```html
<sp-toast open variant="info">
    This is information that you should read.
</sp-toast>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Timeout

The toast can be configured to automatically dismiss itself after a specified duration. For accessibility reasons, the minimum timeout is 6000ms (6 seconds). For longer messages, it's recommended to add 1000ms for every 120 words.

```html
<sp-toast open timeout="6000">
    This message will disappear after 6 seconds.
</sp-toast>
```

#### Close Events

The toast dispatches a `close` event when it's being closed, either by user action or timeout. This event can be prevented using `event.preventDefault()`.

### Accessibility

#### Keyboard Interaction

The toast supports keyboard navigation:

- When an action button is present, it can be accessed using the <kbd>Tab</kbd> key
- The close button (when present) can be activated using <kbd>Enter</kbd> or <kbd>Space</kbd>

#### Place toasts in a region

The `<sp-toast>` element is rendered with a `role` of `alert` to notify screen readers. When rendering a toast on a page, it should be placed in a container with a `role` of `region` for better accessibility.

```html
<div role="region" aria-label="Toast Notifications">
    <sp-toast open>
        This is important information that you should read, soon.
    </sp-toast>
</div>
```

#### Allow time for reading

Accessibility concerns require that a Toast is available for at least 6000ms before being dismissed.

The toast ensures that messages are visible for a minimum of 6 seconds to give users enough time to read and comprehend the information. For longer messages, the timeout is automatically extended.

It is suggested that messages longer than 120 words should receive an additional 1000ms in their timeout for each additional 120 words in the message.

For example, a message with 240 words should have a timeout of 7000ms, and a message with 360 words should have a timeout of 8000ms.

#### Provide appropriate labels

- The toast's variant icon includes an appropriate `icon-label` for screen readers (e.g., "Information" for info variant)
- Action buttons should have clear, descriptive labels

```html
<sp-toast open variant="negative" icon-label="Warning">
    This is important information that you should read, soon.
    <sp-button
        slot="action"
        static-color="white"
        variant="secondary"
        treatment="outline"
    >
        Ignore warning
    </sp-button>
</sp-toast>
```
