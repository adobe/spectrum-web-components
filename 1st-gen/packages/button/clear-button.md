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

The clear button is a button with only close icon.

```html
<sp-clear-button>Reset</sp-clear-button>
```

#### Label

The label for an `<sp-clear-button>` element can be set via it's default slot or with the `label` attribute. With either method, the label will not be visible but still read by screen readers.

<sp-tabs selected="attribute" auto label="Labelling a button">
<sp-tab value="slot">Default slot</sp-tab>
<sp-tab-panel value="slot">

```html demo
<sp-clear-button>Clear</sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="attribute">Label attribute</sp-tab>
<sp-tab-panel value="attribute">

```html demo
<sp-clear-button label="Clear">Clear</sp-clear-button>
```

</sp-tab-panel>
</sp-tabs>

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-clear-button size="s">Small</sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-clear-button size="m">Medium</sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-clear-button size="l">Large</sp-clear-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-clear-button size="xl">Extra Large</sp-clear-button>
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
    <sp-clear-button>Normal</sp-clear-button>
    <sp-clear-button disabled>Disabled</sp-clear-button>
</sp-button-group>
```

### Behaviors

#### Handling events

Events handlers for clicks and other user actions can be registered on a
`<sp-clear-button>` as one would on a standard HTML `<button>` element.

```html
<sp-clear-button onclick="spAlert(this, '<sp-clear-button> clicked!')">
    Click me
</sp-clear-button>
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
        <sp-clear-button autofocus>Clear</sp-clear-button>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Include a label

A button is required to have either text in the default slot or a `label` attribute on the `<sp-clear-button>`.
