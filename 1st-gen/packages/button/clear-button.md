## Overview

An `<sp-clear-button>` is a special extension of the `ButtonBase` class that includes icons and styling for buttons used to clear a form.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button)

```zsh
yarn add @spectrum-web-components/button
```

Import the side effectful registration of `<sp-clear-button>` as follows:

```ts
import '@spectrum-web-components/button/sp-clear-button.js';
```

When looking to leverage the `ClearButton` base class as a type and/or for extension purposes, do so via:

```ts
import { ClearButton } from '@spectrum-web-components/button';
```

### Anatomy

The clear button is a button with only a close icon.

```html
<sp-clear-button label="Reset"></sp-clear-button>
```

#### Label

An accessible label for an `<sp-clear-button>` must be provided using the `label` attribute. This sets the `aria-label` for screen readers. Unlike other button types, the clear button only displays an icon and does not render slot content, so the `label` attribute is the only way to provide an accessible name.

```html demo
<sp-clear-button label="Clear"></sp-clear-button>
```

The `label` attribute is required and will be set as the `aria-label` on the element.

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-clear-button size="s" label="Clear"></sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-clear-button size="m" label="Clear"></sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-clear-button size="l" label="Clear"></sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-clear-button size="xl" label="Clear"></sp-clear-button>
```

</sp-tab-panel>
</sp-tabs>

#### Quiet

The `quiet` attribute will render the `<sp-clear-button>` as a quiet button. This is useful for cases where you want to use the clear button in a more subtle way.

```html
<sp-clear-button quiet label="Clear content"></sp-clear-button>
```

#### Static color

The `static-color` attribute will render the `<sp-clear-button>` with a static color. This is useful for cases where the button appears on a dark background texture. This is a replacement for the previously used `variant="overBackground"` attribute which is deprecated.

```html
<sp-clear-button static-color="white" label="Clear content"></sp-clear-button>
```

### States

In addition to the variant, the `<sp-clear-button>` elements supports a disabled state, which can be applied by adding the attribute `disabled`.

#### Disabled

While disabled, the `<sp-clear-button>` element will not respond to click events and will appear faded.

```html
<sp-button-group>
    <sp-clear-button label="Clear"></sp-clear-button>
    <sp-clear-button label="Clear" disabled></sp-clear-button>
</sp-button-group>
```

### Behaviors

#### Handling events

Events handlers for clicks and other user actions can be registered on a
`<sp-clear-button>` as one would on a standard HTML `<button>` element.

```html
<sp-clear-button
    label="Click me"
    onclick="spAlert(this, '<sp-clear-button> clicked!')"
></sp-clear-button>
```

#### Autofocus

The `autofocus` attribute sets focus on the `<sp-clear-button>` when the component
mounts. This is useful for setting focus to a specific sp-clear-button when a
popover or dialog opens.

```html
<sp-button id="trigger">Open</sp-button>
<sp-overlay trigger="trigger@click" placement="bottom">
    <sp-popover>
        <!-- Button will autofocus when open -->
        <sp-clear-button label="Clear" autofocus></sp-clear-button>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Include a label

A button is required to have a `label` attribute on the `<sp-clear-button>` to provide an accessible name for screen readers. The `label` attribute sets the `aria-label` property, ensuring the button is properly announced to assistive technologies.
