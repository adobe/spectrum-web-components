## Overview

`sp-dialog-wrapper` supplies an attribute-based interface for the managed customization of an sp-dialog element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an [`sp-underlay`](./underlay) element between your page content and the [`sp-dialog`](./dialog) that opens over it.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog-wrapper>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
```

### Anatomy

The dialog wrapper is a high-level component that combines the [`sp-dialog-base`](./dialog-base) functionality and the [`sp-dialog`](./dialog) layout and stylingwith an attribute-based API.

The dialog wrapper consists of several key parts:

- A headline used as the dialog title (via the `headline` attribute)
- Content (via default slot)
- Optional hero content (via the `hero` attribute)
- Optional footer content (via the `footer` attribute)
- Optional underlay (via the `underlay` attribute)
- Optional buttons (via the `confirm-label`, `cancel-label`, and `secondary-label` attributes)
- Optional dismiss button (via the `dismissable` attribute and the `dismiss-label` attribute)

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        hero="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
        confirm-label="Confirm"
        cancel-label="Cancel"
        secondary-label="Secondary"
        underlay
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
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
    <sp-dialog-wrapper
        size="s"
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
        dismiss-label="Close"
        underlay
        footer="Content for footer"
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
        dismiss-label="Close"
        underlay
        footer="Content for footer"
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

<sp-tabs selected="underlay" auto label="Underlay options">
    <sp-tab value="underlay">With underlay</sp-tab>
    <sp-tab-panel value="underlay">

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

</sp-tab-panel>
<sp-tab value="no-underlay">Without underlay</sp-tab>
<sp-tab-panel value="no-underlay">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        dismissable
        dismiss-label="Close"
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
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

</sp-tab-panel>
<sp-tab value="not-dismissable">Not dismissable</sp-tab>
<sp-tab-panel value="not-dismissable">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        underlay
        footer="Content for footer"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

#### Mode

The dialog wrapper supports different display modes:

<sp-tabs selected="fullscreen" auto label="Mode attribute options">
    <sp-tab value="fullscreen">Fullscreen</sp-tab>
    <sp-tab-panel value="fullscreen">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        cancel-label="Cancel"
        underlay
        footer="Content for footer"
        mode="fullscreen"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="fullscreen-takeover">Fullscreen Takeover</sp-tab>
<sp-tab-panel value="fullscreen-takeover">

```html
<overlay-trigger type="modal">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        cancel-label="Cancel"
        underlay
        footer="Content for footer"
        mode="fullscreenTakeover"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

#### Include a headline

An sp-dialog-wrapper element leverages the headline attribute/property to label the dialog content for screen readers. The headline-visibility attribute will accept a value of "none" to suppress the headline visually.

#### Manage focus

The dialog wrapper component ensures proper focus management by:

- Moving focus into the dialog when opened
- Trapping tab order within the dialog while open
- Returning focus to the trigger element when closed

The `receives-focus` attribute can be used to control whether the dialog should receive focus when it is opened. Leverage the `type="modal"` and `receives-focus="auto"` settings in the Overlay API to ensure that focus is thrown into the dialog content when opened and that the tab order will be trapped within it while open.

The `receives-focus` attribute on `overlay-trigger` has three possible values:

- `auto` (default): Focus will automatically move to the first focusable element in the dialog
- `true`: Forces focus to move to the overlay content
- `false`: Prevents focus from moving to the overlay

For accessible dialogs, always use `receives-focus="auto"` or `receives-focus="true"` to ensure keyboard users can interact with the dialog content.

```html
<overlay-trigger type="modal" receives-focus="true">
    <sp-dialog-wrapper
        slot="click-content"
        headline="Dialog title"
        dismissable
        dismiss-label="Close"
        underlay
        footer="Content for footer"
        mode="fullscreenTakeover"
    >
        Content of the dialog
    </sp-dialog-wrapper>
    <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
</overlay-trigger>
```
