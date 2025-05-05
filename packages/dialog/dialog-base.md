## Overview

`DialogBase` is a foundational class that handles the core functionality of displaying and managing dialog content in an overlay. This base class provides the foundation for more specific dialog implementations like [`sp-dialog`](./dialog) and [`sp-dialog-wrapper`](./dialog-wrapper), handling the core functionality while allowing those implementations to focus on their specific features.

Use `sp-dialog-wrapper`, or `DialogBase` when:

-   You need to present important information that requires user acknowledgment
-   You're building a modal interface that blocks interaction with the page
-   You need a structured container with features like backdrop/underlay
-   Your content is complex and requires formal layout with headings, content sections, and actions

Use [`sp-popover`](./popover) when:

-   You need a lightweight, contextual container that's positioned relative to a trigger element
-   You want to display simple content like menus, tooltips, or additional options
-   You're building a non-modal interface where users can still interact with the page
-   You need an element with an arrow/tip pointing to the trigger

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

Extend the dialog base to create a new component that uses the same base functionality but with additional features. See [`DialogWrapper.ts`](https://github.com/adobe/spectrum-web-components/blob/main/packages/dialog/src/DialogWrapper.ts) for an example component that extends the dialog base.

```ts
export class MyCustomDialog extends DialogBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles];
    }

    protected override renderDialog(): TemplateResult {
        ...
    }
}
```

### Options

#### Underlay

The `underlay` attribute can be used to add an underlay element between the page content and the dialog.

#### Dismissable

The `dismissable` attribute can be used to add an underlay element between the page content and the dialog.

#### Mode

The dialog base supports different display modes: `fullscreen` and `fullscreenTakeover`.

### Behaviors

The dialog base manages several behaviors:

1. Animation of the dialog content when opening/closing
2. Focus management when the dialog opens
3. Event handling for closing the dialog

### Accessibility

The dialog base component ensures proper focus management by:

-   Moving focus into the dialog when opened
-   Trapping tab order within the dialog while open
-   Returning focus to the trigger element when closed

See the [Dialog](./dialog) component for more information on the accessibility features of the dialog content.
