## Overview

`sp-dialog` displays important information that users need to acknowledge. They appear over the interface and block further interactions. When used directly the `sp-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

Note: the `sp-dialog` element is a component that is used to create a dialog layout. For modal and popover behavior, it should be used within a component that manages the overlay state.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-dx2gwzss)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```ts
import { Dialog } from '@spectrum-web-components/dialog';
```

### Anatomy

The dialog consists of several key parts:

- A heading (via `slot="heading"`)
- Content (via default slot)
- Optional hero content (via `slot="hero"`)
- Optional buttons (via `slot="button"`)
- Optional footer content (via `slot="footer"`)
- Optional dismiss button (via `dismissable` attribute)

```html
<sp-dialog size="s">
    <div
        slot="hero"
        style="background-image: url(https://picsum.photos/1400/260)"
    ></div>
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    <div slot="footer">Footer information</div>
    <sp-button slot="button">Button</sp-button>
</sp-dialog>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-dialog size="s">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-dialog size="m">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-dialog size="l">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
</sp-tabs>

#### Dismissable

When supplied with the `dissmissable` attribute an `<sp-dialog>` element will surface a "close" button afordance that will dispatch a DOM event with the name of `close` when pressed.

Note: the `dissmissable` attribute will not be followed when `mode="fullscreen"` or `mode="fullscreenTakeover"` are applies in accordance with the Spectrum specification.

```html
<sp-dialog dismissable>
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

#### No Divider

```html
<sp-dialog dismissable no-divider>
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

### Behaviors

Use the dialog with an overlay to create a dialog that appears over the current page. The dialog manages several behaviors:

1. Animation of the dialog content when opening/closing
2. Focus management when the dialog opens
3. Event handling for closing the dialog

```html
<sp-button id="trigger">Overlay Trigger</sp-button>
<sp-overlay trigger="trigger@click" placement="bottom">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Overlay 1</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
        </sp-dialog>
    </sp-popover>
</sp-overlay>
<overlay-trigger placement="top" type="replace">
    <sp-button slot="trigger">Overlay Trigger 2</sp-button>
    <sp-popover slot="click-content" open>
        <sp-dialog size="s">
            <h2 slot="heading">Overlay 2</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            <sp-button
                slot="button"
                onclick="javascript: this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));"
            >
                I understand
            </sp-button>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

#### Receives focus

The `receives-focus` attribute can be used to control whether the dialog should receive focus when it is opened. Leverage the `type="modal"` and `receives-focus="auto"` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

The `receives-focus` attribute on `overlay-trigger` has three possible values:

- `auto` (default): Focus will automatically move to the first focusable element in the dialog
- `true`: Forces focus to move to the overlay content
- `false`: Prevents focus from moving to the overlay

For accessible dialogs, always use `receives-focus="auto"` or `receives-focus="true"` to ensure keyboard users can interact with the dialog content.

```html
<sp-button id="focus">Overlay Trigger</sp-button>
<sp-overlay trigger="focus@click" type="modal" receives-focus="auto">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Dialog Heading</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Include a heading

The `heading` slot is of the `sp-dialog` dialog element is used to label the dialog content for screen readers.
